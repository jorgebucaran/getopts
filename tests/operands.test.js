const Parse = require("./Parse").Parse

exports.default = {
  operands: [
    {
      name: "standalone arguments",
      argv: ["foo", "bar", "baz"],
      expected: {
        _: ["foo", "bar", "baz"]
      }
    },
    {
      name: "double dash (end of options)",
      argv: ["foo", "--", "bar", "-abc", "--baz", "fum"],
      expected: {
        _: ["foo", "bar", "-abc", "--baz", "fum"]
      }
    },
    {
      name: "ignore the first double dash",
      argv: ["--"],
      expected: {
        _: []
      }
    },
    {
      name: "don't ignore any subsequent double dash",
      argv: ["--", "--"],
      expected: {
        _: ["--"]
      }
    },
    {
      name: "standalone single dash operand (stdin)",
      argv: ["--foo", "-", "bar"],
      expected: {
        _: ["-", "bar"],
        foo: true
      }
    },
    {
      name: "empty spaces and standalone special characters",
      argv: [" ", " ", "foo\nbar", "\n\tbaz\tfum\tbam\n"],
      expected: {
        _: [" ", " ", "foo\nbar", "\n\tbaz\tfum\tbam\n"]
      }
    }
  ].map(Parse)
}
