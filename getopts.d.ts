/** Interface for getopts parsed options object. */
interface ParsedOptions {
  _: string[]
  [key: string]: any
}

/** Interface for getops options argument.
 * @param alias Option aliases.
 * @param boolean Options that should be parsed as booleans.
 * @param default Default values for missing options.
 * @param unknown Run for every unknown option.
 */
interface Options {
  alias?: { [key: string]: string | string[] }
  boolean?: string[]
  default?: { [key: string]: any }
  unknown?: (optionName: string) => boolean
}

/** Parse the arguments passed to your program from the command line.
 * @param argv Arguments to parse.
 * @param options Options.
 * @returns An object with parsed pptions.
 */

declare function getopts(argv: string[], options?: Options): ParsedOptions

export = getopts
