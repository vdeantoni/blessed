#!/usr/bin/env node

/**
 * Post-processing script to fix MDX issues in TypeDoc-generated markdown files.
 *
 * This script fixes curly braces in documentation that would cause MDX compilation errors.
 * MDX interprets {variable} as JavaScript expressions, so we need to escape them.
 *
 * Fixes:
 * - Wraps {word} patterns in backticks to make them inline code: `{word}`
 * - Skips patterns already in code blocks or backticks
 * - Preserves markdown formatting
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing generated docs
const DOCS_DIR = path.join(__dirname, "../docs/api/generated");

/**
 * Fix MDX issues in a markdown file
 */
function fixMdxInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Pattern to find {word} not already in backticks or code blocks
  // Negative lookbehind: not preceded by backtick or backslash
  // Negative lookahead: not followed by backtick
  const pattern = /(?<!`|\\)\{(\w+)\}(?!`)/g;

  // Replace {word} with `{word}` (inline code)
  const newContent = content.replace(pattern, (match, word) => {
    // Check if we're inside a code block by counting backticks before this position
    const beforeMatch = content.substring(0, content.indexOf(match));
    const codeBlockCount = (beforeMatch.match(/```/g) || []).length;

    // If odd number of triple backticks, we're inside a code block - skip
    if (codeBlockCount % 2 === 1) {
      return match;
    }

    modified = true;
    return `\`{${word}}\``;
  });

  if (modified) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`✓ Fixed: ${path.relative(DOCS_DIR, filePath)}`);
    return true;
  }

  return false;
}

/**
 * Recursively process all .md files in a directory
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      if (fixMdxInFile(fullPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

// Main execution
console.log("🔧 Fixing MDX issues in generated documentation...\n");

if (!fs.existsSync(DOCS_DIR)) {
  console.error(`❌ Directory not found: ${DOCS_DIR}`);
  console.error('   Run "pnpm build:api" first to generate documentation.');
  process.exit(1);
}

const fixedCount = processDirectory(DOCS_DIR);

console.log(`\n✨ Done! Fixed ${fixedCount} file(s).`);
