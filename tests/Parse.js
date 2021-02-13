const getopts = require("..")
const deepEqual = require("testmatrix").deepEqual

const Parse = props => ({
  name: props.name,
  actual: getopts(props.argv, props.opts),
  assert: deepEqual,
  expected: props.expected
})

exports.Parse = Parse
