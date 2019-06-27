# Getopts [![npm](https://img.shields.io/npm/v/getopts.svg?label=&color=0080FF)](https://github.com/jorgebucaran/getopts/releases/latest) [![Travis CI](https://img.shields.io/travis/jorgebucaran/getopts.svg?label=)](https://travis-ci.org/jorgebucaran/getopts)

> Parse CLI options, better.

Getopts sorts your command-line arguments into key-value pairs for easy look-up and retrieval, and its sane out-of-the-box defaults allow you to focus on the big picture: writing CLI tools. Here's why you'll love it:

- Up to ~6x faster than the alternatives ([run the benchmarks](#run-the-benchmarks)).
- Built upon [utility syntax guidelines](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html#tag_12_02) that have been used for decades.
- You can use it as a drop-in replacement for `yargs` or `minimist`.
- ~180 LOC and no dependencies.

## Quickstart

```console
npm i getopts
```

How about we start with something useful: let's write a password generator. Our program should print out a random string of characters of a given length, and to make things more interesting, we'll add a way exclude certain characters like numbers or punctuation. We'll call it `pwd` (pronounced "password").

A typical invocation of our program will look like this:

```console
example/pwd --no-symbols --length=12
```

First, we'll use `getopts` to parse the [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv) array (the first two items are always `node` and the path to the script so we usually skip them). We'll also define aliases for each of our options, and set their default values.

```js
#!/usr/bin/env node

const getopts = require("getopts")

const options = getopts(process.argv.slice(2), {
  alias: {
    help: "h",
    length: "l",
    digits: "d",
    symbols: "s"
  },
  default: {
    length: 16,
    digits: true,
    symbols: true
  }
})
```

What we get is an object mapping argument names to values. We'll use it to look up the value of an option by their name. This is what it looks like when `pwd` is invoked with `--no-symbols --length=12`:

```js
{
  _: [],
  symbols: false,
  s: false,
  length: 12,
  l: 12,
  digits: true,
  d: true
}
```

And to generate the password, here's what we're going to do:

1. Print usage if `--help` is in the parsed options and exit.
2. Initialize `CHARS` with all the possible password characters.
3. Initialize an array of length `options.length`, where each item is a random character from `CHARS`.
4. Join the result into a string and print it out.

```js
if (options.help) {
  console.log("usage: pwd [-l|--length=N] [-d|--digits] [-s|--symbols]")
  process.exit(0)
}

const CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  (options.digits ? "0123456789" : "") +
  (options.symbols ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "")

const getRandom = list => list.charAt(Math.floor(Math.random() * list.length))

process.stdout.write(
  Array.from({ length: options.length }, () => getRandom(CHARS)).join("") + "\n"
)
```

That's it! Now you're ready to start working with Getopts on your own project. To learn more, continue to [Parsing Rules](#parsing-rules). Want to dig deeper? Head over to the [API docs](#api).

## Parsing Rules

### Short Options

A short option consists of a dash `-` followed by a single alphabetic character. Multiple short options can be clustered together without spaces. Short options will be a boolean `true` unless followed by an [operand](#operand) or if adjacent to one or more non-alphabetic characters matching the regular expression <code>/[!-@[-`{-~][\s\s]\*/</code>.

```js
getopts(["-ab", "-c"]) //=> { _: [], a:true, b:true, c:true }
```

```js
getopts(["-a", "alpha"]) //=> { _: [], a:"alpha" }
```

```js
getopts(["-abc1"]) //=> { _: [], a:true, b:true, c:1 }
```

The last character in a cluster of options can be parsed as a string or as a number depending on the argument that follows it. Any options preceding it will be `true`. You can use [`opts.string`](#optsstring) to specify if one or more options should be parsed as strings instead.

```js
getopts(["-abc-100"], {
  string: ["b"]
}) //=> { _: [], a:true, b:"c-100" }
```

The argument immediately following a short or a long option, which is not an option itself, will be parsed as the value of that option. You can use [`opts.boolean`](#optsboolean) to specify if one or more options should be parsed as booleans, causing any adjacent argument to be parsed as an operand instead.

```js
getopts(["-a", "alpha"], {
  boolean: ["a"]
}) //=> { _: ["alpha"], a:true }
```

Any character listed in the ASCII table can be used as a short option if it's the first character after the dash.

```js
getopts(["-9", "-#10", "-%0.01"]) //=> { _:[], 9:true, #:10, %:0.01 }
```

### Long Options

- A long option consists of two dashes `--` followed by one or more characters. Any character listed in the ASCII table can be used to create a long option except the `=` symbol, which separates an option's name and value.

  ```js
  getopts(["--turbo", "--warp=10"]) //=> { _: [], turbo:true, warp:10 }
  ```

  ```js
  getopts(["--warp=e=mc^2"]) //=> { _: [], warp:"e=mc^2" }
  ```

  ```js
  getopts(["----", "alpha"]) //=> { _: [], --:"alpha" }
  ```

- Options can be negated if they are prefixed with the sequence `--no-`. Their value is always `false`.

  ```js
  getopts(["--no-turbo"]) //=> { _: [], turbo:false }
  ```

### Operands

- Every argument after the first double-dash sequence `--` is saved to the operands array `_`.

  ```js
  getopts(["--", "--alpha", "001"]) //=> { _:["--alpha", "001"] }
  ```

- Every non-option standalone argument is an operand.

  ```js
  getopts(["alpha", "-w9"]) //=> { _: ["alpha"], w:9 }
  ```

  ```js
  getopts(["--code=alpha", "beta"]) //=> { _: ["beta"], code:"alpha" }
  ```

- A dash `-` is an operand.

  ```js
  getopts(["--turbo", "-"]) //=> { _:["-"], turbo:true }
  ```

### Other

- Options missing from the arguments array designated as a boolean or string type will be added to the result object as `false` and `""` respectively.

  ```js
  getopts([], {
    string: ["a"],
    boolean: ["b"]
  }) //=> { _:[], a:"", b:false }
  ```

* The string `"false"` is always cast to a boolean `false`.

  ```js
  getopts(["--turbo=false"]) //=> { _:[], turbo:false }
  ```

* Options that appear multiple times are parsed as an array that consists of every value in the order they are found.

  ```js
  getopts(["-a?alpha=beta", "-aa0.1"] //=> { _:[], a:["?alpha=beta", true, 0.1] }
  ```

* A value may contain newlines or other control characters.

  ```js
  getopts(["--text=top\n\tcenter\bottom"]) //=> { _:[], text:"top\n\tcenter\bottom" }
  ```

## API

### `getopts(argv, opts)`

Parse command line arguments. Expects an array of arguments, e.g., [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv), options configuration object, and returns an object mapping argument names to their values.

### `argv`

An array of arguments.

### `opts.alias`

An object of option aliases. An alias can be a string or an array of strings. Aliases let you declare substitute names for an option, e.g., the short (abbreviated) and long (canonical) variations.

```js
getopts(["-t"], {
  alias: {
    turbo: ["t", "T"]
  }
}) //=> { _:[], t:true, T:true, turbo:true }
```

### `opts.boolean`

An array to indicate boolean options. In the next example, declaring `t` as boolean causes the next argument to be parsed as an operand and not as a value.

```js
getopts(["-t", "alpha"], {
  boolean: ["t"]
}) //=> { _:["alpha"], t:true }
```

### `opts.string`

An array to indicate string options. In the next example, by declaring `t` as a string, all adjacent characters are parsed as a single value and not as individual options.

```js
getopts(["-atabc"], {
  string: ["t"]
}) //=> { _:[], a:true, t:"abc" }
```

### `opts.default`

An object of default values for options that are not present in the arguments array.

```js
getopts(["--warp=10"], {
  default: {
    warp: 15,
    turbo: true
  }
}) //=> { _:[], warp:10, turbo:true }
```

### `opts.unknown`

A function that will be invoked for every unknown option. Return `false` to discard the option. Unknown options are those that appear in the arguments array, but are not present in `opts.string`, `opts.boolean`, `opts.default`, or `opts.alias`.

```js
getopts(["-abc"], {
  unknown: option => "a" === option
}) //=> { _:[], a:true }
```

### `opts.stopEarly`

A boolean property. If true, the operands array `_` will be populated with all the arguments after the first non-option.

```js
getopts(["-w9", "alpha", "--turbo", "beta"], {
  stopEarly: true
}) //=> { _:["alpha", "--turbo", "beta"], w:9 }
```

This property is useful when implementing sub-commands in a CLI.

```js
const { install, update, uninstall } = require("./commands")

const options = getopts(process.argv.slice(2), {
  stopEarly: true
})

const [command, subargs] = options._

if (command === "install") {
  install(subargs)
} else if (command === "update") {
  update(subargs)
} else if (command === "uninstall") {
  uninstall(subargs)
}
```

## Run the benchmarks

```
npm i -C bench && node bench
```

<pre>
getopts × 1,769,415 ops/sec
minimist × 314,240 ops/sec
yargs × 33,179 ops/sec
</pre>

## License

[MIT](LICENSE.md)
