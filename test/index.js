const parse = require("../dist/")
const test = require("tape")

test("end of opts", (t) => {
  t.deepEqual(parse.call(["--", "--foo", "bar"]), {
    _: ["--foo", "bar"]
  }, "double dash")

  t.deepEqual(parse.call(["-a", "--", "--foo", "bar"]), {
    a: true,
    _: ["--foo", "bar"]
  }, "single and double dash")

  t.deepEqual(parse.call(["--foo=bar", "baz", "--", "foo", "--foo"]), {
    foo: "bar",
    _: ["baz", "foo", "--foo"]
  }, "double, bare and double dash")

  t.end()
})

test("bares", (t) => {
  t.deepEqual(parse.call(["beer"]), {
    _: ["beer"]
  }, "only bare")

  t.deepEqual(parse.call(["beer", "--foo"]), {
    foo: true,
    _: ["beer"]
  }, "bare first")

  t.deepEqual(parse.call(["bar", "beer", "--foo"]), {
    foo: true,
    _: ["bar", "beer"]
  }, "bare and bare")

  t.deepEqual(parse.call(["-ab42", "beer", "--foo", "--bar"]), {
    a: true,
    b: "42",
    foo: true,
    bar: true,
    _: ["beer"]
  }, "bare end of opts")

  t.end()
})

test("singles", (t) => {
  t.deepEqual(parse.call(["-foo42"]), {
    f: true,
    o: ["42", true],
  }, "only single")

  t.deepEqual(parse.call(["-abc", "-xyz"]), {
    a: true,
    b: true,
    c: true,
    x: true,
    y: true,
    z: true
  }, "single and single")

  t.deepEqual(parse.call(["-abc", "bar"]), {
    a: true,
    b: true,
    c: "bar",
  }, "single and bare")

  t.deepEqual(parse.call(["-a", "bar"]), {
    a: "bar"
  }, "single and value")

  t.deepEqual(parse.call(["-abc./", "bar"]), {
    a: true,
    b: true,
    c: "./",
    _: ["bar"]
  }, "single w/ value and bare")

  t.deepEqual(parse.call(["-abc", "--foo"]), {
    a: true,
    b: true,
    c: true,
    foo: true
  }, "single and double")

  t.end()
})

test("doubles", (t) => {
  t.deepEqual(parse.call(["--foo"]), {
    foo: true
  }, "double")

  t.deepEqual(parse.call(["--foo=bar"]), {
    foo: "bar"
  }, "double w/ value")

  t.deepEqual(parse.call(["--foo=bar", "--bar=foo"]), {
    foo: "bar",
    bar: "foo"
  }, "double w/ value group")

  t.deepEqual(parse.call(["--foo=bar", "beer"]), {
    foo: "bar",
    _: ["beer"]
  }, "double w/ value and bare")

  t.deepEqual(parse.call(["--foo", "--bar"]), {
    foo: true,
    bar: true
  }, "double double")

  t.deepEqual(parse.call(["--foo-bar-baz"]), {
    "foo-bar-baz": true
  }, "double w/ inner dashes")

  t.deepEqual(parse.call(["--foo", "-abc"]), {
    foo: true,
    a: true,
    b: true,
    c: true
  }, "double and single")

  t.end()
})

test("aliases", (t) => {
  t.deepEqual(parse.call(["-f"], "foo"), {
    f: true,
    foo: true
  }, "single w/ alias")

  t.deepEqual(parse.call(["-f", "bar"], "foo"), {
    f: "bar",
    foo: "bar"
  }, "single and value w/ alias")

  t.deepEqual(parse.call(["--foo"], "foo"), {
    f: true,
    foo: true
  }, "double w/ alias")

  t.deepEqual(parse.call(["foo"], "foo"), {
    f: false,
    foo: false,
    _: ["foo"]
  }, "bare w/ alias")

  t.deepEqual(parse.call(["-xf"], "foo", "bar"), {
    x: true,
    f: true,
    foo: true,
    b: false,
    bar: false
  }, "missing alias for option")

  t.deepEqual(parse.call(["-xf"], "foo", ["bar"]), {
    x: true,
    f: true,
    foo: true,
    bar: false
  }, "missing option w/o short alias")

  t.deepEqual(parse.call(["-x"], ["bar", "beer"]), {
    x: true,
    bar: false,
    beer: false
  }, "missing option w/ multiple aliases")

  t.deepEqual(parse.call(["-x"], ["bar", "beer", { default: "." }]), {
    x: true,
    bar: ".",
    beer: "."
  }, "missing option w/ default values")

  t.deepEqual(parse.call(["-f"], ["f", { default: "." }]), {
    f: "."
  }, "option w/ missing value and default type")

  t.deepEqual(parse.call(["-f"], ["f", { default: false }]), {
    f: true
  }, "option w/ alias and type match")

  t.deepEqual(parse.call(["--foo"], ["_", "operands"]), {
    foo: true,
    _: false,
    operands: false
  }, "operands alias")

  t.end()
})

test("no flags", (t) => {
  t.deepEqual(parse.call(["--no-foo"]), {
    foo: false
  }, "single no-flag")

  t.deepEqual(parse.call(["--no-foo=bar"]), {
    "no-foo": "bar",
  }, "invalid no-flag")

  t.deepEqual(parse.call(["--no-foo", "bar"]), {
    foo: false,
    _: ["bar"]
  }, "invalid no-flag")

  t.deepEqual(parse.call(["--no-foo", "--foo"], ["no-foo", "N"], ["foo", "F"]), {
    foo: true,
    F: true,
    "no-foo": false,
    "N": false
  }, "no-flag w/ aliases")

  t.end()
})

test("invalid options", (t) => {
  parse.call(["-a", "--bar"], "a", ["b", "bar"], _ => t.ok(false))
  t.ok(true, "ignore callback if all options are good")

  parse.call(["-a"], "b", "c", (unknown) => {
    t.equal(unknown, "a", "invoke callback with bad options")
  })
  t.end()
})

test("edge cases", (t) => {
  t.deepEqual(parse.call(["-f", ""], "foo"), {
    foo: "",
    f: ""
  }, "single and empty string")

  t.deepEqual(parse.call(["--foo", ""], "foo"), {
    foo: "",
    f: ""
  }, "double and empty string")

  t.end()
})
