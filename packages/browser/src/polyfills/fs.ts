/**
 * fs polyfill for browser
 * Stubs out filesystem operations with no-ops or throws
 * Returns imported terminfo and font data for blessed widgets
 */

import { Buffer } from "buffer";
import xtermData from "@unblessed/core/data/terminfo/xterm-256color.json" assert { type: "json" };
import terU14n from "@unblessed/core/data/fonts/ter-u14n.json" assert { type: "json" };
import terU14b from "@unblessed/core/data/fonts/ter-u14b.json" assert { type: "json" };

export const readFileSync = (path: string): Buffer => {
  // Handle terminfo files - check if path contains xterm
  if (typeof path === "string" && path.includes("xterm")) {
    // Return the imported xterm-256color terminfo data
    const base64Data = xtermData.data;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return Buffer.from(bytes);
  }

  // Handle font files - match by filename regardless of path
  if (typeof path === "string") {
    if (path.endsWith("ter-u14n.json") || path.includes("ter-u14n.json")) {
      return Buffer.from(JSON.stringify(terU14n), "utf8");
    }
    if (path.endsWith("ter-u14b.json") || path.includes("ter-u14b.json")) {
      return Buffer.from(JSON.stringify(terU14b), "utf8");
    }
  }

  // For other files, throw error
  throw new Error(
    `fs.readFileSync is not supported in browser environment (path: ${path})`,
  );
};
export const readdirSync = (path: string): string[] => {
  // Handle terminfo directories
  if (typeof path === "string" && path.includes("terminfo")) {
    // Return fake directory listing with xterm variants
    return ["xterm", "xterm-256color", "xterm-color"];
  }

  throw new Error(
    `fs.readdirSync is not supported in browser environment (path: ${path})`,
  );
};
export const existsSync = (path: string): boolean => {
  // Return true for xterm terminfo files
  if (
    typeof path === "string" &&
    (path.includes("xterm") || path.includes("terminfo"))
  ) {
    return true;
  }
  // Return true for font files - match by filename
  if (
    typeof path === "string" &&
    path.endsWith(".json") &&
    (path.includes("ter-u14n") || path.includes("ter-u14b"))
  ) {
    return true;
  }
  return false;
};

export default {
  readFileSync,
  readdirSync,
  existsSync,
};
