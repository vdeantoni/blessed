// helpers.js - Compatibility shim for TypeScript migration
// This file re-exports helpers.ts for JavaScript files that still use require()
// Will be removed once all files are converted to TypeScript

module.exports = require('./helpers.ts');