const test = require("tape")
const getopts = require("../")

test("opts.default", t => {
  t.plan(1)

  t.deepEqual(
    getopts(["-abC"], {
      alias: {
        A: "a",
        b: "B",
        c: "C",
        d: "D",
        E: ["e", "eek", "eh"]
      },
      default: {
        c: true,
        D: true,
        e: false
      }
    }),
    {
      _: [],
      a: true,
      A: true,
      b: true,
      B: true,
      c: true,
      C: true,
      d: true,
      D: true,
      e: false,
      E: false,
      eek: false,
      eh: false
    }
  )
})
