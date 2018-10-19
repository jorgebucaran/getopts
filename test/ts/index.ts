import getopts, {ParsedOptions, Options} from "getopts"

console.log(
  getopts(["-s"], {
    alias: {
      s: "super"
    },
    boolean: ["super"],
    default: {
      super: true
    }
  })
)

function wrapGetopts(input: string, options: Options): ParsedOptions {
  return getopts(input.split(" "), options)
}

const options: Options = {
  alias: {
    e: "export"
  },
  boolean: ["export"],
  default: {
    export: false
  }
}

wrapGetopts("-e", options)
