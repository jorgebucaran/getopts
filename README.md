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

# Parsec

Tiny cli parser in JavaScript.

## Features

+ [Custom aliases](#custom-aliases)
* [Default shorthands](#default-shorthands)
+ [Default values and types](#default-values-and-types)
+ [Process negated options](#process-negated-options)
+ [Process unknown options](#process-unknown-options)

## Install

```sh
npm i parsec
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

### Custom aliases

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

### Example aliases

```js
"foo" // → ["f", "foo"]
["F", "f", "foo"]
["foo", { default: "./" }]
["baz", { default: true }]
```

### Default shorthands

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

### Default values and types

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

### Process negated options

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

### Process unknown options

```js
// ./index.js --bar
parse("foo", (option) => {
  throw new RangeError(`unknown option ${option}`) // bar
})
```

* Bare operands and arguments after `--` are added to `_`. To add an alias:

```js
parse(["_", "alias"])
```

* Bind `parse` to a different source of arguments

```js
parse.call(["--foo", "--bar"], [alias1, alias2, ...])
```
