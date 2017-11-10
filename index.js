const SHORTSPLIT = /$|[!-@\[-`{-~].*/g
const EMPTY = []

function array(any) {
  return Array.isArray(any) ? any : [any]
}

function alias(aliases) {
  var out = {}

  for (var key in aliases) {
    var alias = (out[key] = array(aliases[key]))

    for (var i = 0, len = alias.length; i < len; i++) {
      var curr = (out[alias[i]] = [key])

      for (var j = 0; j < len; j++) {
        if (i !== j) {
          curr.push(alias[j])
        }
      }
    }
  }

  return out
}

function booleans(aliases, booleans) {
  var out = {}

  if (undefined !== booleans) {
    for (var i = 0, len = booleans.length; i < len; i++) {
      var name = booleans[i]
      var alias = aliases[name]

      out[name] = true;
      if (undefined !== alias) {
        for (var j = 0, end = alias.length; j < end; j++) {
          out[alias[j]] = true
        }
      } else {
        aliases[name] = EMPTY
      }
    }
  }

  return out
}

function defaults(aliases, defaults) {
  var out = {}

  for (var key in defaults) {
    var value = defaults[key]
    var alias = aliases[key]

    if (undefined === out[key]) {
      out[key] = value

      if (undefined === alias) {
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

function set(out, key, value, aliases, unknown) {
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

module.exports = function(argv, opts) {
  var unknown = (opts = opts || {}).unknown
  var aliases = alias(opts.alias)
  var bools = booleans(aliases, opts.boolean)
  var values = defaults(aliases, opts.default)
  var out = { _: [] }

  for (var i = 0, j = 0, len = argv.length, _ = out._; i < len; i++) {
    var arg = argv[i]

    if ("--" === arg) {
      while (++i < len) {
        _.push(argv[i])
      }
    } else if ("-" === arg[0]) {
      if ("-" === arg[1]) {
        var end = arg.indexOf("=")
        if (0 <= end) {
          set(out, arg.slice(2, end), arg.slice(end + 1), aliases, unknown)
        } else {
          if ("n" === arg[2] && "o" === arg[3] && "-" === arg[4]) {
            set(out, arg.slice(5), false, aliases, unknown)
          } else {
            var name = arg.slice(2)
            set(
              out,
              name,
              (j = i + 1) === len || "-" === argv[j][0] ||
                undefined !== bools[name] || argv[(i = j)],
              aliases,
              unknown
            )
          }
        }
      } else {
        SHORTSPLIT.lastIndex = 2
        var match = SHORTSPLIT.exec(arg)
        var value =
          match[0] || (j = i + 1) === len || "-" === argv[j][0]
        var end = match.index

        for (var k = 1; k < end; ) {
          var name = arg[k]
          set(
            out,
            name,
            ++k !== end || value || undefined !== bools[name] || argv[(i = j)],
            aliases,
            unknown
          )
        }
      }
    } else {
      _.push(arg)
    }
  }

  for (var key in values) {
    if (undefined === out[key]) {
      out[key] = values[key]
    }
  }

  return out
}
