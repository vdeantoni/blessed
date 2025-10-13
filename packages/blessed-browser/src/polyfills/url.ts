/**
 * url polyfill for browser
 * Provides browser-compatible URL utilities
 */

// Re-export the url package for most functionality
export * from 'url';

// Add fileURLToPath stub for browser (not really applicable in browser)
export function fileURLToPath(url: string | URL): string {
  if (typeof url === 'string') {
    // Simple stub - just return a fake path
    if (url.startsWith('file://')) {
      return url.replace('file://', '/');
    }
    return '/';
  }
  // If it's a URL object
  return '/';
}

// Add pathToFileURL stub
export function pathToFileURL(path: string): URL {
  return new URL('file://' + path);
}
