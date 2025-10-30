# Interface: GifAPI

Defined in: [packages/core/src/runtime.ts:373](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L373)

GIF image library interface (omggif)

## Properties

### GifReader()

> **GifReader**: (`buffer`) => `object`

Defined in: [packages/core/src/runtime.ts:374](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L374)

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

###### has_local_palette

> **has_local_palette**: `boolean`

###### palette_offset

> **palette_offset**: `number` \| `null`

###### palette_size

> **palette_size**: `number` \| `null`

###### data_offset

> **data_offset**: `number`

###### data_length

> **data_length**: `number`

###### transparent_index

> **transparent_index**: `number` \| `null`

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
