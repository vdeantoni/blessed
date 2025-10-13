/**
 * fs polyfill for browser
 * Stubs out filesystem operations with no-ops or throws
 * Returns inlined terminfo data for terminal database files
 */

import { TERMINFO_DATA } from '../data/termdata.js';
import { Buffer } from 'buffer';

export const readFileSync = (path: string): Buffer => {
  // Handle terminfo files - check if path contains xterm
  if (typeof path === 'string' && path.includes('xterm')) {
    // Return the inlined xterm-256color terminfo data
    const base64Data = TERMINFO_DATA;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return Buffer.from(bytes);
  }

  // For other files, throw error
  throw new Error(`fs.readFileSync is not supported in browser environment (path: ${path})`);
};
export const readdirSync = (path: string): string[] => {
  // Handle terminfo directories
  if (typeof path === 'string' && path.includes('terminfo')) {
    // Return fake directory listing with xterm variants
    return ['xterm', 'xterm-256color', 'xterm-color'];
  }

  throw new Error(`fs.readdirSync is not supported in browser environment (path: ${path})`);
};
export const existsSync = (path: string): boolean => {
  // Return true for xterm terminfo files
  if (typeof path === 'string' && (path.includes('xterm') || path.includes('terminfo'))) {
    return true;
  }
  return false;
};

export default {
  readFileSync,
  readdirSync,
  existsSync,
  open,
  close,
};
