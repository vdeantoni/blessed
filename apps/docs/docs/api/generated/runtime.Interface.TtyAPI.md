# Interface: TtyAPI

Defined in: [packages/core/src/runtime.ts:259](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/runtime.ts#L259)

TTY operations interface
Subset of Node.js tty module

## Properties

### isatty()

> **isatty**: (`fd`) => `boolean`

Defined in: [packages/core/src/runtime.ts:260](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/runtime.ts#L260)

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
