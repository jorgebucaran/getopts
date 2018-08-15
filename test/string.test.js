const Parse = require("./Parse").Parse

exports.default = {
  "opts.string": [
    {
      name: "with short options",
      argv: ["-a001", "-b001", "-c", ".5", "-d", ".5", "-x-1"],
      opts: {
        string: ["a", "c", "x"]
      },
      expected: {
        _: [],
        a: "001",
        b: 1,
        c: ".5",
        d: 0.5,
        x: "-1"
      }
    },
    {
      name: "with clustered short options (string)",
      argv: ["-abc", "foo"],
      opts: {
        string: ["b"]
      },
      expected: {
        _: ["foo"],
        a: true,
        b: "c"
      }
    },
    {
      name: "with clustered short options with implicit value (string)",
      argv: ["-abc001", "foo"],
      opts: {
        string: ["b"]
      },
      expected: {
        _: ["foo"],
        a: true,
        b: "c001"
      }
    },
    {
      name: "with long options",
      argv: ["--foo=001", "--bar=001", "--baz", ".5", "--fum"],
      opts: {
        string: ["foo", "baz", "fum"]
      },
      expected: {
        _: [],
        foo: "001",
        bar: 1,
        baz: ".5",
        fum: ""
      }
    },
    {
      name: "with repeating options",
      argv: ["-ab", "-ax", "--foo=0101", "--foo=0011"],
      opts: {
        string: ["a", "foo"]
      },
      expected: {
        _: [],
        a: ["b", "x"],
        foo: ["0101", "0011"]
      }
    },
    {
      name: "with mixed string/non-string short options",
      argv: ["-Aa", "-Bb05", "-Cc", "010", "-d"],
      opts: {
        string: ["a", "b", "c", "d"]
      },
      expected: {
        _: [],
        A: true,
        a: "",
        B: true,
        b: "05",
        C: true,
        c: "010",
        d: ""
      }
    },
    {
      name: "have a default value when not in argv",
      argv: [],
      opts: {
        string: ["foo", "bar"]
      },
      expected: {
        _: [],
        foo: "",
        bar: ""
      }
    },
    {
      name: "with aliases",
      argv: ["--foo", "01", "-b", "02"],
      opts: {
        string: ["f", "b"],
        alias: {
          foo: "f",
          bar: "b"
        }
      },
      expected: {
        _: [],
        f: "01",
        foo: "01",
        b: "02",
        bar: "02"
      }
    },
    {
      name: "explicit 'false' is not cast to boolean",
      argv: ["-afalse", "--foo=false"],
      opts: {
        string: ["a", "foo"]
      },
      expected: {
        _: [],
        a: "false",
        foo: "false"
      }
    }
  ].map(Parse)
}
