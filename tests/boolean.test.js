import { t, deepEqual } from "twist"
import getopts from "../index.js"

export default [
  t("opts.boolean", [
    t("treat next argument as operand", [
      t("short options", [
        deepEqual(
          getopts(["-a", "foo", "-b0101"], {
            boolean: ["a", "b"],
          }),
          {
            _: ["foo"],
            a: true,
            b: true,
          }
        ),
      ]),
      t("long options", [
        deepEqual(
          getopts(["--foo=bar", "--baz", "fum"], {
            boolean: ["foo", "baz"],
          }),
          {
            _: ["fum"],
            foo: true,
            baz: true,
          }
        ),
      ]),
    ]),
    t("with jumbled aliases", [
      deepEqual(
        getopts(["-a", "foo", "-b", "bar"], {
          alias: {
            a: "A",
            b: "B",
          },
          boolean: ["A", "B"],
        }),
        {
          _: ["foo", "bar"],
          a: true,
          A: true,
          b: true,
          B: true,
        }
      ),
    ]),
    t("have a default value when not in argv", [
      deepEqual(
        getopts([], {
          boolean: ["foo", "bar"],
        }),
        {
          _: [],
          foo: false,
          bar: false,
        }
      ),
    ]),
  ]),
]
