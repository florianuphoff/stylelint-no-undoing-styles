const testRule = require("stylelint-test-rule-tape");
const plugin = require("..");

testRule(plugin.rule, {
  ruleName: plugin.ruleName,
  config: [true],
  accept: [
    {
      code: ".a{display: inherit;}",
      description: "No resetting declaration",
    }
  ],
  reject: [
    {
      code: ".a{margin:2em;} .a{margin:0;}",
      description: "Undoing margin with same selector",
      message: plugin.messages.usage('margin','0'),
      line: 1,
      column: 17
    },
    {
      code: ".a{background-image: none;}",
      description: "Undoing margin with same selector",
      message: plugin.messages.usage('background-image','none'),
      line: 1,
      column: 1
    }
 ]
});