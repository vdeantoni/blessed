# Interface: ProcessAPI

Defined in: [packages/core/src/runtime.ts:225](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L225)

Process operations interface

## Remarks

Subset of Node.js process global used for:
- I/O streams (stdin/stdout/stderr)
- Environment variables (TERM, EDITOR, HOME, etc.)
- Process events (exit, SIGTSTP, etc.)
- Platform detection (platform, arch)

## Examples

```typescript
const runtime = getRuntime();
const { Readable, Writable } = runtime.utils.stream;

const readable = new Readable();
readable.push('Hello\n');
readable.push(null);
readable.pipe(runtime.process.stdout);
```

```typescript
const runtime = getRuntime();
const term = runtime.process.env.TERM || 'xterm-256color';
const editor = runtime.process.env.EDITOR || 'vi';
const home = runtime.process.env.HOME || '/';
```

## Properties

### stdin

> **stdin**: `ReadStream` & `object`

Defined in: [packages/core/src/runtime.ts:226](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L226)

#### Type Declaration

##### fd

> **fd**: `0`

***

### stdout

> **stdout**: `WriteStream` & `object`

Defined in: [packages/core/src/runtime.ts:227](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L227)

#### Type Declaration

##### fd

> **fd**: `1`

***

### stderr

> **stderr**: `WriteStream` & `object`

Defined in: [packages/core/src/runtime.ts:228](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L228)

#### Type Declaration

##### fd

> **fd**: `2`

***

### platform

> **platform**: `Platform`

Defined in: [packages/core/src/runtime.ts:229](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L229)

***

### arch

> **arch**: `Architecture`

Defined in: [packages/core/src/runtime.ts:230](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L230)

***

### env

> **env**: `ProcessEnv`

Defined in: [packages/core/src/runtime.ts:231](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L231)

***

### cwd()

> **cwd**: () => `string`

Defined in: [packages/core/src/runtime.ts:232](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L232)

#### Returns

`string`

***

### exit()

> **exit**: (`code?`) => `never`

Defined in: [packages/core/src/runtime.ts:233](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L233)

#### Parameters

##### code?

`number`

#### Returns

`never`

***

### pid

> **pid**: `number`

Defined in: [packages/core/src/runtime.ts:234](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L234)

***

### title

> **title**: `string`

Defined in: [packages/core/src/runtime.ts:235](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L235)

***

### version

> **version**: `string`

Defined in: [packages/core/src/runtime.ts:236](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L236)

***

### on()

> **on**: (`event`, `listener`) => `any`

Defined in: [packages/core/src/runtime.ts:237](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L237)

#### Parameters

##### event

`string`

##### listener

(...`args`) => `void`

#### Returns

`any`

***

### once()

> **once**: (`event`, `listener`) => `any`

Defined in: [packages/core/src/runtime.ts:238](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L238)

#### Parameters

##### event

`string`

##### listener

(...`args`) => `void`

#### Returns

`any`

***

### removeListener()

> **removeListener**: (`event`, `listener`) => `any`

Defined in: [packages/core/src/runtime.ts:239](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L239)

#### Parameters

##### event

`string`

##### listener

(...`args`) => `void`

#### Returns

`any`

***

### listeners()

> **listeners**: (`event`) => `Function`[]

Defined in: [packages/core/src/runtime.ts:240](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L240)

#### Parameters

##### event

`string`

#### Returns

`Function`[]

***

### nextTick()

> **nextTick**: (`callback`, ...`args`) => `void`

Defined in: [packages/core/src/runtime.ts:241](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L241)

#### Parameters

##### callback

`Function`

##### args

...`any`[]

#### Returns

`void`

***

### kill()

> **kill**: (`pid`, `signal?`) => `boolean`

Defined in: [packages/core/src/runtime.ts:242](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L242)

#### Parameters

##### pid

`number`

##### signal?

`string` | `number`

#### Returns

`boolean`
