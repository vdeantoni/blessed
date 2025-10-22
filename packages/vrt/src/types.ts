/**
 * VRT (Visual Regression Testing) Type Definitions
 */

/**
 * A single frame in a VRT recording
 */
export interface VRTFrame {
  /** Screenshot data (SGR-encoded string from screen.screenshot()) */
  screenshot: string;
  /** Timestamp when frame was captured (milliseconds since recording start) */
  timestamp: number;
  /** Optional metadata for this frame */
  metadata?: Record<string, any>;
}

/**
 * Complete VRT recording with metadata
 */
export interface VRTRecording {
  /** Format version for future compatibility */
  version: string;
  /** Terminal dimensions when recording was made */
  dimensions: {
    cols: number;
    rows: number;
  };
  /** Recording metadata */
  metadata: {
    /** When recording was created */
    createdAt: string;
    /** Total recording duration in milliseconds */
    duration: number;
    /** Number of frames captured */
    frameCount: number;
    /** Description or test name */
    description?: string;
    /** Additional custom metadata */
    [key: string]: any;
  };
  /** Array of captured frames */
  frames: VRTFrame[];
}

/**
 * Options for VRTRecorder
 */
export interface VRTRecorderOptions {
  /** How often to capture screenshots (in milliseconds, default: 100) */
  interval?: number;
  /** Path where the recording should be saved */
  outputPath?: string;
  /** Description for this recording */
  description?: string;
  /** Additional metadata to include in recording */
  metadata?: Record<string, any>;
}

/**
 * Options for VRTPlayer
 */
export interface VRTPlayerOptions {
  /** Playback speed multiplier (1.0 = normal, 2.0 = 2x speed, default: 1.0) */
  speed?: number;
  /** Callback called for each frame */
  onFrame?: (frame: VRTFrame, index: number) => void;
  /** Whether to write frames to stdout (default: false) */
  writeToStdout?: boolean;
}

/**
 * Options for VRTComparator
 */
export interface VRTComparatorOptions {
  /** Allow this many different characters before considering frames different (default: 0) */
  threshold?: number;
  /** Ignore ANSI color codes when comparing (default: false) */
  ignoreColors?: boolean;
  /** Ignore whitespace differences (default: false) */
  ignoreWhitespace?: boolean;
}

/**
 * Result of comparing two VRT recordings
 */
export interface VRTComparisonResult {
  /** Whether the recordings match */
  match: boolean;
  /** Total number of frames compared */
  totalFrames: number;
  /** Number of frames that matched */
  matchedFrames: number;
  /** Number of frames that differed */
  differentFrames: number;
  /** Indices of frames that differed */
  differentFrameIndices: number[];
  /** Detailed differences per frame (if any) */
  differences?: VRTFrameDifference[];
}

/**
 * Detailed difference information for a single frame
 */
export interface VRTFrameDifference {
  /** Frame index */
  frameIndex: number;
  /** Expected screenshot */
  expected: string;
  /** Actual screenshot */
  actual: string;
  /** Number of different characters */
  diffCount: number;
  /** Human-readable diff (optional) */
  diff?: string;
}
