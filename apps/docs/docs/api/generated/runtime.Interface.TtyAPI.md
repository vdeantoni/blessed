# Interface: TtyAPI

Defined in: [packages/core/src/runtime.ts:265](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L265)

TTY operations interface
Subset of Node.js tty module

## Properties

### isatty()

> **isatty**: (`fd`) => `boolean`

Defined in: [packages/core/src/runtime.ts:266](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L266)

The `tty.isatty()` method returns `true` if the given `fd` is associated with
a TTY and `false` if it is not, including whenever `fd` is not a non-negative
integer.

#### Parameters

##### fd

`number`

A numeric file descriptor

#### Returns

`boolean`

#### Since

v0.5.8
