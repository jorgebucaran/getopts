const Parse = require("./Parse").Parse

exports.default = {
  "opts.default": [
    {
      name: "do nothing when all default options are in argv",
      argv: ["-abc"],
      opts: {
        default: {
          a: 1,
          b: 2,
          c: 3
        }
      },
      expected: {
        _: [],
        a: true,
        b: true,
        c: true
      }
    },
    {
      name: "apply values when no default options are in argv",
      argv: ["-abc"],
      opts: {
        default: {
          x: true,
          y: true,
          z: true
        }
      },
      expected: {
        _: [],
        a: true,
        b: true,
        c: true,
        x: true,
        y: true,
        z: true
      }
    },
    {
      name: "with aliases",
      argv: [],
      opts: {
        alias: {
          a: "A",
          b: "B",
          c: "C"
        },
        default: {
          a: true,
          B: true
        }
      },
      expected: {
        _: [],
        a: true,
        A: true,
        b: true,
        B: true
      }
    }
  ].map(Parse)
}
