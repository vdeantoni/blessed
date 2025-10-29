# Interface: GifAPI

Defined in: [packages/core/src/runtime.ts:367](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L367)

GIF image library interface (omggif)

## Properties

### GifReader()

> **GifReader**: (`buffer`) => `object`

Defined in: [packages/core/src/runtime.ts:368](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L368)

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

> **palette_offset**: `number`

###### palette_size

> **palette_size**: `number`

###### data_offset

> **data_offset**: `number`

###### data_length

> **data_length**: `number`

###### transparent_index

> **transparent_index**: `number`

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
