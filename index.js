const stylelint = require('stylelint');
const ruleName = 'plugin/no-undoing-styles'
const messages =  stylelint.utils.ruleMessages(ruleName, {
  usage: (style,value) => `${style}:${value}`
})
const declToReset = [
  'align-self', // auto
  'background-image', //none;
  'background-position', //0% 0%;
  'border-block-end-style', //none;
  'border-block-start-style', //none;
  'border-bottom-left-radius', //0;
  'border-bottom-right-radius', //0;
  'border-bottom-style', //none;
  'border-image-source', //none;
  'border-inline-end-style', //none;
  'border-inline-start-style', //none;
  'border-left-style', //none;
  'border-right-style', //none;
  'border-spacing', //0;
  'border-top-left-radius', //0;
  'border-top-right-radius', //0;
  'border-top-style', //none;
  'border', //none,
  'bottom', //auto;
  'box-shadow', //none;
  'clear', //none;
  'clip-path', //none;
  'column-rule-style', //none;
  'column-span', //none;
  'column-width', //auto;
  'content', //none;
  'counter-increment', //none;
  'counter-reset', //none;
  'filter', //none;
  'flex-basis', //auto;
  'float', //none;
  'font-family', //initial;
  'font-size-adjust', //none;
  'grid-template-areas', //none;
  'grid-template-columns', //none;
  'grid-template-rows', //none;
  'height', //auto;
  'hyphens', //none;
  'left', //auto;
  'list-style-image', //none;
  'list-style-type', //none
  'margin-block-end', //0;
  'margin-block-start', //0;
  'margin-bottom', //0;
  'margin-inline-end', //0;
  'margin-inline-start', //0;
  'margin-left', //0;
  'margin-right', //0;
  'margin-top', //0;
  'margin', // 0
  'mask-image', //none;
  'max-height', //none;
  'max-width', //none;
  'outline-style', //none;
  'padding-block-end', //0;
  'padding-block-start', //0;
  'padding-bottom', //0;
  'padding-inline-end', //0;
  'padding-inline-start', //0;
  'padding-left', //0;
  'padding-right', //0;
  'padding-top', //0;
  'perspective', //none;
  'position', //static;
  'resize', //none;
  'right', //auto;
  'scroll-behavior', //auto;
  'scroll-snap-coordinate', //none;
  'scroll-snap-points-x', //none;
  'scroll-snap-points-y', //none;
  'scroll-snap-type', //none;
  'shape-image-threshold', //0.0;
  'shape-margin', //0;
  'shape-outside', //none;
  'text-align', //initial;
  'text-combine-upright', //none;
  'text-decoration', //none
  'text-decoration-line', //none;
  'text-emphasis-style', //none;
  'text-indent', //0;
  'text-shadow', //none;
  'text-transform', //none;
  'top', // 0
  'touch-action', //auto;
  'transform', //none;
  'vertical-align', //baseline;
  'white-space', //normal;
  'width', //auto;
  'z-index', //auto;
  'appearance', //none;
]

resettingValues = [
  '0',
  'auto',
  'none',
  'baseline',
  'initial'
]

module.exports = stylelint.createPlugin(
  ruleName, 
  (actual) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, { actual });

    if (!validOptions) return;

    postcssRoot.walkDecls((decl) => {
      if(declToReset.includes(decl.prop) && resettingValues.includes(decl.value)) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: postcssResult,
          message: messages.usage(decl.prop,decl.value),
          node: decl.parent,
          word: `${decl.prop}:${decl.value}`,
          line: decl.source.start.line
        })
      }
    });
  }
)

module.exports.ruleName = ruleName
module.exports.messages = messages