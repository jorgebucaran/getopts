const test = require("tape")
const getopts = require("../")

test("opts.unknown", t => {
  t.plan(2)

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
      alias: {
        a: "A"
      },
      unknown: option => {}
    }),
    {
      _: [],
      a: true,
      b: true,
      A: true,
      C: true
    }
  )
})
