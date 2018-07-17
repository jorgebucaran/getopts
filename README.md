# Getopts

[![Travis CI](https://img.shields.io/travis/jorgebucaran/getopts/master.svg)](https://travis-ci.org/jorgebucaran/getopts)
[![Codecov](https://img.shields.io/codecov/c/github/jorgebucaran/getopts/master.svg)](https://codecov.io/gh/jorgebucaran/getopts)
[![npm](https://img.shields.io/npm/v/getopts.svg)](https://www.npmjs.org/package/getopts)

Getopts is a Node.js CLI options parser. It's designed according to the [Utility Conventions](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html) so that your programs behave like typical UNIX utilities effortlessly and without sacrificing developer experience.

Need for speed? Getopts is 10x to 20x faster than the alternatives. See the [benchmarks](/bench).

## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/getopts">getopts</a>
</pre>

## Usage

Use getopts to parse the arguments passed to your program from the command line.

<pre>
$ <a href="./example/demo">example/demo</a> --super=sonic -au9000 -- game over
</pre>

```js
const getopts = require("getopts")

const options = getopts(process.argv.slice(2), {
  alias: {
    s: "super",
    u: "ultra"
  },
  default: {
    turbo: true
  }
})
```

Getopts expects an array of arguments and options object (optional) and returns an object where you can look up the argument keys and their values.

```js
{
  _: ["game", "over"],
  a: true,
  s: "sonic",
  u: "9000",
  super: "sonic",
  ultra: "9000",
  turbo: true
}
```

## API

### getopts(argv, options)

#### argv

An array of arguments to parse. See [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv).

Arguments that begin with one or two dashes are called options or flags. Options may have one or more [aliases](#optionsalias). The underscore key stores operands. Operands include non-options, the single dash `-` and all the arguments after `--`.

#### options.alias

An object of option aliases. An alias can be a string or an array of strings.

```js
getopts(["-u"], {
  alias: {
    u: ["U", "ultra"]
  }
}) //=> { _:[], u:true, U:true, ultra:true }
```

#### options.boolean

An array of options that should be parsed as booleans. In the example, by indicating that `u` is a boolean option, the number `1` is parsed as an operand and not as a value.

```js
getopts(["-u", 1], {
  boolean: ["u"]
}) //=> { _:[1], u:true }
```

#### options.default

An object of default values for missing options.

```js
getopts(["-u"], {
  default: {
    turbo: true
  }
}) //=> { _:[], u:true, turbo:true }
```

#### options.unknown

A function to run for every unknown option. Return `false` to dismiss the option.

```js
getopts(["-abc"], {
  unknown: option => "a" === option
}) // => { _:[], a:true }
```

## License

Getopts is MIT licensed. See [LICENSE](LICENSE.md).
