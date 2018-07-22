const test = require("tape")
const getopts = require("..")

test("short", t => {
  t.plan(10)

  t.deepEqual(getopts(["-a"]), {
    a: true,
    _: []
  })

  t.deepEqual(getopts(["-a", "-b"]), {
    a: true,
    b: true,
    _: []
  })

  t.deepEqual(getopts(["-a", "b"]), {
    a: "b",
    _: []
  })

  t.deepEqual(getopts(["-ab"]), {
    a: true,
    b: true,
    _: []
  })

  t.deepEqual(getopts(["-ab", "-c"]), {
    a: true,
    b: true,
    c: true,
    _: []
  })

  t.deepEqual(getopts(["-ab", "c"]), {
    a: true,
    b: "c",
    _: []
  })

  t.deepEqual(getopts(["-aa", "b"]), {
    a: [true, "b"],
    _: []
  })

  t.deepEqual(getopts(["-abcd", "-dcba", "-cadb"]), {
    a: [true, true, true],
    b: [true, true, true],
    c: [true, true, true],
    d: [true, true, true],
    _: []
  })

  t.deepEqual(getopts(["-abc$100.00", "-u~/@user"]), {
    a: true,
    b: true,
    c: "$100.00",
    u: "~/@user",
    _: []
  })

  t.deepEqual(getopts(["-f", "foo\nbar\nbaz"]), {
    f: "foo\nbar\nbaz",
    _: []
  })
})
