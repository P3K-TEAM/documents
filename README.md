# LaTeXJS

LaTeX Boilerplate with script written in Node.js for cross-platform
compiling single / multiple LaTeX files.

## Prerequirements

-   [Node.js](https://nodejs.org)
-   LaTeX compiler
-   LaTeX packages
    -   For compiling file `examples/algorithms.tex` - [algorithmicx](https://www.ctan.org/pkg/algorithmicx) 
    -   For compiling file `examples/hyperlinks.tex` - [hyperref](https://ctan.org/pkg/hyperref) 

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
    -   If provided, the script will clean the output directory (remove all files in `out`, so use it carefully)
-   `--file`
    -   This option is used when specifying relative path to a single file
-   `--all`
    -   If specified, script will compile all `.tex` files in `src` directory (or in any subdirectory).
-   `--inputs`
    -   Importing assets should contain URL relative to the working directory.
        If you wish to specify more relative paths, use this option.
    -   _Supported values_: multiple string URLs, separated by comma.
    -   E.g. `--inputs src/examples/assets/img,src/examples/templates`
