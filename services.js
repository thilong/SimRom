const { exampleService } = require('./service/example')

module.exports.services = [
  exampleService,
];

module.exports.makeChannelName = function(name, fnName) {
  return `${name}.${fnName}`;
}