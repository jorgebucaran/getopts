import getopts from "getopts"

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
