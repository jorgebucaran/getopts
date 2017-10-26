const test = require("tape")
const getopts = require("./")

test("getopts", t => {
  t.deepEqual(getopts([]), {
    _: []
  })

  // short
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

  // long
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

  // no
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

  // operands
  t.deepEqual(getopts(["foo", "bar"]), {
    _: ["foo", "bar"]
  })

  t.deepEqual(getopts(["--", "-bmx", "--foo=bar", "foo", "bar"]), {
    _: ["-bmx", "--foo=bar", "foo", "bar"]
  })

  t.deepEqual(getopts(["--"]), {
    _: []
  })

  // opts.alias

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

  // opts.default

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

  // opts.unknown

  t.deepEqual(
    getopts(["-abC"], {
      alias: {
        a: "A"
      },
      unknown(option) {
        return option !== "C"
      }
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

//////////////////////// OLD TESTS //////////////////////

test("end of opts", t => {
  t.deepEqual(
    getopts(["--", "--foo", "bar"]),
    {
      _: ["--foo", "bar"]
    },
    "double dash"
  )

  t.deepEqual(
    getopts(["-a", "--", "--foo", "bar"]),
    {
      a: true,
      _: ["--foo", "bar"]
    },
    "single and double dash"
  )

  t.deepEqual(
    getopts(["--foo=bar", "baz", "--", "foo", "--foo"]),
    {
      foo: "bar",
      _: ["baz", "foo", "--foo"]
    },
    "double, bare and double dash"
  )

  t.end()
})

test("bares", t => {
  t.deepEqual(
    getopts(["beer"]),
    {
      _: ["beer"]
    },
    "only bare"
  )

  t.deepEqual(
    getopts(["beer", "--foo"]),
    {
      foo: true,
      _: ["beer"]
    },
    "bare first"
  )

  t.deepEqual(
    getopts(["bar", "beer", "--foo"]),
    {
      foo: true,
      _: ["bar", "beer"]
    },
    "bare and bare"
  )

  t.deepEqual(
    getopts(["foo", "bar", "baz", "quux"]),
    {
      _: ["foo", "bar", "baz", "quux"]
    },
    "bare sequence"
  )

  t.deepEqual(
    getopts(["-ab42", "beer", "--foo", "--bar"]),
    {
      a: true,
      b: "42",
      foo: true,
      bar: true,
      _: ["beer"]
    },
    "bare end of opts"
  )

  t.end()
})

test("singles", t => {
  t.deepEqual(
    getopts(["-foo42"]),
    {
      f: true,
      o: [true, "42"],
      _: []
    },
    "only single"
  )

  t.deepEqual(
    getopts(["-abc", "-xyz"]),
    {
      a: true,
      b: true,
      c: true,
      x: true,
      y: true,
      z: true,
      _: []
    },
    "single and single"
  )

  t.deepEqual(
    getopts(["-abc", "bar"]),
    {
      a: true,
      b: true,
      c: "bar",
      _: []
    },
    "single and bare"
  )

  t.deepEqual(
    getopts(["-a", "bar"]),
    {
      a: "bar",
      _: []
    },
    "single and value"
  )

  // t.deepEqual(getopts(["-af", "/"], ["f", "foo", { default: "." }]), {
  //   a: true,
  //   f: "/",
  //   foo: "/"
  // }, "single w/ value and default ")

  // t.deepEqual(getopts(["-af", "true"], ["f", "foo", {default: false}]), {
  //   a: true,
  //   f: true,
  //   foo: true
  // }, "single w/ value and default is boolean")

  // t.deepEqual(getopts(["-af", "/"], ["f", "foo", { default: true }]), {
  //   a: true,
  //   f: "/",
  //   foo: "/"
  // }, "single w/ value and default and type mismatch")

  t.deepEqual(
    getopts(["-abc./", "bar"]),
    {
      a: true,
      b: true,
      c: "./",
      _: ["bar"]
    },
    "single w/ value and bare"
  )

  t.deepEqual(
    getopts(["-abc", "--foo"]),
    {
      a: true,
      b: true,
      c: true,
      foo: true,
      _: []
    },
    "single and double"
  )

  t.end()
})

test("doubles", t => {
  t.deepEqual(
    getopts(["--foo"]),
    {
      foo: true,
      _: []
    },
    "double"
  )

  t.deepEqual(
    getopts(["--foo=bar"]),
    {
      foo: "bar",
      _: []
    },
    "double w/ value"
  )

  t.deepEqual(
    getopts(["--foo=bar", "--bar=foo"]),
    {
      foo: "bar",
      bar: "foo",
      _: []
    },
    "double w/ value group"
  )

  t.deepEqual(
    getopts(["--foo=bar", "beer"]),
    {
      foo: "bar",
      _: ["beer"]
    },
    "double w/ value and bare"
  )

  t.deepEqual(
    getopts(["--foo", "--bar"]),
    {
      foo: true,
      bar: true,
      _: []
    },
    "double double"
  )

  t.deepEqual(
    getopts(["--foo-bar-baz"]),
    {
      "foo-bar-baz": true,
      _: []
    },
    "double w/ inner dashes"
  )

  t.deepEqual(
    getopts(["--foo", "-abc"]),
    {
      foo: true,
      a: true,
      b: true,
      c: true,
      _: []
    },
    "double and single"
  )

  t.deepEqual(
    getopts(["--foo", "--bar", "--secret=42", "baz"]),
    {
      foo: true,
      bar: true,
      secret: "42",
      _: ["baz"]
    },
    "multiple double sequence"
  )

  t.deepEqual(
    getopts(["-foo", "--bar", "-bar", "norf", "baz", "quux"]),
    {
      f: true,
      o: [true, true],
      bar: true,
      b: true,
      a: true,
      r: "norf",
      _: ["baz", "quux"]
    },
    "single double single w/ remaining bares"
  )

  t.end()
})

test("no flags", t => {
  t.deepEqual(
    getopts(["--no-foo"]),
    {
      foo: false,
      _: []
    },
    "single no-flag"
  )

  t.deepEqual(
    getopts(["--no-foo=bar"]),
    {
      "no-foo": "bar",
      _: []
    },
    "invalid no-flag"
  )

  t.deepEqual(
    getopts(["--no-foo", "bar"]),
    {
      foo: false,
      _: ["bar"]
    },
    "invalid no-flag"
  )

  t.end()
})

// test("invalid options", (t) => {
//   getopts(["-a", "--bar"], "a", ["b", "bar"], _ => t.ok(false))
//   t.ok(true, "ignore callback if all options are good")

//   getopts(["-a"], "b", "c", (unknown) => {
//     t.equal(unknown, "a", "invoke callback with bad options")
//   })
//   t.end()
// })

test("comprehensive", t => {
  t.deepEqual(
    getopts([
      "--name=meowmers",
      "bare",
      "-cats",
      "woo",
      "-h",
      "awesome",
      "--multi=quux",
      "--key",
      "value",
      "-b",
      "--bool",
      "--no-meep",
      "--multi=baz",
      "--",
      "--not-a-flag",
      "eek"
    ]),
    {
      c: true,
      a: true,
      t: true,
      s: "woo",
      h: "awesome",
      b: true,
      bool: true,
      key: "value",
      multi: ["quux", "baz"],
      meep: false,
      name: "meowmers",
      _: ["bare", "--not-a-flag", "eek"]
    }
  )
  t.end()
})
