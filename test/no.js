const test = require("tape")
const getopts = require("..")

test("no", t => {
  t.plan(4)

  t.deepEqual(getopts(["--no-foo"]), {
    foo: false,
    _: []
  })

  t.deepEqual(getopts(["--no-foo", "bar"]), {
    foo: false,
    _: ["bar"]
  })

  t.deepEqual(getopts(["--no-foo", "--bar"]), {
    foo: false,
    bar: true,
    _: []
  })

  t.deepEqual(getopts(["--no-foo=bar"]), {
    "no-foo": "bar",
    _: []
  })
})
