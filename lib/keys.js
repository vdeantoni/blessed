/**
 * Temporary shim for gradual TypeScript migration
 * This file re-exports from keys.ts so that JavaScript files
 * can still use require('./keys')
 *
 * Will be removed once all files are converted to TypeScript
 */

const keys = require('./keys.ts').default || require('./keys.ts');
module.exports = keys;