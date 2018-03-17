const { Suite } = require("benchmark")
const mri = require("mri")
const yargs = require("yargs-parser")
const getopts = require("../")
const minimist = require("minimist")

const argv = ["--super=sonic", "--no-lock", "-xu9000", "--", "game", "over"]
const bench = new Suite()
bench
  .add("mri", () => mri(argv))
  .add("yargs", () => yargs(argv))
  .add("getopts", () => getopts(argv))
  .add("minimist", () => minimist(argv))
  .on("cycle", ({ target: { name, hz, stats } }) =>
    console.log(`${name} × ${Math.floor(hz).toLocaleString()} ops/sec`)
  )
  .on("complete", function() {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`)
  })
  .run()
