# Interface: PathAPI

Defined in: [packages/core/src/runtime.ts:185](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L185)

Path manipulation interface
Subset of Node.js path module

## Properties

### join()

> **join**: (...`paths`) => `string`

Defined in: [packages/core/src/runtime.ts:186](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L186)

Join all arguments together and normalize the resulting path.

#### Parameters

##### paths

...`string`[]

paths to join.

#### Returns

`string`

#### Throws

if any of the path segments is not a string.

***

### resolve()

> **resolve**: (...`paths`) => `string`

Defined in: [packages/core/src/runtime.ts:187](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L187)

The right-most parameter is considered `{to}`. Other parameters are considered an array of `{from}`.

Starting from leftmost `{from}` parameter, resolves `{to}` to an absolute path.

If `{to}` isn't already absolute, `{from}` arguments are prepended in right to left order,
until an absolute path is found. If after using all `{from}` paths still no absolute path is found,
the current working directory is used as well. The resulting path is normalized,
and trailing slashes are removed unless the path gets resolved to the root directory.

#### Parameters

##### paths

...`string`[]

A sequence of paths or path segments.

#### Returns

`string`

#### Throws

if any of the arguments is not a string.

***

### dirname()

> **dirname**: (`path`) => `string`

Defined in: [packages/core/src/runtime.ts:188](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L188)

Return the directory name of a path. Similar to the Unix dirname command.

#### Parameters

##### path

`string`

the path to evaluate.

#### Returns

`string`

#### Throws

if `path` is not a string.

***

### basename()

> **basename**: (`path`, `suffix?`) => `string`

Defined in: [packages/core/src/runtime.ts:189](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L189)

Return the last portion of a path. Similar to the Unix basename command.
Often used to extract the file name from a fully qualified path.

#### Parameters

##### path

`string`

the path to evaluate.

##### suffix?

`string`

optionally, an extension to remove from the result.

#### Returns

`string`

#### Throws

if `path` is not a string or if `ext` is given and is not a string.

***

### normalize()

> **normalize**: (`path`) => `string`

Defined in: [packages/core/src/runtime.ts:190](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L190)

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

#### Parameters

##### path

`string`

string path to normalize.

#### Returns

`string`

#### Throws

if `path` is not a string.

***

### extname()

> **extname**: (`path`) => `string`

Defined in: [packages/core/src/runtime.ts:191](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L191)

Return the extension of the path, from the last '.' to end of string in the last portion of the path.
If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string.

#### Parameters

##### path

`string`

the path to evaluate.

#### Returns

`string`

#### Throws

if `path` is not a string.

***

### sep

> **sep**: "\\" \| `"/"`

Defined in: [packages/core/src/runtime.ts:192](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L192)

***

### delimiter

> **delimiter**: `";"` \| `":"`

Defined in: [packages/core/src/runtime.ts:193](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L193)
