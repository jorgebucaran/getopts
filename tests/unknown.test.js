import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("opts.unknown", [
    t("return true/false to accept/dismiss option if not in argv", [
      deepEqual(
        getopts(["-AbCdEfG"], {
          unknown: (opt) => opt === opt.toUpperCase(),
        }),
        {
          _: [],
          A: true,
          C: true,
          E: true,
          G: true,
        }
      ),
    ]),
    t("don't dismiss known options via opts.default", [
      deepEqual(
        getopts(["-abcdefg", "--foo"], {
          default: {
            a: "A",
            foo: "Foo",
          },
          unknown: () => false,
        }),
        {
          _: [],
          a: true,
          foo: true,
        }
      ),
    ]),
    t("don't dismiss known options via opts.boolean", [
      deepEqual(
        getopts(["-abcdefg"], {
          boolean: ["a"],
          unknown: () => false,
        }),
        {
          _: [],
          a: true,
        }
      ),
    ]),
    t("don't dismiss known options via opts.string", [
      deepEqual(
        getopts(["-abc"], {
          string: ["b"],
          unknown: () => false,
        }),
        {
          _: [],
          b: "c",
        }
      ),
    ]),
    t("don't dismiss known options via opts.alias", [
      deepEqual(
        getopts(["-abcdefg/home"], {
          alias: { a: "A", g: "G" },
          unknown: () => false,
        }),
        {
          _: [],
          a: true,
          A: true,
          g: "/home",
          G: "/home",
        }
      ),
    ]),
  ]),
]
