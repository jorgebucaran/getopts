"use strict";

var _toConsumableArray = require("babel-runtime/helpers/to-consumable-array")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  for (var _len = arguments.length, aliases = Array(_len), _key = 0; _key < _len; _key++) {
    aliases[_key] = arguments[_key];
  }

  return parse(this || process.argv.slice(2), aliases.map(function (alias) {
    return typeof alias === "string" ? [alias, alias[0]] : alias;
  }));
};

function parse(argv, aliases) {
  var map = {},
      stack = [],
      keys = aliases.length > 0 ? aliases.reduce(function (p, n) {
    return p.concat(n);
  }).filter(function (a) {
    return typeof a !== "object";
  }) : null;
  var unknown = typeof aliases[aliases.length - 1] === "function" ? aliases.pop() : Function;

  function add(key) {
    var value = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    map[key] = map[key] === undefined ? value : Array.isArray(map[key]) ? map[key].concat(value) : [map[key]].concat(value);

    find(aliases, function (alias, _default) {
      if (! ~keys.indexOf(key)) return !unknown(key);
      if (~alias.indexOf(key)) alias.forEach(function (key) {
        return map[key] = typeof _default === "string" && typeof value === "boolean" ? _default : value;
      });
    });
  }
  argv.some(function (token, index) {
    if (token === "--") return add("_", argv.slice(index + 1)) || true;

    if (/^$|^[a-z/"'@#$`~.]|^[+-]?[0-9]\d*(\.\d+)?$/i.test(token)) {
      add.apply(undefined, _toConsumableArray(stack.length ? [stack.pop(), token] : ["_", [token]]));
    } else {
      while (stack.length > 0) add(stack.pop());
      if (/^-[a-z]/i.test(token)) {
        var _index = (token = token.slice(1)).search(/[\d\W]/i);
        var split = ~_index ? token.slice(0, _index) : token;
        if (~_index) add(split[split.length - 1], token.slice(_index));else stack.push(split[split.length - 1]);
        split.split("").slice(0, -1).forEach(function (key) {
          return add(key);
        });
      } else if (/^--[a-z]/i.test(token)) {
        if (~(token = token.slice(2)).indexOf("=")) {
          add.apply(undefined, _toConsumableArray(token.split("=")));
        } else if (/^no-.+/.test(token)) {
          add(token.match(/^no-(.+)/)[1], false);
        } else {
          stack.push(token);
        }
      } else throw new RangeError("invalid option " + token);
    }
  });
  stack.forEach(function (key) {
    return add(key);
  });
  find(aliases, function (alias, value) {
    return alias.forEach(function (a) {
      return map[a] = map[a] === undefined ? value : map[a];
    });
  });
  return map;
}

function find(aliases, fun) {
  return aliases.some(function (alias) {
    return fun(alias = alias.slice(), typeof alias[alias.length - 1] === "object" ? alias.pop()["default"] : undefined);
  });
}
module.exports = exports["default"];