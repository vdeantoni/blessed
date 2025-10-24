# Interface: GifAPI

Defined in: [packages/core/src/runtime.ts:367](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L367)

GIF image library interface (omggif)

## Properties

### GifReader()

> **GifReader**: (`buffer`) => `object`

Defined in: [packages/core/src/runtime.ts:368](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/runtime.ts#L368)

#### Parameters

##### buffer

`Buffer`

#### Returns

`object`

##### width

> **width**: `number`

##### height

> **height**: `number`

##### numFrames()

> **numFrames**(): `number`

###### Returns

`number`

##### loopCount()

> **loopCount**(): `number`

###### Returns

`number`

##### frameInfo()

> **frameInfo**(`frameNum`): `object`

###### Parameters

###### frameNum

`number`

###### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

###### width

> **width**: `number`

###### height

> **height**: `number`

###### has\_local\_palette

> **has\_local\_palette**: `boolean`

###### palette\_offset

> **palette\_offset**: `number`

###### palette\_size

> **palette\_size**: `number`

###### data\_offset

> **data\_offset**: `number`

###### data\_length

> **data\_length**: `number`

###### transparent\_index

> **transparent\_index**: `number`

###### interlaced

> **interlaced**: `boolean`

###### delay

> **delay**: `number`

###### disposal

> **disposal**: `number`

##### decodeAndBlitFrameRGBA()

> **decodeAndBlitFrameRGBA**(`frameNum`, `pixels`): `void`

###### Parameters

###### frameNum

`number`

###### pixels

`Uint8Array`

###### Returns

`void`
