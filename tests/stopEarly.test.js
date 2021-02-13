const Parse = require("./Parse").Parse

exports.default = {
  stopEarly: [
    {
      name: "stops parsing after first non-option",
      argv: ["-abc", "foo", "bam", "-xyz"],
      opts: { stopEarly: true },
      expected: {
        _: ["bam", "-xyz"],
        a: true,
        b: true,
        c: "foo"
      }
    },
    {
      name: "stops parsing after first non-option (using opts.boolean)",
      argv: ["-abc", "foo", "bam", "-xyz"],
      opts: { stopEarly: true, boolean: ["c"] },
      expected: {
        _: ["foo", "bam", "-xyz"],
        a: true,
        b: true,
        c: true
      }
    },
    {
      name: "stops parsing after first non-option (using opts.string)",
      argv: ["-abc", "foo", "bam", "-xyz"],
      opts: { stopEarly: true, string: ["a"] },
      expected: {
        _: ["foo", "bam", "-xyz"],
        a: "bc"
      }
    },
    {
      name: "does not remove double dashes",
      argv: ["foo", "bam", "--", "-xyz", "--"],
      opts: { stopEarly: true },
      expected: {
        _: ["foo", "bam", "--", "-xyz", "--"]
      }
    }
  ].map(Parse)
}
