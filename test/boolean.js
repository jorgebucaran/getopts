const test = require("tape")
const getopts = require("../")

test("opts.boolean", t => {
  t.plan(2)

  t.deepEqual(
    getopts(["-abC", "foo", "--bool", "foo"], {
      alias: {
        A: "a",
        b: "B",
        c: "C"
      },
      boolean: ["c", "D", "e", "bool"]
    }),
    {
      _: ["foo", "foo"],
      a: true,
      A: true,
      b: true,
      B: true,
      c: true,
      C: true,
      bool: true
    }
  )

  t.deepEqual(
    getopts(["-a42", "--bool=1"], {
      boolean: ["a", "bool"]
    }),
    {
      _: [],
      a: "42",
      bool: "1"
    }
  )
})
