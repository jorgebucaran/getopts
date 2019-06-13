const Parse = require("./Parse").Parse

exports.default = {
  "opts.array": [
    {
      name: "with short options",
      argv: ["-a1", "-b2", "-c1.5", "-c", "2.5", "-doh", "-d", "k"],
      opts: {
        string: ["d"],
        array: ["a", "d"]
      },
      expected: {
        _: [],
        a: [1],
        b: 2,
        c: [1.5, 2.5],
        d: ["oh", "k"]
      }
    },
    {
      name: "with long options",
      argv: ["--foo=001", "--bar=001", "--bar", ".5", "--baz"],
      opts: {
        array: ["foo", "bar"]
      },
      expected: {
        _: [],
        foo: [1],
        bar: [1, .5],
        baz: true
      }
    }
  ].map(Parse)
}
