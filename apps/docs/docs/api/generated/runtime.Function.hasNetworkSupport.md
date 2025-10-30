# Function: hasNetworkSupport()

> **hasNetworkSupport**(`runtime`): `runtime is Runtime & { networking: NetworkingAPI }`

Defined in: [packages/core/src/runtime.ts:501](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L501)

Check if runtime has networking support

## Parameters

### runtime

[`Runtime`](runtime.Interface.Runtime.md)

Runtime instance to check

## Returns

`runtime is Runtime & { networking: NetworkingAPI }`

True if networking support is available

## Remarks

Type guard for network and TTY operations. Currently only used for
GPM mouse protocol on Linux console (very rare).
