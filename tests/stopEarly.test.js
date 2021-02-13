import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("stopEarly", [
    t("stops parsing after first non-option", [
      deepEqual(getopts(["-abc", "foo", "bam", "-xyz"], { stopEarly: true }), {
        _: ["bam", "-xyz"],
        a: true,
        b: true,
        c: "foo",
      }),
    ]),
    t("stops parsing after first non-option (using opts.boolean)", [
      deepEqual(
        getopts(["-abc", "foo", "bam", "-xyz"], {
          stopEarly: true,
          boolean: ["c"],
        }),
        {
          _: ["foo", "bam", "-xyz"],
          a: true,
          b: true,
          c: true,
        }
      ),
    ]),
    t("stops parsing after first non-option (using opts.string)", [
      deepEqual(
        getopts(["-abc", "foo", "bam", "-xyz"], {
          stopEarly: true,
          string: ["a"],
        }),
        {
          _: ["foo", "bam", "-xyz"],
          a: "bc",
        }
      ),
    ]),
    t("does not remove double dashes", [
      deepEqual(
        getopts(["foo", "bam", "--", "-xyz", "--"], { stopEarly: true }),
        {
          _: ["foo", "bam", "--", "-xyz", "--"],
        }
      ),
    ]),
  ]),
]
