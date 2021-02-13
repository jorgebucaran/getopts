const Parse = require("./Parse").Parse

exports.default = {
  "long options": [
    {
      name: "without value (boolean)",
      argv: ["--foo"],
      expected: {
        _: [],
        foo: true
      }
    },
    {
      name: "boolean if it's the last argument",
      argv: ["--foo=bar", "--baz"],
      expected: {
        _: [],
        foo: "bar",
        baz: true
      }
    },
    {
      name: "boolean false if value is the string 'false'",
      argv: ["--foo=false"],
      expected: {
        _: [],
        foo: false
      }
    },
    {
      name: "cast to number or string with implicit value",
      argv: ["--foo", "001", "--bar", "baz"],
      expected: {
        _: [],
        foo: 1,
        bar: "baz"
      }
    },
    {
      name: "cast to number or string with explicit value",
      argv: ["--foo=001", "--bar=baz"],
      expected: {
        _: [],
        foo: 1,
        bar: "baz"
      }
    },
    {
      name: "name may be formed by any characters",
      argv: ["--foo", "01", "--bar=2", "--baz3", "--34m"],
      expected: {
        _: [],
        foo: 1,
        bar: 2,
        baz3: true,
        "34m": true
      }
    },
    {
      name: "split value after first =",
      argv: ["--foo=e=mc^2"],
      expected: {
        _: [],
        foo: "e=mc^2"
      }
    },
    {
      name: "with mixed boolean, string and numerical values",
      argv: ["--foo", "bar", "baz", "--fum", "--bam=pow", "--qux", "0.1"],
      expected: {
        _: ["baz"],
        foo: "bar",
        fum: true,
        bam: "pow",
        qux: 0.1
      }
    },
    {
      name: "with empty strings and other characters",
      argv: ["--foo=/foo/bar/baz", "foobar", "--fum=", "--bam=.99", "--pow=$"],
      expected: {
        _: ["foobar"],
        foo: "/foo/bar/baz",
        fum: "",
        bam: 0.99,
        pow: "$"
      }
    },
    {
      name: "with new lines",
      argv: ["--foobar=foo\nbar"],
      expected: {
        _: [],
        foobar: "foo\nbar"
      }
    },
    {
      name: "with special characters",
      argv: ["--@foo=bar", "----bg-color=red", "--=void"],
      expected: {
        _: [],
        "@foo": "bar",
        "--bg-color": "red",
        "": "void"
      }
    },
    {
      name: "whitespace",
      argv: ["--foo=bar bar bar", "--bar", "foo foo foo"],
      expected: {
        _: [],
        foo: "bar bar bar",
        bar: "foo foo foo",
      },
    }
  ].map(Parse)
}
