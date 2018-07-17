const test = require("tape")
const getopts = require("..")

test("long", t => {
  t.plan(6)

  t.deepEqual(getopts(["--foo=bar"]), {
    foo: "bar",
    _: []
  })

  t.deepEqual(getopts(["--foo", "bar"]), {
    foo: "bar",
    _: []
  })
  t.deepEqual(getopts(["--foo", "bar", "baz"]), {
    foo: "bar",
    _: ["baz"]
  })

  t.deepEqual(getopts(["--foo", "--bar"]), {
    foo: true,
    bar: true,
    _: []
  })

  t.deepEqual(getopts(["--foo", "--bar", "--baz"]), {
    foo: true,
    bar: true,
    baz: true,
    _: []
  })

  t.deepEqual(getopts(["--foo=/foo/bar/baz", "foobar"]), {
    foo: "/foo/bar/baz",
    _: ["foobar"]
  })
})
