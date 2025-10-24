# Interface: PngAPI

Defined in: [packages/core/src/runtime.ts:339](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L339)

PNG image library interface (pngjs)

## Properties

### PNG

> **PNG**: \{(`options?`): `object`; `sync`: `object`; \}

Defined in: [packages/core/src/runtime.ts:340](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L340)

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
