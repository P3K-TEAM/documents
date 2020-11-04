/**
 * Function transforms command line arguments
 */

function transformArgs(...args) {
	const config = {};

	if (process.env.npm_config_argv) {
		const npm_argv = JSON.parse(process.env.npm_config_argv).original;
		// If '--' is not specified, arguments won't be passed from npm to process.argv correctly
		if (npm_argv.slice(2).length && args.length % 2 === 1) {
			console.error(
				"If running via 'npm run' with arguments, don't forget the '--' before arguments.\ne.g npm run command -- --port XXXX"
			);
			process.exit(1);
		}
	}

	args.forEach((arg, index) => {
		if (arg.match(new RegExp(/--.*/))) {
			config[arg.replace('--', '')] = args[index + 1];
		}
	});

	return config;
}

module.exports = transformArgs;
