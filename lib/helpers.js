/**
 * Temporary shim for gradual TypeScript migration
 * This file re-exports from helpers.ts so that JavaScript files
 * can still use require('./helpers')
 *
 * Will be removed once all files are converted to TypeScript
 */

const helpers = require('./helpers.ts').default || require('./helpers.ts');

// Add lazy-loaded widget getters (avoid circular dependencies)
helpers._screen = null;
helpers._element = null;

Object.defineProperty(helpers, 'Screen', {
  get() {
    if (!helpers._screen) {
      helpers._screen = require('./widgets/screen');
    }
    return helpers._screen;
  }
});

Object.defineProperty(helpers, 'Element', {
  get() {
    if (!helpers._element) {
      helpers._element = require('./widgets/element');
    }
    return helpers._element;
  }
});

module.exports = helpers;