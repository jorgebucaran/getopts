const Parse = require("./Parse").Parse

exports.default = {
  "opts.boolean": [
    {
      name: "cast short option to boolean / treat next argument as operand",
      argv: ["-a", "foo", "-b0101"],
      opts: {
        boolean: ["a", "b"]
      },
      expected: {
        _: ["foo"],
        a: true,
        b: true
      }
    },
    {
      name: "cast long option to boolean / treat next argument as operand",
      argv: ["--foo=bar", "--baz", "fum"],
      opts: {
        boolean: ["foo", "baz"]
      },
      expected: {
        _: ["fum"],
        foo: true,
        baz: true
      }
    },
    {
      name: "with jumbled aliases",
      argv: ["-a", "foo", "-b", "bar"],
      opts: {
        alias: {
          a: "A",
          b: "B"
        },
        boolean: ["A", "B"]
      },
      expected: {
        _: ["foo", "bar"],
        a: true,
        A: true,
        b: true,
        B: true
      }
    },
    {
      name: "have a default value when not in argv",
      argv: [],
      opts: {
        boolean: ["foo", "bar"]
      },
      expected: {
        _: [],
        foo: false,
        bar: false
      }
    }
  ].map(Parse)
}
