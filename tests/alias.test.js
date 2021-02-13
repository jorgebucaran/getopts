import getopts from "../index.js"
import { t, deepEqual } from "twist"

export default [
  t("aliases", [
    t("short", [
      deepEqual(
        getopts(["-ab", "foo"], {
          alias: {
            a: "A",
            b: ["B", "X"],
          },
        }),
        {
          _: [],
          a: true,
          A: true,
          b: "foo",
          B: "foo",
          X: "foo",
        }
      ),
    ]),
    t("long", [
      deepEqual(
        getopts(["--foo", "bar", "--baz=fum"], {
          alias: {
            foo: "f",
            baz: "b",
          },
        }),
        {
          _: [],
          f: "bar",
          foo: "bar",
          b: "fum",
          baz: "fum",
        }
      ),
    ]),
    t("jumbled aliases", [
      deepEqual(
        getopts(["--foo", "bar", "--baz=fum", "--bam=qux"], {
          alias: {
            f: ["F", "foo"],
            b: ["B", "baz", "bam"],
          },
        }),
        {
          _: [],
          f: "bar",
          F: "bar",
          foo: "bar",
          b: ["fum", "qux"],
          B: ["fum", "qux"],
          baz: ["fum", "qux"],
          bam: ["fum", "qux"],
        }
      ),
    ]),
    t("single alias as string", [
      deepEqual(
        getopts(["-fb"], {
          alias: {
            f: "foo",
            b: "bar",
          },
        }),
        {
          _: [],
          f: true,
          b: true,
          foo: true,
          bar: true,
        }
      ),
    ]),
  ]),
]
