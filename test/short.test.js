const Parse = require("./Parse").Parse

exports.default = {
  "short options": [
    {
      name: "without a value (boolean)",
      argv: ["-a", "-b", "-c"],
      expected: {
        _: [],
        a: true,
        b: true,
        c: true
      }
    },
    {
      name: "with implicit and explicit values",
      argv: ["-a", "1", "-b2", "-c", "three"],
      expected: {
        _: [],
        a: 1,
        b: 2,
        c: "three"
      }
    },
    {
      name: "clustered",
      argv: ["-abc", "-xyz", "foo", "bar", "-p..", "-q.5"],
      expected: {
        _: ["bar"],
        a: true,
        b: true,
        c: true,
        x: true,
        y: true,
        z: "foo",
        p: "..",
        q: 0.5
      }
    },
    {
      name: "repeating",
      argv: ["-aa", "-bb", "-cc"],
      expected: {
        _: [],
        a: [true, true],
        b: [true, true],
        c: [true, true]
      }
    },
    {
      name: "repeating in disparate order",
      argv: ["-abcd", "-dcba", "-cadb"],
      expected: {
        _: [],
        a: [true, true, true],
        b: [true, true, true],
        c: [true, true, true],
        d: [true, true, true]
      }
    },
    {
      name: "with mixed boolean, string and numerical values",
      argv: ["-abb", "-c3.141592", "foo", "-dde", "bar", "-x", "-z"],
      expected: {
        _: ["foo"],
        a: true,
        b: [true, true],
        c: 3.141592,
        d: [true, true],
        e: "bar",
        x: true,
        z: true
      }
    },
    {
      name: "with non-alphabetic characters",
      argv: ["-abc$100.00", "-x~/@user", "-y2k", "-z-0"],
      expected: {
        _: [],
        a: true,
        b: true,
        c: "$100.00",
        x: "~/@user",
        y: "2k",
        z: 0
      }
    },
    {
      name: "with special characters",
      argv: ["-f", "foo\nbar\nbaz\tfum"],
      expected: {
        _: [],
        f: "foo\nbar\nbaz\tfum"
      }
    }
  ].map(Parse)
}
