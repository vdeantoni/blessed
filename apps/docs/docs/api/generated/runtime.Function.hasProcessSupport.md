# Function: hasProcessSupport()

> **hasProcessSupport**(`runtime`): `runtime is Runtime & { processes: ProcessesAPI }`

Defined in: [packages/core/src/runtime.ts:502](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L502)

Check if runtime has process spawning support

## Parameters

### runtime

[`Runtime`](runtime.Interface.Runtime.md)

Runtime instance to check

## Returns

`runtime is Runtime & { processes: ProcessesAPI }`

True if process support is available

## Remarks

Type guard to check if the current runtime can spawn child processes.
Needed for Terminal widget, text editors (vi, nano), and image tools.

## Example

```typescript
const runtime = getRuntime();

if (hasProcessSupport(runtime)) {
  // TypeScript knows runtime.processes exists
  const proc = runtime.processes.childProcess.spawn('vi', ['file.txt']);
} else {
  console.warn('Cannot spawn processes in this environment');
}
```
