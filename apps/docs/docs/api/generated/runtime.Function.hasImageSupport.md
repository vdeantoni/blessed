# Function: hasImageSupport()

> **hasImageSupport**(`runtime`): `runtime is Runtime & { images: ImageAPI }`

Defined in: [packages/core/src/runtime.ts:474](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/runtime.ts#L474)

Check if runtime has image processing support

## Parameters

### runtime

[`Runtime`](runtime.Interface.Runtime.md)

Runtime instance to check

## Returns

`runtime is Runtime & { images: ImageAPI }`

True if image support is available

## Remarks

Type guard to check if the current runtime supports PNG/GIF rendering.
Use this before accessing `runtime.images` to avoid runtime errors.

## Example

```typescript
const runtime = getRuntime();

if (hasImageSupport(runtime)) {
  // TypeScript knows runtime.images exists here!
  const png = runtime.images.png.PNG.sync.read(buffer);
}
```
