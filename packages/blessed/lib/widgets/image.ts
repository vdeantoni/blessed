/**
 * image.ts - image element for blessed
 */

/**
 * Modules
 */

import type { ImageOptions } from '../types';
import Box from './box.js';
import ANSIImage from './ansiimage.js';
import OverlayImage from './overlayimage.js';

/**
 * Image
 */

class Image extends Box {
  type = 'image';

  constructor(options: ImageOptions = {}) {
    const imageType = options.itype || options.type || 'ansi';
    options.type = imageType;

    super(options);

    // Image acts as a factory - return the appropriate image type
    if (imageType === 'ansi') {
      return new ANSIImage(options) as any;
    }

    if (imageType === 'overlay') {
      return new OverlayImage(options) as any;
    }

    throw new Error('`type` must either be `ansi` or `overlay`.');
  }
}

/**
 * Expose
 */

export default Image;
export { Image };
