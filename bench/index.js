const { Suite } = require('benchmark');
const getopts = require("getopts");
const minimist = require('minimist');
const mri = require('mri');
const nopt = require('nopt');
const yargs = require('yargs-parser');
const current = require('..');

const bench = new Suite();

const args = [
  "dummy",                // value
  '-s',                   // short
  '-xyz',                 // short sequence
  '-z=5',                 // short valued
  '--long',               // long
  '--very-long-flag=foo', // long valued
  "--",                   // stop
  "alpha",                // value
  "-n",                   // short
  "--bar=zoo"             // long valued
];

bench
  .add('getopts (prior)   ', () => getopts(args))
	.add('getopts (current) ', () => current(args))
	.add('minimist          ', () => minimist(args))
	.add('mri               ', () => mri(args))
	.add('nopt              ', () => nopt({}, {}, args))
	.add('yargs-parser      ', () => yargs(args))
	.on('cycle', e => console.log(String(e.target)))
	.run();
