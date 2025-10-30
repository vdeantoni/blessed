# Interface: PngAPI

Defined in: [packages/core/src/runtime.ts:345](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L345)

PNG image library interface (pngjs)

## Properties

### PNG

> **PNG**: \{(`options?`): `object`; `sync`: `object`; \}

Defined in: [packages/core/src/runtime.ts:346](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L346)

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
