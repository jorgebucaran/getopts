# Getopts
[![Travis CI](https://img.shields.io/travis/JorgeBucaran/getopts/master.svg)](https://travis-ci.org/JorgeBucaran/getopts)
[![Codecov](https://img.shields.io/codecov/c/github/JorgeBucaran/getopts/master.svg)](https://codecov.io/gh/JorgeBucaran/getopts)
[![npm](https://img.shields.io/npm/v/getopts.svg)](https://www.npmjs.org/package/getopts)

Getopts is a Node.js CLI options parser.

* **Swift**: Getopts is 10 to 1000 times faster than the alternatives. See [benchmarks](./bench/README.md) for details.
* **Familiar**: Getopts works similarly to other CLI parsers like [mri](https://github.com/lukeed/mri), [yargs](https://github.com/yargs/yargs) and [minimist](https://github.com/substack/minimist).
* **Predictable**: Getopts is designed according to the [Utility Syntax Guidelines](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html).

## Installation

Using npm or Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/getopts">getopts</a>
</pre>

## Usage

Use Getopts to parse the arguments passed into your program.

```console
$ example/demo --jet sonic --mode=turbo -xdz777 -- game over
```

And create an object where you can lookup the arguments and their values.

```js
const deepEqual = require("assert").deepEqual
const getopts = require("getopts")
const args = process.argv.slice(2)

deepEqual(getopts(args), {
  _: ["game", "over"],
  jet: "sonic",
  mode: "turbo",
  x: true,
  d: true,
  z: "555"
})
```

Create option aliases.

```js
deepEqual(
  getopts(args, {
    alias: {
      j: "jet",
      m: "mode",
      z: "zap"
    }
  }),
  {
    _: ["game", "over"],
    jet: "sonic",
    j: "sonic",
    mode: "turbo",
    m: "turbo",
    x: true,
    d: true,
    z: "555",
    zap: "555"
  }
)
```

Populate missing options with default values.

```js
deepEqual(
  getopts(args, {
    default: {
      bolt: true,
      hyper: 9000
    }
  }),
  {
    _: ["game", "over"],
    jet: "sonic",
    mode: "turbo",
    x: true,
    d: true,
    z: "555",
    bolt: true,
    hyper: 9000
  }
)
```

Handle boolean options.

```js
deepEqual(
  getopts(args, {
    boolean: ["jet"]
  }),
  {
    _: ["sonic", "game", "over"],
    jet: true,
    mode: "turbo",
    x: true,
    d: true,
    z: "555"
  }
)
```

Identify unknown options.

```js
getopts(args, {
  alias: {
    j: "jet",
    m: "mode",
    z: "zap"
  },
  unknown(option) {
    throw new Error(`Unknown option: ${option}.`) // => Unknown option: x.
  }
})
```

## API

### getopts(args, options)
#### args

An array of arguments to parse. Use [`process.argv.slice(2)`](https://nodejs.org/docs/latest/api/process.html#process_process_argv).

#### options.alias

An object of option aliases. An alias can be a string or an array of aliases.

```js
getopts(["-b"], {
  alias: {
    b: ["B", "bolt"]
  }
}) //=> { _:[], b:true, B:true, bolt:true }
```

#### option.boolean

An array of options that should be parsed as booleans.

```js
getopts(["-f", "zip"], {
  boolean: ["f"]
}) //=> { _:["zip"], f:true }
```

#### options.default

An object of default values for missing options.

```js
getopts(["-b"], {
  default: {
    hyper: 9000
  }
}) //=> { _:[], b:true, hyper:9000 }
```

#### options.unknown

A function we run for every option without an alias. Return `false` to dismiss the option.

```js
getopts(["-xdz"], {
  unknown: option => option === "z"
}) // => { _: [], z:true }
```

## License

Getopts is MIT licensed. See [LICENSE](LICENSE.md).
