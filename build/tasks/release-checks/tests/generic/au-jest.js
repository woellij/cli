'use strict';
const Test = require('../test');
const ExecuteCommand = require('../../tasks/execute-command');

class AuJestRunsTests extends Test {
  constructor() {
    super('au jest runs tests');
  }

  onOutput(message) {
    this.logger.debug(message);

    if (isTestFinishedMessage(message)) {
      this.success();
      this.executeCommand.stop();
    }
  }

  execute() {
    // https://github.com/facebook/jest/issues/5064
    this.executeCommand = new ExecuteCommand('au', ['jest'], (msg) => this.onOutput(msg), (msg) => this.onOutput(msg));
    return this.executeCommand.executeAsNodeScript();
  }
}

function isTestFinishedMessage(msg) {
  return msg.indexOf('1 passed, 1 total') > -1;
}

module.exports = {
  AuJestRunsTests
};
