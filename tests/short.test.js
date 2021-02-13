import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("short options", [
    t("without a value (boolean)", [
      deepEqual(getopts(["-a", "-b", "-c"]), {
        _: [],
        a: true,
        b: true,
        c: true,
      }),
    ]),
    t("with implicit and explicit values", [
      deepEqual(getopts(["-a", "1", "-b2", "-c", "three"]), {
        _: [],
        a: 1,
        b: 2,
        c: "three",
      }),
    ]),
    t("clustered", [
      deepEqual(getopts(["-abc", "-xyz", "foo", "bar", "-p..", "-q.5"]), {
        _: ["bar"],
        a: true,
        b: true,
        c: true,
        x: true,
        y: true,
        z: "foo",
        p: "..",
        q: 0.5,
      }),
    ]),
    t("repeating", [
      deepEqual(getopts(["-aa", "-bb", "-cc"]), {
        _: [],
        a: [true, true],
        b: [true, true],
        c: [true, true],
      }),
    ]),
    t("repeating in disparate order", [
      deepEqual(getopts(["-abcd", "-dcba", "-cadb"]), {
        _: [],
        a: [true, true, true],
        b: [true, true, true],
        c: [true, true, true],
        d: [true, true, true],
      }),
    ]),
    t("with mixed boolean, string and numerical values", [
      deepEqual(
        getopts(["-abb", "-c3.141592", "foo", "-dde", "bar", "-x", "-z"]),
        {
          _: ["foo"],
          a: true,
          b: [true, true],
          c: 3.141592,
          d: [true, true],
          e: "bar",
          x: true,
          z: true,
        }
      ),
    ]),
    t("with non-alphabetic characters", [
      deepEqual(getopts(["-abc$100.00", "-x~/@user", "-y2k", "-z-0"]), {
        _: [],
        a: true,
        b: true,
        c: "$100.00",
        x: "~/@user",
        y: "2k",
        z: -0,
      }),
    ]),
    t("with special characters", [
      deepEqual(getopts(["-f", "foo\nbar\nbaz\tfum"]), {
        _: [],
        f: "foo\nbar\nbaz\tfum",
      }),
    ]),
  ]),
]
