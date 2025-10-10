/**
 * image.js - image element for blessed
 * Copyright (c) 2013-2015, Christopher Jeffrey and contributors (MIT License).
 * https://github.com/chjj/blessed
 */

/**
 * Modules
 */

import Box from './box.js';
import ANSIImage from './ansiimage.js';
import OverlayImage from './overlayimage.js';

/**
 * Image
 */

class Image extends Box {
  type = 'image';

  constructor(options = {}) {
    const imageType = options.itype || options.type || 'ansi';
    options.type = imageType;

    super(options);

    // Image acts as a factory - return the appropriate image type
    if (imageType === 'ansi') {
      return new ANSIImage(options);
    }

    if (imageType === 'overlay') {
      return new OverlayImage(options);
    }

    throw new Error('`type` must either be `ansi` or `overlay`.');
  }
}

/**
 * Expose
 */

export default Image;
export { Image };
