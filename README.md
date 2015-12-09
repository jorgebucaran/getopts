<a name="parsec"></a>

<p align="center">
<a href="https://github.com/bucaran/parsec/blob/master/README.md">
<img width="400px" src="https://cloud.githubusercontent.com/assets/8317250/11606196/b85167b0-9b5b-11e5-81a6-c66e2fc694e2.png">
</a>

</p>


<p align="center">
  <a href="https://www.npmjs.org/package/parsec">
    <img src="https://img.shields.io/npm/v/parsec.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://travis-ci.org/bucaran/parsec">
    <img src="http://img.shields.io/travis/bucaran/parsec.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://www.npmjs.org/package/parsec">
    <img src="http://img.shields.io/npm/dm/parsec.svg?style=flat-square"
         alt="Build Status">
  </a>
</p>


<p align="center">

<b><a href="#features">Features</a></b>
|
<b><a href="#install">Install</a></b>
|
<b><a href="#usage">Usage</a></b>
|
<b><a href="#examples">Examples</a></b>
</p>


## About

_Parsec_ is a tiny [CLI parser](https://en.wikipedia.org/wiki/Command-line_interface#Arguments).

## Features

+ Based in the [UNIX Utility Conventions](http://pubs.opengroup.org/onlinepubs/7908799/xbd/utilconv.html)
+ Custom aliases
* Default shorthands
+ Default values / types
+ Handle `--no-*` options
+ Handle unknown options


## Install

```sh
npm install parsec
```

## Usage

```js
// ./index.js -par5ec
parse()
```
```json
{
  "p": true,
  "a": true,
  "r": "5ec"
}
```

Customize:

```js
// ./index.js -s42
parse("secret", ["verbose", "V", { default: true }])
```
```json
{
  "s": 42,
  "secret": 42,
  "V": true,
  "verbose": true
}
```

## Usage

> Parse [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv) by default.

```js
import parse from "parsec"
parse(alias1, alias2, ...)
```


+ Custom aliases

```js
// ./index.js --bar
parse(["foo", "bar", "baz"])
```

```json
{
  "foo": true,
  "bar": true,
  "baz": true
}
```

+ Example aliases

```js
"foo" // → ["f", "foo"]
["F", "f", "foo"]
["foo", { default: "./" }]
["baz", { default: true }]
```

+ Default shorthands

```js
// ./index.js -fb
parse("foo", "bar")
```
```json
{
  "f": true,
  "foo": true,
  "b": true,
  "bar": true,
}
```

+ Default values and types

```js
// ./index.js --file
parse(["f", "file", { default: "." }])
```
```json
{
  "f": ".",
  "file": "."
}
```

+ Handle `--no-flags`

```js
// ./index.js --no-foo --no-bar=baz
parse()
```
```json
{
  "foo": false,
  "no-bar": "baz"
}
```

+ Handle unknown options

```js
// ./index.js --bar
parse("foo", (option) => {
  throw new RangeError(`unknown option ${option}`) // bar
})
```

+ Bare operands and arguments after `--` are added to `._`. To override:

```js
parse(["_", "alias"])
```

+ Bind `parse` to a different source of arguments:

```js
parse.call(["--foo", "--bar"], [alias1, alias2, ...])
```

## Examples

```js
// ./node index.js -f bar -bp
parse()
```
```json
{
  "f": "bar",
  "b": true,
  "p": "./"
}
```

with custom aliases:

```js
parse("foo", "bar", ["path", { default: "./" }])
```

```json
{
  "f": "bar",
  "foo": "bar",
  "b": true,
  "bar": true,
  "p": "./",
  "path": "./"
}
 ```

[license]: http://opensource.org/licenses/MIT
[author]: http://about.bucaran.me
[parsec]: https://www.github.com/bucaran/parsec
[npm-pkg-link]: https://www.npmjs.org/package/parsec
[npm-ver-link]: https://img.shields.io/npm/v/parsec.svg?style=flat-square
[dl-badge]: http://img.shields.io/npm/dm/parsec.svg?style=flat-square
[travis-logo]: http://img.shields.io/travis/bucaran/parsec.svg?style=flat-square
[travis]: https://travis-ci.org/bucaran/parsec
[contributors]: https://github.com/bucaran/parsec/graphs/contributors
