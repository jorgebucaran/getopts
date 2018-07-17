interface ParsedOptions {
  _: string[]
  [key: string]: any
}

interface Options {
  alias?: { [key: string]: string | string[] }
  boolean?: string[]
  default?: { [key: string]: any }
  unknown?: (optionName: string) => boolean
}

/**
 * @param argv Arguments to parse.
 * @param options Options.
 * @returns An object with parsed options.
 */
declare function getopts(argv: string[], options?: Options): ParsedOptions

export = getopts
