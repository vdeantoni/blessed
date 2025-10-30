# Class: ListTable

Defined in: [packages/core/src/widgets/listtable.ts:18](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L18)

ListTable

## Extends

- [`List`](widgets.list.Class.List.md)

## Constructors

### Constructor

> **new ListTable**(`options`): `ListTable`

Defined in: [packages/core/src/widgets/listtable.ts:27](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L27)

#### Parameters

##### options

`ListTableOptions` = `{}`

#### Returns

`ListTable`

#### Overrides

[`List`](widgets.list.Class.List.md).[`constructor`](widgets.list.Class.List.md#constructor)

## Properties

### \_events

> **\_events**: `any`

Defined in: [packages/core/src/lib/events.ts:10](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L10)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_events`](widgets.list.Class.List.md#_events)

---

### \_maxListeners?

> `optional` **\_maxListeners**: `number`

Defined in: [packages/core/src/lib/events.ts:11](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L11)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_maxListeners`](widgets.list.Class.List.md#_maxlisteners)

---

### name?

> `optional` **name**: `string`

Defined in: [packages/core/src/widgets/element.ts:50](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L50)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`name`](widgets.list.Class.List.md#name)

---

### position

> **position**: `any`

Defined in: [packages/core/src/widgets/element.ts:55](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L55)

Position specification. Can be relative coordinates or keywords.
Kept as any due to complex internal position calculation system.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`position`](widgets.list.Class.List.md#position)

---

### noOverflow?

> `optional` **noOverflow**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:56](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L56)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`noOverflow`](widgets.list.Class.List.md#nooverflow)

---

### dockBorders?

> `optional` **dockBorders**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:57](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L57)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`dockBorders`](widgets.list.Class.List.md#dockborders)

---

### shadow?

> `optional` **shadow**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:58](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L58)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`shadow`](widgets.list.Class.List.md#shadow)

---

### hidden

> **hidden**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:61](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L61)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`hidden`](widgets.list.Class.List.md#hidden)

---

### fixed

> **fixed**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:62](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L62)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`fixed`](widgets.list.Class.List.md#fixed)

---

### align

> **align**: `string`

Defined in: [packages/core/src/widgets/element.ts:63](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L63)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`align`](widgets.list.Class.List.md#align)

---

### valign

> **valign**: `string`

Defined in: [packages/core/src/widgets/element.ts:64](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L64)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`valign`](widgets.list.Class.List.md#valign)

---

### wrap

> **wrap**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:65](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L65)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`wrap`](widgets.list.Class.List.md#wrap)

---

### shrink?

> `optional` **shrink**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:66](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L66)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`shrink`](widgets.list.Class.List.md#shrink)

---

### ch

> **ch**: `string`

Defined in: [packages/core/src/widgets/element.ts:67](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L67)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`ch`](widgets.list.Class.List.md#ch)

---

### padding

> **padding**: `Padding`

Defined in: [packages/core/src/widgets/element.ts:69](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L69)

Padding configuration for all sides

#### Inherited from

[`List`](widgets.list.Class.List.md).[`padding`](widgets.list.Class.List.md#padding)

---

### border?

> `optional` **border**: `Border`

Defined in: [packages/core/src/widgets/element.ts:71](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L71)

Border configuration

#### Inherited from

[`List`](widgets.list.Class.List.md).[`border`](widgets.list.Class.List.md#border)

---

### parseTags?

> `optional` **parseTags**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:72](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L72)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`parseTags`](widgets.list.Class.List.md#parsetags)

---

### content

> **content**: `string` = `""`

Defined in: [packages/core/src/widgets/element.ts:73](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L73)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`content`](widgets.list.Class.List.md#content)

---

### lpos?

> `optional` **lpos**: `RenderCoords`

Defined in: [packages/core/src/widgets/element.ts:75](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L75)

Last rendered position coordinates

#### Inherited from

[`List`](widgets.list.Class.List.md).[`lpos`](widgets.list.Class.List.md#lpos)

---

### \_clines?

> `optional` **\_clines**: `any`

Defined in: [packages/core/src/widgets/element.ts:76](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L76)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_clines`](widgets.list.Class.List.md#_clines)

---

### \_pcontent?

> `optional` **\_pcontent**: `string`

Defined in: [packages/core/src/widgets/element.ts:77](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L77)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_pcontent`](widgets.list.Class.List.md#_pcontent)

---

### \_borderColors?

> `optional` **\_borderColors**: (`string` \| `number`)[]

Defined in: [packages/core/src/widgets/element.ts:78](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L78)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_borderColors`](widgets.list.Class.List.md#_bordercolors)

---

### \_slisteners?

> `optional` **\_slisteners**: `any`[]

Defined in: [packages/core/src/widgets/element.ts:79](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L79)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_slisteners`](widgets.list.Class.List.md#_slisteners)

---

### \_label?

> `optional` **\_label**: `any`

Defined in: [packages/core/src/widgets/element.ts:80](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L80)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_label`](widgets.list.Class.List.md#_label)

---

### \_labelScroll()?

> `optional` **\_labelScroll**: () => `void`

Defined in: [packages/core/src/widgets/element.ts:81](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L81)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_labelScroll`](widgets.list.Class.List.md#_labelscroll)

---

### \_labelResize()?

> `optional` **\_labelResize**: () => `void`

Defined in: [packages/core/src/widgets/element.ts:82](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L82)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_labelResize`](widgets.list.Class.List.md#_labelresize)

---

### \_hoverOptions?

> `optional` **\_hoverOptions**: `any`

Defined in: [packages/core/src/widgets/element.ts:83](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L83)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_hoverOptions`](widgets.list.Class.List.md#_hoveroptions)

---

### \_draggable?

> `optional` **\_draggable**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:84](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L84)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_draggable`](widgets.list.Class.List.md#_draggable)

---

### \_dragMD()?

> `optional` **\_dragMD**: (`data`) => `void`

Defined in: [packages/core/src/widgets/element.ts:85](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L85)

#### Parameters

##### data

`MouseEvent`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_dragMD`](widgets.list.Class.List.md#_dragmd)

---

### \_dragM()?

> `optional` **\_dragM**: (`data`) => `void`

Defined in: [packages/core/src/widgets/element.ts:86](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L86)

#### Parameters

##### data

`MouseEvent`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_dragM`](widgets.list.Class.List.md#_dragm)

---

### \_drag?

> `optional` **\_drag**: `any`

Defined in: [packages/core/src/widgets/element.ts:87](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L87)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_drag`](widgets.list.Class.List.md#_drag)

---

### \_noFill?

> `optional` **\_noFill**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:88](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L88)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_noFill`](widgets.list.Class.List.md#_nofill)

---

### \_isLabel?

> `optional` **\_isLabel**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:89](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L89)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_isLabel`](widgets.list.Class.List.md#_islabel)

---

### childBase?

> `optional` **childBase**: `number`

Defined in: [packages/core/src/widgets/element.ts:91](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L91)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`childBase`](widgets.list.Class.List.md#childbase)

---

### childOffset?

> `optional` **childOffset**: `number`

Defined in: [packages/core/src/widgets/element.ts:92](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L92)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`childOffset`](widgets.list.Class.List.md#childoffset)

---

### alwaysScroll?

> `optional` **alwaysScroll**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:93](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L93)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`alwaysScroll`](widgets.list.Class.List.md#alwaysscroll)

---

### baseLimit?

> `optional` **baseLimit**: `number`

Defined in: [packages/core/src/widgets/element.ts:94](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L94)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`baseLimit`](widgets.list.Class.List.md#baselimit)

---

### track?

> `optional` **track**: `TrackConfig`

Defined in: [packages/core/src/widgets/element.ts:95](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L95)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`track`](widgets.list.Class.List.md#track)

---

### scrollbar?

> `optional` **scrollbar**: `ScrollbarConfig`

Defined in: [packages/core/src/widgets/element.ts:96](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L96)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`scrollbar`](widgets.list.Class.List.md#scrollbar)

---

### scrollable?

> `optional` **scrollable**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:100](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L100)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`scrollable`](widgets.list.Class.List.md#scrollable)

---

### scroll()?

> `optional` **scroll**: (`offset`, `always?`) => `any`

Defined in: [packages/core/src/widgets/element.ts:103](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L103)

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

[`List`](widgets.list.Class.List.md).[`scroll`](widgets.list.Class.List.md#scroll)

---

### scrollTo()?

> `optional` **scrollTo**: (`offset`, `always?`) => `void`

Defined in: [packages/core/src/widgets/element.ts:104](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L104)

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

[`List`](widgets.list.Class.List.md).[`scrollTo`](widgets.list.Class.List.md#scrollto)

---

### setScroll()?

> `optional` **setScroll**: (`offset`, `always?`) => `void`

Defined in: [packages/core/src/widgets/element.ts:105](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L105)

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

[`List`](widgets.list.Class.List.md).[`setScroll`](widgets.list.Class.List.md#setscroll)

---

### getScroll()?

> `optional` **getScroll**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:106](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L106)

Get the current scroll index in lines.

#### Returns

`number`

The current absolute scroll position

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getScroll`](widgets.list.Class.List.md#getscroll)

---

### getScrollHeight()?

> `optional` **getScrollHeight**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:107](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L107)

Get the actual height of the scrolling area (total content height).

#### Returns

`number`

The total scrollable content height in lines

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getScrollHeight`](widgets.list.Class.List.md#getscrollheight)

---

### getScrollPerc()?

> `optional` **getScrollPerc**: (`s?`) => `number`

Defined in: [packages/core/src/widgets/element.ts:108](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L108)

Get the current scroll index in percentage (0-100).

#### Parameters

##### s?

`boolean`

Internal flag for special return values

#### Returns

`number`

The scroll position as a percentage (0-100), or -1 if not scrollable

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getScrollPerc`](widgets.list.Class.List.md#getscrollperc)

---

### setScrollPerc()?

> `optional` **setScrollPerc**: (`i`) => `void`

Defined in: [packages/core/src/widgets/element.ts:109](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L109)

Set the current scroll index in percentage (0-100).

#### Parameters

##### i

`number`

The target scroll percentage (0-100)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setScrollPerc`](widgets.list.Class.List.md#setscrollperc)

---

### resetScroll()?

> `optional` **resetScroll**: () => `any`

Defined in: [packages/core/src/widgets/element.ts:110](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L110)

Reset the scroll index to its initial state (top).

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`resetScroll`](widgets.list.Class.List.md#resetscroll)

---

### \_scrollBottom()?

> `optional` **\_scrollBottom**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:111](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L111)

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_scrollBottom`](widgets.list.Class.List.md#_scrollbottom)

---

### \_recalculateIndex()?

> `optional` **\_recalculateIndex**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:112](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L112)

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_recalculateIndex`](widgets.list.Class.List.md#_recalculateindex)

---

### style

> **style**: `ListElementStyle`

Defined in: [packages/core/src/widgets/list.ts:24](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L24)

Element style configuration (colors, attributes, hover/focus effects)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`style`](widgets.list.Class.List.md#style)

---

### value

> **value**: `string`

Defined in: [packages/core/src/widgets/list.ts:25](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L25)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`value`](widgets.list.Class.List.md#value)

---

### items

> **items**: `any`[]

Defined in: [packages/core/src/widgets/list.ts:26](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L26)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`items`](widgets.list.Class.List.md#items)

---

### ritems

> **ritems**: `any`[]

Defined in: [packages/core/src/widgets/list.ts:27](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L27)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`ritems`](widgets.list.Class.List.md#ritems)

---

### selected

> **selected**: `number`

Defined in: [packages/core/src/widgets/list.ts:28](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L28)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`selected`](widgets.list.Class.List.md#selected)

---

### \_isList

> **\_isList**: `boolean`

Defined in: [packages/core/src/widgets/list.ts:29](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L29)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_isList`](widgets.list.Class.List.md#_islist)

---

### interactive

> **interactive**: `boolean`

Defined in: [packages/core/src/widgets/list.ts:30](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L30)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`interactive`](widgets.list.Class.List.md#interactive)

---

### mouse

> **mouse**: `boolean`

Defined in: [packages/core/src/widgets/list.ts:31](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L31)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`mouse`](widgets.list.Class.List.md#mouse)

---

### \_listInitialized

> **\_listInitialized**: `boolean` = `false`

Defined in: [packages/core/src/widgets/list.ts:32](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L32)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_listInitialized`](widgets.list.Class.List.md#_listinitialized)

---

### type

> **type**: `string` = `"list-table"`

Defined in: [packages/core/src/widgets/listtable.ts:19](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L19)

Type of the node (e.g. box, list, form, etc.).
Used to identify the widget type at runtime.

#### Overrides

[`List`](widgets.list.Class.List.md).[`type`](widgets.list.Class.List.md#type)

---

### \_\_align

> **\_\_align**: `string`

Defined in: [packages/core/src/widgets/listtable.ts:20](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L20)

---

### \_header

> **\_header**: `any`

Defined in: [packages/core/src/widgets/listtable.ts:21](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L21)

---

### pad

> **pad**: `number`

Defined in: [packages/core/src/widgets/listtable.ts:22](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L22)

---

### rows

> **rows**: `any`[] = `[]`

Defined in: [packages/core/src/widgets/listtable.ts:23](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L23)

---

### \_maxes

> **\_maxes**: `any`

Defined in: [packages/core/src/widgets/listtable.ts:24](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L24)

---

### options

> **options**: `ListTableOptions`

Defined in: [packages/core/src/widgets/listtable.ts:25](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L25)

#### Overrides

[`List`](widgets.list.Class.List.md).[`options`](widgets.list.Class.List.md#options)

---

### uid

> `static` **uid**: `number` = `0`

Defined in: [packages/core/src/widgets/node.ts:30](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L30)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`uid`](widgets.list.Class.List.md#uid)

---

### ScreenRegistry

> `static` **ScreenRegistry**: `any`

Defined in: [packages/core/src/widgets/node.ts:31](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L31)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`ScreenRegistry`](widgets.list.Class.List.md#screenregistry)

---

### screen

> **screen**: `any`

Defined in: [packages/core/src/widgets/node.ts:47](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L47)

Reference to the parent Screen instance.
Type: Screen (subclass of Node)

Kept as any due to circular dependency between Node and Screen,
and to preserve access to Screen-specific methods like clearRegion(),
render(), and the program property without complex generic typing.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`screen`](widgets.list.Class.List.md#screen)

---

### parent

> **parent**: `any`

Defined in: [packages/core/src/widgets/node.ts:56](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L56)

Reference to the parent element in the widget tree.
Type: Node (can be any Element/Box/List/etc subclass)

Kept as any to avoid complex generic typing and preserve access
to subclass-specific methods. Attempting to type as Node loses
methods from subclasses like Box, List, Form, etc.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`parent`](widgets.list.Class.List.md#parent)

---

### children

> **children**: `any`[]

Defined in: [packages/core/src/widgets/node.ts:63](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L63)

Array of child elements.
Type: Node[] (can contain any Node subclasses)

Kept as any[] to preserve flexibility with mixed widget types.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`children`](widgets.list.Class.List.md#children)

---

### $

> **$**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:68](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L68)

An object for any miscellaneous user data.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`$`](widgets.list.Class.List.md#)

---

### \_

> **\_**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:73](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L73)

An object for any miscellaneous user data.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_`](widgets.list.Class.List.md#_)

---

### data

> **data**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:78](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L78)

An object for any miscellaneous user data.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`data`](widgets.list.Class.List.md#data)

---

### uid

> **uid**: `number`

Defined in: [packages/core/src/widgets/node.ts:80](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L80)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`uid`](widgets.list.Class.List.md#uid-1)

---

### index

> **index**: `number` = `-1`

Defined in: [packages/core/src/widgets/node.ts:86](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L86)

Render index (document order index) of the last render call.
Indicates the order in which this element was rendered relative to others.
Set to -1 initially, updated during rendering.

#### Inherited from

[`List`](widgets.list.Class.List.md).[`index`](widgets.list.Class.List.md#index)

---

### detached?

> `optional` **detached**: `boolean`

Defined in: [packages/core/src/widgets/node.ts:87](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L87)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`detached`](widgets.list.Class.List.md#detached)

---

### destroyed?

> `optional` **destroyed**: `boolean`

Defined in: [packages/core/src/widgets/node.ts:88](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L88)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`destroyed`](widgets.list.Class.List.md#destroyed)

---

### runtime

> **runtime**: [`Runtime`](runtime.Interface.Runtime.md)

Defined in: [packages/core/src/widgets/node.ts:90](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L90)

#### Inherited from

[`List`](widgets.list.Class.List.md).[`runtime`](widgets.list.Class.List.md#runtime)

## Accessors

### focused

#### Get Signature

> **get** **focused**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:114](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L114)

##### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`focused`](widgets.list.Class.List.md#focused)

---

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:983](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L983)

##### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`visible`](widgets.list.Class.List.md#visible)

---

### \_detached

#### Get Signature

> **get** **\_detached**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:994](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L994)

##### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_detached`](widgets.list.Class.List.md#_detached)

---

### draggable

#### Get Signature

> **get** **draggable**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:1027](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1027)

##### Returns

`boolean`

#### Set Signature

> **set** **draggable**(`draggable`): `void`

Defined in: [packages/core/src/widgets/element.ts:1031](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1031)

##### Parameters

###### draggable

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`draggable`](widgets.list.Class.List.md#draggable)

---

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1428](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1428)

##### Returns

`number`

#### Set Signature

> **set** **width**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1632](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1632)

Position Setters

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`width`](widgets.list.Class.List.md#width)

---

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1479](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1479)

##### Returns

`number`

#### Set Signature

> **set** **height**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1640](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1640)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`height`](widgets.list.Class.List.md#height)

---

### aleft

#### Get Signature

> **get** **aleft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1516](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1516)

##### Returns

`number`

#### Set Signature

> **set** **aleft**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1648](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1648)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`aleft`](widgets.list.Class.List.md#aleft)

---

### aright

#### Get Signature

> **get** **aright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1541](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1541)

##### Returns

`number`

#### Set Signature

> **set** **aright**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1669](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1669)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`aright`](widgets.list.Class.List.md#aright)

---

### atop

#### Get Signature

> **get** **atop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1578](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1578)

##### Returns

`number`

#### Set Signature

> **set** **atop**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1677](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1677)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`atop`](widgets.list.Class.List.md#atop)

---

### abottom

#### Get Signature

> **get** **abottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1603](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1603)

##### Returns

`number`

#### Set Signature

> **set** **abottom**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1698](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1698)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`abottom`](widgets.list.Class.List.md#abottom)

---

### rleft

#### Get Signature

> **get** **rleft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1607](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1607)

##### Returns

`number`

#### Set Signature

> **set** **rleft**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1706](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1706)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`rleft`](widgets.list.Class.List.md#rleft)

---

### rright

#### Get Signature

> **get** **rright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1611](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1611)

##### Returns

`number`

#### Set Signature

> **set** **rright**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1714](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1714)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`rright`](widgets.list.Class.List.md#rright)

---

### rtop

#### Get Signature

> **get** **rtop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1615](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1615)

##### Returns

`number`

#### Set Signature

> **set** **rtop**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1721](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1721)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`rtop`](widgets.list.Class.List.md#rtop)

---

### rbottom

#### Get Signature

> **get** **rbottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1619](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1619)

##### Returns

`number`

#### Set Signature

> **set** **rbottom**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1729](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1729)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`rbottom`](widgets.list.Class.List.md#rbottom)

---

### ileft

#### Get Signature

> **get** **ileft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1736](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1736)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`ileft`](widgets.list.Class.List.md#ileft)

---

### itop

#### Get Signature

> **get** **itop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1741](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1741)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`itop`](widgets.list.Class.List.md#itop)

---

### iright

#### Get Signature

> **get** **iright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1746](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1746)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`iright`](widgets.list.Class.List.md#iright)

---

### ibottom

#### Get Signature

> **get** **ibottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1751](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1751)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`ibottom`](widgets.list.Class.List.md#ibottom)

---

### iwidth

#### Get Signature

> **get** **iwidth**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1756](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1756)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`iwidth`](widgets.list.Class.List.md#iwidth)

---

### iheight

#### Get Signature

> **get** **iheight**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1763](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1763)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`iheight`](widgets.list.Class.List.md#iheight)

---

### tpadding

#### Get Signature

> **get** **tpadding**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1770](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1770)

##### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`tpadding`](widgets.list.Class.List.md#tpadding)

---

### left

#### Get Signature

> **get** **left**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1783](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1783)

Relative coordinates as default properties

##### Returns

`number`

#### Set Signature

> **set** **left**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1799](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1799)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`left`](widgets.list.Class.List.md#left)

---

### right

#### Get Signature

> **get** **right**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1787](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1787)

##### Returns

`number`

#### Set Signature

> **set** **right**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1803](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1803)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`right`](widgets.list.Class.List.md#right)

---

### top

#### Get Signature

> **get** **top**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1791](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1791)

##### Returns

`number`

#### Set Signature

> **set** **top**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1807](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1807)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`top`](widgets.list.Class.List.md#top)

---

### bottom

#### Get Signature

> **get** **bottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1795](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1795)

##### Returns

`number`

#### Set Signature

> **set** **bottom**(`val`): `void`

Defined in: [packages/core/src/widgets/element.ts:1811](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1811)

##### Parameters

###### val

`any`

##### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`bottom`](widgets.list.Class.List.md#bottom)

## Methods

### setMaxListeners()

> **setMaxListeners**(`n`): `void`

Defined in: [packages/core/src/lib/events.ts:19](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L19)

#### Parameters

##### n

`number`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setMaxListeners`](widgets.list.Class.List.md#setmaxlisteners)

---

### addListener()

> **addListener**(`type`, `listener`): `void`

Defined in: [packages/core/src/lib/events.ts:23](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L23)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`addListener`](widgets.list.Class.List.md#addlistener)

---

### on()

> **on**(`type`, `listener`): `any`

Defined in: [packages/core/src/lib/events.ts:34](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L34)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`on`](widgets.list.Class.List.md#on)

---

### removeListener()

> **removeListener**(`type`, `listener`): `void`

Defined in: [packages/core/src/lib/events.ts:38](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L38)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`removeListener`](widgets.list.Class.List.md#removelistener)

---

### off()

> **off**(`type`, `listener`): `any`

Defined in: [packages/core/src/lib/events.ts:57](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L57)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`off`](widgets.list.Class.List.md#off)

---

### removeAllListeners()

> **removeAllListeners**(`type?`): `void`

Defined in: [packages/core/src/lib/events.ts:61](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L61)

#### Parameters

##### type?

`string`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`removeAllListeners`](widgets.list.Class.List.md#removealllisteners)

---

### once()

> **once**(`type`, `listener`): `any`

Defined in: [packages/core/src/lib/events.ts:69](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L69)

#### Parameters

##### type

`string`

##### listener

`Function`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`once`](widgets.list.Class.List.md#once)

---

### listeners()

> **listeners**(`type`): `Function`[]

Defined in: [packages/core/src/lib/events.ts:79](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L79)

#### Parameters

##### type

`string`

#### Returns

`Function`[]

#### Inherited from

[`List`](widgets.list.Class.List.md).[`listeners`](widgets.list.Class.List.md#listeners)

---

### \_emit()

> **\_emit**(`type`, `args`): `any`

Defined in: [packages/core/src/lib/events.ts:85](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L85)

#### Parameters

##### type

`string`

##### args

`any`[]

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_emit`](widgets.list.Class.List.md#_emit)

---

### emit()

> **emit**(`type`, ...`rest`): `boolean`

Defined in: [packages/core/src/lib/events.ts:113](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L113)

#### Parameters

##### type

`string`

##### rest

...`any`[]

#### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`emit`](widgets.list.Class.List.md#emit)

---

### sattr()

> **sattr**(`style`, `fg?`, `bg?`): `number`

Defined in: [packages/core/src/widgets/element.ts:326](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L326)

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

[`List`](widgets.list.Class.List.md).[`sattr`](widgets.list.Class.List.md#sattr)

---

### onScreenEvent()

> **onScreenEvent**(`type`, `handler`): `void`

Defined in: [packages/core/src/widgets/element.ts:372](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L372)

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

[`List`](widgets.list.Class.List.md).[`onScreenEvent`](widgets.list.Class.List.md#onscreenevent)

---

### onceScreenEvent()

> **onceScreenEvent**(`type`, `handler`): `void`

Defined in: [packages/core/src/widgets/element.ts:383](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L383)

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

[`List`](widgets.list.Class.List.md).[`onceScreenEvent`](widgets.list.Class.List.md#oncescreenevent)

---

### removeScreenEvent()

> **removeScreenEvent**(`type`, `handler`): `void`

Defined in: [packages/core/src/widgets/element.ts:400](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L400)

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

[`List`](widgets.list.Class.List.md).[`removeScreenEvent`](widgets.list.Class.List.md#removescreenevent)

---

### free()

> **free**(): `void`

Defined in: [packages/core/src/widgets/element.ts:420](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L420)

Free up the element. Automatically unbind all events that may have been bound to the screen
object. This prevents memory leaks. For use with onScreenEvent(), removeScreenEvent(),
and destroy().

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`free`](widgets.list.Class.List.md#free)

---

### hide()

> **hide**(): `void`

Defined in: [packages/core/src/widgets/element.ts:432](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L432)

Hide element.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`hide`](widgets.list.Class.List.md#hide)

---

### show()

> **show**(): `void`

Defined in: [packages/core/src/widgets/element.ts:445](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L445)

Show element.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`show`](widgets.list.Class.List.md#show)

---

### toggle()

> **toggle**(): `void`

Defined in: [packages/core/src/widgets/element.ts:454](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L454)

Toggle hidden/shown.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`toggle`](widgets.list.Class.List.md#toggle)

---

### focus()

> **focus**(): `any`

Defined in: [packages/core/src/widgets/element.ts:461](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L461)

Focus element.

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`focus`](widgets.list.Class.List.md#focus)

---

### isFocusable()

> **isFocusable**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:469](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L469)

Check if this element can receive keyboard focus.
Elements are focusable if they have tabIndex >= -1 and are visible/attached.

#### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`isFocusable`](widgets.list.Class.List.md#isfocusable)

---

### isInTabOrder()

> **isInTabOrder**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:478](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L478)

Check if element participates in Tab key navigation.
Elements with tabIndex=-1 are focusable but excluded from Tab order.

#### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`isInTabOrder`](widgets.list.Class.List.md#isintaborder)

---

### getTabIndex()

> **getTabIndex**(): `number`

Defined in: [packages/core/src/widgets/element.ts:487](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L487)

Get effective tab index for focus navigation ordering.

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getTabIndex`](widgets.list.Class.List.md#gettabindex)

---

### setContent()

> **setContent**(`content`, `noClear?`, `noTags?`): `void`

Defined in: [packages/core/src/widgets/element.ts:499](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L499)

Set or get the content. Note: When text is input, it will be stripped of all non-SGR
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

[`List`](widgets.list.Class.List.md).[`setContent`](widgets.list.Class.List.md#setcontent)

---

### getContent()

> **getContent**(): `string`

Defined in: [packages/core/src/widgets/element.ts:509](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L509)

Return content, slightly different from el.content. Assume the above formatting.

#### Returns

`string`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getContent`](widgets.list.Class.List.md#getcontent)

---

### getBorderLength()

> **getBorderLength**(): `number`

Defined in: [packages/core/src/widgets/element.ts:522](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L522)

Get the border perimeter length (number of border cells).
Useful for creating colors arrays for addressable border animations.

#### Returns

`number`

Number of border cells, or 0 if no border

#### Example

```ts
const box = new Box({ width: 20, height: 10, border: { type: "line" } });
console.log(box.getBorderLength()); // 56 (2 * (20 + 10) - 4)
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getBorderLength`](widgets.list.Class.List.md#getborderlength)

---

### getBorderColors()

> **getBorderColors**(): (`string` \| `number`)[]

Defined in: [packages/core/src/widgets/element.ts:538](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L538)

Get the current border colors array (for addressable border animations).
Returns a copy to prevent external mutations.

#### Returns

(`string` \| `number`)[]

Copy of colors array, or empty array if not set

#### Example

```ts
const colors = box.getBorderColors();
const rotated = rotateColors(colors, 1);
box.setBorderColors(rotated);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getBorderColors`](widgets.list.Class.List.md#getbordercolors)

---

### setBorderColors()

> **setBorderColors**(`colors`): `void`

Defined in: [packages/core/src/widgets/element.ts:560](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L560)

Set border colors array for addressable border animations.
Stores an internal copy to prevent external mutations.
Call screen.render() after to see changes.

#### Parameters

##### colors

(`string` \| `number`)[]

Array of colors (names, hex codes, or numeric codes)

#### Returns

`void`

#### Example

```ts
// Rainbow animation
const colors = generateRainbow(box.getBorderLength());
box.setBorderColors(colors);
screen.render();

// Later, animate
setInterval(() => {
  const rotated = rotateColors(box.getBorderColors(), 1);
  box.setBorderColors(rotated);
  screen.render();
}, 100);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setBorderColors`](widgets.list.Class.List.md#setbordercolors)

---

### setText()

> **setText**(`content`, `noClear?`): `void`

Defined in: [packages/core/src/widgets/element.ts:567](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L567)

Similar to setContent, but ignore tags and remove escape codes.

#### Parameters

##### content

`string`

##### noClear?

`boolean`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setText`](widgets.list.Class.List.md#settext)

---

### getText()

> **getText**(): `string`

Defined in: [packages/core/src/widgets/element.ts:576](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L576)

Similar to getContent, but return content with tags and escape codes removed.

#### Returns

`string`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getText`](widgets.list.Class.List.md#gettext)

---

### parseContent()

> **parseContent**(`noTags?`): `boolean`

Defined in: [packages/core/src/widgets/element.ts:580](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L580)

#### Parameters

##### noTags?

`boolean`

#### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`parseContent`](widgets.list.Class.List.md#parsecontent)

---

### \_parseTags()

> **\_parseTags**(`text`): `string`

Defined in: [packages/core/src/widgets/element.ts:647](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L647)

#### Parameters

##### text

`string`

#### Returns

`string`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_parseTags`](widgets.list.Class.List.md#_parsetags)

---

### \_parseAttr()

> **\_parseAttr**(`lines`): `any`

Defined in: [packages/core/src/widgets/element.ts:752](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L752)

#### Parameters

##### lines

`any`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_parseAttr`](widgets.list.Class.List.md#_parseattr)

---

### \_align()

> **\_align**(`line`, `width`, `align?`): `string`

Defined in: [packages/core/src/widgets/element.ts:781](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L781)

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

[`List`](widgets.list.Class.List.md).[`_align`](widgets.list.Class.List.md#_align)

---

### \_wrapContent()

> **\_wrapContent**(`content`, `width`): `WrappedContent`

Defined in: [packages/core/src/widgets/element.ts:813](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L813)

#### Parameters

##### content

`string`

##### width

`number`

#### Returns

`WrappedContent`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_wrapContent`](widgets.list.Class.List.md#_wrapcontent)

---

### enableMouse()

> **enableMouse**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1007](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1007)

Enable mouse events for the element (automatically called when a form of on('mouse') is bound).
Registers the element as clickable with the screen.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`enableMouse`](widgets.list.Class.List.md#enablemouse)

---

### enableKeys()

> **enableKeys**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1015](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1015)

Enable keypress events for the element (automatically called when a form of on('keypress') is bound).
Registers the element as keyable with the screen.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`enableKeys`](widgets.list.Class.List.md#enablekeys)

---

### enableInput()

> **enableInput**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1022](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1022)

Enable key and mouse events. Calls both enableMouse() and enableKeys().

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`enableInput`](widgets.list.Class.List.md#enableinput)

---

### enableDrag()

> **enableDrag**(`verify?`): `boolean`

Defined in: [packages/core/src/widgets/element.ts:1045](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1045)

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

[`List`](widgets.list.Class.List.md).[`enableDrag`](widgets.list.Class.List.md#enabledrag)

---

### disableDrag()

> **disableDrag**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:1119](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1119)

Disable dragging of the element.
Removes drag event handlers and resets dragging state.

#### Returns

`boolean`

True if dragging was disabled

#### Inherited from

[`List`](widgets.list.Class.List.md).[`disableDrag`](widgets.list.Class.List.md#disabledrag)

---

### key()

> **key**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1133](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1133)

Bind a key event handler.

#### Parameters

##### args

...`any`[]

Arguments to pass to program.key()

#### Returns

`any`

The bound key handler

#### Inherited from

[`List`](widgets.list.Class.List.md).[`key`](widgets.list.Class.List.md#key)

---

### onceKey()

> **onceKey**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1142](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1142)

Bind a key event handler that fires only once.

#### Parameters

##### args

...`any`[]

Arguments to pass to program.onceKey()

#### Returns

`any`

The bound key handler

#### Inherited from

[`List`](widgets.list.Class.List.md).[`onceKey`](widgets.list.Class.List.md#oncekey)

---

### unkey()

> **unkey**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1151](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1151)

Unbind a key event handler.

#### Parameters

##### args

...`any`[]

Arguments to pass to program.unkey()

#### Returns

`any`

Result of unbinding

#### Inherited from

[`List`](widgets.list.Class.List.md).[`unkey`](widgets.list.Class.List.md#unkey)

---

### removeKey()

> **removeKey**(...`args`): `any`

Defined in: [packages/core/src/widgets/element.ts:1161](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1161)

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

[`List`](widgets.list.Class.List.md).[`removeKey`](widgets.list.Class.List.md#removekey)

---

### setIndex()

> **setIndex**(`index`): `void`

Defined in: [packages/core/src/widgets/element.ts:1170](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1170)

Set the z-index of the element (changes rendering order).
Higher indices are rendered later (on top). Negative indices count from the end.

#### Parameters

##### index

`number`

New z-index value

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setIndex`](widgets.list.Class.List.md#setindex)

---

### setFront()

> **setFront**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1191](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1191)

Put the element in front of its siblings.
Sets the element's z-index to the highest value (renders last/on top).

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setFront`](widgets.list.Class.List.md#setfront)

---

### setBack()

> **setBack**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1199](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1199)

Put the element in back of its siblings.
Sets the element's z-index to the lowest value (renders first/at bottom).

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setBack`](widgets.list.Class.List.md#setback)

---

### clearPos()

> **clearPos**(`get?`, `override?`): `void`

Defined in: [packages/core/src/widgets/element.ts:1209](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1209)

Clear the element's position in the screen buffer.
Fills the region with spaces, used when moving or hiding elements.

#### Parameters

##### get?

`boolean`

Whether to use \_getCoords (default: false)

##### override?

`any`

If true, always clear even if cell hasn't changed

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`clearPos`](widgets.list.Class.List.md#clearpos)

---

### setLabel()

> **setLabel**(`options`): `void`

Defined in: [packages/core/src/widgets/element.ts:1224](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1224)

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
element.setLabel("My Label");
element.setLabel({ text: "My Label", side: "right" });
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setLabel`](widgets.list.Class.List.md#setlabel)

---

### removeLabel()

> **removeLabel**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1303](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1303)

Remove the label completely.
Detaches the label element and removes associated event listeners.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`removeLabel`](widgets.list.Class.List.md#removelabel)

---

### setHover()

> **setHover**(`options`): `void`

Defined in: [packages/core/src/widgets/element.ts:1320](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1320)

Set a hover text box to follow the cursor. Similar to the "title" DOM attribute in the browser.

#### Parameters

##### options

`any`

Hover text (string) or options object with text property

#### Returns

`void`

#### Example

```ts
element.setHover("Hover text here");
element.setHover({ text: "Hover text here" });
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setHover`](widgets.list.Class.List.md#sethover)

---

### removeHover()

> **removeHover**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1334](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1334)

Remove the hover label completely.
Detaches the hover text box if it's currently displayed.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`removeHover`](widgets.list.Class.List.md#removehover)

---

### \_getPos()

> **\_getPos**(): `any`

Defined in: [packages/core/src/widgets/element.ts:1360](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1360)

Positioning

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getPos`](widgets.list.Class.List.md#_getpos)

---

### \_getWidth()

> **\_getWidth**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1381](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1381)

Position Getters

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getWidth`](widgets.list.Class.List.md#_getwidth)

---

### \_getHeight()

> **\_getHeight**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1432](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1432)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getHeight`](widgets.list.Class.List.md#_getheight)

---

### \_getLeft()

> **\_getLeft**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1483](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1483)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getLeft`](widgets.list.Class.List.md#_getleft)

---

### \_getRight()

> **\_getRight**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1520](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1520)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getRight`](widgets.list.Class.List.md#_getright)

---

### \_getTop()

> **\_getTop**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1545](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1545)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getTop`](widgets.list.Class.List.md#_gettop)

---

### \_getBottom()

> **\_getBottom**(`get?`): `number`

Defined in: [packages/core/src/widgets/element.ts:1582](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1582)

#### Parameters

##### get?

`boolean`

#### Returns

`number`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getBottom`](widgets.list.Class.List.md#_getbottom)

---

### \_getShrinkBox()

> **\_getShrinkBox**(`xi`, `xl`, `yi`, `yl`, `get?`): `any`

Defined in: [packages/core/src/widgets/element.ts:1819](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1819)

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

[`List`](widgets.list.Class.List.md).[`_getShrinkBox`](widgets.list.Class.List.md#_getshrinkbox)

---

### \_getShrinkContent()

> **\_getShrinkContent**(`xi`, `xl`, `yi`, `yl`, `_get?`): `any`

Defined in: [packages/core/src/widgets/element.ts:1970](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1970)

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

[`List`](widgets.list.Class.List.md).[`_getShrinkContent`](widgets.list.Class.List.md#_getshrinkcontent)

---

### \_getShrink()

> **\_getShrink**(`xi`, `xl`, `yi`, `yl`, `get?`): `any`

Defined in: [packages/core/src/widgets/element.ts:2006](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2006)

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

[`List`](widgets.list.Class.List.md).[`_getShrink`](widgets.list.Class.List.md#_getshrink)

---

### \_getCoords()

> **\_getCoords**(`get?`, `noscroll?`): `RenderCoords` \| `undefined`

Defined in: [packages/core/src/widgets/element.ts:2051](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2051)

#### Parameters

##### get?

`boolean`

##### noscroll?

`boolean`

#### Returns

`RenderCoords` \| `undefined`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_getCoords`](widgets.list.Class.List.md#_getcoords)

---

### \_render()

> **\_render**(): `any`

Defined in: [packages/core/src/widgets/element.ts:2882](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2882)

Internal alias for render().

#### Returns

`any`

Rendered coordinates object

#### Inherited from

[`List`](widgets.list.Class.List.md).[`_render`](widgets.list.Class.List.md#_render)

---

### insertLine()

> **insertLine**(`i`, `line`): `void`

Defined in: [packages/core/src/widgets/element.ts:2896](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2896)

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

[`List`](widgets.list.Class.List.md).[`insertLine`](widgets.list.Class.List.md#insertline)

---

### deleteLine()

> **deleteLine**(`i`, `n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:2957](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2957)

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

[`List`](widgets.list.Class.List.md).[`deleteLine`](widgets.list.Class.List.md#deleteline)

---

### insertTop()

> **insertTop**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:3013](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3013)

Insert a line at the top of the box.
Inserts at the first visible line based on childBase.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`insertTop`](widgets.list.Class.List.md#inserttop)

---

### insertBottom()

> **insertBottom**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:3023](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3023)

Insert a line at the bottom of the box.
Inserts after the last visible line based on height and childBase.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`insertBottom`](widgets.list.Class.List.md#insertbottom)

---

### deleteTop()

> **deleteTop**(`n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:3036](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3036)

Delete a line at the top of the box.
Deletes from the first visible line based on childBase.

#### Parameters

##### n?

`number`

Number of lines to delete (default: 1)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`deleteTop`](widgets.list.Class.List.md#deletetop)

---

### deleteBottom()

> **deleteBottom**(`n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:3046](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3046)

Delete a line at the bottom of the box.
Deletes from the last visible line based on height and childBase.

#### Parameters

##### n?

`number`

Number of lines to delete (default: 1)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`deleteBottom`](widgets.list.Class.List.md#deletebottom)

---

### setLine()

> **setLine**(`i`, `line`): `void`

Defined in: [packages/core/src/widgets/element.ts:3061](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3061)

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

[`List`](widgets.list.Class.List.md).[`setLine`](widgets.list.Class.List.md#setline)

---

### setBaseLine()

> **setBaseLine**(`i`, `line`): `void`

Defined in: [packages/core/src/widgets/element.ts:3075](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3075)

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

[`List`](widgets.list.Class.List.md).[`setBaseLine`](widgets.list.Class.List.md#setbaseline)

---

### getLine()

> **getLine**(`i`): `string`

Defined in: [packages/core/src/widgets/element.ts:3085](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3085)

Get a line from the box's content.

#### Parameters

##### i

`number`

Line index to get (fake line number)

#### Returns

`string`

Line content

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getLine`](widgets.list.Class.List.md#getline)

---

### getBaseLine()

> **getBaseLine**(`i`): `string`

Defined in: [packages/core/src/widgets/element.ts:3096](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3096)

Get a line from the box's content from the visible top.

#### Parameters

##### i

`number`

Line offset from visible top

#### Returns

`string`

Line content

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getBaseLine`](widgets.list.Class.List.md#getbaseline)

---

### clearLine()

> **clearLine**(`i`): `void`

Defined in: [packages/core/src/widgets/element.ts:3105](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3105)

Clear a line from the box's content.

#### Parameters

##### i

`number`

Line index to clear (fake line number)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`clearLine`](widgets.list.Class.List.md#clearline)

---

### clearBaseLine()

> **clearBaseLine**(`i`): `void`

Defined in: [packages/core/src/widgets/element.ts:3114](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3114)

Clear a line from the box's content from the visible top.

#### Parameters

##### i

`number`

Line offset from visible top

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`clearBaseLine`](widgets.list.Class.List.md#clearbaseline)

---

### unshiftLine()

> **unshiftLine**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:3123](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3123)

Unshift a line onto the top of the content.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`unshiftLine`](widgets.list.Class.List.md#unshiftline)

---

### shiftLine()

> **shiftLine**(`i?`, `n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:3132](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3132)

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

[`List`](widgets.list.Class.List.md).[`shiftLine`](widgets.list.Class.List.md#shiftline)

---

### pushLine()

> **pushLine**(`line`): `void`

Defined in: [packages/core/src/widgets/element.ts:3140](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3140)

Push a line onto the bottom of the content.

#### Parameters

##### line

Line or array of lines to insert

`string` | `string`[]

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`pushLine`](widgets.list.Class.List.md#pushline)

---

### popLine()

> **popLine**(`n?`): `void`

Defined in: [packages/core/src/widgets/element.ts:3149](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3149)

Pop a line off the bottom of the content.

#### Parameters

##### n?

`number`

Number of lines to remove (default: 1)

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`popLine`](widgets.list.Class.List.md#popline)

---

### getLines()

> **getLines**(): `string`[]

Defined in: [packages/core/src/widgets/element.ts:3157](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3157)

An array containing the content lines.

#### Returns

`string`[]

Array of fake (unwrapped) lines

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getLines`](widgets.list.Class.List.md#getlines)

---

### getScreenLines()

> **getScreenLines**(): `string`[]

Defined in: [packages/core/src/widgets/element.ts:3165](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3165)

An array containing the lines as they are displayed on the screen.

#### Returns

`string`[]

Array of real (wrapped) lines

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getScreenLines`](widgets.list.Class.List.md#getscreenlines)

---

### strWidth()

> **strWidth**(`text`): `number`

Defined in: [packages/core/src/widgets/element.ts:3175](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3175)

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

[`List`](widgets.list.Class.List.md).[`strWidth`](widgets.list.Class.List.md#strwidth)

---

### screenshot()

> **screenshot**(`xi?`, `xl?`, `yi?`, `yl?`): `string`

Defined in: [packages/core/src/widgets/element.ts:3191](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3191)

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

[`List`](widgets.list.Class.List.md).[`screenshot`](widgets.list.Class.List.md#screenshot)

---

### createItem()

> **createItem**(`content`): `any`

Defined in: [packages/core/src/widgets/list.ts:262](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L262)

#### Parameters

##### content

`any`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`createItem`](widgets.list.Class.List.md#createitem)

---

### add()

> **add**(`content`): `any`

Defined in: [packages/core/src/widgets/list.ts:337](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L337)

Add an item to the list based on a string. Appends the item to the end.
Alias for addItem.

#### Parameters

##### content

`any`

String content or element with getContent() method

#### Returns

`any`

The created item element

#### Example

```ts
list.add("New Item");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`add`](widgets.list.Class.List.md#add)

---

### addItem()

> **addItem**(`content`): `any`

Defined in: [packages/core/src/widgets/list.ts:350](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L350)

Add an item to the list based on a string. Appends the item to the end.
Alias for appendItem.

#### Parameters

##### content

`any`

String content or element with getContent() method

#### Returns

`any`

The created item element

#### Example

```ts
list.addItem("Another Item");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`addItem`](widgets.list.Class.List.md#additem)

---

### appendItem()

> **appendItem**(`content`): `any`

Defined in: [packages/core/src/widgets/list.ts:354](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L354)

#### Parameters

##### content

`any`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`appendItem`](widgets.list.Class.List.md#appenditem)

---

### removeItem()

> **removeItem**(`child`): `any`

Defined in: [packages/core/src/widgets/list.ts:389](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L389)

Remove an item from the list. Can remove by element, index, or string.

#### Parameters

##### child

`any`

Element, numeric index, or string to match

#### Returns

`any`

The removed child element

#### Example

```ts
// Remove by index
list.removeItem(0);
// Remove by string content
list.removeItem("Item Text");
// Remove by element reference
list.removeItem(itemElement);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`removeItem`](widgets.list.Class.List.md#removeitem)

---

### insertItem()

> **insertItem**(`child`, `content`): `void`

Defined in: [packages/core/src/widgets/list.ts:415](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L415)

Insert an item at a specific position in the list.

#### Parameters

##### child

`any`

Index or element to insert after

##### content

`any`

String content or element with getContent() method

#### Returns

`void`

#### Example

```ts
// Insert at index 2
list.insertItem(2, "New Item");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`insertItem`](widgets.list.Class.List.md#insertitem)

---

### getItem()

> **getItem**(`child`): `any`

Defined in: [packages/core/src/widgets/list.ts:442](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L442)

Get an item element from the list.

#### Parameters

##### child

`any`

Index, string, or element reference

#### Returns

`any`

The item element at the specified position

#### Example

```ts
const item = list.getItem(0);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getItem`](widgets.list.Class.List.md#getitem)

---

### setItem()

> **setItem**(`child`, `content`): `void`

Defined in: [packages/core/src/widgets/list.ts:454](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L454)

Set the content of an item at a specific position.

#### Parameters

##### child

`any`

Index, string, or element reference

##### content

`any`

String content or element with getContent() method

#### Returns

`void`

#### Example

```ts
list.setItem(0, "Updated Content");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setItem`](widgets.list.Class.List.md#setitem)

---

### clearItems()

> **clearItems**(): `void`

Defined in: [packages/core/src/widgets/list.ts:468](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L468)

Clear all items from the list.

#### Returns

`void`

#### Example

```ts
list.clearItems();
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`clearItems`](widgets.list.Class.List.md#clearitems)

---

### setItems()

> **setItems**(`items`): `void`

Defined in: [packages/core/src/widgets/list.ts:479](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L479)

Set the list items to multiple strings. Replaces all existing items.

#### Parameters

##### items

`any`[]

Array of string items to set

#### Returns

`void`

#### Example

```ts
list.setItems(["Item 1", "Item 2", "Item 3"]);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`setItems`](widgets.list.Class.List.md#setitems)

---

### pushItem()

> **pushItem**(`content`): `number`

Defined in: [packages/core/src/widgets/list.ts:524](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L524)

Push an item onto the end of the list (array-like operation).

#### Parameters

##### content

`any`

String content or element with getContent() method

#### Returns

`number`

The new length of the items array

#### Example

```ts
list.pushItem("Last Item");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`pushItem`](widgets.list.Class.List.md#pushitem)

---

### popItem()

> **popItem**(): `any`

Defined in: [packages/core/src/widgets/list.ts:536](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L536)

Pop an item off the end of the list (array-like operation).

#### Returns

`any`

The removed item element

#### Example

```ts
const lastItem = list.popItem();
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`popItem`](widgets.list.Class.List.md#popitem)

---

### unshiftItem()

> **unshiftItem**(`content`): `number`

Defined in: [packages/core/src/widgets/list.ts:548](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L548)

Unshift an item onto the beginning of the list (array-like operation).

#### Parameters

##### content

`any`

String content or element with getContent() method

#### Returns

`number`

The new length of the items array

#### Example

```ts
list.unshiftItem("First Item");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`unshiftItem`](widgets.list.Class.List.md#unshiftitem)

---

### shiftItem()

> **shiftItem**(): `any`

Defined in: [packages/core/src/widgets/list.ts:560](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L560)

Shift an item off the beginning of the list (array-like operation).

#### Returns

`any`

The removed item element

#### Example

```ts
const firstItem = list.shiftItem();
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`shiftItem`](widgets.list.Class.List.md#shiftitem)

---

### spliceItem()

> **spliceItem**(`child`, `n`, ...`items`): `any`[]

Defined in: [packages/core/src/widgets/list.ts:575](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L575)

Remove and insert items at a specific position (array-like operation).

#### Parameters

##### child

`any`

Index or element to start at

##### n

`number`

Number of items to remove

##### items

...`any`[]

Items to insert at the position

#### Returns

`any`[]

Array of removed items

#### Example

```ts
// Remove 2 items at index 1 and insert 3 new items
list.spliceItem(1, 2, "Item A", "Item B", "Item C");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`spliceItem`](widgets.list.Class.List.md#spliceitem)

---

### find()

> **find**(`search`, `back?`): `number`

Defined in: [packages/core/src/widgets/list.ts:597](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L597)

Find an item in the list by text or regex pattern. Alias for fuzzyFind.

#### Parameters

##### search

`any`

String, number, or regex pattern to search for

##### back?

`boolean`

Whether to search backwards from current selection

#### Returns

`number`

Index of the found item, or current selection if not found

#### Example

```ts
const index = list.find("search term");
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`find`](widgets.list.Class.List.md#find)

---

### fuzzyFind()

> **fuzzyFind**(`search`, `back?`): `number`

Defined in: [packages/core/src/widgets/list.ts:616](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L616)

Find an item in the list by text or regex pattern.
Searches forward or backward from the current selection with wrapping.

#### Parameters

##### search

`any`

String, number, or regex pattern to search for

##### back?

`boolean`

Whether to search backwards from current selection (Default: false)

#### Returns

`number`

Index of the found item, or current selection if not found

#### Example

```ts
// Find forward
list.fuzzyFind("Item");
// Find backward
list.fuzzyFind("Item", true);
// Use regex
list.fuzzyFind(/^Item \d+$/);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`fuzzyFind`](widgets.list.Class.List.md#fuzzyfind)

---

### getItemIndex()

> **getItemIndex**(`child`): `number`

Defined in: [packages/core/src/widgets/list.ts:675](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L675)

Get the index of an item in the list.
Can resolve from number (passthrough), string (match content), or element reference.

#### Parameters

##### child

`any`

Number, string, or element reference

#### Returns

`number`

The index of the item, or -1 if not found

#### Example

```ts
// By string
const index = list.getItemIndex("Item Text");
// By element
const index = list.getItemIndex(itemElement);
// By index (passthrough)
const index = list.getItemIndex(5);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`getItemIndex`](widgets.list.Class.List.md#getitemindex)

---

### move()

> **move**(`offset`): `void`

Defined in: [packages/core/src/widgets/list.ts:747](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L747)

Select an item based on an offset from the current selection.

#### Parameters

##### offset

`number`

Number of items to move (positive or negative)

#### Returns

`void`

#### Example

```ts
// Move down 3 items
list.move(3);
// Move up 2 items
list.move(-2);
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`move`](widgets.list.Class.List.md#move)

---

### up()

> **up**(`offset?`): `void`

Defined in: [packages/core/src/widgets/list.ts:759](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L759)

Select the item above the currently selected item.

#### Parameters

##### offset?

`number`

Number of items to move up (Default: 1)

#### Returns

`void`

#### Example

```ts
list.up();
list.up(5); // Move up 5 items
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`up`](widgets.list.Class.List.md#up)

---

### down()

> **down**(`offset?`): `void`

Defined in: [packages/core/src/widgets/list.ts:771](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L771)

Select the item below the currently selected item.

#### Parameters

##### offset?

`number`

Number of items to move down (Default: 1)

#### Returns

`void`

#### Example

```ts
list.down();
list.down(3); // Move down 3 items
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`down`](widgets.list.Class.List.md#down)

---

### pick()

> **pick**(`label`, `callback?`): `any`

Defined in: [packages/core/src/widgets/list.ts:786](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L786)

Show the list, focus it, select the first item, and wait for a selection.
Callback receives the selected item text.

#### Parameters

##### label

`any`

Optional label to set while picking (or callback if label omitted)

##### callback?

`any`

Callback function to receive selected item

#### Returns

`any`

#### Example

```ts
list.pick("Select an option:", (err, value) => {
  console.log("Selected:", value);
});
```

#### Inherited from

[`List`](widgets.list.Class.List.md).[`pick`](widgets.list.Class.List.md#pick)

---

### enterSelected()

> **enterSelected**(`i?`): `void`

Defined in: [packages/core/src/widgets/list.ts:820](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L820)

#### Parameters

##### i?

`number`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`enterSelected`](widgets.list.Class.List.md#enterselected)

---

### cancelSelected()

> **cancelSelected**(`i?`): `void`

Defined in: [packages/core/src/widgets/list.ts:826](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/list.ts#L826)

#### Parameters

##### i?

`number`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`cancelSelected`](widgets.list.Class.List.md#cancelselected)

---

### \_calculateMaxes()

> **\_calculateMaxes**(): `number`[] \| `undefined`

Defined in: [packages/core/src/widgets/listtable.ts:91](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L91)

#### Returns

`number`[] \| `undefined`

---

### setRows()

> **setRows**(`rows`): `void`

Defined in: [packages/core/src/widgets/listtable.ts:106](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L106)

Set the rows in the table (alias for setData).

#### Parameters

##### rows

`any`

Array of row arrays (first row is header, rest are data rows)

#### Returns

`void`

#### Example

```ts
listTable.setRows([
  ["Name", "Age", "City"],
  ["Alice", "30", "NYC"],
  ["Bob", "25", "SF"],
]);
```

---

### setData()

> **setData**(`rows`): `void`

Defined in: [packages/core/src/widgets/listtable.ts:123](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L123)

Set the rows in the table.
First row becomes the header, remaining rows become selectable list items.
Cells are automatically aligned and padded based on the align option.

#### Parameters

##### rows

`any`

Array of row arrays (first row is header, rest are data rows)

#### Returns

`void`

#### Example

```ts
listTable.setData([
  ["Name", "Age", "City"], // Header row
  ["Alice", "30", "NYC"], // Data row 1
  ["Bob", "25", "SF"], // Data row 2
]);
```

---

### \_select()

> **\_select**(`i`): `void`

Defined in: [packages/core/src/widgets/listtable.ts:202](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L202)

#### Parameters

##### i

`number`

#### Returns

`void`

---

### select()

> **select**(`i`): `void`

Defined in: [packages/core/src/widgets/listtable.ts:206](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L206)

Select an item based on an index.
Also scrolls to the selected item to keep it visible.

#### Parameters

##### i

`number`

#### Returns

`void`

#### Example

```ts
// Select by index
list.select(0);
// Select by element
list.select(itemElement);
```

#### Overrides

[`List`](widgets.list.Class.List.md).[`select`](widgets.list.Class.List.md#select)

---

### render()

> **render**(): `any`

Defined in: [packages/core/src/widgets/listtable.ts:216](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/listtable.ts#L216)

Write content and children to the screen buffer.
This is the main rendering method that draws the element, its border, scrollbar,
and all child elements to the screen buffer. Returns the rendered coordinates.

#### Returns

`any`

Rendered coordinates object, or undefined if hidden/invalid

#### Overrides

[`List`](widgets.list.Class.List.md).[`render`](widgets.list.Class.List.md#render)

---

### insert()

> **insert**(`element`, `i`): `void`

Defined in: [packages/core/src/widgets/node.ts:154](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L154)

Insert a node to this node's children at index i.

#### Parameters

##### element

`any`

##### i

`number`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`insert`](widgets.list.Class.List.md#insert)

---

### prepend()

> **prepend**(`element`): `void`

Defined in: [packages/core/src/widgets/node.ts:191](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L191)

Prepend a node to this node's children.

#### Parameters

##### element

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`prepend`](widgets.list.Class.List.md#prepend)

---

### append()

> **append**(`element`): `void`

Defined in: [packages/core/src/widgets/node.ts:198](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L198)

Append a node to this node's children.

#### Parameters

##### element

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`append`](widgets.list.Class.List.md#append)

---

### insertBefore()

> **insertBefore**(`element`, `other`): `void`

Defined in: [packages/core/src/widgets/node.ts:205](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L205)

Insert a node to this node's children before the reference node.

#### Parameters

##### element

`any`

##### other

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`insertBefore`](widgets.list.Class.List.md#insertbefore)

---

### insertAfter()

> **insertAfter**(`element`, `other`): `void`

Defined in: [packages/core/src/widgets/node.ts:213](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L213)

Insert a node from node after the reference node.

#### Parameters

##### element

`any`

##### other

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`insertAfter`](widgets.list.Class.List.md#insertafter)

---

### remove()

> **remove**(`element`): `void`

Defined in: [packages/core/src/widgets/node.ts:221](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L221)

Remove child node from node.

#### Parameters

##### element

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`remove`](widgets.list.Class.List.md#remove)

---

### detach()

> **detach**(): `void`

Defined in: [packages/core/src/widgets/node.ts:255](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L255)

Remove node from its parent.

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`detach`](widgets.list.Class.List.md#detach)

---

### destroy()

> **destroy**(): `void`

Defined in: [packages/core/src/widgets/node.ts:271](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L271)

Same as the detach() method, except this will automatically call free() and unbind any screen
events to prevent memory leaks. For use with onScreenEvent(), removeScreenEvent(), and free().

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`destroy`](widgets.list.Class.List.md#destroy)

---

### forDescendants()

> **forDescendants**(`iter`, `s?`): `void`

Defined in: [packages/core/src/widgets/node.ts:283](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L283)

Iterate over all descendants, calling iter(el) for each.

#### Parameters

##### iter

(`el`) => `void`

##### s?

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`forDescendants`](widgets.list.Class.List.md#fordescendants)

---

### forAncestors()

> **forAncestors**(`iter`, `s?`): `void`

Defined in: [packages/core/src/widgets/node.ts:294](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L294)

Iterate over all ancestors, calling iter(el) for each.

#### Parameters

##### iter

(`el`) => `void`

##### s?

`any`

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`forAncestors`](widgets.list.Class.List.md#forancestors)

---

### collectDescendants()

> **collectDescendants**(`s?`): `any`[]

Defined in: [packages/core/src/widgets/node.ts:305](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L305)

Collect all descendants into an array.

#### Parameters

##### s?

`any`

#### Returns

`any`[]

#### Inherited from

[`List`](widgets.list.Class.List.md).[`collectDescendants`](widgets.list.Class.List.md#collectdescendants)

---

### collectAncestors()

> **collectAncestors**(`s?`): `any`[]

Defined in: [packages/core/src/widgets/node.ts:316](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L316)

Collect all ancestors into an array.

#### Parameters

##### s?

`any`

#### Returns

`any`[]

#### Inherited from

[`List`](widgets.list.Class.List.md).[`collectAncestors`](widgets.list.Class.List.md#collectancestors)

---

### emitDescendants()

> **emitDescendants**(...`args`): `void`

Defined in: [packages/core/src/widgets/node.ts:327](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L327)

Emit event for element, and recursively emit same event for all descendants.

#### Parameters

##### args

...`any`[]

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`emitDescendants`](widgets.list.Class.List.md#emitdescendants)

---

### emitAncestors()

> **emitAncestors**(...`args`): `void`

Defined in: [packages/core/src/widgets/node.ts:343](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L343)

Emit event for element, and recursively emit same event for all ancestors.

#### Parameters

##### args

...`any`[]

#### Returns

`void`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`emitAncestors`](widgets.list.Class.List.md#emitancestors)

---

### hasDescendant()

> **hasDescendant**(`target`): `boolean`

Defined in: [packages/core/src/widgets/node.ts:359](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L359)

Check if target is a descendant of this node.

#### Parameters

##### target

`any`

#### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`hasDescendant`](widgets.list.Class.List.md#hasdescendant)

---

### hasAncestor()

> **hasAncestor**(`target`): `boolean`

Defined in: [packages/core/src/widgets/node.ts:377](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L377)

Check if target is an ancestor of this node.

#### Parameters

##### target

`any`

#### Returns

`boolean`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`hasAncestor`](widgets.list.Class.List.md#hasancestor)

---

### get()

> **get**(`name`, `value?`): `any`

Defined in: [packages/core/src/widgets/node.ts:388](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L388)

Get user property with a potential default value.

#### Parameters

##### name

`string`

##### value?

`any`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`get`](widgets.list.Class.List.md#get)

---

### set()

> **set**(`name`, `value`): `any`

Defined in: [packages/core/src/widgets/node.ts:398](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L398)

Set user property to value.

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`any`

#### Inherited from

[`List`](widgets.list.Class.List.md).[`set`](widgets.list.Class.List.md#set)
