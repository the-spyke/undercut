---
id: introducing-undercut-cli
title: Processing data in a shell... with JavaScript!
tags: [cli, shell, tutorial]
---

Processing data in a shell may be very convenient, especially for experienced terminal users. You pipe text data through various commands, redirect streams, read and write files.

However, shell commands are diverse. Identical commands on some operating systems may have different options or those options may have different meaning. Some commands exist in different versions (`grep`, `rgrep`, `agrep`, etc.), all with small tweaks here and there. Usually, it's not that difficult and just requires some time to remember and find your favorites.

But if you're a JavaScript developer, you have an additional tool to choose. With the latest `0.5.0` release we added `@undercut/cli` package allowing you to build pipelines with JavaScript and achieve quantum supremacy in a shell.

<!--truncate-->

To try the `undercut` command you will need Node.js 10.13 or later. Global installation is recommended for ease of use:

```bash
$ npm i -g @undercut/cli
```

What it can do? Everything that `undercut` library can + any suitable JavaScript expression. You specify operations in quotes separated by spaces:

```bash
$ undercut 'op1' 'op2' 'opN'
```

Incoming data from `stdin` will be processed sequentially line-by-line by those operations and passed further into `stdout`.

Let's read a text file, trim its lines, remove lines shorter than 10 symbols, and print it on the screen:

```bash
#   ↙[read a file] ↙[pipe it to undercut]
$ cat strings.txt | undercut 'map(s => s.trim())' 'filter(s => s.length > 10)'
#                               ↖[operation 1]       ↖[operation 2]
Endless world!
A very long string...
```

It should be very familiar if you've ever used array methods like `Array.prototype.map()` or `Array.prototype.filter()`.

If you want to save it to a file instead of printing on the screen, then just add `stdout` redirection like so:

```bash
$ cat strings.txt | undercut 'map(s => s.trim())' > processed.txt
#                           [redirect to a file]↗
```

This is a standard shell mechanism, but you can do more.

Use an Iterable as a source instead of `stdin`:

```bash
$ undercut -s 'range(0, 5)' 'map(Math.sqrt)' 'sum()'
6.146264369941973
```

Import an installed `npm` package and use it inside expressions:

```bash
$ undercut -i 'pad::left-pad' -s 'range(0, 3)' 'map(x => pad(x, 3))'
000
001
002
```

Or even enter text data from keyboard by skipping the source. Results will be printed to `stdout` after you signal the end of input with `Ctrl + D`:

```bash
$ undercut 'map(s => s.toUpperCase(s))'
Tom
Sam
# Ctrl + D to finish the input.
TOM
SAM
```

`Undercut` has 40+ operations for you to choose. Moreover, you can use any JavaScript expression matching `PushOperaion` type instead. If you want to lear more, start with basic `undercut concepts` and continue with `push lines`.
