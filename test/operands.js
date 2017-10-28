const test = require("tape")
const getopts = require("../")

test("operands", t => {
  t.plan(3)

  t.deepEqual(getopts(["foo", "bar"]), {
    _: ["foo", "bar"]
  })

  t.deepEqual(getopts(["--", "-bmx", "--foo=bar", "foo", "bar"]), {
    _: ["-bmx", "--foo=bar", "foo", "bar"]
  })

  t.deepEqual(getopts(["--"]), {
    _: []
  })
})
