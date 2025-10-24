---
sidebar_position: 3
---

# Runtime API

The Runtime interface provides platform-specific APIs through dependency injection.

## Overview

The runtime system allows unblessed to work across different platforms (Node.js, browsers, Deno, etc.) by abstracting platform-specific operations behind a common interface.

**Key Concepts**:
- **Runtime Interface**: Defines what platforms must provide
- **Runtime Context**: Global singleton holding the current runtime
- **Platform Implementations**: Node.js runtime, browser runtime, etc.
- **Dependency Injection**: Core code uses runtime instead of direct imports

## Runtime Interface

```typescript
export interface Runtime {
  // === Core APIs (Required) ===
  fs: FileSystemAPI;           // File operations
  path: PathAPI;               // Path manipulation
  process: ProcessAPI;         // Process I/O, env, events
  buffer: BufferAPI;           // Buffer operations
  url: UrlAPI;                 // URL utilities
  utils: UtilsAPI;             // Util, stream, string decoder

  // === Optional APIs ===
  images?: ImageAPI;           // PNG/GIF (Image widgets only)
  processes?: ProcessesAPI;    // Child processes (Terminal widget, tools)
  networking?: NetworkingAPI;  // Net/TTY (GPM mouse only)
}
```

## Core APIs (Required)

### FileSystemAPI

```typescript
export interface FileSystemAPI {
  readFileSync(path: string, encoding?: BufferEncoding): string | Buffer;
  writeFileSync(path: string, data: string | Buffer, encoding?: BufferEncoding): void;
  existsSync(path: string): boolean;
  statSync(path: string): Stats;
  readFile(path: string, callback: (err: Error | null, data?: Buffer) => void): void;
  readFile(path: string, encoding: BufferEncoding, callback: (err: Error | null, data?: string) => void): void;
  writeFile(path: string, data: string | Buffer, callback: (err: Error | null) => void): void;
  unlink(path: string, callback: (err: Error | null) => void): void;
}
```

**Used for**: Reading terminfo/termcap files, fonts, temporary files.

### PathAPI

```typescript
export interface PathAPI {
  resolve(...paths: string[]): string;
  join(...paths: string[]): string;
  dirname(path: string): string;
  basename(path: string, ext?: string): string;
  extname(path: string): string;
  sep: string;  // Platform separator ('/' or '\\')
}
```

**Used for**: Path manipulation, module resolution.

### ProcessAPI

```typescript
export interface ProcessAPI {
  platform: 'browser' | NodeJS.Platform;
  env: Record<string, string | undefined>;
  stdin?: Readable;
  stdout?: Writable;
  stderr?: Writable;
  cwd(): string;
  title: string;
  nextTick(callback: Function): void;
  on(event: string, listener: Function): any;
  once(event: string, listener: Function): any;
  removeListener(event: string, listener: Function): any;
  exit(code?: number): never;
}
```

**Used for**: I/O streams, environment variables, process events.

### BufferAPI

```typescript
export interface BufferAPI {
  Buffer: typeof Buffer;
}
```

**Used for**: Binary data operations, terminal I/O.

### UrlAPI

```typescript
export interface UrlAPI {
  fileURLToPath(url: string | URL): string;
}
```

**Used for**: Converting file:// URLs to paths.

### UtilsAPI

```typescript
export interface UtilsAPI {
  util: UtilAPI;
  stream: StreamAPI;
  stringDecoder: StringDecoderAPI;
}

interface UtilAPI {
  inspect(object: any, options?: any): string;
  format(format: string, ...args: any[]): string;
}

interface StreamAPI {
  Readable: typeof Readable;
  Writable: typeof Writable;
}

interface StringDecoderAPI {
  StringDecoder: typeof StringDecoder;
}
```

**Used for**: Logging, formatting, I/O operations.

## Optional APIs

### ImageAPI

```typescript
export interface ImageAPI {
  png: PngAPI;
  gif: GifAPI;
}

interface PngAPI {
  PNG: typeof PNG;  // pngjs
}

interface GifAPI {
  GifReader: typeof GifReader;  // omggif
}
```

**Used for**: Image widget, PNG/GIF rendering.

### ProcessesAPI

```typescript
export interface ProcessesAPI {
  childProcess: ChildProcessAPI;
}

interface ChildProcessAPI {
  spawn(command: string, args?: string[], options?: any): ChildProcess;
  exec(command: string, callback?: Function): ChildProcess;
  execSync(command: string, options?: any): Buffer | string;
}
```

**Used for**: Terminal widget, spawning editors (vi, w3m), image tools.

### NetworkingAPI

```typescript
export interface NetworkingAPI {
  net: NetAPI;
  tty: TtyAPI;
}

interface NetAPI {
  connect(options: any, callback?: Function): Socket;
  createConnection(options: any, callback?: Function): Socket;
}

interface TtyAPI {
  ReadStream: typeof ReadStream;
  WriteStream: typeof WriteStream;
  isatty(fd: number): boolean;
}
```

**Used for**: GPM mouse protocol (Linux console only - very rare).

## Runtime Context

### getRuntime()

Get the current runtime instance.

```typescript
export function getRuntime(): Runtime
```

**Returns**: The current runtime instance

**Throws**: Error if runtime not initialized

**Example**:
```typescript
import { getRuntime } from '@unblessed/core/runtime-context';

const runtime = getRuntime();
const data = runtime.fs.readFileSync('/path/to/file');
```

### setRuntime()

Set the global runtime instance.

```typescript
export function setRuntime(runtime: Runtime): void
```

**Parameters**:
- `runtime` - Runtime instance to use

**Throws**: Error if runtime already initialized (except in tests)

**Example**:
```typescript
import { setRuntime } from '@unblessed/core/runtime-context';
import { NodeRuntime } from './node-runtime';

setRuntime(new NodeRuntime());
```

**Note**: Platform packages call this automatically. You rarely need to call it directly.

## Platform Implementations

### Node.js Runtime

Provides real Node.js APIs:

```typescript
import { getNodeRuntime } from '@unblessed/node';

// Auto-initializes runtime
const runtime = getNodeRuntime();

// Use real fs module
const data = runtime.fs.readFileSync('/etc/hosts', 'utf8');
```

**Features**:
- ✅ All core APIs (real Node.js modules)
- ✅ All optional APIs (images, processes, networking)
- ✅ Full file system access
- ✅ Full process control
- ✅ Native performance

### Browser Runtime

Provides polyfills and stubs:

```typescript
import '@unblessed/browser';  // Auto-initializes runtime

import { getRuntime } from '@unblessed/core/runtime-context';

const runtime = getRuntime();

// Virtual fs with bundled data
const term info = runtime.fs.readFileSync('/usr/share/terminfo/x/xterm');
```

**Features**:
- ✅ Core APIs (polyfills via npm packages)
- ⚠️ Virtual fs (bundled terminfo/fonts only)
- ⚠️ process stub (platform: 'browser', no real process)
- ⚠️ Optional APIs throw errors (no child processes, etc.)
- ⚠️ Limited functionality (browser constraints)

### Test Runtime

Provides real Node.js APIs for testing:

```typescript
import { initTestRuntime } from '../__tests__/helpers/mock';

beforeAll(() => {
  initTestRuntime();
});

test('uses runtime', () => {
  const runtime = getRuntime();
  expect(runtime.process.platform).not.toBe('browser');
});
```

**Features**:
- ✅ Real Node.js APIs
- ✅ Can be re-initialized (for testing)
- ✅ Environment variable mocking

## Usage

### Using Runtime in Code

```typescript
import { getRuntime } from '@unblessed/core/runtime-context';

function loadTerminfo(term: string): Buffer {
  const runtime = getRuntime();

  // Use runtime.fs instead of import fs
  const path = runtime.path.join('/usr/share/terminfo', term[0], term);

  if (!runtime.fs.existsSync(path)) {
    throw new Error(`Terminfo not found: ${term}`);
  }

  return runtime.fs.readFileSync(path);
}
```

### Feature Detection

Check if optional APIs are available:

```typescript
import { getRuntime } from '@unblessed/core/runtime-context';

function canRenderImages(): boolean {
  const runtime = getRuntime();
  return runtime.images !== undefined;
}

function parseImage(buffer: Buffer) {
  const runtime = getRuntime();

  if (!runtime.images) {
    throw new Error('Image support not available');
  }

  const png = runtime.images.png.PNG.sync.read(buffer);
  return png;
}
```

### Type-Safe Feature Detection

Use type guards for compile-time safety:

```typescript
export function hasImageSupport(
  runtime: Runtime
): runtime is Runtime & { images: ImageAPI } {
  return runtime.images !== undefined;
}

export function hasProcessSupport(
  runtime: Runtime
): runtime is Runtime & { processes: ProcessesAPI } {
  return runtime.processes !== undefined;
}

// Usage
const runtime = getRuntime();

if (hasImageSupport(runtime)) {
  // TypeScript knows runtime.images exists here!
  const png = runtime.images.png.PNG.sync.read(buffer);
}
```

### Platform Detection

```typescript
import { getRuntime } from '@unblessed/core/runtime-context';

const runtime = getRuntime();

if (runtime.process.platform === 'browser') {
  console.log('Running in browser');
} else {
  console.log('Running in Node.js');
}
```

### Accessing Environment Variables

```typescript
const runtime = getRuntime();

const term = runtime.process.env.TERM || 'xterm-256color';
const editor = runtime.process.env.EDITOR || 'vi';
const home = runtime.process.env.HOME || '/';
```

### Using Streams

```typescript
const runtime = getRuntime();

const { Readable, Writable } = runtime.utils.stream;

const readable = new Readable();
readable.push('Hello\n');
readable.push(null);

readable.pipe(runtime.process.stdout);
```

### Buffer Operations

```typescript
const runtime = getRuntime();
const Buffer = runtime.buffer.Buffer;

const buf = Buffer.from('Hello', 'utf8');
const hex = buf.toString('hex');
```

## Examples

### Platform-Agnostic File Loading

```typescript
import { getRuntime } from '@unblessed/core/runtime-context';

function loadConfig(): Config {
  const runtime = getRuntime();

  if (runtime.process.platform === 'browser') {
    // Browser: fetch from server
    const configData = runtime.fs.readFileSync('/bundled/config.json', 'utf8');
    return JSON.parse(configData);
  } else {
    // Node.js: read from file system
    const configPath = runtime.path.join(runtime.process.cwd(), 'config.json');
    const configData = runtime.fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  }
}
```

### Conditional Feature Usage

```typescript
import { getRuntime } from '@unblessed/core/runtime-context';

function displayImage(path: string) {
  const runtime = getRuntime();

  if (!runtime.processes) {
    console.warn('Cannot display images: child processes not available');
    return;
  }

  // Spawn w3m to display image
  const w3m = runtime.processes.childProcess.spawn('w3m', [
    '-T', 'text/html'
  ], {
    stdio: ['pipe', 1, 2]
  });

  w3m.stdin.write(`<img src="${path}">`);
  w3m.stdin.end();
}
```

### Custom Runtime Implementation

```typescript
import { setRuntime, type Runtime } from '@unblessed/core';

class DenoRuntime implements Runtime {
  fs = {
    readFileSync: (path: string) => {
      return Deno.readTextFileSync(path);
    },
    existsSync: (path: string) => {
      try {
        Deno.statSync(path);
        return true;
      } catch {
        return false;
      }
    },
    // ... implement other fs methods
  };

  path = {
    join: (...paths: string[]) => paths.join('/'),
    resolve: (...paths: string[]) => '/' + paths.join('/'),
    // ... implement other path methods
  };

  process = {
    platform: Deno.build.os,
    env: Object.fromEntries(Deno.env.toObject()),
    stdin: Deno.stdin,
    stdout: Deno.stdout,
    cwd: () => Deno.cwd(),
    // ... implement other process methods
  };

  buffer = {
    Buffer: globalThis.Buffer  // or polyfill
  };

  url = {
    fileURLToPath: (url: string) => url.replace('file://', '')
  };

  utils = {
    util: {
      inspect: (obj: any) => JSON.stringify(obj),
      format: (fmt: string, ...args: any[]) => /* ... */
    },
    stream: {
      Readable: /* ... */,
      Writable: /* ... */
    },
    stringDecoder: {
      StringDecoder: /* ... */
    }
  };

  // Optional APIs
  processes = undefined;
  images = undefined;
  networking = undefined;
}

// Initialize
setRuntime(new DenoRuntime());
```

### Testing with Mock Runtime

```typescript
import { beforeEach, describe, it, expect } from 'vitest';
import { setRuntime, getRuntime } from '@unblessed/core';

describe('loadTerminfo', () => {
  beforeEach(() => {
    // Create mock runtime
    const mockRuntime: Runtime = {
      fs: {
        readFileSync: vi.fn((path: string) => {
          if (path.includes('xterm')) {
            return Buffer.from('mock terminfo data');
          }
          throw new Error('File not found');
        }),
        existsSync: vi.fn((path: string) => {
          return path.includes('xterm');
        }),
        // ... other fs methods
      },
      path: {
        join: (...paths: string[]) => paths.join('/'),
        // ... other path methods
      },
      // ... other required APIs
    };

    setRuntime(mockRuntime);
  });

  it('loads terminfo', () => {
    const data = loadTerminfo('xterm');
    expect(data).toBeDefined();

    const runtime = getRuntime();
    expect(runtime.fs.readFileSync).toHaveBeenCalled();
  });
});
```

## API Usage by Feature

### Always Required (Core APIs)

- `fs` - Terminfo/termcap loading, font loading (24 uses)
- `path` - Path manipulation (22 uses)
- `process` - I/O, environment, events (41 uses)
- `buffer` - I/O operations (7 uses)
- `url` - Module resolution (1 use)
- `utils` - Formatting, logging, I/O (10 uses)

### Conditionally Required (Optional APIs)

- `images` - Image widget only (2 uses)
  - PNG parsing and rendering
  - GIF parsing and rendering

- `processes` - Terminal widget, image tools (13 uses)
  - Spawning text editors (vi, nano, etc.)
  - Running image tools (curl, w3m, ImageMagick)
  - Terminal widget (screen.spawn, screen.exec)

- `networking` - GPM mouse only (1 use)
  - GPM mouse protocol on Linux console (very rare)

## Best Practices

### 1. Always Use Runtime Context

```typescript
// ❌ Bad - direct import (platform-specific)
import fs from 'fs';
const data = fs.readFileSync(path);

// ✅ Good - use runtime context (platform-agnostic)
import { getRuntime } from '@unblessed/core/runtime-context';
const runtime = getRuntime();
const data = runtime.fs.readFileSync(path);
```

### 2. Check Optional APIs

```typescript
// ❌ Bad - assumes API exists
const png = runtime.images.png.PNG.sync.read(buffer);  // May crash!

// ✅ Good - check first
if (!runtime.images) {
  throw new Error('Image support not available');
}
const png = runtime.images.png.PNG.sync.read(buffer);
```

### 3. Use Type-Safe Feature Detection

```typescript
// ❌ Bad - no type safety
if (runtime.processes) {
  runtime.processes.childProcess.spawn(...);  // TypeScript unsure
}

// ✅ Good - type-safe guard
if (hasProcessSupport(runtime)) {
  runtime.processes.childProcess.spawn(...);  // TypeScript knows it exists
}
```

### 4. Platform-Specific Fallbacks

```typescript
// ✅ Good - graceful degradation
function displayImage(path: string) {
  const runtime = getRuntime();

  if (runtime.processes) {
    // Use external tool
    runtime.processes.childProcess.spawn('w3m', [path]);
  } else if (runtime.images) {
    // Parse and render inline
    const buf = runtime.fs.readFileSync(path);
    const png = runtime.images.png.PNG.sync.read(buf);
    renderInline(png);
  } else {
    // Show placeholder
    console.log(`[Image: ${path}]`);
  }
}
```

### 5. Never Modify Global Runtime

```typescript
// ❌ Bad - modifies shared runtime
const runtime = getRuntime();
runtime.process.env.TERM = 'xterm';  // Affects all code!

// ✅ Good - create local copy
const runtime = getRuntime();
const localEnv = { ...runtime.process.env, TERM: 'xterm' };
```

## Troubleshooting

### Runtime Not Initialized

**Error**: `Runtime not initialized`

**Cause**: `getRuntime()` called before platform initialization.

**Solution**:
```typescript
// Make sure to import platform package first
import '@unblessed/node';  // or @unblessed/browser

// Now runtime is initialized
import { getRuntime } from '@unblessed/core/runtime-context';
const runtime = getRuntime();
```

### Runtime Already Initialized

**Error**: `Runtime already initialized`

**Cause**: Trying to call `setRuntime()` twice in non-test environment.

**Solution**: Don't call `setRuntime()` manually - platform packages handle it.

### API Not Available

**Error**: `Cannot read property 'X' of undefined`

**Cause**: Accessing optional API that doesn't exist in current platform.

**Solution**: Check API exists before using:
```typescript
if (!runtime.images) {
  throw new Error('Image support not available');
}
```

### Platform Detection Issues

**Problem**: Need to detect platform accurately.

**Solution**: Check `runtime.process.platform`:
```typescript
const runtime = getRuntime();

if (runtime.process.platform === 'browser') {
  // Browser-specific code
} else if (runtime.process.platform === 'win32') {
  // Windows-specific code
} else {
  // Unix-like systems
}
```

## See Also

- [Architecture](/docs/concepts/architecture) - Runtime system overview
- [Runtime System](/docs/concepts/runtime-system) - Detailed runtime documentation
- [Platform Differences](/docs/platforms/differences) - Cross-platform considerations
- [Node.js Platform](/docs/platforms/nodejs) - Node.js runtime details
- [Browser Platform](/docs/platforms/browser) - Browser runtime details
