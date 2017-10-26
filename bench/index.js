const { Suite } = require("benchmark")
const mri = require("mri")
const yargs = require("yargs-parser")
const getopts = require("../")
const minimist = require("minimist")

const args = ["-bmx", "--speed-limit=88mph", "--no-zip"]
var opts = {
  default:  {
    b: true,
    m: true,
    x: true
  }
}

const bench = new Suite()
bench
  .add("mri", () => mri(args))
  .add("yargs", () => yargs(args))
  .add("getopts", () => getopts(args))
  .add("minimist", () => minimist(args))
  .on("cycle", e => console.log(`${e.target}`))
  .on("complete", function() {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`)
  })
  .run()
