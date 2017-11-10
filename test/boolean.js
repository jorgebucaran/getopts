const test = require("tape")
const getopts = require("../")

test("opts.boolean", t => {
  t.plan(2)

  const booleans = ['c', 'D', 'e', 'boolean']
  t.deepEqual(
    getopts(["-abC", "operand", "--boolean", "operand"], {
      alias: {
        A: "a",
        b: "B",
        c: "C",
      },
      boolean: booleans
    }),
    {
      _: ["operand", "operand"],
      a: true,
      A: true,
      b: true,
      B: true,
      c: true,
      C: true,
      boolean: true
    }
  )

  t.deepEqual(
    getopts(['-a1', '--boolean=2'], {
      boolean: ['a', 'boolean']
    }),
    {
      _: [],
      a: '1',
      boolean: '2'
    }
  )
})
