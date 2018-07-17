const test = require("tape")
const getopts = require("..")

test("opts.unknown", t => {
  t.plan(3)

  t.deepEqual(
    getopts(["-abC"], {
      alias: {
        a: "A"
      },
      unknown: option => option === "C"
    }),
    {
      _: [],
      a: true,
      A: true,
      C: true
    }
  )

  t.deepEqual(
    getopts(["-abC"], {
      default: {
        a: "A"
      },
      unknown: option => false
    }),
    {
      _: [],
      a: true
    }
  )

  t.deepEqual(
    getopts(["-abC"], {
      boolean: ["a"],
      unknown: option => false
    }),
    {
      _: [],
      a: true
    }
  )
})
