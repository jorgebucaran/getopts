const test = require("tape")
const getopts = require("./")

test("short", t => {
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

  t.end()
})

test("long", t => {
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

  t.end()
})

test("no", t => {
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

  t.end()
})

test("operands", t => {
  t.deepEqual(getopts(["foo", "bar"]), {
    _: ["foo", "bar"]
  })

  t.deepEqual(getopts(["--", "-bmx", "--foo=bar", "foo", "bar"]), {
    _: ["-bmx", "--foo=bar", "foo", "bar"]
  })

  t.deepEqual(getopts(["--"]), {
    _: []
  })

  t.end()
})

test("opts.alias", t => {
  t.deepEqual(
    getopts(["-ab"], {
      alias: {
        a: "A",
        b: "B"
      }
    }),
    {
      _: [],
      a: true,
      A: true,
      b: true,
      B: true
    }
  )

  t.deepEqual(
    getopts(["-ab", "--foobar=hoge"], {
      alias: {
        A: "a",
        B: "b",
        f: ["F", "foobar", "fooBar", "FooBar"]
      }
    }),
    {
      _: [],
      a: true,
      A: true,
      b: true,
      B: true,
      f: "hoge",
      F: "hoge",
      foobar: "hoge",
      fooBar: "hoge",
      FooBar: "hoge"
    }
  )

  t.end()
})

test("opts.default", t => {
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

  t.end()
})

test("opts.unknown", t => {
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

  t.end()
})

test("edge cases", t => {
  t.deepEqual(getopts([]), {
    _: []
  })

  t.end()
})
