# Class: ScrollableText

Defined in: [packages/core/src/widgets/scrollabletext.ts:16](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/scrollabletext.ts#L16)

ScrollableText

## Extends

- [`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md)

## Extended by

- [`Log`](widgets.log.Class.Log.md)

## Constructors

### Constructor

> **new ScrollableText**(`options`): `ScrollableText`

Defined in: [packages/core/src/widgets/scrollabletext.ts:19](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/scrollabletext.ts#L19)

#### Parameters

##### options

`ScrollableTextOptions` = `{}`

#### Returns

`ScrollableText`

#### Overrides

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`constructor`](widgets.scrollablebox.Class.ScrollableBox.md#constructor)

## Properties

### \_events

> **\_events**: `any`

Defined in: [packages/core/src/lib/events.ts:10](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L10)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_events`](widgets.scrollablebox.Class.ScrollableBox.md#_events)

***

### \_maxListeners?

> `optional` **\_maxListeners**: `number`

Defined in: [packages/core/src/lib/events.ts:11](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L11)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_maxListeners`](widgets.scrollablebox.Class.ScrollableBox.md#_maxlisteners)

***

### name?

> `optional` **name**: `string`

Defined in: [packages/core/src/widgets/element.ts:49](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L49)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`name`](widgets.scrollablebox.Class.ScrollableBox.md#name)

***

### position

> **position**: `any`

Defined in: [packages/core/src/widgets/element.ts:54](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L54)

Position specification. Can be relative coordinates or keywords.
Kept as any due to complex internal position calculation system.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`position`](widgets.scrollablebox.Class.ScrollableBox.md#position)

***

### noOverflow?

> `optional` **noOverflow**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:55](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L55)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`noOverflow`](widgets.scrollablebox.Class.ScrollableBox.md#nooverflow)

***

### dockBorders?

> `optional` **dockBorders**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:56](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L56)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`dockBorders`](widgets.scrollablebox.Class.ScrollableBox.md#dockborders)

***

### shadow?

> `optional` **shadow**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:57](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L57)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`shadow`](widgets.scrollablebox.Class.ScrollableBox.md#shadow)

***

### style

> **style**: `Style`

Defined in: [packages/core/src/widgets/element.ts:59](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L59)

Element style configuration (colors, attributes, hover/focus effects)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`style`](widgets.scrollablebox.Class.ScrollableBox.md#style)

***

### hidden

> **hidden**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:60](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L60)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`hidden`](widgets.scrollablebox.Class.ScrollableBox.md#hidden)

***

### fixed

> **fixed**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:61](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L61)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`fixed`](widgets.scrollablebox.Class.ScrollableBox.md#fixed)

***

### align

> **align**: `string`

Defined in: [packages/core/src/widgets/element.ts:62](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L62)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`align`](widgets.scrollablebox.Class.ScrollableBox.md#align)

***

### valign

> **valign**: `string`

Defined in: [packages/core/src/widgets/element.ts:63](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L63)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`valign`](widgets.scrollablebox.Class.ScrollableBox.md#valign)

***

### wrap

> **wrap**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:64](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L64)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`wrap`](widgets.scrollablebox.Class.ScrollableBox.md#wrap)

***

### shrink?

> `optional` **shrink**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:65](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L65)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`shrink`](widgets.scrollablebox.Class.ScrollableBox.md#shrink)

***

### ch

> **ch**: `string`

Defined in: [packages/core/src/widgets/element.ts:66](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L66)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`ch`](widgets.scrollablebox.Class.ScrollableBox.md#ch)

***

### padding

> **padding**: `Padding`

Defined in: [packages/core/src/widgets/element.ts:68](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L68)

Padding configuration for all sides

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`padding`](widgets.scrollablebox.Class.ScrollableBox.md#padding)

***

### border?

> `optional` **border**: `Border`

Defined in: [packages/core/src/widgets/element.ts:70](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L70)

Border configuration

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`border`](widgets.scrollablebox.Class.ScrollableBox.md#border)

***

### parseTags?

> `optional` **parseTags**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:71](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L71)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`parseTags`](widgets.scrollablebox.Class.ScrollableBox.md#parsetags)

***

### content

> **content**: `string` = `""`

Defined in: [packages/core/src/widgets/element.ts:72](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L72)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`content`](widgets.scrollablebox.Class.ScrollableBox.md#content)

***

### lpos?

> `optional` **lpos**: `RenderCoords`

Defined in: [packages/core/src/widgets/element.ts:74](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L74)

Last rendered position coordinates

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`lpos`](widgets.scrollablebox.Class.ScrollableBox.md#lpos)

***

### \_clines?

> `optional` **\_clines**: `any`

Defined in: [packages/core/src/widgets/element.ts:75](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L75)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_clines`](widgets.scrollablebox.Class.ScrollableBox.md#_clines)

***

### \_pcontent?

> `optional` **\_pcontent**: `string`

Defined in: [packages/core/src/widgets/element.ts:76](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L76)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_pcontent`](widgets.scrollablebox.Class.ScrollableBox.md#_pcontent)

***

### \_slisteners?

> `optional` **\_slisteners**: `any`[]

Defined in: [packages/core/src/widgets/element.ts:77](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L77)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_slisteners`](widgets.scrollablebox.Class.ScrollableBox.md#_slisteners)

***

### \_label?

> `optional` **\_label**: `any`

Defined in: [packages/core/src/widgets/element.ts:78](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L78)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_label`](widgets.scrollablebox.Class.ScrollableBox.md#_label)

***

### \_labelScroll()?

> `optional` **\_labelScroll**: () => `void`

Defined in: [packages/core/src/widgets/element.ts:79](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L79)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_labelScroll`](widgets.scrollablebox.Class.ScrollableBox.md#_labelscroll)

***

### \_labelResize()?

> `optional` **\_labelResize**: () => `void`

Defined in: [packages/core/src/widgets/element.ts:80](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L80)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_labelResize`](widgets.scrollablebox.Class.ScrollableBox.md#_labelresize)

***

### \_hoverOptions?

> `optional` **\_hoverOptions**: `any`

Defined in: [packages/core/src/widgets/element.ts:81](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L81)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_hoverOptions`](widgets.scrollablebox.Class.ScrollableBox.md#_hoveroptions)

***

### \_draggable?

> `optional` **\_draggable**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:82](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L82)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_draggable`](widgets.scrollablebox.Class.ScrollableBox.md#_draggable)

***

### \_dragMD()?

> `optional` **\_dragMD**: (`data`) => `void`

Defined in: [packages/core/src/widgets/element.ts:83](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L83)

#### Parameters

##### data

`MouseEvent`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_dragMD`](widgets.scrollablebox.Class.ScrollableBox.md#_dragmd)

***

### \_dragM()?

> `optional` **\_dragM**: (`data`) => `void`

Defined in: [packages/core/src/widgets/element.ts:84](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L84)

#### Parameters

##### data

`MouseEvent`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_dragM`](widgets.scrollablebox.Class.ScrollableBox.md#_dragm)

***

### \_drag?

> `optional` **\_drag**: `any`

Defined in: [packages/core/src/widgets/element.ts:85](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L85)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_drag`](widgets.scrollablebox.Class.ScrollableBox.md#_drag)

***

### \_noFill?

> `optional` **\_noFill**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:86](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L86)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_noFill`](widgets.scrollablebox.Class.ScrollableBox.md#_nofill)

***

### \_isLabel?

> `optional` **\_isLabel**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:87](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L87)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_isLabel`](widgets.scrollablebox.Class.ScrollableBox.md#_islabel)

***

### \_isList?

> `optional` **\_isList**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:88](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L88)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_isList`](widgets.scrollablebox.Class.ScrollableBox.md#_islist)

***

### childBase?

> `optional` **childBase**: `number`

Defined in: [packages/core/src/widgets/element.ts:89](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L89)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`childBase`](widgets.scrollablebox.Class.ScrollableBox.md#childbase)

***

### childOffset?

> `optional` **childOffset**: `number`

Defined in: [packages/core/src/widgets/element.ts:90](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L90)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`childOffset`](widgets.scrollablebox.Class.ScrollableBox.md#childoffset)

***

### alwaysScroll?

> `optional` **alwaysScroll**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:91](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L91)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`alwaysScroll`](widgets.scrollablebox.Class.ScrollableBox.md#alwaysscroll)

***

### baseLimit?

> `optional` **baseLimit**: `number`

Defined in: [packages/core/src/widgets/element.ts:92](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L92)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`baseLimit`](widgets.scrollablebox.Class.ScrollableBox.md#baselimit)

***

### track?

> `optional` **track**: `TrackConfig`

Defined in: [packages/core/src/widgets/element.ts:93](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L93)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`track`](widgets.scrollablebox.Class.ScrollableBox.md#track)

***

### scrollbar?

> `optional` **scrollbar**: `ScrollbarConfig`

Defined in: [packages/core/src/widgets/element.ts:94](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L94)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`scrollbar`](widgets.scrollablebox.Class.ScrollableBox.md#scrollbar)

***

### items?

> `optional` **items**: `any`[]

Defined in: [packages/core/src/widgets/element.ts:95](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L95)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`items`](widgets.scrollablebox.Class.ScrollableBox.md#items)

***

### scrollable?

> `optional` **scrollable**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:98](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L98)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`scrollable`](widgets.scrollablebox.Class.ScrollableBox.md#scrollable)

***

### scroll()?

> `optional` **scroll**: (`offset`, `always?`) => `any`

Defined in: [packages/core/src/widgets/element.ts:101](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L101)

Scroll the content by a relative offset.

#### Parameters

##### offset

`number`

The number of lines/items to scroll (positive = down, negative = up)

##### always?

`boolean`

Force the scroll operation even if position hasn't changed

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`scroll`](widgets.scrollablebox.Class.ScrollableBox.md#scroll)

***

### scrollTo()?

> `optional` **scrollTo**: (`offset`, `always?`) => `void`

Defined in: [packages/core/src/widgets/element.ts:102](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L102)

Scroll the content to an absolute index.

#### Parameters

##### offset

`number`

The absolute scroll position (line/item index)

##### always?

`boolean`

Force the scroll operation even if position hasn't changed

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`scrollTo`](widgets.scrollablebox.Class.ScrollableBox.md#scrollto)

***

### setScroll()?

> `optional` **setScroll**: (`offset`, `always?`) => `void`

Defined in: [packages/core/src/widgets/element.ts:103](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L103)

Scroll the content to an absolute index (alias for scrollTo).

#### Parameters

##### offset

`number`

The absolute scroll position (line/item index)

##### always?

`boolean`

Force the scroll operation even if position hasn't changed

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setScroll`](widgets.scrollablebox.Class.ScrollableBox.md#setscroll)

***

### getScroll()?

> `optional` **getScroll**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:104](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L104)

Get the current scroll index in lines.

#### Returns

`number`

The current absolute scroll position

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getScroll`](widgets.scrollablebox.Class.ScrollableBox.md#getscroll)

***

### getScrollHeight()?

> `optional` **getScrollHeight**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:105](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L105)

Get the actual height of the scrolling area (total content height).

#### Returns

`number`

The total scrollable content height in lines

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getScrollHeight`](widgets.scrollablebox.Class.ScrollableBox.md#getscrollheight)

***

### getScrollPerc()?

> `optional` **getScrollPerc**: (`s?`) => `number`

Defined in: [packages/core/src/widgets/element.ts:106](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L106)

Get the current scroll index in percentage (0-100).

#### Parameters

##### s?

`boolean`

Internal flag for special return values

#### Returns

`number`

The scroll position as a percentage (0-100), or -1 if not scrollable

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getScrollPerc`](widgets.scrollablebox.Class.ScrollableBox.md#getscrollperc)

***

### setScrollPerc()?

> `optional` **setScrollPerc**: (`i`) => `void`

Defined in: [packages/core/src/widgets/element.ts:107](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L107)

Set the current scroll index in percentage (0-100).

#### Parameters

##### i

`number`

The target scroll percentage (0-100)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setScrollPerc`](widgets.scrollablebox.Class.ScrollableBox.md#setscrollperc)

***

### resetScroll()?

> `optional` **resetScroll**: () => `any`

Defined in: [packages/core/src/widgets/element.ts:108](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L108)

Reset the scroll index to its initial state (top).

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`resetScroll`](widgets.scrollablebox.Class.ScrollableBox.md#resetscroll)

***

### \_scrollBottom()?

> `optional` **\_scrollBottom**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:109](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L109)

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_scrollBottom`](widgets.scrollablebox.Class.ScrollableBox.md#_scrollbottom)

***

### \_recalculateIndex()?

> `optional` **\_recalculateIndex**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:110](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L110)

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_recalculateIndex`](widgets.scrollablebox.Class.ScrollableBox.md#_recalculateindex)

***

### uid

> `static` **uid**: `number` = `0`

Defined in: [packages/core/src/widgets/node.ts:30](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L30)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`uid`](widgets.scrollablebox.Class.ScrollableBox.md#uid)

***

### ScreenRegistry

> `static` **ScreenRegistry**: `any`

Defined in: [packages/core/src/widgets/node.ts:31](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L31)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`ScreenRegistry`](widgets.scrollablebox.Class.ScrollableBox.md#screenregistry)

***

### options

> **options**: `NodeOptions`

Defined in: [packages/core/src/widgets/node.ts:38](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L38)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`options`](widgets.scrollablebox.Class.ScrollableBox.md#options)

***

### screen

> **screen**: `any`

Defined in: [packages/core/src/widgets/node.ts:47](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L47)

Reference to the parent Screen instance.
Type: Screen (subclass of Node)

Kept as any due to circular dependency between Node and Screen,
and to preserve access to Screen-specific methods like clearRegion(),
render(), and the program property without complex generic typing.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`screen`](widgets.scrollablebox.Class.ScrollableBox.md#screen)

***

### parent

> **parent**: `any`

Defined in: [packages/core/src/widgets/node.ts:56](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L56)

Reference to the parent element in the widget tree.
Type: Node (can be any Element/Box/List/etc subclass)

Kept as any to avoid complex generic typing and preserve access
to subclass-specific methods. Attempting to type as Node loses
methods from subclasses like Box, List, Form, etc.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`parent`](widgets.scrollablebox.Class.ScrollableBox.md#parent)

***

### children

> **children**: `any`[]

Defined in: [packages/core/src/widgets/node.ts:63](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L63)

Array of child elements.
Type: Node[] (can contain any Node subclasses)

Kept as any[] to preserve flexibility with mixed widget types.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`children`](widgets.scrollablebox.Class.ScrollableBox.md#children)

***

### $

> **$**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:68](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L68)

An object for any miscellaneous user data.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`$`](widgets.scrollablebox.Class.ScrollableBox.md#)

***

### \_

> **\_**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:73](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L73)

An object for any miscellaneous user data.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_`](widgets.scrollablebox.Class.ScrollableBox.md#_)

***

### data

> **data**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:78](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L78)

An object for any miscellaneous user data.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`data`](widgets.scrollablebox.Class.ScrollableBox.md#data)

***

### uid

> **uid**: `number`

Defined in: [packages/core/src/widgets/node.ts:80](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L80)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`uid`](widgets.scrollablebox.Class.ScrollableBox.md#uid-1)

***

### index

> **index**: `number` = `-1`

Defined in: [packages/core/src/widgets/node.ts:86](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L86)

Render index (document order index) of the last render call.
Indicates the order in which this element was rendered relative to others.
Set to -1 initially, updated during rendering.

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`index`](widgets.scrollablebox.Class.ScrollableBox.md#index)

***

### detached?

> `optional` **detached**: `boolean`

Defined in: [packages/core/src/widgets/node.ts:87](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L87)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`detached`](widgets.scrollablebox.Class.ScrollableBox.md#detached)

***

### destroyed?

> `optional` **destroyed**: `boolean`

Defined in: [packages/core/src/widgets/node.ts:88](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L88)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`destroyed`](widgets.scrollablebox.Class.ScrollableBox.md#destroyed)

***

### runtime

> **runtime**: [`Runtime`](runtime.Interface.Runtime.md)

Defined in: [packages/core/src/widgets/node.ts:90](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L90)

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`runtime`](widgets.scrollablebox.Class.ScrollableBox.md#runtime)

***

### type

> **type**: `string` = `"scrollable-text"`

Defined in: [packages/core/src/widgets/scrollabletext.ts:17](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/scrollabletext.ts#L17)

Type of the node (e.g. box, list, form, etc.).
Used to identify the widget type at runtime.

#### Overrides

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`type`](widgets.scrollablebox.Class.ScrollableBox.md#type)

## Accessors

### focused

#### Get Signature

> **get** **focused**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:112](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L112)

##### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`focused`](widgets.scrollablebox.Class.ScrollableBox.md#focused)

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:894](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L894)

##### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`visible`](widgets.scrollablebox.Class.ScrollableBox.md#visible)

***

### \_detached

#### Get Signature

> **get** **\_detached**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:905](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L905)

##### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_detached`](widgets.scrollablebox.Class.ScrollableBox.md#_detached)

***

### draggable

#### Get Signature

> **get** **draggable**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:938](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L938)

##### Returns

`boolean`

#### Set Signature

> **set** **draggable**(`draggable`): `void`

Defined in: [packages/core/src/widgets/element.ts:942](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L942)

##### Parameters

###### draggable

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`draggable`](widgets.scrollablebox.Class.ScrollableBox.md#draggable)

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1339](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1339)

##### Returns

`number`

#### Set Signature

> **set** **width**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1543](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1543)

Position Setters

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`width`](widgets.scrollablebox.Class.ScrollableBox.md#width)

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1390](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1390)

##### Returns

`number`

#### Set Signature

> **set** **height**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1551](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1551)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`height`](widgets.scrollablebox.Class.ScrollableBox.md#height)

***

### aleft

#### Get Signature

> **get** **aleft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1427](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1427)

##### Returns

`number`

#### Set Signature

> **set** **aleft**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1559](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1559)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`aleft`](widgets.scrollablebox.Class.ScrollableBox.md#aleft)

***

### aright

#### Get Signature

> **get** **aright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1452](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1452)

##### Returns

`number`

#### Set Signature

> **set** **aright**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1580](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1580)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`aright`](widgets.scrollablebox.Class.ScrollableBox.md#aright)

***

### atop

#### Get Signature

> **get** **atop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1489](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1489)

##### Returns

`number`

#### Set Signature

> **set** **atop**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1588](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1588)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`atop`](widgets.scrollablebox.Class.ScrollableBox.md#atop)

***

### abottom

#### Get Signature

> **get** **abottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1514](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1514)

##### Returns

`number`

#### Set Signature

> **set** **abottom**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1609](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1609)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`abottom`](widgets.scrollablebox.Class.ScrollableBox.md#abottom)

***

### rleft

#### Get Signature

> **get** **rleft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1518](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1518)

##### Returns

`number`

#### Set Signature

> **set** **rleft**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1617](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1617)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`rleft`](widgets.scrollablebox.Class.ScrollableBox.md#rleft)

***

### rright

#### Get Signature

> **get** **rright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1522](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1522)

##### Returns

`number`

#### Set Signature

> **set** **rright**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1625](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1625)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`rright`](widgets.scrollablebox.Class.ScrollableBox.md#rright)

***

### rtop

#### Get Signature

> **get** **rtop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1526](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1526)

##### Returns

`number`

#### Set Signature

> **set** **rtop**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1632](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1632)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`rtop`](widgets.scrollablebox.Class.ScrollableBox.md#rtop)

***

### rbottom

#### Get Signature

> **get** **rbottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1530](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1530)

##### Returns

`number`

#### Set Signature

> **set** **rbottom**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1640](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1640)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`rbottom`](widgets.scrollablebox.Class.ScrollableBox.md#rbottom)

***

### ileft

#### Get Signature

> **get** **ileft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1647](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1647)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`ileft`](widgets.scrollablebox.Class.ScrollableBox.md#ileft)

***

### itop

#### Get Signature

> **get** **itop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1652](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1652)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`itop`](widgets.scrollablebox.Class.ScrollableBox.md#itop)

***

### iright

#### Get Signature

> **get** **iright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1657](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1657)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`iright`](widgets.scrollablebox.Class.ScrollableBox.md#iright)

***

### ibottom

#### Get Signature

> **get** **ibottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1662](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1662)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`ibottom`](widgets.scrollablebox.Class.ScrollableBox.md#ibottom)

***

### iwidth

#### Get Signature

> **get** **iwidth**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1667](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1667)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`iwidth`](widgets.scrollablebox.Class.ScrollableBox.md#iwidth)

***

### iheight

#### Get Signature

> **get** **iheight**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1674](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1674)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`iheight`](widgets.scrollablebox.Class.ScrollableBox.md#iheight)

***

### tpadding

#### Get Signature

> **get** **tpadding**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1681](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1681)

##### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`tpadding`](widgets.scrollablebox.Class.ScrollableBox.md#tpadding)

***

### left

#### Get Signature

> **get** **left**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1694](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1694)

Relative coordinates as default properties

##### Returns

`number`

#### Set Signature

> **set** **left**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1710](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1710)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`left`](widgets.scrollablebox.Class.ScrollableBox.md#left)

***

### right

#### Get Signature

> **get** **right**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1698](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1698)

##### Returns

`number`

#### Set Signature

> **set** **right**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1714](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1714)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`right`](widgets.scrollablebox.Class.ScrollableBox.md#right)

***

### top

#### Get Signature

> **get** **top**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1702](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1702)

##### Returns

`number`

#### Set Signature

> **set** **top**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1718](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1718)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`top`](widgets.scrollablebox.Class.ScrollableBox.md#top)

***

### bottom

#### Get Signature

> **get** **bottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1706](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1706)

##### Returns

`number`

#### Set Signature

> **set** **bottom**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1722](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1722)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`bottom`](widgets.scrollablebox.Class.ScrollableBox.md#bottom)

## Methods

### setMaxListeners()

> **setMaxListeners**(`n`): `void`

Defined in: [packages/core/src/lib/events.ts:19](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L19)

#### Parameters

##### n

`number`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setMaxListeners`](widgets.scrollablebox.Class.ScrollableBox.md#setmaxlisteners)

***

### addListener()

> **addListener**(`type`, `listener`): `void`

Defined in: [packages/core/src/lib/events.ts:23](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L23)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`addListener`](widgets.scrollablebox.Class.ScrollableBox.md#addlistener)

***

### on()

> **on**(`type`, `listener`): `any`

Defined in: [packages/core/src/lib/events.ts:34](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L34)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`on`](widgets.scrollablebox.Class.ScrollableBox.md#on)

***

### removeListener()

> **removeListener**(`type`, `listener`): `void`

Defined in: [packages/core/src/lib/events.ts:38](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L38)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`removeListener`](widgets.scrollablebox.Class.ScrollableBox.md#removelistener)

***

### off()

> **off**(`type`, `listener`): `any`

Defined in: [packages/core/src/lib/events.ts:57](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L57)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`off`](widgets.scrollablebox.Class.ScrollableBox.md#off)

***

### removeAllListeners()

> **removeAllListeners**(`type?`): `void`

Defined in: [packages/core/src/lib/events.ts:61](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L61)

#### Parameters

##### type?

`string`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`removeAllListeners`](widgets.scrollablebox.Class.ScrollableBox.md#removealllisteners)

***

### once()

> **once**(`type`, `listener`): `any`

Defined in: [packages/core/src/lib/events.ts:69](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L69)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`once`](widgets.scrollablebox.Class.ScrollableBox.md#once)

***

### listeners()

> **listeners**(`type`): `Function`[]

Defined in: [packages/core/src/lib/events.ts:79](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L79)

#### Parameters

##### type

`string`

#### Returns

`Function`[]

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`listeners`](widgets.scrollablebox.Class.ScrollableBox.md#listeners)

***

### \_emit()

> **\_emit**(`type`, `args`): `any`

Defined in: [packages/core/src/lib/events.ts:85](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L85)

#### Parameters

##### type

`string`

##### args

`any`[]

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_emit`](widgets.scrollablebox.Class.ScrollableBox.md#_emit)

***

### emit()

> **emit**(`type`, ...`rest`): `boolean`

Defined in: [packages/core/src/lib/events.ts:113](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/lib/events.ts#L113)

#### Parameters

##### type

`string`

##### rest

...`any`[]

#### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`emit`](widgets.scrollablebox.Class.ScrollableBox.md#emit)

***

### sattr()

> **sattr**(`style`, `fg?`, `bg?`): `number`

Defined in: [packages/core/src/widgets/element.ts:319](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L319)

#### Parameters

##### style

`any`

##### fg?

`any`

##### bg?

`any`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`sattr`](widgets.scrollablebox.Class.ScrollableBox.md#sattr)

***

### onScreenEvent()

> **onScreenEvent**(`type`, `handler`): `void`

Defined in: [packages/core/src/widgets/element.ts:362](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L362)

Same as el.on('screen', ...) except this will automatically keep track of which listeners
are bound to the screen object. For use with removeScreenEvent(), free(), and destroy().

#### Parameters

##### type

`string`

Event type

##### handler

(...`args`) => `void`

Event handler function

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`onScreenEvent`](widgets.scrollablebox.Class.ScrollableBox.md#onscreenevent)

***

### onceScreenEvent()

> **onceScreenEvent**(`type`, `handler`): `void`

Defined in: [packages/core/src/widgets/element.ts:373](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L373)

Same as onScreenEvent() but fires only once.

#### Parameters

##### type

`string`

Event type

##### handler

(...`args`) => `void`

Event handler function

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`onceScreenEvent`](widgets.scrollablebox.Class.ScrollableBox.md#oncescreenevent)

***

### removeScreenEvent()

> **removeScreenEvent**(`type`, `handler`): `void`

Defined in: [packages/core/src/widgets/element.ts:390](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L390)

Same as el.removeListener('screen', ...) except this will automatically keep track of which
listeners are bound to the screen object. For use with onScreenEvent(), free(), and destroy().

#### Parameters

##### type

`string`

Event type

##### handler

(...`args`) => `void`

Event handler function

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`removeScreenEvent`](widgets.scrollablebox.Class.ScrollableBox.md#removescreenevent)

***

### free()

> **free**(): `void`

Defined in: [packages/core/src/widgets/element.ts:410](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L410)

Free up the element. Automatically unbind all events that may have been bound to the screen
object. This prevents memory leaks. For use with onScreenEvent(), removeScreenEvent(),
and destroy().

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`free`](widgets.scrollablebox.Class.ScrollableBox.md#free)

***

### hide()

> **hide**(): `void`

Defined in: [packages/core/src/widgets/element.ts:422](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L422)

Hide element.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`hide`](widgets.scrollablebox.Class.ScrollableBox.md#hide)

***

### show()

> **show**(): `void`

Defined in: [packages/core/src/widgets/element.ts:435](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L435)

Show element.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`show`](widgets.scrollablebox.Class.ScrollableBox.md#show)

***

### toggle()

> **toggle**(): `void`

Defined in: [packages/core/src/widgets/element.ts:444](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L444)

Toggle hidden/shown.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`toggle`](widgets.scrollablebox.Class.ScrollableBox.md#toggle)

***

### focus()

> **focus**(): `any`

Defined in: [packages/core/src/widgets/element.ts:451](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L451)

Focus element.

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`focus`](widgets.scrollablebox.Class.ScrollableBox.md#focus)

***

### setContent()

> **setContent**(`content`, `noClear?`, `noTags?`): `void`

Defined in: [packages/core/src/widgets/element.ts:460](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L460)

Set the content. Note: When text is input, it will be stripped of all non-SGR
escape codes, tabs will be replaced with 8 spaces, and tags will be replaced
with SGR codes (if enabled).

#### Parameters

##### content

`string`

##### noClear?

`boolean`

##### noTags?

`boolean`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setContent`](widgets.scrollablebox.Class.ScrollableBox.md#setcontent)

***

### getContent()

> **getContent**(): `string`

Defined in: [packages/core/src/widgets/element.ts:470](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L470)

Return content, slightly different from el.content. Assume the above formatting.

#### Returns

`string`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getContent`](widgets.scrollablebox.Class.ScrollableBox.md#getcontent)

***

### setText()

> **setText**(`content`, `noClear?`): `void`

Defined in: [packages/core/src/widgets/element.ts:478](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L478)

Similar to setContent, but ignore tags and remove escape codes.

#### Parameters

##### content

`string`

##### noClear?

`boolean`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setText`](widgets.scrollablebox.Class.ScrollableBox.md#settext)

***

### getText()

> **getText**(): `string`

Defined in: [packages/core/src/widgets/element.ts:487](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L487)

Similar to getContent, but return content with tags and escape codes removed.

#### Returns

`string`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getText`](widgets.scrollablebox.Class.ScrollableBox.md#gettext)

***

### parseContent()

> **parseContent**(`noTags?`): `boolean`

Defined in: [packages/core/src/widgets/element.ts:491](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L491)

#### Parameters

##### noTags?

`boolean`

#### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`parseContent`](widgets.scrollablebox.Class.ScrollableBox.md#parsecontent)

***

### \_parseTags()

> **\_parseTags**(`text`): `string`

Defined in: [packages/core/src/widgets/element.ts:558](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L558)

#### Parameters

##### text

`string`

#### Returns

`string`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_parseTags`](widgets.scrollablebox.Class.ScrollableBox.md#_parsetags)

***

### \_parseAttr()

> **\_parseAttr**(`lines`): `any`

Defined in: [packages/core/src/widgets/element.ts:663](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L663)

#### Parameters

##### lines

`any`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_parseAttr`](widgets.scrollablebox.Class.ScrollableBox.md#_parseattr)

***

### \_align()

> **\_align**(`line`, `width`, `align?`): `string`

Defined in: [packages/core/src/widgets/element.ts:692](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L692)

#### Parameters

##### line

`string`

##### width

`number`

##### align?

`string`

#### Returns

`string`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_align`](widgets.scrollablebox.Class.ScrollableBox.md#_align)

***

### \_wrapContent()

> **\_wrapContent**(`content`, `width`): `WrappedContent`

Defined in: [packages/core/src/widgets/element.ts:724](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L724)

#### Parameters

##### content

`string`

##### width

`number`

#### Returns

`WrappedContent`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_wrapContent`](widgets.scrollablebox.Class.ScrollableBox.md#_wrapcontent)

***

### enableMouse()

> **enableMouse**(): `void`

Defined in: [packages/core/src/widgets/element.ts:918](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L918)

Enable mouse events for the element (automatically called when a form of on('mouse') is bound).
Registers the element as clickable with the screen.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`enableMouse`](widgets.scrollablebox.Class.ScrollableBox.md#enablemouse)

***

### enableKeys()

> **enableKeys**(): `void`

Defined in: [packages/core/src/widgets/element.ts:926](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L926)

Enable keypress events for the element (automatically called when a form of on('keypress') is bound).
Registers the element as keyable with the screen.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`enableKeys`](widgets.scrollablebox.Class.ScrollableBox.md#enablekeys)

***

### enableInput()

> **enableInput**(): `void`

Defined in: [packages/core/src/widgets/element.ts:933](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L933)

Enable key and mouse events. Calls both enableMouse() and enableKeys().

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`enableInput`](widgets.scrollablebox.Class.ScrollableBox.md#enableinput)

***

### enableDrag()

> **enableDrag**(`verify?`): `boolean`

Defined in: [packages/core/src/widgets/element.ts:956](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L956)

Enable dragging of the element.
Allows the element to be dragged with the mouse. Automatically calls enableMouse().

#### Parameters

##### verify?

`any`

Optional callback function to verify if dragging should start (receives mouse data)

#### Returns

`boolean`

True if dragging was enabled

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`enableDrag`](widgets.scrollablebox.Class.ScrollableBox.md#enabledrag)

***

### disableDrag()

> **disableDrag**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:1030](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1030)

Disable dragging of the element.
Removes drag event handlers and resets dragging state.

#### Returns

`boolean`

True if dragging was disabled

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`disableDrag`](widgets.scrollablebox.Class.ScrollableBox.md#disabledrag)

***

### key()

> **key**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1044](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1044)

Bind a key event handler.

#### Parameters

##### args

...`any`[]

Arguments to pass to program.key()

#### Returns

`any`

The bound key handler

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`key`](widgets.scrollablebox.Class.ScrollableBox.md#key)

***

### onceKey()

> **onceKey**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1053](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1053)

Bind a key event handler that fires only once.

#### Parameters

##### args

...`any`[]

Arguments to pass to program.onceKey()

#### Returns

`any`

The bound key handler

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`onceKey`](widgets.scrollablebox.Class.ScrollableBox.md#oncekey)

***

### unkey()

> **unkey**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1062](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1062)

Unbind a key event handler.

#### Parameters

##### args

...`any`[]

Arguments to pass to program.unkey()

#### Returns

`any`

Result of unbinding

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`unkey`](widgets.scrollablebox.Class.ScrollableBox.md#unkey)

***

### removeKey()

> **removeKey**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1072](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1072)

Remove a key event handler.
Alias for unkey().

#### Parameters

##### args

...`any`[]

Arguments to pass to program.unkey()

#### Returns

`any`

Result of removing

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`removeKey`](widgets.scrollablebox.Class.ScrollableBox.md#removekey)

***

### setIndex()

> **setIndex**(`index`): `void`

Defined in: [packages/core/src/widgets/element.ts:1081](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1081)

Set the z-index of the element (changes rendering order).
Higher indices are rendered later (on top). Negative indices count from the end.

#### Parameters

##### index

`number`

New z-index value

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setIndex`](widgets.scrollablebox.Class.ScrollableBox.md#setindex)

***

### setFront()

> **setFront**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1102](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1102)

Put the element in front of its siblings.
Sets the element's z-index to the highest value (renders last/on top).

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setFront`](widgets.scrollablebox.Class.ScrollableBox.md#setfront)

***

### setBack()

> **setBack**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1110](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1110)

Put the element in back of its siblings.
Sets the element's z-index to the lowest value (renders first/at bottom).

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setBack`](widgets.scrollablebox.Class.ScrollableBox.md#setback)

***

### clearPos()

> **clearPos**(`get?`, `override?`): `void`

Defined in: [packages/core/src/widgets/element.ts:1120](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1120)

Clear the element's position in the screen buffer.
Fills the region with spaces, used when moving or hiding elements.

#### Parameters

##### get?

`boolean`

Whether to use _getCoords (default: false)

##### override?

`any`

If true, always clear even if cell hasn't changed

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`clearPos`](widgets.scrollablebox.Class.ScrollableBox.md#clearpos)

***

### setLabel()

> **setLabel**(`options`): `void`

Defined in: [packages/core/src/widgets/element.ts:1135](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1135)

Set the label text for the top-left (or top-right) corner.
Creates or updates a label that appears on the top border of the element.

#### Parameters

##### options

`any`

Label text (string) or options object with text and side properties

#### Returns

`void`

#### Example

```ts
element.setLabel('My Label');
element.setLabel({ text: 'My Label', side: 'right' });
```

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setLabel`](widgets.scrollablebox.Class.ScrollableBox.md#setlabel)

***

### removeLabel()

> **removeLabel**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1214](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1214)

Remove the label completely.
Detaches the label element and removes associated event listeners.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`removeLabel`](widgets.scrollablebox.Class.ScrollableBox.md#removelabel)

***

### setHover()

> **setHover**(`options`): `void`

Defined in: [packages/core/src/widgets/element.ts:1231](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1231)

Set a hover text box to follow the cursor. Similar to the "title" DOM attribute in the browser.

#### Parameters

##### options

`any`

Hover text (string) or options object with text property

#### Returns

`void`

#### Example

```ts
element.setHover('Hover text here');
element.setHover({ text: 'Hover text here' });
```

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setHover`](widgets.scrollablebox.Class.ScrollableBox.md#sethover)

***

### removeHover()

> **removeHover**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1245](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1245)

Remove the hover label completely.
Detaches the hover text box if it's currently displayed.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`removeHover`](widgets.scrollablebox.Class.ScrollableBox.md#removehover)

***

### \_getPos()

> **\_getPos**(): `any`

Defined in: [packages/core/src/widgets/element.ts:1271](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1271)

Positioning

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getPos`](widgets.scrollablebox.Class.ScrollableBox.md#_getpos)

***

### \_getWidth()

> **\_getWidth**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1292](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1292)

Position Getters

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getWidth`](widgets.scrollablebox.Class.ScrollableBox.md#_getwidth)

***

### \_getHeight()

> **\_getHeight**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1343](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1343)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getHeight`](widgets.scrollablebox.Class.ScrollableBox.md#_getheight)

***

### \_getLeft()

> **\_getLeft**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1394](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1394)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getLeft`](widgets.scrollablebox.Class.ScrollableBox.md#_getleft)

***

### \_getRight()

> **\_getRight**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1431](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1431)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getRight`](widgets.scrollablebox.Class.ScrollableBox.md#_getright)

***

### \_getTop()

> **\_getTop**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1456](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1456)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getTop`](widgets.scrollablebox.Class.ScrollableBox.md#_gettop)

***

### \_getBottom()

> **\_getBottom**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1493](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1493)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getBottom`](widgets.scrollablebox.Class.ScrollableBox.md#_getbottom)

***

### \_getShrinkBox()

> **\_getShrinkBox**(`xi`, `xl`, `yi`, `yl`, `get?`): `any`

Defined in: [packages/core/src/widgets/element.ts:1730](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1730)

Rendering - here be dragons

#### Parameters

##### xi

`number`

##### xl

`number`

##### yi

`number`

##### yl

`number`

##### get?

`boolean`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getShrinkBox`](widgets.scrollablebox.Class.ScrollableBox.md#_getshrinkbox)

***

### \_getShrinkContent()

> **\_getShrinkContent**(`xi`, `xl`, `yi`, `yl`, `_get?`): `any`

Defined in: [packages/core/src/widgets/element.ts:1881](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1881)

#### Parameters

##### xi

`number`

##### xl

`number`

##### yi

`number`

##### yl

`number`

##### \_get?

`boolean`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getShrinkContent`](widgets.scrollablebox.Class.ScrollableBox.md#_getshrinkcontent)

***

### \_getShrink()

> **\_getShrink**(`xi`, `xl`, `yi`, `yl`, `get?`): `any`

Defined in: [packages/core/src/widgets/element.ts:1917](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1917)

#### Parameters

##### xi

`number`

##### xl

`number`

##### yi

`number`

##### yl

`number`

##### get?

`boolean`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getShrink`](widgets.scrollablebox.Class.ScrollableBox.md#_getshrink)

***

### \_getCoords()

> **\_getCoords**(`get?`, `noscroll?`): `RenderCoords` \| `undefined`

Defined in: [packages/core/src/widgets/element.ts:1962](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L1962)

#### Parameters

##### get?

`boolean`

##### noscroll?

`boolean`

#### Returns

`RenderCoords` \| `undefined`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_getCoords`](widgets.scrollablebox.Class.ScrollableBox.md#_getcoords)

***

### render()

> **render**(): `any`

Defined in: [packages/core/src/widgets/element.ts:2135](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2135)

Write content and children to the screen buffer.
This is the main rendering method that draws the element, its border, scrollbar,
and all child elements to the screen buffer. Returns the rendered coordinates.

#### Returns

`any`

Rendered coordinates object, or undefined if hidden/invalid

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`render`](widgets.scrollablebox.Class.ScrollableBox.md#render)

***

### \_render()

> **\_render**(): `any`

Defined in: [packages/core/src/widgets/element.ts:2673](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2673)

Internal alias for render().

#### Returns

`any`

Rendered coordinates object

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`_render`](widgets.scrollablebox.Class.ScrollableBox.md#_render)

***

### insertLine()

> **insertLine**(`i`, `line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2687](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2687)

Insert a line into the box's content.
Handles wrapped content by inserting at the specified fake line index.

#### Parameters

##### i

`number`

Line index to insert at (fake line number)

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`insertLine`](widgets.scrollablebox.Class.ScrollableBox.md#insertline)

***

### deleteLine()

> **deleteLine**(`i`, `n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:2748](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2748)

Delete a line from the box's content.
Handles wrapped content by deleting at the specified fake line index.

#### Parameters

##### i

`number`

Line index to delete (fake line number)

##### n?

`number`

Number of lines to delete (default: 1)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`deleteLine`](widgets.scrollablebox.Class.ScrollableBox.md#deleteline)

***

### insertTop()

> **insertTop**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2804](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2804)

Insert a line at the top of the box.
Inserts at the first visible line based on childBase.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`insertTop`](widgets.scrollablebox.Class.ScrollableBox.md#inserttop)

***

### insertBottom()

> **insertBottom**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2814](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2814)

Insert a line at the bottom of the box.
Inserts after the last visible line based on height and childBase.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`insertBottom`](widgets.scrollablebox.Class.ScrollableBox.md#insertbottom)

***

### deleteTop()

> **deleteTop**(`n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:2827](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2827)

Delete a line at the top of the box.
Deletes from the first visible line based on childBase.

#### Parameters

##### n?

`number`

Number of lines to delete (default: 1)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`deleteTop`](widgets.scrollablebox.Class.ScrollableBox.md#deletetop)

***

### deleteBottom()

> **deleteBottom**(`n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:2837](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2837)

Delete a line at the bottom of the box.
Deletes from the last visible line based on height and childBase.

#### Parameters

##### n?

`number`

Number of lines to delete (default: 1)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`deleteBottom`](widgets.scrollablebox.Class.ScrollableBox.md#deletebottom)

***

### setLine()

> **setLine**(`i`, `line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2852](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2852)

Set a line in the box's content.

#### Parameters

##### i

`number`

Line index to set (fake line number)

##### line

`string`

Line content to set

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setLine`](widgets.scrollablebox.Class.ScrollableBox.md#setline)

***

### setBaseLine()

> **setBaseLine**(`i`, `line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2866](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2866)

Set a line in the box's content from the visible top.

#### Parameters

##### i

`number`

Line offset from visible top

##### line

`string`

Line content to set

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`setBaseLine`](widgets.scrollablebox.Class.ScrollableBox.md#setbaseline)

***

### getLine()

> **getLine**(`i`): `string`

Defined in: [packages/core/src/widgets/element.ts:2876](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2876)

Get a line from the box's content.

#### Parameters

##### i

`number`

Line index to get (fake line number)

#### Returns

`string`

Line content

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getLine`](widgets.scrollablebox.Class.ScrollableBox.md#getline)

***

### getBaseLine()

> **getBaseLine**(`i`): `string`

Defined in: [packages/core/src/widgets/element.ts:2887](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2887)

Get a line from the box's content from the visible top.

#### Parameters

##### i

`number`

Line offset from visible top

#### Returns

`string`

Line content

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getBaseLine`](widgets.scrollablebox.Class.ScrollableBox.md#getbaseline)

***

### clearLine()

> **clearLine**(`i`): `void`

Defined in: [packages/core/src/widgets/element.ts:2896](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2896)

Clear a line from the box's content.

#### Parameters

##### i

`number`

Line index to clear (fake line number)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`clearLine`](widgets.scrollablebox.Class.ScrollableBox.md#clearline)

***

### clearBaseLine()

> **clearBaseLine**(`i`): `void`

Defined in: [packages/core/src/widgets/element.ts:2905](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2905)

Clear a line from the box's content from the visible top.

#### Parameters

##### i

`number`

Line offset from visible top

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`clearBaseLine`](widgets.scrollablebox.Class.ScrollableBox.md#clearbaseline)

***

### unshiftLine()

> **unshiftLine**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2914](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2914)

Unshift a line onto the top of the content.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`unshiftLine`](widgets.scrollablebox.Class.ScrollableBox.md#unshiftline)

***

### shiftLine()

> **shiftLine**(`i?`, `n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:2923](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2923)

Shift a line off the top of the content.

#### Parameters

##### i?

`number`

Line index to remove (default: 0)

##### n?

`number`

Number of lines to remove (default: 1)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`shiftLine`](widgets.scrollablebox.Class.ScrollableBox.md#shiftline)

***

### pushLine()

> **pushLine**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2931](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2931)

Push a line onto the bottom of the content.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`pushLine`](widgets.scrollablebox.Class.ScrollableBox.md#pushline)

***

### popLine()

> **popLine**(`n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:2940](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2940)

Pop a line off the bottom of the content.

#### Parameters

##### n?

`number`

Number of lines to remove (default: 1)

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`popLine`](widgets.scrollablebox.Class.ScrollableBox.md#popline)

***

### getLines()

> **getLines**(): `string`[]

Defined in: [packages/core/src/widgets/element.ts:2948](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2948)

An array containing the content lines.

#### Returns

`string`[]

Array of fake (unwrapped) lines

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getLines`](widgets.scrollablebox.Class.ScrollableBox.md#getlines)

***

### getScreenLines()

> **getScreenLines**(): `string`[]

Defined in: [packages/core/src/widgets/element.ts:2956](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2956)

An array containing the lines as they are displayed on the screen.

#### Returns

`string`[]

Array of real (wrapped) lines

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`getScreenLines`](widgets.scrollablebox.Class.ScrollableBox.md#getscreenlines)

***

### strWidth()

> **strWidth**(`text`): `number`

Defined in: [packages/core/src/widgets/element.ts:2966](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2966)

Get a string's displayed width, taking into account double-width, surrogate pairs,
combining characters, tags, and SGR escape codes.

#### Parameters

##### text

`string`

Text to measure

#### Returns

`number`

Displayed width in cells

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`strWidth`](widgets.scrollablebox.Class.ScrollableBox.md#strwidth)

***

### screenshot()

> **screenshot**(`xi?`, `xl?`, `yi?`, `yl?`): `string`

Defined in: [packages/core/src/widgets/element.ts:2982](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/element.ts#L2982)

Take an SGR screenshot of the element within the region. Returns a string containing only
characters and SGR codes. Can be displayed by simply echoing it in a terminal.

#### Parameters

##### xi?

`number`

Left X offset from element's inner left (default: 0)

##### xl?

`number`

Right X offset from element's inner left (default: element width)

##### yi?

`number`

Top Y offset from element's inner top (default: 0)

##### yl?

`number`

Bottom Y offset from element's inner top (default: element height)

#### Returns

`string`

SGR-encoded screenshot string

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`screenshot`](widgets.scrollablebox.Class.ScrollableBox.md#screenshot)

***

### insert()

> **insert**(`element`, `i`): `void`

Defined in: [packages/core/src/widgets/node.ts:154](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L154)

Insert a node to this node's children at index i.

#### Parameters

##### element

`any`

##### i

`number`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`insert`](widgets.scrollablebox.Class.ScrollableBox.md#insert)

***

### prepend()

> **prepend**(`element`): `void`

Defined in: [packages/core/src/widgets/node.ts:190](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L190)

Prepend a node to this node's children.

#### Parameters

##### element

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`prepend`](widgets.scrollablebox.Class.ScrollableBox.md#prepend)

***

### append()

> **append**(`element`): `void`

Defined in: [packages/core/src/widgets/node.ts:197](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L197)

Append a node to this node's children.

#### Parameters

##### element

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`append`](widgets.scrollablebox.Class.ScrollableBox.md#append)

***

### insertBefore()

> **insertBefore**(`element`, `other`): `void`

Defined in: [packages/core/src/widgets/node.ts:204](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L204)

Insert a node to this node's children before the reference node.

#### Parameters

##### element

`any`

##### other

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`insertBefore`](widgets.scrollablebox.Class.ScrollableBox.md#insertbefore)

***

### insertAfter()

> **insertAfter**(`element`, `other`): `void`

Defined in: [packages/core/src/widgets/node.ts:212](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L212)

Insert a node from node after the reference node.

#### Parameters

##### element

`any`

##### other

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`insertAfter`](widgets.scrollablebox.Class.ScrollableBox.md#insertafter)

***

### remove()

> **remove**(`element`): `void`

Defined in: [packages/core/src/widgets/node.ts:220](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L220)

Remove child node from node.

#### Parameters

##### element

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`remove`](widgets.scrollablebox.Class.ScrollableBox.md#remove)

***

### detach()

> **detach**(): `void`

Defined in: [packages/core/src/widgets/node.ts:254](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L254)

Remove node from its parent.

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`detach`](widgets.scrollablebox.Class.ScrollableBox.md#detach)

***

### destroy()

> **destroy**(): `void`

Defined in: [packages/core/src/widgets/node.ts:270](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L270)

Same as the detach() method, except this will automatically call free() and unbind any screen
events to prevent memory leaks. For use with onScreenEvent(), removeScreenEvent(), and free().

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`destroy`](widgets.scrollablebox.Class.ScrollableBox.md#destroy)

***

### forDescendants()

> **forDescendants**(`iter`, `s?`): `void`

Defined in: [packages/core/src/widgets/node.ts:282](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L282)

Iterate over all descendants, calling iter(el) for each.

#### Parameters

##### iter

(`el`) => `void`

##### s?

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`forDescendants`](widgets.scrollablebox.Class.ScrollableBox.md#fordescendants)

***

### forAncestors()

> **forAncestors**(`iter`, `s?`): `void`

Defined in: [packages/core/src/widgets/node.ts:293](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L293)

Iterate over all ancestors, calling iter(el) for each.

#### Parameters

##### iter

(`el`) => `void`

##### s?

`any`

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`forAncestors`](widgets.scrollablebox.Class.ScrollableBox.md#forancestors)

***

### collectDescendants()

> **collectDescendants**(`s?`): `any`[]

Defined in: [packages/core/src/widgets/node.ts:304](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L304)

Collect all descendants into an array.

#### Parameters

##### s?

`any`

#### Returns

`any`[]

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`collectDescendants`](widgets.scrollablebox.Class.ScrollableBox.md#collectdescendants)

***

### collectAncestors()

> **collectAncestors**(`s?`): `any`[]

Defined in: [packages/core/src/widgets/node.ts:315](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L315)

Collect all ancestors into an array.

#### Parameters

##### s?

`any`

#### Returns

`any`[]

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`collectAncestors`](widgets.scrollablebox.Class.ScrollableBox.md#collectancestors)

***

### emitDescendants()

> **emitDescendants**(...`args`): `void`

Defined in: [packages/core/src/widgets/node.ts:326](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L326)

Emit event for element, and recursively emit same event for all descendants.

#### Parameters

##### args

...`any`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`emitDescendants`](widgets.scrollablebox.Class.ScrollableBox.md#emitdescendants)

***

### emitAncestors()

> **emitAncestors**(...`args`): `void`

Defined in: [packages/core/src/widgets/node.ts:342](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L342)

Emit event for element, and recursively emit same event for all ancestors.

#### Parameters

##### args

...`any`[]

#### Returns

`void`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`emitAncestors`](widgets.scrollablebox.Class.ScrollableBox.md#emitancestors)

***

### hasDescendant()

> **hasDescendant**(`target`): `boolean`

Defined in: [packages/core/src/widgets/node.ts:358](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L358)

Check if target is a descendant of this node.

#### Parameters

##### target

`any`

#### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`hasDescendant`](widgets.scrollablebox.Class.ScrollableBox.md#hasdescendant)

***

### hasAncestor()

> **hasAncestor**(`target`): `boolean`

Defined in: [packages/core/src/widgets/node.ts:376](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L376)

Check if target is an ancestor of this node.

#### Parameters

##### target

`any`

#### Returns

`boolean`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`hasAncestor`](widgets.scrollablebox.Class.ScrollableBox.md#hasancestor)

***

### get()

> **get**(`name`, `value?`): `any`

Defined in: [packages/core/src/widgets/node.ts:387](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L387)

Get user property with a potential default value.

#### Parameters

##### name

`string`

##### value?

`any`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`get`](widgets.scrollablebox.Class.ScrollableBox.md#get)

***

### set()

> **set**(`name`, `value`): `any`

Defined in: [packages/core/src/widgets/node.ts:397](https://github.com/vdeantoni/unblessed/blob/a72e88c91d2a070cc4394e9ee2afc215f7520f53/packages/core/src/widgets/node.ts#L397)

Set user property to value.

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`any`

#### Inherited from

[`ScrollableBox`](widgets.scrollablebox.Class.ScrollableBox.md).[`set`](widgets.scrollablebox.Class.ScrollableBox.md#set)
