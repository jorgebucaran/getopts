# Getopts
[![Travis CI](https://img.shields.io/travis/getopts/getopts/master.svg)](https://travis-ci.org/getopts/getopts)
[![Codecov](https://img.shields.io/codecov/c/github/getopts/getopts/master.svg)](https://codecov.io/gh/getopts/getopts)
[![npm](https://img.shields.io/npm/v/getopts.svg)](https://www.npmjs.org/package/getopts)

Getopts is a JavaScript CLI options parser.

[Try it online](...)


## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/getopts">getopts</a>
</pre>

## Usage

### Example

### Invalid options

## Arguments

### Short Flags

Short flags are written as `-x`, `-F`, `-#`, etc. They can have a value: `-x foo`. The white space can be omitted in some cases: `-f./my-file`, `-f1`, etc.

Multiple short flags can be joined `-abcx foo`. In this case `a`, `b` and `c` will be `true` and `x` will be `"foo"`.

```js
console.log(
  getopts(["-abcx", "foo"])
)
```
```js
{
  a: true,
  b: true,
  c: true,
  x: "foo"
}
```

### Long Flags

Long flags are written as `--write`, `--limit-rate`, etc. They can have a value: `--write=./file` or `--write ./file`.

```js
console.log(
  getopts(["--write=./file"])
)
```
```js
{
  write: "./file"
}
```

### Operands

Operands are arguments that are neither short or long options. In `-x foo bar`, `bar` is an operand. Getopts collects operands into the [`_`](#underscore) key of the result object.

```js
console.log(
  getopts(["-x", "foo", "bar"])
)
```
```js
{
  x: "foo",
  _: ["bar"]
}
```

### Early stop

The `--` argument indicates the end of options. Any following arguments will be treated as operands, even if they begin with a `-` character.

## Options

<!--
### getopts

Parse an array of CLI options and return an object populated with the arguments.

<pre>
getopts(
  <a href="#options">options</a>: Array&ltstring&gt,
  <a href="#aliases">aliases</a>: {
    [string]: string | Array&ltstring&gt
  }
): {
  [string]: number | string | boolean,
  <a href="#underscore">_</a>: Array&ltstring&gt
}
</pre>

- <a id="options"></a>options: Array of CLI arguments. Use [process.argv](https://nodejs.org/docs/latest/api/process.html#process_process_argv).slice(2) in a Node.js environment.
- <a id="aliases"></a>aliases: Object of option/alias pairs.
- <a id="underscore"></a>_: Array with all the operands and arguments after `--`. -->

## License

Getopts is MIT licensed. See [LICENSE](LICENSE.md).


