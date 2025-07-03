/**
 * @param argv Arguments to parse.
 * @param options Parsing options (configuration).
 * @returns The parsed arguments.
 */
export function getopts(
  argv: string[],
  options?: Options
): ParsedOptions

export interface ParsedOptions {
  _: string[]
  [key: string]: any
}

export interface Options {
  alias?: { [key: string]: string | string[] }
  string?: string[]
  boolean?: string[]
  default?: { [key: string]: any }
  unknown?: (optionName: string) => boolean
  stopEarly?: boolean
}
