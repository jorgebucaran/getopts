import bench from "benchmark"
import getopts from "../index.js"
import minimist from "minimist"
import yargs from "yargs-parser"
import mri from "mri"

const runBenchmark = (test, modules) =>
  Object.keys(modules)
    .reduce(
      (suite, name) => suite.add(name, () => test(modules[name], name)),
      new bench.Suite().on("cycle", ({ target: { name, hz } }) =>
        console.log(`${name} × ${Math.floor(hz).toLocaleString()} ops/sec`)
      )
    )
    .run()

runBenchmark(
  (parse) =>
    parse(["--turbo", "--no-slack", "-xyz1000", "--", "alpha", "beta"]),
  {
    getopts,
    minimist,
    yargs,
    mri,
  }
)
