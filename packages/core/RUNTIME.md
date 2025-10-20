Tui Runtime Architecture - Complete Explanation

🎯 The Core Problem

Terminal UI libraries are traditionally tightly coupled to Node.js APIs:
import fs from 'fs';           // ❌ Only works in Node.js
import process from 'process'; // ❌ Only works in Node.js
import { Buffer } from 'buffer'; // ❌ Only works in Node.js

This makes them impossible to run in browsers or other JavaScript environments.

  ---
💡 The Solution: Runtime Abstraction

We abstract ALL platform operations behind interfaces that can be implemented differently for each platform:

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  @unblessed/core  │────▶│   Runtime    │◀────│   Platform   │
│  (widgets)   │     │  (interface) │     │ (Node/Browser)│
└──────────────┘     └──────────────┘     └──────────────┘

  ---
📦 The Three Layers

Layer 1: Runtime Interface (@unblessed/core/src/runtime.ts)

Defines what a runtime MUST provide:

export interface Runtime {
// ========== CORE (Required) ==========
fs: FileSystemAPI;      // File operations
path: PathAPI;          // Path manipulation
process: ProcessAPI;    // Process I/O, env, events
buffer: BufferAPI;      // Buffer operations
url: UrlAPI;           // URL utils (fileURLToPath)
utils: UtilsAPI;       // util, stream, stringDecoder

    // ========== OPTIONAL ==========
    images?: ImageAPI;          // PNG/GIF (Image widgets only)
    processes?: ProcessesAPI;   // Child processes (Terminal, image tools)
    networking?: NetworkingAPI; // Net/TTY (GPM mouse only)
}

Each API is itself an interface:
export interface FileSystemAPI {
readFileSync: typeof fs.readFileSync;
existsSync: typeof fs.existsSync;
// ... only methods we actually use
}

Why grouped?
- Core: Used by EVERY widget (I/O, logging, events)
- Optional: Used by SPECIFIC widgets (images, terminal, GPM)

  ---
Layer 2: Runtime Context (@unblessed/core/src/runtime-context.ts)

A global singleton that holds the current runtime:

let runtime: Runtime | null = null;

export function setRuntime(rt: Runtime): void {
if (runtime && runtime !== rt) {
const isTest = process.env?.NODE_ENV === 'test';
if (!isTest) {
throw new Error('Runtime already initialized');
}
}
runtime = rt;
}

export function getRuntime(): Runtime {
if (!runtime) {
throw new Error('Runtime not initialized');
}
return runtime;
}

Key behaviors:
- ✅ One runtime per process/tab
- ✅ Set once at startup
- ✅ Used everywhere via getRuntime()
- ❌ Cannot re-initialize (except tests)

  ---
Layer 3: Platform Implementations

A. @unblessed/node - Node.js Runtime

Simply wraps real Node.js modules:

import fs from 'fs';
import process from 'process';
import { PNG } from 'pngjs';
// ...

export class NodeRuntime implements Runtime {
fs = fs;
path = path;
process = process;
buffer = { Buffer };
url = url;
utils = {
util,
stream: { Readable, Writable },
stringDecoder: { StringDecoder },
};

    // Optional - all provided in Node.js
    images = { png: { PNG }, gif: { GifReader } };
    processes = { childProcess: child_process };
    networking = { net, tty };
}

// Singleton
let nodeRuntime: NodeRuntime | null = null;

export function getNodeRuntime(): NodeRuntime {
if (!nodeRuntime) {
nodeRuntime = new NodeRuntime();
setRuntime(nodeRuntime);  // Register globally!
}
return nodeRuntime;
}

Key points:
- Zero overhead (direct assignments)
- Provides ALL APIs
- Singleton pattern

  ---
B. @unblessed/browser - Browser Runtime

Provides polyfills and stubs:

// STEP 1: Global polyfills (BEFORE imports!)
if (typeof globalThis.process === 'undefined') {
globalThis.process = {
platform: 'browser',
env: { TERM: 'xterm-256color' },
nextTick: (fn) => setTimeout(fn, 0),
on: (event, listener) => { /*...*/ },
// ...
};
}

if (typeof globalThis.Buffer === 'undefined') {
globalThis.Buffer = Buffer;
}

// STEP 2: BrowserRuntime
class BrowserRuntime implements Runtime {
constructor() {
// Virtual FS with bundled data
this.fs = {
readFileSync: (path) => {
if (path.includes('xterm')) return xtermData;
if (path.includes('ter-u14')) return fontData;
throw new Error('File not found');
},
existsSync: (path) => /* check bundled data */,
};

      this.path = path; // path-browserify
      this.process = globalThis.process;
      this.buffer = { Buffer };
      this.url = { fileURLToPath: (url) => url.toString().replace('file://', '') };
      this.utils = { util: browserUtil, /*...*/ };

      // Optional - stubs that throw
      this.processes = {
        childProcess: {
          spawn: () => { throw new Error('Not in browser'); },
        },
      };
      this.images = {
        png: { PNG: class { constructor() { throw new Error('No PNG'); } } },
      };
    }
}

// STEP 3: Auto-initialize!
const runtime = new BrowserRuntime();
setRuntime(runtime);

Key points:
- Global polyfills FIRST (process, Buffer)
- Virtual FS with bundled terminfo/fonts
- Stubs throw helpful errors
- Auto-initializes when module loads

  ---
C. Tests - Mock Runtime

Global setup for all tests:

// __tests__/setup.js
import { beforeAll } from 'vitest';
import { setRuntime } from '../src/runtime-context.js';
import fs from 'fs';
import { PNG } from 'pngjs';
// ...

beforeAll(() => {
setRuntime({
// Core - real Node.js
fs,
path,
process,
buffer: { Buffer },
url,
utils: { util, stream: { Readable, Writable }, stringDecoder: { StringDecoder } },

      // Optional - real implementations
      images: { png: { PNG }, gif: { GifReader } },
      processes: { childProcess },
      networking: { net, tty },
    });
});

Why:
- Tests run in Node.js (real APIs available)
- Single setup for ALL tests
- Runs before any test file loads

  ---
🔄 How It All Works Together

Initialization Flow

Node.js App:
1. import { getNodeRuntime } from '@unblessed/node'
2. getNodeRuntime()  // Creates NodeRuntime, calls setRuntime()
3. import { Screen, Box } from '@unblessed/core'
4. new Screen()  // Internally calls getRuntime() → gets NodeRuntime
5. ✅ Works with real fs, process, etc.

Browser App:
1. import '@unblessed/browser'  // Auto-runs at module load!
   a. Sets up global polyfills (process, Buffer)
   b. Creates BrowserRuntime
   c. Calls setRuntime()
2. import { Screen, Box } from '@unblessed/core'
3. new Screen()  // Internally calls getRuntime() → gets BrowserRuntime
4. ✅ Works with polyfills/stubs

Tests:
1. Vitest loads __tests__/setup.js
2. beforeAll() calls setRuntime() with real Node.js APIs
3. Test files load
4. Tests create widgets  // getRuntime() → gets test runtime
5. ✅ Works with real Node.js behavior

  ---
How Core Code Uses Runtime

Example 1: File Operations
// lib/tput.ts
import { getRuntime } from '../runtime-context.js';

class Tput {
loadTerminfo(term: string) {
const runtime = getRuntime();  // Get current runtime

      // Use runtime.fs (not import fs!)
      const data = runtime.fs.readFileSync(
        runtime.path.join('/usr/share/terminfo', term)
      );

      return this.parseTerminfo(data);
    }
}

Example 2: I/O Operations
// lib/program.ts
import { getRuntime } from '../runtime-context.js';

class Program {
setupDump() {
const runtime = getRuntime();

      // StringDecoder from runtime.utils
      const decoder = new runtime.utils.stringDecoder.StringDecoder('utf8');

      this.on('data', (data) => {
        const str = decoder.write(data);
        this.log(str);
      });
    }
}

Example 3: Optional APIs with Feature Detection
// lib/image-renderer.ts
import { getRuntime } from '../runtime-context.js';

class ImageRenderer {
parsePNG(buffer: Buffer) {
const runtime = getRuntime();

      // Check if optional API exists
      if (!runtime.images) {
        throw new Error('Image support not available');
      }

      // Use it
      const png = runtime.images.png.PNG.sync.read(buffer);
      return png;
    }
}

The Pattern:
1. Import getRuntime (never import fs, process, etc.!)
2. Call getRuntime() to get current runtime
3. Use runtime.api.method() instead of direct imports
4. For optional APIs, check existence first

  ---
🎨 Feature Detection Helpers

Type-safe guards for optional APIs:

// runtime.ts
export function hasImageSupport(runtime: Runtime):
runtime is Runtime & { images: ImageAPI } {
return runtime.images !== undefined;
}

// Usage:
const runtime = getRuntime();

if (hasImageSupport(runtime)) {
// TypeScript knows runtime.images exists here!
const png = runtime.images.png.PNG.sync.read(buffer);
}

  ---
📊 API Usage Analysis

Core APIs (Required):
- fs (24 uses) - terminfo, fonts, data files
- path (22 uses) - path manipulation
- process (41 uses) - I/O, env, events, nextTick
- buffer (7 uses) - I/O operations
- url (1 use) - fileURLToPath for module resolution
- utils (10 uses) - formatting, string decoding, I/O

Optional APIs:
- images (2 uses) - PNG/GIF in image-renderer.ts only
- processes (13 uses) - Terminal widget, image tools (curl, w3m, ImageMagick)
- networking (1 use) - GPM mouse (Linux console only, very rare)

  ---
💪 Why This Design?

Benefits:

1. Platform Agnostic - Same code runs in Node.js, browsers, Deno, Bun
2. Testable - Easy to mock any API
3. Tree Shakeable - Unused optional APIs not bundled
4. Type Safe - Full TypeScript support
5. Clear Dependencies - Easy to see what's used where

Trade-offs:

1. Extra Indirection - runtime.fs.readFileSync() vs fs.readFileSync() (minimal overhead)
2. Runtime Errors - Wrong API fails at runtime (but TypeScript helps)
3. Setup Required - Must call setRuntime() (but platforms handle automatically)

  ---
🎯 Summary

The runtime system is a dependency injection pattern where:

1. @unblessed/core/src/runtime.ts defines interfaces (what platforms must provide)
2. @unblessed/core/src/runtime-context.ts holds global singleton (getRuntime/setRuntime)
3. Platform packages implement Runtime interface:
   - @unblessed/node → Real Node.js APIs
   - @unblessed/browser → Polyfills + stubs
   - tests → Real Node.js for testing
4. Core code uses getRuntime() everywhere (never direct imports)
5. Optional features use type-safe detection

This allows one codebase to work across multiple platforms while maintaining type safety and testability.