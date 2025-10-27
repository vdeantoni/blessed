# Class: Program

Defined in: [packages/core/src/lib/program.ts:74](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L74)

Program - Low-level terminal I/O, escape sequences, and terminal control.

## Remarks

Program is the low-level interface between unblessed and the terminal. It provides:
- **I/O Management**: Reads input, writes output via streams
- **Escape Sequences**: Converts high-level commands to terminal codes
- **Terminal Capabilities**: Loads and uses terminfo/termcap databases
- **Input Processing**: Parses keyboard and mouse events
- **Buffer Management**: Optimizes terminal output

Program is typically created and managed by Screen. You rarely instantiate it directly.

## Examples

```typescript
import { Screen } from '@unblessed/node';

const screen = new Screen();
const program = screen.program;  // Access Program instance

// Use Program methods directly
program.clear();
program.cup(5, 10);  // Move cursor to row 5, col 10
program.write('Hello!');
```

```typescript
program.enableMouse();
program.setMouse({ allMotion: true, sendFocus: true }, true);

program.on('mouse', (data) => {
  console.log(`Mouse: ${data.action} at (${data.x}, ${data.y})`);
});
```

```typescript
program.on('keypress', (ch, key) => {
  console.log('Key:', key.full);

  if (key.name === 'q' || key.ctrl && key.name === 'c') {
    program.normalBuffer();
    program.showCursor();
    process.exit(0);
  }
});
```

## See

 - Screen for high-level screen management
 - [Runtime](runtime.Interface.Runtime.md) for platform abstraction

## Extends

- `EventEmitterBase`

## Indexable

\[`key`: `string`\]: `any`

## Constructors

### Constructor

> **new Program**(`options?`, `legacyOutput?`): `Program`

Defined in: [packages/core/src/lib/program.ts:134](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L134)

#### Parameters

##### options?

`any`

##### legacyOutput?

`any`

#### Returns

`Program`

#### Overrides

`EventEmitterBase.constructor`

## Properties

### runtime

> **runtime**: [`Runtime`](runtime.Interface.Runtime.md)

Defined in: [packages/core/src/lib/program.ts:75](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L75)

***

### options

> **options**: `Record`\<`string`, `any`\>

Defined in: [packages/core/src/lib/program.ts:76](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L76)

***

### input

> **input**: `ReadStream` & `object`

Defined in: [packages/core/src/lib/program.ts:77](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L77)

#### Type Declaration

##### \_blessedInput?

> `optional` **\_blessedInput**: `number`

##### \_keypressHandler?

> `optional` **\_keypressHandler**: `any`

##### \_dataHandler?

> `optional` **\_dataHandler**: `any`

***

### output

> **output**: `WriteStream` & `object`

Defined in: [packages/core/src/lib/program.ts:82](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L82)

#### Type Declaration

##### \_blessedOutput?

> `optional` **\_blessedOutput**: `number`

##### \_resizeHandler?

> `optional` **\_resizeHandler**: `any`

***

### \_logger?

> `optional` **\_logger**: `WriteStream`

Defined in: [packages/core/src/lib/program.ts:86](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L86)

***

### zero

> **zero**: `boolean`

Defined in: [packages/core/src/lib/program.ts:87](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L87)

***

### useBuffer

> **useBuffer**: `boolean`

Defined in: [packages/core/src/lib/program.ts:88](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L88)

***

### x

> **x**: `number`

Defined in: [packages/core/src/lib/program.ts:89](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L89)

***

### y

> **y**: `number`

Defined in: [packages/core/src/lib/program.ts:90](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L90)

***

### savedX

> **savedX**: `number`

Defined in: [packages/core/src/lib/program.ts:91](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L91)

***

### savedY

> **savedY**: `number`

Defined in: [packages/core/src/lib/program.ts:92](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L92)

***

### cols

> **cols**: `number`

Defined in: [packages/core/src/lib/program.ts:93](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L93)

***

### rows

> **rows**: `number`

Defined in: [packages/core/src/lib/program.ts:94](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L94)

***

### scrollTop

> **scrollTop**: `number`

Defined in: [packages/core/src/lib/program.ts:95](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L95)

***

### scrollBottom

> **scrollBottom**: `number`

Defined in: [packages/core/src/lib/program.ts:96](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L96)

***

### \_terminal

> **\_terminal**: `string`

Defined in: [packages/core/src/lib/program.ts:97](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L97)

***

### isOSXTerm

> **isOSXTerm**: `boolean`

Defined in: [packages/core/src/lib/program.ts:98](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L98)

***

### isiTerm2

> **isiTerm2**: `boolean`

Defined in: [packages/core/src/lib/program.ts:99](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L99)

***

### isXFCE

> **isXFCE**: `boolean`

Defined in: [packages/core/src/lib/program.ts:100](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L100)

***

### isTerminator

> **isTerminator**: `boolean`

Defined in: [packages/core/src/lib/program.ts:101](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L101)

***

### isLXDE

> **isLXDE**: `boolean`

Defined in: [packages/core/src/lib/program.ts:102](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L102)

***

### isVTE

> **isVTE**: `boolean`

Defined in: [packages/core/src/lib/program.ts:103](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L103)

***

### isRxvt

> **isRxvt**: `boolean`

Defined in: [packages/core/src/lib/program.ts:104](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L104)

***

### isXterm

> **isXterm**: `boolean`

Defined in: [packages/core/src/lib/program.ts:105](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L105)

***

### tmux

> **tmux**: `boolean`

Defined in: [packages/core/src/lib/program.ts:106](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L106)

***

### tmuxVersion

> **tmuxVersion**: `number`

Defined in: [packages/core/src/lib/program.ts:107](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L107)

***

### \_buf

> **\_buf**: `string`

Defined in: [packages/core/src/lib/program.ts:108](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L108)

***

### \_flush()

> **\_flush**: () => `void`

Defined in: [packages/core/src/lib/program.ts:109](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L109)

#### Returns

`void`

***

### tput?

> `optional` **tput**: `any`

Defined in: [packages/core/src/lib/program.ts:110](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L110)

***

### put?

> `optional` **put**: `any`

Defined in: [packages/core/src/lib/program.ts:111](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L111)

***

### \_tputSetup?

> `optional` **\_tputSetup**: `boolean`

Defined in: [packages/core/src/lib/program.ts:112](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L112)

***

### \_newHandler?

> `optional` **\_newHandler**: `any`

Defined in: [packages/core/src/lib/program.ts:113](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L113)

***

### \_boundMouse?

> `optional` **\_boundMouse**: `boolean`

Defined in: [packages/core/src/lib/program.ts:114](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L114)

***

### \_lastButton?

> `optional` **\_lastButton**: `string`

Defined in: [packages/core/src/lib/program.ts:115](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L115)

***

### \_currentMouse?

> `optional` **\_currentMouse**: `any`

Defined in: [packages/core/src/lib/program.ts:116](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L116)

***

### mouseEnabled?

> `optional` **mouseEnabled**: `boolean`

Defined in: [packages/core/src/lib/program.ts:117](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L117)

***

### \_boundResponse?

> `optional` **\_boundResponse**: `boolean`

Defined in: [packages/core/src/lib/program.ts:118](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L118)

***

### \_rx?

> `optional` **\_rx**: `number`

Defined in: [packages/core/src/lib/program.ts:119](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L119)

***

### \_ry?

> `optional` **\_ry**: `number`

Defined in: [packages/core/src/lib/program.ts:120](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L120)

***

### cursorHidden?

> `optional` **cursorHidden**: `boolean`

Defined in: [packages/core/src/lib/program.ts:121](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L121)

***

### \_saved?

> `optional` **\_saved**: `Record`\<`string`, `any`\>

Defined in: [packages/core/src/lib/program.ts:122](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L122)

***

### isAlt?

> `optional` **isAlt**: `boolean`

Defined in: [packages/core/src/lib/program.ts:123](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L123)

***

### \_title?

> `optional` **\_title**: `string`

Defined in: [packages/core/src/lib/program.ts:124](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L124)

***

### \_exiting?

> `optional` **\_exiting**: `boolean`

Defined in: [packages/core/src/lib/program.ts:125](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L125)

***

### destroyed?

> `optional` **destroyed**: `boolean`

Defined in: [packages/core/src/lib/program.ts:126](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L126)

***

### ret?

> `optional` **ret**: `boolean`

Defined in: [packages/core/src/lib/program.ts:127](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L127)

***

### \_resume()?

> `optional` **\_resume**: () => `void`

Defined in: [packages/core/src/lib/program.ts:128](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L128)

#### Returns

`void`

***

### gpm?

> `optional` **gpm**: `any`

Defined in: [packages/core/src/lib/program.ts:129](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L129)

***

### \_resizeTimer?

> `optional` **\_resizeTimer**: `Timeout`

Defined in: [packages/core/src/lib/program.ts:130](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L130)

***

### \_programIndex?

> `optional` **\_programIndex**: `number`

Defined in: [packages/core/src/lib/program.ts:131](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L131)

***

### global

> `static` **global**: `Program` \| `null` = `null`

Defined in: [packages/core/src/lib/program.ts:235](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L235)

***

### total

> `static` **total**: `number` = `0`

Defined in: [packages/core/src/lib/program.ts:236](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L236)

***

### instances

> `static` **instances**: `Program`[] = `[]`

Defined in: [packages/core/src/lib/program.ts:237](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L237)

***

### \_bound

> `static` **\_bound**: `boolean` = `false`

Defined in: [packages/core/src/lib/program.ts:238](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L238)

***

### \_exitHandler

> `static` **\_exitHandler**: () => `void` \| `null` = `null`

Defined in: [packages/core/src/lib/program.ts:239](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L239)

***

### type

> **type**: `string` = `"program"`

Defined in: [packages/core/src/lib/program.ts:275](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L275)

## Accessors

### programIndex

#### Get Signature

> **get** **programIndex**(): `number`

Defined in: [packages/core/src/lib/program.ts:280](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L280)

Get the program's index in the instances array.

##### Returns

`number`

***

### terminal

#### Get Signature

> **get** **terminal**(): `string`

Defined in: [packages/core/src/lib/program.ts:446](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L446)

##### Returns

`string`

#### Set Signature

> **set** **terminal**(`newTerminal`): `void`

Defined in: [packages/core/src/lib/program.ts:450](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L450)

##### Parameters

###### newTerminal

`string`

##### Returns

`void`

***

### title

#### Get Signature

> **get** **title**(): `string`

Defined in: [packages/core/src/lib/program.ts:2069](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2069)

##### Returns

`string`

#### Set Signature

> **set** **title**(`newTitle`): `void`

Defined in: [packages/core/src/lib/program.ts:2073](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2073)

##### Parameters

###### newTitle

`string`

##### Returns

`void`

## Methods

### on()

> **on**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:48](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L48)

Adds the `listener` function to the end of the listeners array for the event
named `eventName`. No checks are made to see if the `listener` has already
been added. Multiple calls passing the same combination of `eventName` and
`listener` will result in the `listener` being added, and called, multiple times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v0.1.101

#### Inherited from

`EventEmitterBase.on`

***

### addListener()

> **addListener**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:53](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L53)

Alias for `emitter.on(eventName, listener)`.

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitterBase.addListener`

***

### once()

> **once**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:61](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L61)

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v0.3.0

#### Inherited from

`EventEmitterBase.once`

***

### emit()

> **emit**(`event`, ...`args`): `boolean`

Defined in: [packages/core/src/lib/event-emitter-base.ts:66](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L66)

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Parameters

##### event

`string` | `symbol`

##### args

...`any`[]

#### Returns

`boolean`

#### Since

v0.1.26

#### Inherited from

`EventEmitterBase.emit`

***

### removeListener()

> **removeListener**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:70](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L70)

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitterBase.removeListener`

***

### off()

> **off**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:78](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L78)

Alias for `emitter.removeListener()`.

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v10.0.0

#### Inherited from

`EventEmitterBase.off`

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:83](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L83)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### event?

`string` | `symbol`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitterBase.removeAllListeners`

***

### listeners()

> **listeners**(`event`): `Function`[]

Defined in: [packages/core/src/lib/event-emitter-base.ts:88](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L88)

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Parameters

##### event

`string` | `symbol`

#### Returns

`Function`[]

#### Since

v0.1.26

#### Inherited from

`EventEmitterBase.listeners`

***

### listenerCount()

> **listenerCount**(`event`): `number`

Defined in: [packages/core/src/lib/event-emitter-base.ts:92](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L92)

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Parameters

##### event

`string` | `symbol`

#### Returns

`number`

#### Since

v3.2.0

#### Inherited from

`EventEmitterBase.listenerCount`

***

### eventNames()

> **eventNames**(): (`string` \| `symbol`)[]

Defined in: [packages/core/src/lib/event-emitter-base.ts:96](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L96)

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

#### Since

v6.0.0

#### Inherited from

`EventEmitterBase.eventNames`

***

### setMaxListeners()

> **setMaxListeners**(`n`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:100](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L100)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### n

`number`

#### Returns

`this`

#### Since

v0.3.5

#### Inherited from

`EventEmitterBase.setMaxListeners`

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Defined in: [packages/core/src/lib/event-emitter-base.ts:105](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L105)

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to EventEmitter.defaultMaxListeners.

#### Returns

`number`

#### Since

v1.0.0

#### Inherited from

`EventEmitterBase.getMaxListeners`

***

### prependListener()

> **prependListener**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:109](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L109)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v6.0.0

#### Inherited from

`EventEmitterBase.prependListener`

***

### prependOnceListener()

> **prependOnceListener**(`event`, `listener`): `this`

Defined in: [packages/core/src/lib/event-emitter-base.ts:117](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L117)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### event

`string` | `symbol`

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v6.0.0

#### Inherited from

`EventEmitterBase.prependOnceListener`

***

### rawListeners()

> **rawListeners**(`event`): `Function`[]

Defined in: [packages/core/src/lib/event-emitter-base.ts:125](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/event-emitter-base.ts#L125)

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Parameters

##### event

`string` | `symbol`

#### Returns

`Function`[]

#### Since

v9.4.0

#### Inherited from

`EventEmitterBase.rawListeners`

***

### bind()

> `static` **bind**(`program`): `void`

Defined in: [packages/core/src/lib/program.ts:241](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L241)

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

##### program

`Program`

#### Returns

`void`

***

### log()

> **log**(...`args`): `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:287](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L287)

Write to the log file if one was created.

#### Parameters

##### args

...`any`[]

#### Returns

`boolean` \| `undefined`

***

### debug()

> **debug**(...`args`): `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:294](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L294)

Same as the log method, but only gets called if the debug option was set.

#### Parameters

##### args

...`any`[]

#### Returns

`boolean` \| `undefined`

***

### \_log()

> **\_log**(`pre`, `msg`): `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:299](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L299)

#### Parameters

##### pre

`string`

##### msg

`string`

#### Returns

`boolean` \| `undefined`

***

### setupDump()

> **setupDump**(): `void`

Defined in: [packages/core/src/lib/program.ts:307](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L307)

Set up dump logging. Dumps all input and output to the log file.

#### Returns

`void`

***

### setupTput()

> **setupTput**(): `void`

Defined in: [packages/core/src/lib/program.ts:387](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L387)

Set up the terminfo database. Creates the tput object for terminal capability queries.

#### Returns

`void`

***

### setTerminal()

> **setTerminal**(`terminal`): `void`

Defined in: [packages/core/src/lib/program.ts:457](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L457)

Set the terminal type. Reloads terminfo.

#### Parameters

##### terminal

`string`

#### Returns

`void`

***

### has()

> **has**(`name`): `any`

Defined in: [packages/core/src/lib/program.ts:466](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L466)

Check if the terminal has a specific capability.

#### Parameters

##### name

`string`

#### Returns

`any`

***

### term()

> **term**(`is`): `boolean`

Defined in: [packages/core/src/lib/program.ts:473](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L473)

Check if the current terminal is of a specific type.

#### Parameters

##### is

`string`

#### Returns

`boolean`

***

### listen()

> **listen**(): `void`

Defined in: [packages/core/src/lib/program.ts:480](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L480)

Initialize the program. Sets up input and output listeners.

#### Returns

`void`

***

### \_listenInput()

> **\_listenInput**(): `void`

Defined in: [packages/core/src/lib/program.ts:527](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L527)

#### Returns

`void`

***

### \_listenOutput()

> **\_listenOutput**(): `void`

Defined in: [packages/core/src/lib/program.ts:584](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L584)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [packages/core/src/lib/program.ts:623](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L623)

#### Returns

`void`

***

### key()

> **key**(`key`, `listener`): `void`

Defined in: [packages/core/src/lib/program.ts:682](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L682)

#### Parameters

##### key

`string` | `string`[]

##### listener

(...`args`) => `void`

#### Returns

`void`

***

### onceKey()

> **onceKey**(`key`, `listener`): `void`

Defined in: [packages/core/src/lib/program.ts:689](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L689)

#### Parameters

##### key

`string` | `string`[]

##### listener

(...`args`) => `void`

#### Returns

`void`

***

### removeKey()

> **removeKey**(`key`, `listener`): `void`

Defined in: [packages/core/src/lib/program.ts:696](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L696)

#### Parameters

##### key

`string` | `string`[]

##### listener

(...`args`) => `void`

#### Returns

`void`

***

### bindMouse()

> **bindMouse**(): `void`

Defined in: [packages/core/src/lib/program.ts:722](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L722)

#### Returns

`void`

***

### \_bindMouse()

> **\_bindMouse**(`s`, `buf`): `void`

Defined in: [packages/core/src/lib/program.ts:735](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L735)

#### Parameters

##### s

`string` | `Buffer`

##### buf

`Buffer`

#### Returns

`void`

***

### enableGpm()

> **enableGpm**(): `void`

Defined in: [packages/core/src/lib/program.ts:1122](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1122)

#### Returns

`void`

***

### disableGpm()

> **disableGpm**(): `void`

Defined in: [packages/core/src/lib/program.ts:1247](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1247)

#### Returns

`void`

***

### bindResponse()

> **bindResponse**(): `void`

Defined in: [packages/core/src/lib/program.ts:1255](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1255)

#### Returns

`void`

***

### \_bindResponse()

> **\_bindResponse**(`s`): `void`

Defined in: [packages/core/src/lib/program.ts:1268](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1268)

#### Parameters

##### s

`string` | `Buffer`

#### Returns

`void`

***

### response()

#### Call Signature

> **response**(`name?`, `text?`, `callback?`, `noBypass?`): `any`

Defined in: [packages/core/src/lib/program.ts:1823](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1823)

##### Parameters

###### name?

`string`

###### text?

`string`

###### callback?

(`err`, `data?`) => `void`

###### noBypass?

`boolean`

##### Returns

`any`

#### Call Signature

> **response**(`text`, `callback`): `any`

Defined in: [packages/core/src/lib/program.ts:1829](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1829)

##### Parameters

###### text

`string`

###### callback

(`err`, `data?`) => `void`

##### Returns

`any`

***

### write()

> **write**(`text`): `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:1874](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1874)

Write text to the output stream.

#### Parameters

##### text

`string`

#### Returns

`boolean` \| `undefined`

***

### \_owrite()

> **\_owrite**(`text`): `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:1879](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1879)

#### Parameters

##### text

`string`

#### Returns

`boolean` \| `undefined`

***

### \_buffer()

> **\_buffer**(`text`): `true` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:1883](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1883)

#### Parameters

##### text

`string`

#### Returns

`true` \| `undefined`

***

### flush()

> **flush**(): `void`

Defined in: [packages/core/src/lib/program.ts:1905](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1905)

Flush the output buffer.

#### Returns

`void`

***

### \_write()

> **\_write**(`text`, `_attr?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:1911](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1911)

#### Parameters

##### text

`string`

##### \_attr?

`any`

#### Returns

`string` \| `boolean` \| `undefined`

***

### \_twrite()

> **\_twrite**(`data`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:1921](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1921)

#### Parameters

##### data

`string`

#### Returns

`string` \| `boolean` \| `undefined`

***

### print()

> **print**(`text`, `attr?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:1959](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1959)

Print text with optional attributes. Alias for write().

#### Parameters

##### text

`string`

##### attr?

`any`

#### Returns

`string` \| `boolean` \| `undefined`

***

### \_ncoords()

> **\_ncoords**(): `void`

Defined in: [packages/core/src/lib/program.ts:1963](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1963)

#### Returns

`void`

***

### setx()

> **setx**(`x`): `any`

Defined in: [packages/core/src/lib/program.ts:1973](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1973)

Set the absolute x position of the cursor.

#### Parameters

##### x

`number`

#### Returns

`any`

***

### sety()

> **sety**(`y`): `any`

Defined in: [packages/core/src/lib/program.ts:1981](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1981)

Set the absolute y position of the cursor.

#### Parameters

##### y

`number`

#### Returns

`any`

***

### move()

> **move**(`x`, `y`): `any`

Defined in: [packages/core/src/lib/program.ts:1988](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1988)

Move the cursor to the given absolute position.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`any`

***

### omove()

> **omove**(`x`, `y`): `void`

Defined in: [packages/core/src/lib/program.ts:1996](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L1996)

Move the cursor to the given absolute position (optimized).

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### rsetx()

> **rsetx**(`x`): `any`

Defined in: [packages/core/src/lib/program.ts:2031](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2031)

Move cursor relatively on the x axis.

#### Parameters

##### x

`number`

#### Returns

`any`

***

### rsety()

> **rsety**(`y`): `any`

Defined in: [packages/core/src/lib/program.ts:2040](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2040)

Move cursor relatively on the y axis.

#### Parameters

##### y

`number`

#### Returns

`any`

***

### rmove()

> **rmove**(`x`, `y`): `void`

Defined in: [packages/core/src/lib/program.ts:2049](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2049)

Move cursor relatively by x and y.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### simpleInsert()

> **simpleInsert**(`ch`, `i?`, `attr?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2057](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2057)

Insert a character at the current position.

#### Parameters

##### ch

`string`

##### i?

`number`

##### attr?

`any`

#### Returns

`string` \| `boolean` \| `undefined`

***

### repeat()

> **repeat**(`ch`, `i`): `string`

Defined in: [packages/core/src/lib/program.ts:2064](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2064)

Repeat a character i times.

#### Parameters

##### ch

`string`

##### i

`number`

#### Returns

`string`

***

### copyToClipboard()

> **copyToClipboard**(`text`): `boolean`

Defined in: [packages/core/src/lib/program.ts:2085](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2085)

Copy text to clipboard (iTerm2 only). Returns true if successful.

#### Parameters

##### text

`string`

#### Returns

`boolean`

***

### cursorShape()

> **cursorShape**(`shape`, `blink?`): `boolean`

Defined in: [packages/core/src/lib/program.ts:2096](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2096)

Attempt to change cursor shape. Will not work in all terminals. Returns true if successful.

#### Parameters

##### shape

`string`

##### blink?

`boolean`

#### Returns

`boolean`

***

### cursorColor()

> **cursorColor**(`color`): `boolean`

Defined in: [packages/core/src/lib/program.ts:2154](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2154)

Attempt to change cursor color. Returns true if successful.

#### Parameters

##### color

`string`

#### Returns

`boolean`

***

### resetCursor()

> **resetCursor**(): `boolean`

Defined in: [packages/core/src/lib/program.ts:2165](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2165)

Attempt to reset cursor. Returns true if successful.

#### Returns

`boolean`

***

### getTextParams()

> **getTextParams**(`param?`, `callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:2178](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2178)

#### Parameters

##### param?

`string` | `number`

##### callback?

(`err`, `data?`) => `void`

#### Returns

`any`

***

### getCursorColor()

> **getCursorColor**(`callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:2192](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2192)

#### Parameters

##### callback?

(`err`, `data?`) => `void`

#### Returns

`any`

***

### nul()

> **nul**(): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2200](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2200)

Normal

#### Returns

`string` \| `boolean` \| `undefined`

***

### bell()

> **bell**(): `any`

Defined in: [packages/core/src/lib/program.ts:2205](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2205)

#### Returns

`any`

***

### vtab()

> **vtab**(): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2210](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2210)

#### Returns

`string` \| `boolean` \| `undefined`

***

### form()

> **form**(): `any`

Defined in: [packages/core/src/lib/program.ts:2216](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2216)

#### Returns

`any`

***

### backspace()

> **backspace**(): `any`

Defined in: [packages/core/src/lib/program.ts:2221](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2221)

#### Returns

`any`

***

### tab()

> **tab**(): `any`

Defined in: [packages/core/src/lib/program.ts:2228](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2228)

#### Returns

`any`

***

### shiftOut()

> **shiftOut**(): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2235](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2235)

#### Returns

`string` \| `boolean` \| `undefined`

***

### shiftIn()

> **shiftIn**(): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2240](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2240)

#### Returns

`string` \| `boolean` \| `undefined`

***

### return()

> **return**(): `any`

Defined in: [packages/core/src/lib/program.ts:2245](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2245)

#### Returns

`any`

***

### feed()

> **feed**(): `any`

Defined in: [packages/core/src/lib/program.ts:2251](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2251)

#### Returns

`any`

***

### index()

> **index**(): `any`

Defined in: [packages/core/src/lib/program.ts:2271](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2271)

Esc

#### Returns

`any`

***

### reverseIndex()

> **reverseIndex**(): `any`

Defined in: [packages/core/src/lib/program.ts:2279](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2279)

#### Returns

`any`

***

### nextLine()

> **nextLine**(): `any`

Defined in: [packages/core/src/lib/program.ts:2287](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2287)

#### Returns

`any`

***

### reset()

> **reset**(): `any`

Defined in: [packages/core/src/lib/program.ts:2296](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2296)

#### Returns

`any`

***

### tabSet()

> **tabSet**(): `any`

Defined in: [packages/core/src/lib/program.ts:2305](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2305)

#### Returns

`any`

***

### saveCursor()

> **saveCursor**(`key?`): `any`

Defined in: [packages/core/src/lib/program.ts:2311](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2311)

#### Parameters

##### key?

`string`

#### Returns

`any`

***

### restoreCursor()

> **restoreCursor**(`key?`, `hide?`): `any`

Defined in: [packages/core/src/lib/program.ts:2320](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2320)

#### Parameters

##### key?

`string`

##### hide?

`boolean`

#### Returns

`any`

***

### lsaveCursor()

> **lsaveCursor**(`key?`): `void`

Defined in: [packages/core/src/lib/program.ts:2329](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2329)

#### Parameters

##### key?

`string`

#### Returns

`void`

***

### lrestoreCursor()

> **lrestoreCursor**(`key?`, `hide?`): `void`

Defined in: [packages/core/src/lib/program.ts:2339](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2339)

#### Parameters

##### key?

`string`

##### hide?

`boolean`

#### Returns

`void`

***

### lineHeight()

> **lineHeight**(): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2356](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2356)

#### Returns

`string` \| `boolean` \| `undefined`

***

### charset()

> **charset**(`val?`, `level?`): `any`

Defined in: [packages/core/src/lib/program.ts:2361](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2361)

#### Parameters

##### val?

`string` | `number`

##### level?

`number`

#### Returns

`any`

***

### enter\_alt\_charset\_mode()

> **enter\_alt\_charset\_mode**(): `any`

Defined in: [packages/core/src/lib/program.ts:2448](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2448)

#### Returns

`any`

***

### as()

> **as**(): `any`

Defined in: [packages/core/src/lib/program.ts:2451](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2451)

#### Returns

`any`

***

### smacs()

> **smacs**(): `any`

Defined in: [packages/core/src/lib/program.ts:2454](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2454)

#### Returns

`any`

***

### exit\_alt\_charset\_mode()

> **exit\_alt\_charset\_mode**(): `any`

Defined in: [packages/core/src/lib/program.ts:2458](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2458)

#### Returns

`any`

***

### ae()

> **ae**(): `any`

Defined in: [packages/core/src/lib/program.ts:2461](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2461)

#### Returns

`any`

***

### rmacs()

> **rmacs**(): `any`

Defined in: [packages/core/src/lib/program.ts:2464](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2464)

#### Returns

`any`

***

### setG()

> **setG**(`val?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2484](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2484)

#### Parameters

##### val?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### setTitle()

> **setTitle**(`title`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2512](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2512)

OSC

#### Parameters

##### title

`string`

#### Returns

`string` \| `boolean` \| `undefined`

***

### resetColors()

> **resetColors**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2529](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2529)

#### Parameters

##### param?

`string` | `number`

#### Returns

`any`

***

### dynamicColors()

> **dynamicColors**(`param`): `any`

Defined in: [packages/core/src/lib/program.ts:2540](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2540)

#### Parameters

##### param

`string`

#### Returns

`any`

***

### selData()

> **selData**(`a`, `b`): `any`

Defined in: [packages/core/src/lib/program.ts:2550](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2550)

#### Parameters

##### a

`string`

##### b

`string`

#### Returns

`any`

***

### cursorUp()

> **cursorUp**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2563](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2563)

CSI

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### cursorDown()

> **cursorDown**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2577](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2577)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### cursorForward()

> **cursorForward**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2591](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2591)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### cursorBackward()

> **cursorBackward**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2605](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2605)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### cursorPos()

> **cursorPos**(`row?`, `col?`): `any`

Defined in: [packages/core/src/lib/program.ts:2619](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2619)

#### Parameters

##### row?

`number`

##### col?

`number`

#### Returns

`any`

***

### eraseInDisplay()

> **eraseInDisplay**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2644](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2644)

#### Parameters

##### param?

`string` | `number`

#### Returns

`any`

***

### clear()

> **clear**(): `any`

Defined in: [packages/core/src/lib/program.ts:2677](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2677)

#### Returns

`any`

***

### eraseInLine()

> **eraseInLine**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:2693](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2693)

#### Parameters

##### param?

`string` | `number`

#### Returns

`any`

***

### charAttributes()

> **charAttributes**(`param`, `val?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:2783](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2783)

#### Parameters

##### param

`string` | `string`[]

##### val?

`boolean`

#### Returns

`string` \| `boolean` \| `undefined`

***

### text()

> **text**(`text`, `attr`): `string`

Defined in: [packages/core/src/lib/program.ts:2792](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2792)

Wrap the given text in terminal formatting codes corresponding to the given attribute
name. The `attr` string can be of the form `red fg` or `52 bg` where `52` is a 0-255
integer color number.

#### Parameters

##### text

`string`

##### attr

`string` | `string`[]

#### Returns

`string`

***

### \_attr()

> **\_attr**(`param`, `val?`): `string` \| `null`

Defined in: [packages/core/src/lib/program.ts:2797](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L2797)

#### Parameters

##### param

`string` | `string`[]

##### val?

`boolean`

#### Returns

`string` \| `null`

***

### setForeground()

> **setForeground**(`color`, `val?`): `any`

Defined in: [packages/core/src/lib/program.ts:3017](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3017)

#### Parameters

##### color

`string`

##### val?

`boolean`

#### Returns

`any`

***

### setBackground()

> **setBackground**(`color`, `val?`): `any`

Defined in: [packages/core/src/lib/program.ts:3022](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3022)

#### Parameters

##### color

`string`

##### val?

`boolean`

#### Returns

`any`

***

### deviceStatus()

> **deviceStatus**(`param?`, `callback?`, `dec?`, `noBypass?`): `any`

Defined in: [packages/core/src/lib/program.ts:3048](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3048)

#### Parameters

##### param?

`string` | `number`

##### callback?

(`err`, `data?`) => `void`

##### dec?

`boolean`

##### noBypass?

`boolean`

#### Returns

`any`

***

### getCursor()

> **getCursor**(`callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:3070](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3070)

#### Parameters

##### callback?

(`err`, `data?`) => `void`

#### Returns

`any`

***

### saveReportedCursor()

> **saveReportedCursor**(`callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:3074](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3074)

#### Parameters

##### callback?

(`err`) => `void`

#### Returns

`any`

***

### restoreReportedCursor()

> **restoreReportedCursor**(): `any`

Defined in: [packages/core/src/lib/program.ts:3089](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3089)

#### Returns

`any`

***

### insertChars()

> **insertChars**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3101](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3101)

Additions

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### cursorNextLine()

> **cursorNextLine**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3111](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3111)

#### Parameters

##### param?

`number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### cursorPrecedingLine()

> **cursorPrecedingLine**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3120](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3120)

#### Parameters

##### param?

`number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### cursorCharAbsolute()

> **cursorCharAbsolute**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3128](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3128)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### insertLines()

> **insertLines**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3143](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3143)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### deleteLines()

> **deleteLines**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3150](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3150)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### deleteChars()

> **deleteChars**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3157](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3157)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### eraseChars()

> **eraseChars**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3164](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3164)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### charPosAbsolute()

> **charPosAbsolute**(...`args`): `any`

Defined in: [packages/core/src/lib/program.ts:3171](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3171)

#### Parameters

##### args

...`number`[]

#### Returns

`any`

***

### HPositionRelative()

> **HPositionRelative**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3185](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3185)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### sendDeviceAttributes()

> **sendDeviceAttributes**(`param?`, `callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:3229](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3229)

#### Parameters

##### param?

`string` | `number`

##### callback?

(`err`, `data?`) => `void`

#### Returns

`any`

***

### linePosAbsolute()

> **linePosAbsolute**(...`args`): `any`

Defined in: [packages/core/src/lib/program.ts:3243](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3243)

#### Parameters

##### args

...`number`[]

#### Returns

`any`

***

### VPositionRelative()

> **VPositionRelative**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3256](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3256)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### HVPosition()

> **HVPosition**(`row?`, `col?`): `any`

Defined in: [packages/core/src/lib/program.ts:3268](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3268)

#### Parameters

##### row?

`number`

##### col?

`number`

#### Returns

`any`

***

### setMode()

> **setMode**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3369](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3369)

#### Parameters

##### args

...`any`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### decset()

> **decset**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3374](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3374)

#### Parameters

##### args

...`any`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### showCursor()

> **showCursor**(): `any`

Defined in: [packages/core/src/lib/program.ts:3379](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3379)

#### Returns

`any`

***

### alternateBuffer()

> **alternateBuffer**(): `any`

Defined in: [packages/core/src/lib/program.ts:3391](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3391)

#### Returns

`any`

***

### resetMode()

> **resetMode**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3479](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3479)

#### Parameters

##### args

...`any`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### decrst()

> **decrst**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3484](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3484)

#### Parameters

##### args

...`any`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### hideCursor()

> **hideCursor**(): `any`

Defined in: [packages/core/src/lib/program.ts:3489](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3489)

#### Returns

`any`

***

### cursor\_invisible()

> **cursor\_invisible**(): `any`

Defined in: [packages/core/src/lib/program.ts:3495](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3495)

#### Returns

`any`

***

### normalBuffer()

> **normalBuffer**(): `any`

Defined in: [packages/core/src/lib/program.ts:3499](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3499)

#### Returns

`any`

***

### enableMouse()

> **enableMouse**(): `void`

Defined in: [packages/core/src/lib/program.ts:3506](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3506)

#### Returns

`void`

***

### disableMouse()

> **disableMouse**(): `void`

Defined in: [packages/core/src/lib/program.ts:3629](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3629)

#### Returns

`void`

***

### setMouse()

> **setMouse**(`opt`, `enable?`): `void`

Defined in: [packages/core/src/lib/program.ts:3642](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3642)

#### Parameters

##### opt

`any`

##### enable?

`boolean`

#### Returns

`void`

***

### setScrollRegion()

> **setScrollRegion**(`top?`, `bottom?`): `any`

Defined in: [packages/core/src/lib/program.ts:3773](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3773)

#### Parameters

##### top?

`number`

##### bottom?

`number`

#### Returns

`any`

***

### saveCursorA()

> **saveCursorA**(): `any`

Defined in: [packages/core/src/lib/program.ts:3792](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3792)

#### Returns

`any`

***

### restoreCursorA()

> **restoreCursorA**(): `any`

Defined in: [packages/core/src/lib/program.ts:3801](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3801)

#### Returns

`any`

***

### cursorForwardTab()

> **cursorForwardTab**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3814](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3814)

Lesser Used

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### scrollUp()

> **scrollUp**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3822](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3822)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### scrollDown()

> **scrollDown**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3830](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3830)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### initMouseTracking()

> **initMouseTracking**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3841](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3841)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### resetTitleModes()

> **resetTitleModes**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3856](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3856)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### cursorBackwardTab()

> **cursorBackwardTab**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3861](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3861)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### repeatPrecedingCharacter()

> **repeatPrecedingCharacter**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3869](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3869)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### tabClear()

> **tabClear**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:3882](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3882)

#### Parameters

##### param?

`number`

#### Returns

`any`

***

### mediaCopy()

> **mediaCopy**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3898](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3898)

#### Parameters

##### args

...(`string` \| `number`)[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### mc0()

> **mc0**(): `any`

Defined in: [packages/core/src/lib/program.ts:3902](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3902)

#### Returns

`any`

***

### print\_screen()

> **print\_screen**(): `any`

Defined in: [packages/core/src/lib/program.ts:3907](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3907)

#### Returns

`any`

***

### mc5()

> **mc5**(): `any`

Defined in: [packages/core/src/lib/program.ts:3911](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3911)

#### Returns

`any`

***

### prtr\_on()

> **prtr\_on**(): `any`

Defined in: [packages/core/src/lib/program.ts:3916](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3916)

#### Returns

`any`

***

### mc4()

> **mc4**(): `any`

Defined in: [packages/core/src/lib/program.ts:3920](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3920)

#### Returns

`any`

***

### prtr\_off()

> **prtr\_off**(): `any`

Defined in: [packages/core/src/lib/program.ts:3925](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3925)

#### Returns

`any`

***

### mc5p()

> **mc5p**(): `any`

Defined in: [packages/core/src/lib/program.ts:3929](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3929)

#### Returns

`any`

***

### prtr\_non()

> **prtr\_non**(): `any`

Defined in: [packages/core/src/lib/program.ts:3934](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3934)

#### Returns

`any`

***

### setResources()

> **setResources**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3950](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3950)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### disableModifiers()

> **disableModifiers**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3967](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3967)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### setPointerMode()

> **setPointerMode**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:3979](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3979)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### softReset()

> **softReset**(): `any`

Defined in: [packages/core/src/lib/program.ts:3985](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L3985)

#### Returns

`any`

***

### requestAnsiMode()

> **requestAnsiMode**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4004](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4004)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### requestPrivateMode()

> **requestPrivateMode**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4013](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4013)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### setConformanceLevel()

> **setConformanceLevel**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4027](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4027)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### loadLEDs()

> **loadLEDs**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4039](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4039)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### setCursorStyle()

> **setCursorStyle**(`param?`): `any`

Defined in: [packages/core/src/lib/program.ts:4050](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4050)

#### Parameters

##### param?

`string` | `number`

#### Returns

`any`

***

### setCharProtectionAttr()

> **setCharProtectionAttr**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4089](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4089)

#### Parameters

##### param?

`number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### restorePrivateValues()

> **restorePrivateValues**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4096](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4096)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### setAttrInRectangle()

> **setAttrInRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4105](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4105)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### savePrivateValues()

> **savePrivateValues**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4112](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4112)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### manipulateWindow()

> **manipulateWindow**(...`args`): `any`

Defined in: [packages/core/src/lib/program.ts:4162](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4162)

#### Parameters

##### args

...`any`[]

#### Returns

`any`

***

### getWindowSize()

> **getWindowSize**(`callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:4173](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4173)

#### Parameters

##### callback?

(`err`, `data?`) => `void`

#### Returns

`any`

***

### reverseAttrInRectangle()

> **reverseAttrInRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4183](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4183)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### setTitleModeFeature()

> **setTitleModeFeature**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4196](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4196)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### setWarningBellVolume()

> **setWarningBellVolume**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4205](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4205)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### setMarginBellVolume()

> **setMarginBellVolume**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4214](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4214)

#### Parameters

##### param?

`string` | `number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### copyRectangle()

> **copyRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4225](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4225)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### enableFilterRectangle()

> **enableFilterRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4240](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4240)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### requestParameters()

> **requestParameters**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4255](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4255)

#### Parameters

##### param?

`number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### selectChangeExtent()

> **selectChangeExtent**(`param?`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4263](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4263)

#### Parameters

##### param?

`number`

#### Returns

`string` \| `boolean` \| `undefined`

***

### fillRectangle()

> **fillRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4272](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4272)

#### Parameters

##### args

...(`string` \| `number`)[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### enableLocatorReporting()

> **enableLocatorReporting**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4288](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4288)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### eraseRectangle()

> **eraseRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4296](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4296)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### setLocatorEvents()

> **setLocatorEvents**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4311](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4311)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### selectiveEraseRectangle()

> **selectiveEraseRectangle**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4318](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4318)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### requestLocatorPosition()

> **requestLocatorPosition**(`param?`, `callback?`): `any`

Defined in: [packages/core/src/lib/program.ts:4362](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4362)

#### Parameters

##### param?

`string` | `number`

##### callback?

(`err`, `data?`) => `void`

#### Returns

`any`

***

### req\_mouse\_pos()

> **req\_mouse\_pos**(): `any`

Defined in: [packages/core/src/lib/program.ts:4381](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4381)

#### Returns

`any`

***

### insertColumns()

> **insertColumns**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4388](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4388)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### deleteColumns()

> **deleteColumns**(...`args`): `string` \| `boolean` \| `undefined`

Defined in: [packages/core/src/lib/program.ts:4395](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4395)

#### Parameters

##### args

...`number`[]

#### Returns

`string` \| `boolean` \| `undefined`

***

### out()

> **out**(`name`, ...`args`): `any`

Defined in: [packages/core/src/lib/program.ts:4399](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4399)

#### Parameters

##### name

`string`

##### args

...`any`[]

#### Returns

`any`

***

### sigtstp()

> **sigtstp**(`callback?`): `void`

Defined in: [packages/core/src/lib/program.ts:4406](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4406)

#### Parameters

##### callback?

() => `void`

#### Returns

`void`

***

### pause()

> **pause**(`callback?`): () => `void`

Defined in: [packages/core/src/lib/program.ts:4417](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4417)

#### Parameters

##### callback?

() => `void`

#### Returns

> (): `void`

##### Returns

`void`

***

### resume()

> **resume**(): `void`

Defined in: [packages/core/src/lib/program.ts:4454](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/lib/program.ts#L4454)

#### Returns

`void`
