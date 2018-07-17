"use strict"

const EMPTY = []
const SHORTSPLIT = /$|[!-@\[-`{-~].*/g
const isArray = Array.isArray

var toArray = function(any) {
  return isArray(any) ? any : [any]
}

var parseAlias = function(aliases) {
  var out = {}

  for (var key in aliases) {
    var alias = (out[key] = toArray(aliases[key]))

    for (var i = 0, len = alias.length; i < len; i++) {
      var curr = (out[alias[i]] = [key])

      for (var k = 0; k < len; k++) {
        if (i !== k) {
          curr.push(alias[k])
        }
      }
    }
  }

  return out
}

var parseBoolean = function(aliases, booleans) {
  var out = {}

  if (booleans !== undefined) {
    for (var i = 0, len = booleans.length; i < len; i++) {
      var key = booleans[i]
      var alias = aliases[key]

      out[key] = true

      if (alias === undefined) {
        aliases[key] = EMPTY
      } else {
        for (var k = 0, end = alias.length; k < end; k++) {
          out[alias[k]] = true
        }
      }
    }
  }

  return out
}

var parseDefault = function(aliases, defaults) {
  var out = {}

  for (var key in defaults) {
    var value = defaults[key]
    var alias = aliases[key]

    if (out[key] === undefined) {
      out[key] = value

      if (alias === undefined) {
        aliases[key] = EMPTY
      } else {
        for (var i = 0, len = alias.length; i < len; i++) {
          out[alias[i]] = value
        }
      }
    }
  }

  return out
}

var write = function(out, key, value, aliases, unknown) {
  var curr = out[key]
  var alias = aliases[key]
  var known = alias !== undefined

  if (known || unknown === undefined || unknown(key) !== false) {
    if (curr === undefined) {
      out[key] = value
    } else {
      if (isArray(curr)) {
        curr.push(value)
      } else {
        out[key] = [curr, value]
      }
    }

    if (known) {
      for (var i = 0, len = alias.length; i < len; ) {
        out[alias[i++]] = out[key]
      }
    }
  }
}

var getopts = function(argv, opts) {
  var unknown = (opts = opts || {}).unknown
  var aliases = parseAlias(opts.alias)
  var values = parseDefault(aliases, opts.default)
  var bools = parseBoolean(aliases, opts.boolean)
  var out = { _: [] }

  for (var i = 0, k = 0, len = argv.length, _ = out._; i < len; i++) {
    var arg = argv[i]

    if (arg === "--") {
      while (++i < len) {
        _.push(argv[i])
      }
    } else if (arg === "-" || arg[0] !== "-") {
      _.push(arg)
    } else {
      if (arg[1] === "-") {
        var end = arg.indexOf("=", 2)

        if (0 <= end) {
          write(out, arg.slice(2, end), arg.slice(end + 1), aliases, unknown)
        } else {
          if ("n" === arg[2] && "o" === arg[3] && "-" === arg[4]) {
            write(out, arg.slice(5), false, aliases, unknown)
          } else {
            var key = arg.slice(2)
            write(
              out,
              key,
              len === (k = i + 1) ||
                argv[k][0] === "-" ||
                bools[key] !== undefined ||
                argv[(i = k)],
              aliases,
              unknown
            )
          }
        }
      } else {
        SHORTSPLIT.lastIndex = 2
        var match = SHORTSPLIT.exec(arg)
        var end = match.index
        var value =
          match[0] ||
          len === (k = i + 1) ||
          argv[k][0] === "-" ||
          bools[arg[end - 1]] !== undefined ||
          argv[(i = k)]

        for (k = 1; k < end; ) {
          write(out, arg[k], ++k !== end || value, aliases, unknown)
        }
      }
    }
  }

  for (var key in values) {
    if (out[key] === undefined) {
      out[key] = values[key]
    }
  }

  return out
}

module.exports = getopts
