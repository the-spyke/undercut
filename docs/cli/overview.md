---
title: CLI Overview
---

`@undercut/cli` is a command line utility for data processing using `Undercut`'s Push Lines and any valid JavaScript expressions.

## Installation

```bash
npm install --global @undercut/cli
# or
yarn global add @undercut/cli
```

You may also install it locally, but don't forget to add `node_modules/.bin` to the `PATH`.

## Usage

The name of the installed command is `Undercut`. You may also import the `run` function from the `@undercut/cli` to call it programmatically.

```bash
undercut [...options] [...operations]
```

You're building a `Push Line` where the source is `stdin` and the target is `stdout`. Operations should be quoted (prevents parsing by the shell) and separated by spaces. You can use everything that is available in the global context of Node.js. `Undercut`'s packages are available too under their names: `pull`, `push`, and `utils`.

```bash
undercut 'map(s => parseInt(s, 10))' 'filter(utils.isNumberValue)'
```

If your expression starts with a call to a `push` exported function, you may omit `"push."` prefix there:

```bash
undercut 'composeOperations([push.sortStrings(utils.desc)])'
          ^                  ^--- but not here
          |--- skip prefix here
```

Any valid JavaScript expression resulting into a `PushOperation` works:

```bash
undercut 'observer => observer' # Does nothing useful, but works.
```
