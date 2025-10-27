# Interface: PngAPI

Defined in: [packages/core/src/runtime.ts:339](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/runtime.ts#L339)

PNG image library interface (pngjs)

## Properties

### PNG

> **PNG**: \{(`options?`): `object`; `sync`: `object`; \}

Defined in: [packages/core/src/runtime.ts:340](https://github.com/vdeantoni/unblessed/blob/cda5e27f3d59c079a4be779247045dff26f0e9d3/packages/core/src/runtime.ts#L340)

#### Parameters

##### options?

`any`

#### Returns

`object`

##### width

> **width**: `number`

##### height

> **height**: `number`

##### data

> **data**: `Buffer`

##### gamma

> **gamma**: `number`

##### parse()

> **parse**(`data`, `callback?`): `any`

###### Parameters

###### data

`Buffer`

###### callback?

(`error`, `data`) => `void`

###### Returns

`any`

##### pack()

> **pack**(): `any`

###### Returns

`any`

##### on()

> **on**(`event`, `callback`): `any`

###### Parameters

###### event

`string`

###### callback

(...`args`) => `void`

###### Returns

`any`

#### sync

> **sync**: `object`

##### sync.read()

> **read**(`data`): `object`

###### Parameters

###### data

`Buffer`

###### Returns

`object`

###### width

> **width**: `number`

###### height

> **height**: `number`

###### data

> **data**: `Buffer`

###### gamma

> **gamma**: `number`
