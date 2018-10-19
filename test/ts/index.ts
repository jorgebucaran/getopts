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

if (!parsedOptions.super) {
  process.exit(1)
}