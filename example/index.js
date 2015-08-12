#!/usr/bin/env node
/**
  @example example/index.js -f bar -bp
  @return { f: 'bar', foo: 'bar', b: true, bar: true, p: './', path: './' }
*/
console.log( require("../")("foo", "bar", ["path", "p", { default: "./" }]) )
