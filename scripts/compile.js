const latex = require('node-latex');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const transformArgs = require('./helper/transform-args');

const srcPath = path.resolve(__dirname, '../src');
const outPath = path.resolve(__dirname, '../out');
const rootDirPath = path.resolve(__dirname, '../');
let inputs = [];

(async function () {
	await main();
})().catch((err) => {
	console.error(err);
	process.exit(1);
});

async function main() {
	const args = transformArgs(...process.argv.slice(2));

	// Remove files
	if ('clean' in args) {
		fs.rmdirSync(outPath, { recursive: true });
		console.log(`Cleaned output directory (${outPath}).\n`);
	}

	// Parse inputs
	if ('inputs' in args) {
		inputs = args['inputs']
			.split(',')
			.map((input) =>
				path.resolve(__dirname, path.join(rootDirPath, input))
			);
	}

	// Compile all files
	if ('all' in args) {
		await Promise.all(
			glob.sync(`${srcPath}/**/*.tex`).map(async function (file) {
				return await compile(path.relative(srcPath, file));
			})
		);
		console.log('\nAll files successfully generated.');
	}

	// Single file compilation
	if ('file' in args) {
		await compile(args['file']);
	}
}

async function compile(file) {
	// Check whether the directory exists
	const directory = path.resolve(outPath, path.dirname(file));
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}

	return new Promise((resolve, reject) => {
		// Input output streams
		const pdfFile = file.replace('.tex', '.pdf');
		const input = fs.createReadStream(path.resolve(srcPath, file));
		const output = fs.createWriteStream(path.resolve(outPath, pdfFile));

		// Compile
		const pdf = latex(input, { inputs: [rootDirPath, ...inputs] });
		pdf.pipe(output);

		// Hooks
		pdf.on('error', (err) => {
			console.error(`Compiling ${file} failed with following error:`);
			console.error(err);
			reject();
		});

		pdf.on('finish', () => {
			console.log(`File ${pdfFile} generated.`);
			resolve();
		});
	});
}
