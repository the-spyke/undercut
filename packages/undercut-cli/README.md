# @undercut/cli

`@undercut/cli` is a command line utility for data processing using `undercut`'s Push Lines and any valid JavaScript expressions. It is a part of the larger [undercut](https://github.com/the-spyke/undercut) project.

## Quicklinks

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [License](#license)

## Installation

```sh
npm install --global @undercut/cli
# or
yarn global add @undercut/cli
```

You may also install it locally, but don't forget to add `node_modules/.bin` to the `PATH`.

## Usage

The name of the installed command is `undercut`. You may also import the `run` function from the `@undercut/cli` to call it programmatically.

```sh
undercut [...options] [...operations]
```

You're building a `Push Line` where the source is `stdin` and the target is `stdout`. Operations should be quoted (prevents parsing by the shell) and separated by spaces. You can use everything that is available in the global context of Node.js. `undercut`'s packages are available too under their names: `pull`, `push`, and `utils`.

```sh
undercut 'push.map(s => parseInt(s, 10))' 'push.filter(utils.isNumberValue)'
```

If your expression starts with a call to a `push` operation, you may omit `"push."` prefix there:

```sh
undercut 'sortStrings(push.desc)'
          ^           ^--- but not here
          |--- skip prefix here
```

Any valid JavaScript expression resulting into a `PushOperation` works:

```sh
undercut 'observer => observer' # Does nothing useful, but works.
```

## Examples

Pipe data through like you usually do in a shell:

```sh
$ cat strings.txt | undercut 'map(s => s.trim())' 'filter(s => s.length > 10)'
Hello world!
A very long string...
```

Use an Iterable as a `source` instead of `stdin`:

```sh
$ undercut -s 'range(0, 5)' 'map(Math.sqrt)' 'sum()'
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
