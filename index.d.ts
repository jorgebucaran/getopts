/**
 * Parse command-line arguments.
 *
 * @param argv An array of arguments, usually `process.argv`.
 * @param options Configuration for how arguments should be parsed.
 * @returns an object mapping argument names to their values.
 *
 * @example
 * import getopts from "getopts"
 *
 * const options = getopts(process.argv.slice(2), {
 *   alias: {
 *     output: ["o", "f"],
 *     type: "t",
 *   },
 * })
 *
 * // Short Options
 * getopts(["-ab", "-c"]) //=> { _: [], a:true, b:true, c:true }
 * getopts(["-a", "alpha"]) //=> { _: [], a:"alpha" }
 * getopts(["-abc1"]) //=> { _: [], a:true, b:true, c:1 }
 * getopts(["-9", "-#10", "-%0.01"]) //=> { _:[], 9:true, #:10, %:0.01 }
 *
 * // Long Options
 * getopts(["--turbo", "--warp=10"]) //=> { _: [], turbo:true, warp:10 }
 * getopts(["--warp=e=mc^2"]) //=> { _: [], warp:"e=mc^2" }
 * getopts(["--@", "alpha"]) //=> { _: [], @:"alpha" }
 *
 * // Negated Options start with --no- and are always false
 * getopts(["--no-turbo"]) //=> { _: [], turbo:false }
 *
 * // opts.string
 * getopts(["-kF12"], {
 *   string: ["k"],
 * }) //=> { _: [], k:"F12" }
 *
 * // opts.boolean
 * getopts(["-a", "alpha"], {
 *   boolean: ["a"],
 * }) //=> { _: ["alpha"], a:true }
 *
 * // Operands
 * getopts(["alpha", "-w9", "bravo"]) //=> { _: ["alpha", "bravo"], w:9 }
 * getopts(["--code=alpha", "bravo"]) //=> { _: ["bravo"], code:"alpha" }
 * getopts(["--alpha", "--", "--bravo", "--turbo"]) //=> { _:["--bravo", "--turbo"], alpha:true }
 * getopts(["--turbo", "-"]) //=> { _:["-"], turbo:true }
 *
 * // Other
 * getopts(["-x?alpha=bravo", "-x3.14", "-x"] //=> { _:[], a:["?alpha=bravo", 3.14, true] }
 * getopts(["--text=top\n\tbottom"]) //=> { _:[], text:"top\n\tbottom" }
 * getopts(["--turbo=false"]) //=> { _:[], turbo:false }
 * getopts([], {
 *   string: ["a"],
 *   boolean: ["b"],
 * }) //=> { _:[], a:"", b:false }
 */
export function getopts(
    argv: string[],
    options?: Options
): ParsedOptions

/** The parsed options and arguments from {@link getopts}. */
export interface ParsedOptions {
    /** Operands, which include every non-option argument, any singular `-`, and everything after a standalone `--`. */
    _: string[]

    /** All parsed short & long options with their associated value. */
    [key: string]: any
}

/** Configuration for how arguments should be parsed by {@link getopts}. */
export interface Options {
    /**
     * An object of option aliases. An alias can be a `string` or a `string[]`. Aliases let you declare substitute
     * names for an option, e.g., the short (abbreviated) and long (canonical) variations.
     *
     * @example
     * getopts(["-t"], {
     *   alias: {
     *     turbo: ["t", "T"],
     *   },
     * }) //=> { _:[], t:true, T:true, turbo:true }
     */
    alias?: { [key: string]: string | string[] }

    /**
     * An array of flags to parse as strings. In the example below, `t` is parsed as a string, causing all adjacent
     * characters to be treated as a single value and not as individual options.
     *
     * @example
     * getopts(["-atabc"], {
     *   string: ["t"],
     * }) //=> { _:[], a:true, t:"abc" }
     */
    string?: string[]

    /**
     * An array of options to parse as boolean. In the example below, `t` is parsed as a boolean, causing the following
     * argument to be treated as an operand.
     *
     * @example
     * getopts(["-t", "alpha"], {
     *   boolean: ["t"],
     * }) //=> { _:["alpha"], t:true }
     */
    boolean?: string[]

    /**
     * An object of default values for options not present in the arguments array.
     *
     * @example
     * getopts(["--warp=10"], {
     *   default: {
     *     warp: 15,
     *     turbo: true,
     *   },
     * }) //=> { _:[], warp:10, turbo:true }
     */
    default?: { [key: string]: any }

    /**
     * We call this function for each unknown option. Return `false` to discard the option. Unknown options are those
     * that appear in the arguments array, but are not in {@link string}, {@link boolean}, {@link default}, or
     * {@link alias}.
     *
     * @example
     * getopts(["-abc"], {
     *   unknown: (option) => "a" === option,
     * }) //=> { _:[], a:true }
     */
    unknown?: (optionName: string) => boolean

    /**
     * A boolean property. If `true`, the operands array {@link _} will be populated with all the arguments after the first
     * operand.
     *
     * This property is useful when implementing sub-commands in a CLI.
     *
     * @example
     * getopts(["-w9", "alpha", "--turbo", "bravo"], {
     *   stopEarly: true,
     * }) //=> { _:["alpha", "--turbo", "bravo"], w:9 }
     * @example
     * // Subcommand example
     * import getopts from "getopts"
     * import { install, update, uninstall } from "./commands.js"
     *
     * const options = getopts(process.argv.slice(2), {
     *   stopEarly: true,
     * })
     *
     * const [command, subargv] = options._
     *
     * if (command === "install") {
     *   install(subargv)
     * } else if (command === "update") {
     *   update(subargv)
     * } else if (command === "uninstall") {
     *   uninstall(subargv)
     * }
     */
    stopEarly?: boolean
}
