const Parse = require("./Parse").Parse

exports.default = {
  "opts.unknown": [
    {
      name: "return true/false to accept/dismiss option if not in argv",
      argv: ["-AbCdEfG"],
      opts: {
        unknown: opt => opt === opt.toUpperCase()
      },
      expected: {
        _: [],
        A: true,
        C: true,
        E: true,
        G: true
      }
    },
    {
      name: "don't dismiss known options via opts.default",
      argv: ["-abcdefg", "--foo"],
      opts: {
        default: {
          a: "A",
          foo: "Foo"
        },
        unknown: () => false
      },
      expected: {
        _: [],
        a: true,
        foo: true
      }
    },
    {
      name: "don't dismiss known options via opts.boolean",
      argv: ["-abcdefg"],
      opts: {
        boolean: ["a"],
        unknown: () => false
      },
      expected: {
        _: [],
        a: true
      }
    },
    {
      name: "don't dismiss known options via opts.string",
      argv: ["-abc"],
      opts: {
        string: ["b"],
        unknown: () => false
      },
      expected: {
        _: [],
        b: "c"
      }
    },
    {
      name: "don't dismiss known options via opts.alias",
      argv: ["-abcdefg/home"],
      opts: {
        alias: { a: "A", g: "G" },
        unknown: () => false
      },
      expected: {
        _: [],
        a: true,
        A: true,
        g: "/home",
        G: "/home"
      }
    }
  ].map(Parse)
}
