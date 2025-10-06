/**
 * Temporary shim for gradual TypeScript migration
 * This file re-exports from unicode.ts so that JavaScript files
 * can still use require('./unicode')
 *
 * Will be removed once all files are converted to TypeScript
 */

const unicode = require('./unicode.ts').default || require('./unicode.ts');
module.exports = unicode;