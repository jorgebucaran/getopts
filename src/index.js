export default function (...aliases) {
  return parse(this || process.argv.slice(2), aliases.map((alias) =>
    typeof alias === "string" ? [alias, alias[0]] : alias))
}

function parse (argv, aliases) {
  const map = {}, stack = [], keys = aliases.length > 0
    ? aliases.reduce((p, n) =>
      p.concat(n)).filter((a) => typeof a !== "object") : null
  const unknown = typeof aliases[aliases.length - 1] === "function"
    ? aliases.pop() : Function

  function add (key, value = true) {
    map[key] = map[key] === undefined
      ? value : Array.isArray(map[key])
        ? map[key].concat(value) : [map[key]].concat(value)

    find(aliases, (alias, _default) => {
      if (!~keys.indexOf(key)) return !unknown(key)
      if (~alias.indexOf(key)) alias.forEach((key) =>
        map[key] = typeof _default === "string" && typeof value === "boolean"
          ? _default : value)
    })
  }
  argv.some((token, index) => {
    if (token === "--") return add("_", argv.slice(index + 1)) || true

    if (/^$|^[a-z/"'@#$`~.]|^[+-]?[0-9]\d*(\.\d+)?$/i.test(token)) {
      add(...stack.length ? [stack.pop(), token] : ["_", [token]])
    } else {
      while (stack.length > 0) add(stack.pop())
      if (/^-[a-z]/i.test(token)) {
        const index = (token = token.slice(1)).search(/[\d\W]/i)
        const split = ~index ? token.slice(0, index) : token
        if (~index)
          add(split[split.length - 1], token.slice(index))
        else
          stack.push(split[split.length - 1])
        split.split("").slice(0, -1).forEach((key) => add(key))
      } else if (/^--[a-z]/i.test(token)) {
        if (~(token = token.slice(2)).indexOf("=")) {
          add(...token.split("="))
        } else if (/^no-.+/.test(token)) {
          add(token.match(/^no-(.+)/)[1], false)
        } else {
          stack.push(token)
        }
      } else throw new RangeError(`invalid option ${token}`)
    }
  })
  stack.forEach((key) => add(key))
  find(aliases, (alias, value) => alias.forEach((a) =>
    map[a] = map[a] === undefined ? value : map[a]))
  return map
}

function find (aliases, fun) {
  return aliases.some((alias) => fun(alias = alias.slice(),
    typeof alias[alias.length - 1] === "object"
      ? alias.pop().default : undefined))
}
