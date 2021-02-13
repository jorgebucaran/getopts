const Parse = require("./Parse").Parse

exports.default = {
  "--no-* options": [
    {
      name: "are always false",
      argv: ["--no-foo", "--no-bar=true", "--no-baz=0", "--no-fum", "bam"],
      expected: {
        _: ["bam"],
        foo: false,
        bar: false,
        baz: false,
        fum: false
      }
    },
    {
      name: "can't be cast to strings",
      argv: ["--no-foo", "--no-bar=baz"],
      opts: {
        string: ["foo", "bar"]
      },
      expected: {
        _: [],
        foo: false,
        bar: false
      }
    },
    {
      name: "can be aliased",
      argv: ["--no-foo"],
      opts: {
        alias: {
          foo: "f"
        }
      },
      expected: {
        _: [],
        foo: false,
        f: false
      }
    }
  ].map(Parse)
}
