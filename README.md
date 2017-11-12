# Getopts
[![Travis CI](https://img.shields.io/travis/JorgeBucaran/getopts/master.svg)](https://travis-ci.org/JorgeBucaran/getopts)
[![Codecov](https://img.shields.io/codecov/c/github/JorgeBucaran/getopts/master.svg)](https://codecov.io/gh/JorgeBucaran/getopts)
[![npm](https://img.shields.io/npm/v/getopts.svg)](https://www.npmjs.org/package/getopts)

Getopts is a Node.js CLI options parser.

* **Swift**: Getopts is 10 to 20 times faster than the alternatives. See the [benchmarks](./bench/README.md).
* **Familiar**: Getopts works similarly to other CLI parsers like [mri](https://github.com/lukeed/mri), [yargs](https://github.com/yargs/yargs) and [minimist](https://github.com/substack/minimist).
* **Standard**: Getopts is designed according to the [Utility Syntax Guidelines](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html).

## Installation

Using npm or Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/getopts">getopts</a>
</pre>

## Usage

Use getopts to parse the arguments passed into your program from the command line.

<pre>
$ <a href="./example/demo">example/demo</a> --super=sonic -jb9000 -- game over
</pre>

```js
const options = getopts(process.argv.slice(2), {
  alias: {
    s: "super",
    b: "blitz"
  },
  default: {
    turbo: true
  }
})
```

Getopts expects an array of arguments and options object (optional) and returns an object where you can look up the argument keys and their values.

```
{
  _: ["game", "over"],
  j: true,
  s: "sonic",
  b: "9000",
  super: "sonic",
  blitz: "9000",
  turbo: true
}
```

## API

### getopts(argv, options)
#### argv

An array of arguments to parse. See [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv).

Arguments that begin with one or two dashes are called options or flags. Options may have one or more [aliases](#optsalias). The underscore key stores operands. Operands include non-options, the single dash `-` and all the arguments after `--`.

#### options.alias

An object of option aliases. An alias can be a string or an array of strings.

```js
getopts(["-b"], {
  alias: {
    b: ["B", "turbo"]
  }
}) //=> { _:[], b:true, B:true, turbo:true }
```

#### options.boolean

An array of options that should be parsed as booleans.

```js
getopts(["-b", 1], {
  boolean: ["b"]
}) //=> { _:[1], b:true }
```

#### options.default

An object of default values for missing options.

```js
getopts(["-b"], {
  default: {
    turbo: true
  }
}) //=> { _:[], b:true, turbo:true }
```

#### options.unknown

A function that runs for every unknown option. Return `false` to dismiss the option.

```js
getopts(["-abc"], {
  unknown: option => option === "a"
}) // => { _:[], a:true }
```

## License

Getopts is MIT licensed. See [LICENSE](LICENSE.md).
