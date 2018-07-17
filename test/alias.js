const test = require("tape")
const getopts = require("..")

test("opts.alias", t => {
  t.plan(2)

  t.deepEqual(
    getopts(["-ab"], {
      alias: {
        a: "A",
        b: ["B", "bolt"]
      }
    }),
    {
      _: [],
      a: true,
      A: true,
      b: true,
      B: true,
      bolt: true
    }
  )

  t.deepEqual(
    getopts(["-ab", "--foobar=hoge"], {
      alias: {
        A: "a",
        b: "bolt",
        f: ["F", "foobar", "fooBar", "FooBar"]
      }
    }),
    {
      _: [],
      a: true,
      A: true,
      b: true,
      bolt: true,
      f: "hoge",
      F: "hoge",
      foobar: "hoge",
      fooBar: "hoge",
      FooBar: "hoge"
    }
  )
})
