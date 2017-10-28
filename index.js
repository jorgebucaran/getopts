const push = Array.prototype.push
const SHORTSPLIT = /$|[!-@\[-`{-~]/

module.exports = function(args, opts) {
  opts = opts || {}
  return parse(
    args,
    aliases(opts.alias),
    defaults(opts.default, opts.alias),
    opts.unknown,
    { _: [] }
  )
}

function parse(args, aliases, defaults, unknown, out) {
  for (var i = 0, j = 0, len = args.length, _ = out._; i < len; i++) {
    var arg = args[i]

    if ("--" === arg) {
      push.apply(_, args.slice(i + 1))
      break
    } else if ("-" === arg[0]) {
      if ("-" === arg[1]) {
        var end = arg.indexOf("=")
        if (0 <= end) {
          set(arg.slice(2, end), arg.slice(end + 1), out, aliases, unknown)
        } else {
          if ("n" === arg[2] && "o" === arg[3] && "-" === arg[4]) {
            set(arg.slice(5), false, out, aliases, unknown)
          } else {
            set(
              arg.slice(2),
              (j = i + 1) === len || "-" === args[j][0] || args[(i = j)],
              out,
              aliases,
              unknown
            )
          }
        }
      } else {
        var end = arg.slice(2).search(SHORTSPLIT) + 2
        var value = end === arg.length
          ? (j = i + 1) === len || "-" === args[j][0] || args[(i = j)]
          : arg.slice(end)

        for (j = 1; j < end; ) {
          set(arg[j], ++j !== end || value, out, aliases, unknown)
        }
      }
    } else {
      _.push(arg)
    }
  }

  for (var key in defaults) {
    if (undefined === out[key]) {
      out[key] = defaults[key]
    }
  }

  return out
}

function aliases(aliases) {
  var out = {}

  for (var key in aliases) {
    var alias = (out[key] = toArray(aliases[key]))

    for (var i = 0, len = alias.length; i < len; i++) {
      var name = alias[i]
      out[name] = [key]

      for (var j = 0; j < len; j++) {
        var next = alias[j]
        if (next !== name) {
          out[name].push(next)
        }
      }
    }
  }

  return out
}

function defaults(defaults, aliases) {
  if (undefined !== defaults) {
    for (var key in aliases) {
      var value = defaults[key]
      var alias = toArray(aliases[key])

      if (undefined !== value) {
        for (var i = 0, len = alias.length; i < len; i++) {
          defaults[alias[i]] = value
        }
      } else {
        for (var i = 0, len = alias.length; i < len; i++) {
          if (undefined !== (value = defaults[alias[i]])) {
            defaults[key] = value

            for (var j = 0; j < len; j++) {
              if (i !== j) {
                defaults[alias[j]] = value
              }
            }
          }
        }
      }
    }
  }
  return defaults
}

function set(key, value, out, aliases, unknown) {
  var curr = out[key]
  var alias = aliases[key]
  var hasAlias = undefined !== alias

  if (hasAlias || undefined === unknown || unknown(key) !== false) {
    if (undefined === curr) {
      out[key] = value
    } else {
      if (Array.isArray(curr)) {
        curr.push(value)
      } else {
        out[key] = [curr, value]
      }
    }

    if (hasAlias) {
      for (var i = 0, len = alias.length; i < len; ) {
        out[alias[i++]] = out[key]
      }
    }
  }
}

function toArray(any) {
  return Array.isArray(any) ? any : [any]
}
