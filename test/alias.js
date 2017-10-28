const test = require("tape")
const getopts = require("../")

test("opts.alias", t => {
  t.plan(2)

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
})
