# Function: hasUtilsSupport()

> **hasUtilsSupport**(`runtime`): `runtime is Runtime & { utils: UtilsAPI }`

Defined in: [packages/core/src/runtime.ts:533](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/runtime.ts#L533)

Check if runtime has utility functions

## Parameters

### runtime

[`Runtime`](runtime.Interface.Runtime.md)

Runtime instance to check

## Returns

`runtime is Runtime & { utils: UtilsAPI }`

True if utils support is available

## Remarks

Type guard for util, stream, and string decoder operations.
