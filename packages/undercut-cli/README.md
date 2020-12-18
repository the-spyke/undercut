# @undercut/cli

[![downloads](https://img.shields.io/npm/dm/@undercut/cli)](https://www.npmjs.com/package/@undercut/cli)
[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

A command line utility for lazy data processing in a shell using operations from Undercut and any valid JavaScript expression including loading your custom libraries.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Composability and extensibility by design
- Custom operations in a couple of lines
- Pure ES Modules with Node 14 loader compliance
- Lazy evaluation when possible
- No external dependencies
- TypeScript in JSDoc

Please visit [undercut.js.org](https://undercut.js.org) for broader overview and documentation.

## Installation

```sh
npm install --global @undercut/cli
# or
yarn global add @undercut/cli
```

You may also install it locally.

## Usage

The name of the installed command is `undercut`. You may also import the `run` function from the `@undercut/cli` to call it programmatically.

```sh
undercut [...options] [...operations]
```

[List of available operations.](https://undercut.js.org/docs/operations/overview)

You're building a `Push Line` where the source is `stdin` and the target is `stdout`. Operations should be single quoted (prevents parsing by the shell) and separated by spaces. You can use everything that is available in the global context of Node.js. There're predefined variables with imports from Undercut packages: `pull`, `push`, and `utils`.

```sh
undercut 'map(s => parseInt(s, 10))' 'filter(utils.isNumberValue)'
```

If your expression starts with a call to a `push` function, you may omit the `"push."` prefix there:

```sh
undercut 'composeOperations([push.sortStrings(utils.desc)])'
          ^                  ^--- but not here
          |--- skip prefix here
```

Any valid JavaScript expression resulting into a `PushOperation` works:

```sh
undercut 'observer => observer' # Does nothing useful, but works.
```

## Examples

Pipe data like you usually do in a shell:

```sh
$ cat strings.txt | undercut 'map(s => s.trim())' 'filter(s => s.length > 10)'
Hello world!
A very long string...
```

Use an Iterable as a `source` instead of `stdin`:

```sh
$ undercut -s 'pull.range(0, 5)' 'map(Math.sqrt)' 'sum()'
6.146264369941973
```

Import an installed `npm` package and use it:

```sh
$ undercut -i 'pad::left-pad' -s 'range(0, 3)' 'map(x => pad(x, 3))'
000
001
002
```

Enter text data from keyboard by skipping a source. Results will be printed to `stdout` after you signal the end of input with `Ctrl + D`:

```sh
$ undercut 'map(s => s.toUpperCase(s))'
Tom
Sam
# Ctrl + D to finish the input.
TOM
SAM
```

## Options

### `-i`, `--import=SPECIFIER`

Import a Node.js module to use it in expressions. The specifier has the format `name::id`. Module will be loaded by this `id` and accessible under this `name`.

```sh
$ undercut -i 'pad::left-pad' -s 'range(0, 3)' 'map(x => pad(x, 3, 0))'
000
001
002
```

A specifier is translated into something like this:

```js
const name = require("id");
```

So, the `name` should be a valid JS identifier, and the `id` should allow Node to load the module (like a path to a `.js` file or a name of npm package).

You may omit the name if your `id` is a valid identifier:

```js
// -i 'chalk'
const chalk = require("chalk");
```

Or use a destructuring expression:

```js
// -i '{green,blue}::chalk'
const {green,blue} = require("chalk");
```

### `-s`, `--source=EXPRESSION`

Specify a JavaScript expression of an Iterable to read input values from. In this case `stdin` will be ignored.

You can skip the `"pull."` prefix for a function from the `pull` package.

```sh
$ undercut -s 'range(0, 5)' 'sum()'
10
```

### `--help`

Shows help information.

### `--version`

Prints package's version.

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
