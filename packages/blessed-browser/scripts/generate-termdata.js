#!/usr/bin/env node

/**
 * Generate termdata.ts from blessed's dist/usr files
 *
 * This script reads the terminfo and termcap data from the blessed package
 * and generates a TypeScript file with the data inlined as base64 (binary)
 * and plain text (termcap).
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const BLESSED_USR = resolve(__dirname, '../../blessed/dist/usr');
const TERMINFO_FILE = resolve(BLESSED_USR, 'xterm-256color');
const TERMCAP_FILE = resolve(BLESSED_USR, 'xterm.termcap');
const OUTPUT_FILE = resolve(__dirname, '../src/data/termdata.ts');

console.log('🔧 Generating termdata.ts...');
console.log(`   Reading from: ${BLESSED_USR}`);

try {
  // Read terminfo binary and convert to base64
  const terminfoBuffer = readFileSync(TERMINFO_FILE);
  const terminfoBase64 = terminfoBuffer.toString('base64');
  console.log(`   ✓ Read xterm-256color (${terminfoBuffer.length} bytes)`);

  // Read termcap text
  const termcapText = readFileSync(TERMCAP_FILE, 'utf8');
  console.log(`   ✓ Read xterm.termcap (${termcapText.length} bytes)`);

  // Escape special characters for template literal
  // - Escape backslashes first (before other escapes)
  // - Escape backticks and dollar signs
  const escapedTermcap = termcapText
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/`/g, '\\`')    // Escape backticks
    .replace(/\$/g, '\\$');  // Escape dollar signs

  // Generate TypeScript file
  const output = `/**
 * Terminfo and termcap data for xterm-256color
 *
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from @vdeantoni/blessed/dist/usr files
 * Run: pnpm run generate-termdata
 */

/**
 * xterm-256color terminfo data (base64 encoded binary)
 * Source: @vdeantoni/blessed/dist/usr/xterm-256color
 */
export const TERMINFO_DATA = '${terminfoBase64}';

/**
 * xterm-256color terminfo name
 */
export const TERMINFO_NAME = 'xterm-256color';

/**
 * xterm-256color terminfo path (fake path for compatibility)
 */
export const TERMINFO_PATH = '/usr/share/terminfo/x/xterm-256color';

/**
 * xterm termcap data
 * Source: @vdeantoni/blessed/dist/usr/xterm.termcap
 */
export const TERMCAP_DATA = \`${escapedTermcap}\`;
`;

  // Write output file
  writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`   ✓ Generated: ${OUTPUT_FILE}`);
  console.log('✅ Done!');

} catch (error) {
  console.error('❌ Error generating termdata.ts:', error.message);
  process.exit(1);
}
