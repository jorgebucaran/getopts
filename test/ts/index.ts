import getopts, { ParsedOptions, Options } from "getopts"

const options: Options = {
  alias: {
    s: "super"
  },
  boolean: ["super"],
  default: {
    super: true
  }
}

const parsedOptions: ParsedOptions = getopts(["-s"], options)

console.log(parsedOptions)
