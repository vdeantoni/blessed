# Interface: Runtime

Defined in: [packages/core/src/runtime.ts:111](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L111)

Complete runtime abstraction interface
All @unblessed/core modules accept this interface for platform operations

Core APIs (always required):
- fs, path, process, buffer, url, utils

Optional APIs (use feature detection):
- images: PNG/GIF rendering (only needed by Image widgets)
- processes: Child process spawning (Terminal widget, image tools)
- networking: Network and TTY operations (GPM mouse - very rare)

## Properties

### fs

> **fs**: [`FileSystemAPI`](runtime.Interface.FileSystemAPI.md)

Defined in: [packages/core/src/runtime.ts:117](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L117)

File system operations

***

### path

> **path**: [`PathAPI`](runtime.Interface.PathAPI.md)

Defined in: [packages/core/src/runtime.ts:119](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L119)

Path manipulation operations

***

### process

> **process**: [`ProcessAPI`](runtime.Interface.ProcessAPI.md)

Defined in: [packages/core/src/runtime.ts:121](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L121)

Process operations (stdin/stdout/env/etc)

***

### buffer

> **buffer**: [`BufferAPI`](runtime.Interface.BufferAPI.md)

Defined in: [packages/core/src/runtime.ts:123](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L123)

Buffer operations

***

### url

> **url**: [`UrlAPI`](runtime.Interface.UrlAPI.md)

Defined in: [packages/core/src/runtime.ts:125](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L125)

URL operations (fileURLToPath for module resolution)

***

### utils

> **utils**: [`UtilsAPI`](runtime.Interface.UtilsAPI.md)

Defined in: [packages/core/src/runtime.ts:127](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L127)

Utility functions and streams

***

### images?

> `optional` **images**: [`ImageAPI`](runtime.Interface.ImageAPI.md)

Defined in: [packages/core/src/runtime.ts:134](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L134)

Image processing (PNG/GIF rendering) - Optional

***

### processes?

> `optional` **processes**: [`ProcessesAPI`](runtime.Interface.ProcessesAPI.md)

Defined in: [packages/core/src/runtime.ts:136](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L136)

Process spawning - Optional

***

### networking?

> `optional` **networking**: [`NetworkingAPI`](runtime.Interface.NetworkingAPI.md)

Defined in: [packages/core/src/runtime.ts:138](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L138)

Networking and TTY operations - Optional
