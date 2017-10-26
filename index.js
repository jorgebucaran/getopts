module.exports = function(args, opts) {
  opts = opts || {}

  return compile(
    parse(args),
    aliases(opts.alias),
    defaults(opts.default, opts.alias),
    opts.unknown,
    { _: [] }
  )
}

function parse(args, operands) {
  var len = 0
  var stack = []

  var isEndOfOptions = false

  for (var i = 0, argsLen = args.length; i < argsLen; i++) {
    var arg = args[i]
    if (isEndOfOptions || typeof arg !== "string" || arg[0] !== "-") {
      len = (1 & len) > 0 ? stack.push(arg) : stack.push("_", arg)
    } else {
      if ((1 & len) > 0) {
        len = stack.push(true)
      }

      if ("--" === arg) {
        isEndOfOptions = true
        continue
      }

      if ("-" === arg[0] && "-" === arg[1]) {
        var atom = arg.split("=")
        var name = atom[0].slice(2)
        var value = atom[1]

        if (
          "n" === name[0] &&
          "o" === name[1] &&
          "-" === name[2] &&
          undefined === value
        ) {
          name = name.slice(3)
          value = false
        }

        len = undefined === value ? stack.push(name) : stack.push(name, value)
      } else if (arg[0] === "-") {
        for (var j = 1, argLen = arg.length; j < argLen; j++) {
          var c = arg[j]
          if (c.toUpperCase() !== c.toLowerCase() || 1 === j) {
            if ((1 & len) > 0) {
              stack.push(true)
            }
            len = stack.push(c)
          } else {
            len = stack.push(arg.slice(j))
            j = argLen
          }
        }
      }
    }
  }

  if ((1 & len) > 0) {
    len = stack.push(true)
  }

  return stack
}

function compile(stack, aliases, defaults, unknown, result) {
  for (var i = 0, len = stack.length - 1; i < len; i += 2) {
    var key = stack[i]
    var value = stack[i + 1]
    var prev = result[key]
    var alias = aliases[key]

    if (undefined === alias && undefined !== unknown && unknown(key)) {
      continue
    }

    if (undefined === prev) {
      result[key] = value
    } else {
      if (Array.isArray(prev)) {
        prev.push(value)
      } else {
        result[key] = [prev, value]
      }
    }

    if (undefined !== alias) {
      for (var j = 0, aliasLen = alias.length, next; j < aliasLen; j++) {
        if (key !== (next = alias[j])) {
          result[next] = result[key]
        }
      }
    }
  }

  for (var key in defaults) {
    if (undefined === result[key]) {
      result[key] = defaults[key]
    }
  }

  return result
}

function defaults(hash, aliases) {
  if (undefined === hash) return
  for (var key in aliases) {
    var value = hash[key]
    var alias = toArray(aliases[key])

    if (undefined !== value) {
      for (var i = 0, len = alias.length; i < len; i++) {
        hash[alias[i]] = value
      }
    } else {
      for (var i = 0, len = alias.length; i < len; i++) {
        if (undefined !== (value = hash[alias[i]])) {
          hash[key] = value
          for (var j = 0; j < len; j++) {
            if (i !== j) {
              hash[alias[j]] = value
            }
          }
        }
      }
    }
  }
  return hash
}

function aliases(hash, map) {
  var map = {}
  for (var key in hash) {
    var alias = (map[key] = toArray(hash[key]))

    for (var i = 0, len = alias.length; i < len; i++) {
      var name = alias[i]
      map[name] = [key]

      for (var j = 0; j < len; j++) {
        var next = alias[j]
        if (next !== name) {
          map[name].push(next)
        }
      }
    }
  }
  return map
}

function toArray(any) {
  return Array.isArray(any) ? any : [any]
}
