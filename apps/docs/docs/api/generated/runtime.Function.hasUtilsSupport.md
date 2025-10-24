# Function: hasUtilsSupport()

> **hasUtilsSupport**(`runtime`): `runtime is Runtime & { utils: UtilsAPI }`

Defined in: [packages/core/src/runtime.ts:533](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L533)

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
