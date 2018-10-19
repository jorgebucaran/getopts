import getopts, { ParsedOptions, Options } from "getopts"

const options: Options = {
  alias: {
    w: "warp",
    t: "turbo"
  },
  boolean: ["turbo"],
  default: {
    turbo: true
  }
}

const parsedOptions: ParsedOptions = getopts(["-w10"], options)

console.log(parsedOptions)
