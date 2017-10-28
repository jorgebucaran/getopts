const { Suite } = require("benchmark")
const mri = require("mri")
const yargs = require("yargs-parser")
const getopts = require("../")
const minimist = require("minimist")

const args = ["--jet", "--mode=turbo", "-xfv1", "--", "game", "over"]
const opts = {
  default: {
    mode: "normal"
  }
}

const bench = new Suite()
bench
  .add("mri", () => mri(args, opts))
  .add("yargs", () => yargs(args, opts))
  .add("getopts", () => getopts(args, opts))
  .add("minimist", () => minimist(args, opts))
  .on("cycle", ({ target: { name, hz, stats } }) =>
    console.log(`${name} × ${Math.floor(hz).toLocaleString()} ops/sec`)
  )
  .on("complete", function() {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`)
  })
  .run()
