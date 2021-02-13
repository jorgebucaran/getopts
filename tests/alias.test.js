const Parse = require("./Parse").Parse

exports.default = {
  aliases: [
    {
      name: "short",
      argv: ["-ab", "foo"],
      opts: {
        alias: {
          a: "A",
          b: ["B", "X"]
        }
      },
      expected: {
        _: [],
        a: true,
        A: true,
        b: "foo",
        B: "foo",
        X: "foo"
      }
    },
    {
      name: "long",
      argv: ["--foo", "bar", "--baz=fum"],
      opts: {
        alias: {
          foo: "f",
          baz: "b"
        }
      },
      expected: {
        _: [],
        f: "bar",
        foo: "bar",
        b: "fum",
        baz: "fum"
      }
    },
    {
      name: "jumbled aliases",
      argv: ["--foo", "bar", "--baz=fum", "--bam=qux"],
      opts: {
        alias: {
          f: ["F", "foo"],
          b: ["B", "baz", "bam"]
        }
      },
      expected: {
        _: [],
        f: "bar",
        F: "bar",
        foo: "bar",
        b: ["fum", "qux"],
        B: ["fum", "qux"],
        baz: ["fum", "qux"],
        bam: ["fum", "qux"]
      }
    },
    {
      name: "single alias as string",
      argv: ["-fb"],
      opts: {
        alias: {
          f: "foo",
          b: "bar"
        }
      },
      expected: {
        _: [],
        f: true,
        b: true,
        foo: true,
        bar: true
      }
    }
  ].map(Parse)
}
