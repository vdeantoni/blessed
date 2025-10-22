/**
 * Empty polyfill for browser
 * Used for Node.js built-ins that aren't needed
 */

// Export commonly imported functions as no-ops
export const fileURLToPath = (url: string | URL): string => {
  const urlStr = typeof url === "string" ? url : url.toString();
  if (urlStr.startsWith("file://")) {
    return urlStr.slice(7);
  }
  return urlStr;
};

export default {};
