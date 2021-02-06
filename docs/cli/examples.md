---
title: CLI Examples
---

### Pipe data through like you usually do in a shell

```bash
$ cat strings.txt | undercut 'map(s => s.trim())' 'filter(s => s.length > 10)'
Hello world!
A very long string...
```

Use an Iterable as a `source` instead of `stdin`:

```bash
$ undercut -p -s 'pull.range(0, 5)' 'map(Math.sqrt)' 'sum()'
6.146264369941973
```

### Import an installed `npm` package and use it

```bash
$ undercut -i 'pad::left-pad' -p -s 'range(0, 3)' 'map(x => pad(x, 3))'
000
001
002
```

You can import more than one package/module.

### Enter text data from keyboard by skipping a source

Results will be printed to `stdout` after you signal the end of input with `Ctrl + D`:

```bash
$ undercut 'map(s => s.toUpperCase())'
Tom
Sam
# Ctrl + D to finish the input.
TOM
SAM
```
