/**
 * pngjs stub for browser
 * Image widgets are not supported in browser environment
 */

export class PNG {
  constructor() {
    throw new Error(
      "PNG/Image widgets are not supported in browser environment",
    );
  }
}

export default { PNG };
