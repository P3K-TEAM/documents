# LaTeXJS

LaTeX Boilerplate with script written in Node.js for cross-platform
compiling single / multiple LaTeX files.

## Prerequirements

- [Node.js](https://nodejs.org)
- LaTeX compiler 

## Usage

#### Installation

Please install all package dependencies by using following command

```shell script
npm install
```

#### How to use this package?

1. Create any valid LaTeX (`.tex`) file in `src` directory (or in subdirectories).
1. After you're done, you can compile by using one of following scripts.

    1. For compiling all documents present in `src` directory, use:

        ```shell script
        npm run compile:all
        ```

    1. If you wish to compile single file only, specify the `--file` flag
       with relative path in `src` directory, e.g.:

        ```shell script
        npm run compile -- --file document.tex
        ```

#### Command Line Options

-   `--clean`
    will clean the output directory (remove all files in `out`, so use it carefully)

-   `--file`
    is used when specifying relative path to a single file
-   `--all`
    to compile all `.tex` files in `src` directory (or in any subdirectory).
