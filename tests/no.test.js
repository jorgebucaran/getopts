import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("--no-* options", [
    t("are always false", [
      deepEqual(
        getopts(["--no-foo", "--no-bar=true", "--no-baz=0", "--no-fum", "bam"]),
        {
          _: ["bam"],
          foo: false,
          bar: false,
          baz: false,
          fum: false,
        }
      ),
    ]),
    t("can't be cast to strings", [
      deepEqual(
        getopts(["--no-foo", "--no-bar=baz"], {
          string: ["foo", "bar"],
        }),
        {
          _: [],
          foo: false,
          bar: false,
        }
      ),
    ]),
    t("can be aliased", [
      deepEqual(
        getopts(["--no-foo"], {
          alias: {
            foo: "f",
          },
        }),
        {
          _: [],
          foo: false,
          f: false,
        }
      ),
    ]),
  ]),
]
