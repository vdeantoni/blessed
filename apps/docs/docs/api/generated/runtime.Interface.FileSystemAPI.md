# Interface: FileSystemAPI

Defined in: [packages/core/src/runtime.ts:171](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L171)

File system operations interface

## Remarks

Subset of Node.js fs module needed by unblessed for:

- Reading terminfo/termcap files
- Loading font definitions
- Logging and debugging
- Temporary file operations

## Examples

```typescript
const runtime = getRuntime();
const data = runtime.fs.readFileSync("/usr/share/terminfo/x/xterm");
```

```typescript
const runtime = getRuntime();
if (runtime.fs.existsSync("/path/to/file")) {
  const content = runtime.fs.readFileSync("/path/to/file", "utf8");
}
```

## Properties

### readFileSync()

> **readFileSync**: \{(`path`, `options?`): `NonSharedBuffer`; (`path`, `options`): `string`; (`path`, `options?`): `string` \| `NonSharedBuffer`; \}

Defined in: [packages/core/src/runtime.ts:172](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L172)

#### Call Signature

> (`path`, `options?`): `NonSharedBuffer`

Returns the contents of the `path`.

For detailed information, see the documentation of the asynchronous version of
this API: [readFile](#readfile).

If the `encoding` option is specified then this function returns a
string. Otherwise it returns a buffer.

Similar to [readFile](#readfile), when the path is a directory, the behavior of `fs.readFileSync()` is platform-specific.

```js
import { readFileSync } from "node:fs";

// macOS, Linux, and Windows
readFileSync("<directory>");
// => [Error: EISDIR: illegal operation on a directory, read <directory>]

//  FreeBSD
readFileSync("<directory>"); // => <data>
```

##### Parameters

###### path

`PathOrFileDescriptor`

filename or file descriptor

###### options?

\{ `encoding?`: `null`; `flag?`: `string`; \} | `null`

##### Returns

`NonSharedBuffer`

##### Since

v0.1.8

#### Call Signature

> (`path`, `options`): `string`

Synchronously reads the entire contents of a file.

##### Parameters

###### path

`PathOrFileDescriptor`

A path to a file. If a URL is provided, it must use the `file:` protocol.
If a file descriptor is provided, the underlying file will _not_ be closed automatically.

###### options

Either the encoding for the result, or an object that contains the encoding and an optional flag.
If a flag is not provided, it defaults to `'r'`.

`BufferEncoding` | \{ `encoding`: `BufferEncoding`; `flag?`: `string`; \}

##### Returns

`string`

#### Call Signature

> (`path`, `options?`): `string` \| `NonSharedBuffer`

Synchronously reads the entire contents of a file.

##### Parameters

###### path

`PathOrFileDescriptor`

A path to a file. If a URL is provided, it must use the `file:` protocol.
If a file descriptor is provided, the underlying file will _not_ be closed automatically.

###### options?

Either the encoding for the result, or an object that contains the encoding and an optional flag.
If a flag is not provided, it defaults to `'r'`.

`BufferEncoding` | `ObjectEncodingOptions` & `object` | `null`

##### Returns

`string` \| `NonSharedBuffer`

---

### readdirSync()

> **readdirSync**: \{(`path`, `options?`): `string`[]; (`path`, `options`): `Buffer`\<`ArrayBufferLike`\>[]; (`path`, `options?`): `string`[] \| `Buffer`\<`ArrayBufferLike`\>[]; (`path`, `options`): `Dirent`\<`string`\>[]; (`path`, `options`): `Dirent`\<`Buffer`\<`ArrayBufferLike`\>\>[]; \}

Defined in: [packages/core/src/runtime.ts:173](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L173)

#### Call Signature

> (`path`, `options?`): `string`[]

Reads the contents of the directory.

See the POSIX [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames returned. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as `Buffer` objects.

If `options.withFileTypes` is set to `true`, the result will contain `fs.Dirent` objects.

##### Parameters

###### path

`PathLike`

###### options?

`BufferEncoding` | \{ `encoding`: BufferEncoding \| null; `withFileTypes?`: `false`; `recursive?`: `boolean`; \} | `null`

##### Returns

`string`[]

##### Since

v0.1.21

#### Call Signature

> (`path`, `options`): `Buffer`\<`ArrayBufferLike`\>[]

Synchronous readdir(3) - read a directory.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options

The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.

\{ `encoding`: `"buffer"`; `withFileTypes?`: `false`; `recursive?`: `boolean`; \} | `"buffer"`

##### Returns

`Buffer`\<`ArrayBufferLike`\>[]

#### Call Signature

> (`path`, `options?`): `string`[] \| `Buffer`\<`ArrayBufferLike`\>[]

Synchronous readdir(3) - read a directory.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options?

The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.

`BufferEncoding` | `ObjectEncodingOptions` & `object` | `null`

##### Returns

`string`[] \| `Buffer`\<`ArrayBufferLike`\>[]

#### Call Signature

> (`path`, `options`): `Dirent`\<`string`\>[]

Synchronous readdir(3) - read a directory.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options

`ObjectEncodingOptions` & `object`

If called with `withFileTypes: true` the result data will be an array of Dirent.

##### Returns

`Dirent`\<`string`\>[]

#### Call Signature

> (`path`, `options`): `Dirent`\<`Buffer`\<`ArrayBufferLike`\>\>[]

Synchronous readdir(3) - read a directory.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options

Must include `withFileTypes: true` and `encoding: 'buffer'`.

###### encoding

`"buffer"`

###### withFileTypes

`true`

###### recursive?

`boolean`

##### Returns

`Dirent`\<`Buffer`\<`ArrayBufferLike`\>\>[]

---

### existsSync()

> **existsSync**: (`path`) => `boolean`

Defined in: [packages/core/src/runtime.ts:174](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L174)

Returns `true` if the path exists, `false` otherwise.

For detailed information, see the documentation of the asynchronous version of
this API: exists.

`fs.exists()` is deprecated, but `fs.existsSync()` is not. The `callback` parameter to `fs.exists()` accepts parameters that are inconsistent with other
Node.js callbacks. `fs.existsSync()` does not use a callback.

```js
import { existsSync } from "node:fs";

if (existsSync("/etc/passwd")) console.log("The path exists.");
```

#### Parameters

##### path

`PathLike`

#### Returns

`boolean`

#### Since

v0.1.21

---

### statSync

> **statSync**: `StatSyncFn`

Defined in: [packages/core/src/runtime.ts:175](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L175)

---

### mkdirSync()

> **mkdirSync**: \{(`path`, `options`): `string` \| `undefined`; (`path`, `options?`): `void`; (`path`, `options?`): `string` \| `undefined`; \}

Defined in: [packages/core/src/runtime.ts:176](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L176)

#### Call Signature

> (`path`, `options`): `string` \| `undefined`

Synchronously creates a directory. Returns `undefined`, or if `recursive` is `true`, the first directory path created.
This is the synchronous version of mkdir.

See the POSIX [`mkdir(2)`](http://man7.org/linux/man-pages/man2/mkdir.2.html) documentation for more details.

##### Parameters

###### path

`PathLike`

###### options

`MakeDirectoryOptions` & `object`

##### Returns

`string` \| `undefined`

##### Since

v0.1.21

#### Call Signature

> (`path`, `options?`): `void`

Synchronous mkdir(2) - create a directory.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options?

Either the file mode, or an object optionally specifying the file mode and whether parent folders
should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.

`Mode` | `MakeDirectoryOptions` & `object` | `null`

##### Returns

`void`

#### Call Signature

> (`path`, `options?`): `string` \| `undefined`

Synchronous mkdir(2) - create a directory.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options?

Either the file mode, or an object optionally specifying the file mode and whether parent folders
should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.

`MakeDirectoryOptions` | `Mode` | `null`

##### Returns

`string` \| `undefined`

---

### createWriteStream()

> **createWriteStream**: (`path`, `options?`) => `WriteStream`

Defined in: [packages/core/src/runtime.ts:177](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L177)

`options` may also include a `start` option to allow writing data at some
position past the beginning of the file, allowed values are in the
\[0, [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)\] range. Modifying a file rather than
replacing it may require the `flags` option to be set to `r+` rather than the
default `w`. The `encoding` can be any one of those accepted by `Buffer`.

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'` the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is the application's responsibility to close it and make sure there's no
file descriptor leak.

By default, the stream will emit a `'close'` event after it has been
destroyed. Set the `emitClose` option to `false` to change this behavior.

By providing the `fs` option it is possible to override the corresponding `fs` implementations for `open`, `write`, `writev`, and `close`. Overriding `write()` without `writev()` can reduce
performance as some optimizations (`_writev()`)
will be disabled. When providing the `fs` option, overrides for at least one of `write` and `writev` are required. If no `fd` option is supplied, an override
for `open` is also required. If `autoClose` is `true`, an override for `close` is also required.

Like `fs.ReadStream`, if `fd` is specified, `fs.WriteStream` will ignore the `path` argument and will use the specified file descriptor. This means that no `'open'` event will be
emitted. `fd` should be blocking; non-blocking `fd`s
should be passed to `net.Socket`.

If `options` is a string, then it specifies the encoding.

#### Parameters

##### path

`PathLike`

##### options?

`BufferEncoding` | `WriteStreamOptions`

#### Returns

`WriteStream`

#### Since

v0.1.31

---

### readFile

> **readFile**: _typeof_ `readFile`

Defined in: [packages/core/src/runtime.ts:178](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L178)

---

### unlink

> **unlink**: _typeof_ `unlink`

Defined in: [packages/core/src/runtime.ts:179](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L179)

---

### writeFile

> **writeFile**: _typeof_ `writeFile`

Defined in: [packages/core/src/runtime.ts:180](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L180)

---

### stat

> **stat**: _typeof_ `stat`

Defined in: [packages/core/src/runtime.ts:181](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L181)

---

### readdir

> **readdir**: _typeof_ `readdir`

Defined in: [packages/core/src/runtime.ts:182](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L182)

---

### lstatSync

> **lstatSync**: `StatSyncFn`

Defined in: [packages/core/src/runtime.ts:183](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L183)

---

### readlinkSync()

> **readlinkSync**: \{(`path`, `options?`): `string`; (`path`, `options`): `Buffer`; (`path`, `options?`): `string` \| `Buffer`\<`ArrayBufferLike`\>; \}

Defined in: [packages/core/src/runtime.ts:184](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L184)

#### Call Signature

> (`path`, `options?`): `string`

Returns the symbolic link's string value.

See the POSIX [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html) documentation for more details.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path returned. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a `Buffer` object.

##### Parameters

###### path

`PathLike`

###### options?

`EncodingOption`

##### Returns

`string`

##### Since

v0.1.31

#### Call Signature

> (`path`, `options`): `Buffer`

Synchronous readlink(2) - read value of a symbolic link.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options

`BufferEncodingOption`

The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.

##### Returns

`Buffer`

#### Call Signature

> (`path`, `options?`): `string` \| `Buffer`\<`ArrayBufferLike`\>

Synchronous readlink(2) - read value of a symbolic link.

##### Parameters

###### path

`PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

###### options?

`EncodingOption`

The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.

##### Returns

`string` \| `Buffer`\<`ArrayBufferLike`\>
