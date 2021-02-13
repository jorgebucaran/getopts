import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("opts.string", [
    t("with short options", [
      deepEqual(
        getopts(["-a001", "-b001", "-c", ".5", "-d", ".5", "-x-1"], {
          string: ["a", "c", "x"],
        }),
        {
          _: [],
          a: "001",
          b: 1,
          c: ".5",
          d: 0.5,
          x: "-1",
        }
      ),
    ]),

    t("clustered", [
      t("short options (string)", [
        deepEqual(
          getopts(["-abc", "foo"], {
            string: ["b"],
          }),
          {
            _: ["foo"],
            a: true,
            b: "c",
          }
        ),
      ]),
      t("short options with implicit value (string)", [
        deepEqual(
          getopts(["-abc001", "foo"], {
            string: ["b"],
          }),
          {
            _: ["foo"],
            a: true,
            b: "c001",
          }
        ),
      ]),
    ]),

    t("with long options", [
      deepEqual(
        getopts(["--foo=001", "--bar=001", "--baz", ".5", "--fum"], {
          string: ["foo", "baz", "fum"],
        }),
        {
          _: [],
          foo: "001",
          bar: 1,
          baz: ".5",
          fum: "",
        }
      ),
    ]),

    t("with repeating options", [
      deepEqual(
        getopts(["-ab", "-ax", "--foo=0101", "--foo=0011"], {
          string: ["a", "foo"],
        }),
        {
          _: [],
          a: ["b", "x"],
          foo: ["0101", "0011"],
        }
      ),
    ]),

    t("with mixed string/non-string short options", [
      deepEqual(
        getopts(["-Aa", "-Bb05", "-Cc", "010", "-d"], {
          string: ["a", "b", "c", "d"],
        }),
        {
          _: [],
          A: true,
          a: "",
          B: true,
          b: "05",
          C: true,
          c: "010",
          d: "",
        }
      ),
    ]),

    t("have a default value when not in argv", [
      deepEqual(
        getopts([], {
          string: ["foo", "bar"],
        }),
        {
          _: [],
          foo: "",
          bar: "",
        }
      ),
    ]),
    t("with aliases", [
      deepEqual(
        getopts(["--foo", "01", "-b", "02"], {
          string: ["f", "b"],
          alias: {
            foo: "f",
            bar: "b",
          },
        }),
        {
          _: [],
          f: "01",
          foo: "01",
          b: "02",
          bar: "02",
        }
      ),
    ]),
    t("explicit 'false' is not cast to boolean", [
      deepEqual(
        getopts(["-afalse", "--foo=false"], {
          string: ["a", "foo"],
        }),
        {
          _: [],
          a: "false",
          foo: "false",
        }
      ),
    ]),
  ]),
]
