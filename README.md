# stylelint-no-undoing-styles
[![NPM version](https://img.shields.io/npm/v/stylelint-no-undoing-styles.svg)](https://www.npmjs.com/package/stylelint-no-undoing-styles)
[![NPM version](https://img.shields.io/npm/v/stylelint-high-performance-animation.svg)](https://www.npmjs.com/package/stylelint-high-performance-animation)

This plugin finds any usage of undoing styles in your (s)css files and reports them.

## Install

```bash
npm install stylelint-no-undoing-styles  --save-dev
```

## Usage

After that add this plugin to your stylelint plugins and include the rule:

```javascript
"plugins": [
  "stylelint-no-undoing-styles"
],
"rules": {
  "plugin/no-undoing-styles": true
}
```

## Details

```scss
// _button.scss
.fancy-button {
  margin-bottom: 2em;
}

// _landingpage.scss
.fancy_button {
  margin-bottom: 0;
}
/**             ^^^
 * Undoing styles from _button.scss */
```

Be cautions with warnings: not every warning is truthy. The static analysis might have false positives or reports neccessary resetting declarations.

### Options

#### `true`

The following pattern is considered warning:

```scss
// _button.scss
.fancy-button {
  border: 0.5em solid #F00;
}

// _landingpage.scss
.fancy_button {
  border: none;
}
```

Resetting values (not always):
* 0
* auto
* none
* baseline
* initial


## License

MIT
