import { t, deepEqual } from "twist"
import getopts from "../index.js"

export default [
  t("long options", [
    t("without value (boolean)", [
      deepEqual(getopts(["--foo"]), {
        _: [],
        foo: true,
      }),
    ]),
    t("boolean if it's the last argument", [
      deepEqual(getopts(["--foo=bar", "--baz"]), {
        _: [],
        foo: "bar",
        baz: true,
      }),
    ]),
    t("boolean false if value is the string 'false'", [
      deepEqual(getopts(["--foo=false"]), {
        _: [],
        foo: false,
      }),
    ]),
    t("cast to number or string with implicit value", [
      deepEqual(getopts(["--foo", "001", "--bar", "baz"]), {
        _: [],
        foo: 1,
        bar: "baz",
      }),
    ]),
    t("cast to number or string with explicit value", [
      deepEqual(getopts(["--foo=001", "--bar=baz"]), {
        _: [],
        foo: 1,
        bar: "baz",
      }),
    ]),
    t("name may be formed by any characters", [
      deepEqual(getopts(["--foo", "01", "--bar=2", "--baz3", "--34m"]), {
        _: [],
        foo: 1,
        bar: 2,
        baz3: true,
        "34m": true,
      }),
    ]),
    t("split value after first =", [
      deepEqual(getopts(["--foo=e=mc^2"]), {
        _: [],
        foo: "e=mc^2",
      }),
    ]),
    t("with mixed boolean, string and numerical values", [
      deepEqual(
        getopts(["--foo", "bar", "baz", "--fum", "--bam=pow", "--qux", "0.1"]),
        {
          _: ["baz"],
          foo: "bar",
          fum: true,
          bam: "pow",
          qux: 0.1,
        }
      ),
    ]),
    t("with empty strings and other characters", [
      deepEqual(
        getopts([
          "--foo=/foo/bar/baz",
          "foobar",
          "--fum=",
          "--bam=.99",
          "--pow=$",
        ]),
        {
          _: ["foobar"],
          foo: "/foo/bar/baz",
          fum: "",
          bam: 0.99,
          pow: "$",
        }
      ),
    ]),
    t("with new lines", [
      deepEqual(getopts(["--foobar=foo\nbar"]), {
        _: [],
        foobar: "foo\nbar",
      }),
    ]),
    t("with special characters", [
      deepEqual(getopts(["--@foo=bar", "----bg-color=red", "--=void"]), {
        _: [],
        "@foo": "bar",
        "--bg-color": "red",
        "": "void",
      }),
    ]),
    t("whitespace", [
      deepEqual(getopts(["--foo=bar bar bar", "--bar", "foo foo foo"]), {
        _: [],
        foo: "bar bar bar",
        bar: "foo foo foo",
      }),
    ]),
  ]),
]
