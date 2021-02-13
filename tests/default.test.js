import { t, deepEqual } from "twist"
import getopts from "../index.js"

export default [
  t("opts.default", [
    t("do nothing when all default options are in argv", [
      deepEqual(
        getopts(["-abc"], {
          default: {
            a: 1,
            b: 2,
            c: 3,
          },
        }),
        {
          _: [],
          a: true,
          b: true,
          c: true,
        }
      ),
    ]),
    t("apply values when no default options are in argv", [
      deepEqual(
        getopts(["-abc"], {
          default: {
            x: true,
            y: true,
            z: true,
          },
        }),
        {
          _: [],
          a: true,
          b: true,
          c: true,
          x: true,
          y: true,
          z: true,
        }
      ),
    ]),
    t("with aliases", [
      deepEqual(
        getopts([], {
          alias: {
            a: "A",
            b: "B",
            c: "C",
          },
          default: {
            a: true,
            B: true,
          },
        }),
        {
          _: [],
          a: true,
          A: true,
          b: true,
          B: true,
        }
      ),
    ]),
  ]),
]
