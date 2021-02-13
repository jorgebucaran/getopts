import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("operands", [
    t("standalone arguments", [
      deepEqual(getopts(["foo", "bar", "baz"]), {
        _: ["foo", "bar", "baz"],
      }),
    ]),
    t("double dash (end of options)", [
      deepEqual(getopts(["foo", "--", "bar", "-abc", "--baz", "fum"]), {
        _: ["foo", "bar", "-abc", "--baz", "fum"],
      }),
    ]),
    t("ignore the first double dash", [
      deepEqual(getopts(["--"]), {
        _: [],
      }),
    ]),
    t("don't ignore any subsequent double dash", [
      deepEqual(getopts(["--", "--"]), {
        _: ["--"],
      }),
    ]),
    t("standalone single dash operand (stdin)", [
      deepEqual(getopts(["--foo", "-", "bar"]), {
        _: ["-", "bar"],
        foo: true,
      }),
    ]),
    t("empty spaces and standalone special characters", [
      deepEqual(getopts([" ", " ", "foo\nbar", "\n\tbaz\tfum\tbam\n"]), {
        _: [" ", " ", "foo\nbar", "\n\tbaz\tfum\tbam\n"],
      }),
    ]),
  ]),
]
