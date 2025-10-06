/**
 * Temporary shim for gradual TypeScript migration
 * This file re-exports from colors.ts so that JavaScript files
 * can still use require('./colors')
 *
 * Will be removed once all files are converted to TypeScript
 */

const colors = require('./colors.ts').default || require('./colors.ts');
module.exports = colors;