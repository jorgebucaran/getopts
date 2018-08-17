const { Suite } = require("benchmark")

console.log(`# Load Time`)

console.time("mri")
const mri = require("mri")
console.timeEnd("mri")

console.time("yargs")
const yargs = require("yargs-parser")
console.timeEnd("yargs")

console.time("getopts")
const getopts = require("..")
console.timeEnd("getopts")

console.time("minimist")
const minimist = require("minimist")
console.timeEnd("minimist")

const argv = ["--super=8", "--no-slack", "-au9000", "--", "game", "over"]

console.log(`\n# Parse Time`)
new Suite()
  .on("cycle", ({ target: { name, hz } }) =>
    console.log(`${name} × ${Math.floor(hz).toLocaleString()} ops/sec`)
  )
  .add("mri", () => mri(argv))
  .add("yargs", () => yargs(argv))
  .add("getopts", () => getopts(argv))
  .add("minimist", () => minimist(argv))
  .run()
