# Class: Static\<T\>

Defined in: [packages/core/src/widgets/static.ts:44](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L44)

Static widget for rendering items once without re-rendering.

A container that renders items once and never re-renders previous content.
Perfect for displaying logs, completed tasks, or any content that should
remain immutable once rendered.

Inspired by ink's `<Static>` component, this provides a way to build up
permanent output above dynamic content.

## Example

```typescript
const completedTasks = [];
const staticWidget = new Static({
  parent: screen,
  top: 0,
  left: 0,
  width: "100%",
  renderItem: (item, index) => `✓ Task ${index + 1}: ${item}`,
});

// Add new tasks - only new items render
completedTasks.push("Setup project");
staticWidget.setItems(completedTasks);
screen.render();

completedTasks.push("Write code");
staticWidget.setItems(completedTasks);
screen.render();
```

## Extends

- [`Box`](widgets.box.Class.Box.md)

## Type Parameters

### T

`T` = `any`

## Constructors

### Constructor

> **new Static**\<`T`\>(`options`): `Static`\<`T`\>

Defined in: [packages/core/src/widgets/static.ts:70](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L70)

#### Parameters

##### options

`StaticOptions`\<`T`\> = `{}`

#### Returns

`Static`\<`T`\>

#### Overrides

[`Box`](widgets.box.Class.Box.md).[`constructor`](widgets.box.Class.Box.md#constructor)

## Properties

### \_events

> **\_events**: `any`

Defined in: [packages/core/src/lib/events.ts:10](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L10)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_events`](widgets.box.Class.Box.md#_events)

---

### \_maxListeners?

> `optional` **\_maxListeners**: `number`

Defined in: [packages/core/src/lib/events.ts:11](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/lib/events.ts#L11)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_maxListeners`](widgets.box.Class.Box.md#_maxlisteners)

---

### name?

> `optional` **name**: `string`

Defined in: [packages/core/src/widgets/element.ts:50](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L50)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`name`](widgets.box.Class.Box.md#name)

---

### position

> **position**: `any`

Defined in: [packages/core/src/widgets/element.ts:55](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L55)

Position specification. Can be relative coordinates or keywords.
Kept as any due to complex internal position calculation system.

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`position`](widgets.box.Class.Box.md#position)

---

### noOverflow?

> `optional` **noOverflow**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:56](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L56)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`noOverflow`](widgets.box.Class.Box.md#nooverflow)

---

### dockBorders?

> `optional` **dockBorders**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:57](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L57)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`dockBorders`](widgets.box.Class.Box.md#dockborders)

---

### shadow?

> `optional` **shadow**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:58](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L58)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`shadow`](widgets.box.Class.Box.md#shadow)

---

### style

> **style**: `Style`

Defined in: [packages/core/src/widgets/element.ts:60](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L60)

Element style configuration (colors, attributes, hover/focus effects)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`style`](widgets.box.Class.Box.md#style)

---

### hidden

> **hidden**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:61](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L61)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`hidden`](widgets.box.Class.Box.md#hidden)

---

### fixed

> **fixed**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:62](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L62)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`fixed`](widgets.box.Class.Box.md#fixed)

---

### align

> **align**: `string`

Defined in: [packages/core/src/widgets/element.ts:63](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L63)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`align`](widgets.box.Class.Box.md#align)

---

### valign

> **valign**: `string`

Defined in: [packages/core/src/widgets/element.ts:64](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L64)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`valign`](widgets.box.Class.Box.md#valign)

---

### wrap

> **wrap**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:65](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L65)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`wrap`](widgets.box.Class.Box.md#wrap)

---

### shrink?

> `optional` **shrink**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:66](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L66)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`shrink`](widgets.box.Class.Box.md#shrink)

---

### ch

> **ch**: `string`

Defined in: [packages/core/src/widgets/element.ts:67](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L67)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`ch`](widgets.box.Class.Box.md#ch)

---

### padding

> **padding**: `Padding`

Defined in: [packages/core/src/widgets/element.ts:69](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L69)

Padding configuration for all sides

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`padding`](widgets.box.Class.Box.md#padding)

---

### border?

> `optional` **border**: `Border`

Defined in: [packages/core/src/widgets/element.ts:71](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L71)

Border configuration

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`border`](widgets.box.Class.Box.md#border)

---

### parseTags?

> `optional` **parseTags**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:72](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L72)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`parseTags`](widgets.box.Class.Box.md#parsetags)

---

### content

> **content**: `string` = `""`

Defined in: [packages/core/src/widgets/element.ts:73](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L73)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`content`](widgets.box.Class.Box.md#content)

---

### lpos?

> `optional` **lpos**: `RenderCoords`

Defined in: [packages/core/src/widgets/element.ts:75](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L75)

Last rendered position coordinates

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`lpos`](widgets.box.Class.Box.md#lpos)

---

### \_clines?

> `optional` **\_clines**: `any`

Defined in: [packages/core/src/widgets/element.ts:76](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L76)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_clines`](widgets.box.Class.Box.md#_clines)

---

### \_pcontent?

> `optional` **\_pcontent**: `string`

Defined in: [packages/core/src/widgets/element.ts:77](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L77)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_pcontent`](widgets.box.Class.Box.md#_pcontent)

---

### \_borderColors?

> `optional` **\_borderColors**: (`string` \| `number`)[]

Defined in: [packages/core/src/widgets/element.ts:78](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L78)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_borderColors`](widgets.box.Class.Box.md#_bordercolors)

---

### \_slisteners?

> `optional` **\_slisteners**: `any`[]

Defined in: [packages/core/src/widgets/element.ts:79](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L79)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_slisteners`](widgets.box.Class.Box.md#_slisteners)

---

### \_label?

> `optional` **\_label**: `any`

Defined in: [packages/core/src/widgets/element.ts:80](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L80)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_label`](widgets.box.Class.Box.md#_label)

---

### \_labelScroll()?

> `optional` **\_labelScroll**: () => `void`

Defined in: [packages/core/src/widgets/element.ts:81](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L81)

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_labelScroll`](widgets.box.Class.Box.md#_labelscroll)

---

### \_labelResize()?

> `optional` **\_labelResize**: () => `void`

Defined in: [packages/core/src/widgets/element.ts:82](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L82)

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_labelResize`](widgets.box.Class.Box.md#_labelresize)

---

### \_hoverOptions?

> `optional` **\_hoverOptions**: `any`

Defined in: [packages/core/src/widgets/element.ts:83](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L83)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_hoverOptions`](widgets.box.Class.Box.md#_hoveroptions)

---

### \_draggable?

> `optional` **\_draggable**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:84](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L84)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_draggable`](widgets.box.Class.Box.md#_draggable)

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

[`Box`](widgets.box.Class.Box.md).[`_dragMD`](widgets.box.Class.Box.md#_dragmd)

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

[`Box`](widgets.box.Class.Box.md).[`_dragM`](widgets.box.Class.Box.md#_dragm)

---

### \_drag?

> `optional` **\_drag**: `any`

Defined in: [packages/core/src/widgets/element.ts:87](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L87)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_drag`](widgets.box.Class.Box.md#_drag)

---

### \_noFill?

> `optional` **\_noFill**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:88](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L88)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_noFill`](widgets.box.Class.Box.md#_nofill)

---

### \_isLabel?

> `optional` **\_isLabel**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:89](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L89)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_isLabel`](widgets.box.Class.Box.md#_islabel)

---

### \_isList?

> `optional` **\_isList**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:90](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L90)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_isList`](widgets.box.Class.Box.md#_islist)

---

### childBase?

> `optional` **childBase**: `number`

Defined in: [packages/core/src/widgets/element.ts:91](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L91)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`childBase`](widgets.box.Class.Box.md#childbase)

---

### childOffset?

> `optional` **childOffset**: `number`

Defined in: [packages/core/src/widgets/element.ts:92](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L92)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`childOffset`](widgets.box.Class.Box.md#childoffset)

---

### alwaysScroll?

> `optional` **alwaysScroll**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:93](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L93)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`alwaysScroll`](widgets.box.Class.Box.md#alwaysscroll)

---

### baseLimit?

> `optional` **baseLimit**: `number`

Defined in: [packages/core/src/widgets/element.ts:94](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L94)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`baseLimit`](widgets.box.Class.Box.md#baselimit)

---

### track?

> `optional` **track**: `TrackConfig`

Defined in: [packages/core/src/widgets/element.ts:95](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L95)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`track`](widgets.box.Class.Box.md#track)

---

### scrollbar?

> `optional` **scrollbar**: `ScrollbarConfig`

Defined in: [packages/core/src/widgets/element.ts:96](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L96)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`scrollbar`](widgets.box.Class.Box.md#scrollbar)

---

### items?

> `optional` **items**: `any`[]

Defined in: [packages/core/src/widgets/element.ts:97](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L97)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`items`](widgets.box.Class.Box.md#items)

---

### scrollable?

> `optional` **scrollable**: `boolean`

Defined in: [packages/core/src/widgets/element.ts:100](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L100)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`scrollable`](widgets.box.Class.Box.md#scrollable)

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

[`Box`](widgets.box.Class.Box.md).[`scroll`](widgets.box.Class.Box.md#scroll)

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

[`Box`](widgets.box.Class.Box.md).[`scrollTo`](widgets.box.Class.Box.md#scrollto)

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

[`Box`](widgets.box.Class.Box.md).[`setScroll`](widgets.box.Class.Box.md#setscroll)

---

### getScroll()?

> `optional` **getScroll**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:106](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L106)

Get the current scroll index in lines.

#### Returns

`number`

The current absolute scroll position

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getScroll`](widgets.box.Class.Box.md#getscroll)

---

### getScrollHeight()?

> `optional` **getScrollHeight**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:107](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L107)

Get the actual height of the scrolling area (total content height).

#### Returns

`number`

The total scrollable content height in lines

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getScrollHeight`](widgets.box.Class.Box.md#getscrollheight)

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

[`Box`](widgets.box.Class.Box.md).[`getScrollPerc`](widgets.box.Class.Box.md#getscrollperc)

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

[`Box`](widgets.box.Class.Box.md).[`setScrollPerc`](widgets.box.Class.Box.md#setscrollperc)

---

### resetScroll()?

> `optional` **resetScroll**: () => `any`

Defined in: [packages/core/src/widgets/element.ts:110](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L110)

Reset the scroll index to its initial state (top).

#### Returns

`any`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`resetScroll`](widgets.box.Class.Box.md#resetscroll)

---

### \_scrollBottom()?

> `optional` **\_scrollBottom**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:111](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L111)

#### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_scrollBottom`](widgets.box.Class.Box.md#_scrollbottom)

---

### \_recalculateIndex()?

> `optional` **\_recalculateIndex**: () => `number`

Defined in: [packages/core/src/widgets/element.ts:112](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L112)

#### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_recalculateIndex`](widgets.box.Class.Box.md#_recalculateindex)

---

### uid

> `static` **uid**: `number` = `0`

Defined in: [packages/core/src/widgets/node.ts:30](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L30)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`uid`](widgets.box.Class.Box.md#uid)

---

### ScreenRegistry

> `static` **ScreenRegistry**: `any`

Defined in: [packages/core/src/widgets/node.ts:31](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L31)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`ScreenRegistry`](widgets.box.Class.Box.md#screenregistry)

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

[`Box`](widgets.box.Class.Box.md).[`screen`](widgets.box.Class.Box.md#screen)

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

[`Box`](widgets.box.Class.Box.md).[`parent`](widgets.box.Class.Box.md#parent)

---

### children

> **children**: `any`[]

Defined in: [packages/core/src/widgets/node.ts:63](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L63)

Array of child elements.
Type: Node[] (can contain any Node subclasses)

Kept as any[] to preserve flexibility with mixed widget types.

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`children`](widgets.box.Class.Box.md#children)

---

### $

> **$**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:68](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L68)

An object for any miscellaneous user data.

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`$`](widgets.box.Class.Box.md#)

---

### \_

> **\_**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:73](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L73)

An object for any miscellaneous user data.

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_`](widgets.box.Class.Box.md#_)

---

### data

> **data**: `Record`\<`string`, `unknown`\>

Defined in: [packages/core/src/widgets/node.ts:78](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L78)

An object for any miscellaneous user data.

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`data`](widgets.box.Class.Box.md#data)

---

### uid

> **uid**: `number`

Defined in: [packages/core/src/widgets/node.ts:80](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L80)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`uid`](widgets.box.Class.Box.md#uid-1)

---

### index

> **index**: `number` = `-1`

Defined in: [packages/core/src/widgets/node.ts:86](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L86)

Render index (document order index) of the last render call.
Indicates the order in which this element was rendered relative to others.
Set to -1 initially, updated during rendering.

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`index`](widgets.box.Class.Box.md#index)

---

### detached?

> `optional` **detached**: `boolean`

Defined in: [packages/core/src/widgets/node.ts:87](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L87)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`detached`](widgets.box.Class.Box.md#detached)

---

### destroyed?

> `optional` **destroyed**: `boolean`

Defined in: [packages/core/src/widgets/node.ts:88](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L88)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`destroyed`](widgets.box.Class.Box.md#destroyed)

---

### runtime

> **runtime**: [`Runtime`](runtime.Interface.Runtime.md)

Defined in: [packages/core/src/widgets/node.ts:90](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L90)

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`runtime`](widgets.box.Class.Box.md#runtime)

---

### type

> **type**: `string` = `"static"`

Defined in: [packages/core/src/widgets/static.ts:45](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L45)

Type of the node (e.g. box, list, form, etc.).
Used to identify the widget type at runtime.

#### Overrides

[`Box`](widgets.box.Class.Box.md).[`type`](widgets.box.Class.Box.md#type)

---

### options

> **options**: `StaticOptions`\<`T`\>

Defined in: [packages/core/src/widgets/static.ts:46](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L46)

#### Overrides

[`Box`](widgets.box.Class.Box.md).[`options`](widgets.box.Class.Box.md#options)

## Accessors

### focused

#### Get Signature

> **get** **focused**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:114](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L114)

##### Returns

`boolean`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`focused`](widgets.box.Class.Box.md#focused)

---

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:983](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L983)

##### Returns

`boolean`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`visible`](widgets.box.Class.Box.md#visible)

---

### \_detached

#### Get Signature

> **get** **\_detached**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:994](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L994)

##### Returns

`boolean`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_detached`](widgets.box.Class.Box.md#_detached)

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

[`Box`](widgets.box.Class.Box.md).[`draggable`](widgets.box.Class.Box.md#draggable)

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

[`Box`](widgets.box.Class.Box.md).[`width`](widgets.box.Class.Box.md#width)

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

[`Box`](widgets.box.Class.Box.md).[`height`](widgets.box.Class.Box.md#height)

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

[`Box`](widgets.box.Class.Box.md).[`aleft`](widgets.box.Class.Box.md#aleft)

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

[`Box`](widgets.box.Class.Box.md).[`aright`](widgets.box.Class.Box.md#aright)

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

[`Box`](widgets.box.Class.Box.md).[`atop`](widgets.box.Class.Box.md#atop)

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

[`Box`](widgets.box.Class.Box.md).[`abottom`](widgets.box.Class.Box.md#abottom)

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

[`Box`](widgets.box.Class.Box.md).[`rleft`](widgets.box.Class.Box.md#rleft)

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

[`Box`](widgets.box.Class.Box.md).[`rright`](widgets.box.Class.Box.md#rright)

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

[`Box`](widgets.box.Class.Box.md).[`rtop`](widgets.box.Class.Box.md#rtop)

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

[`Box`](widgets.box.Class.Box.md).[`rbottom`](widgets.box.Class.Box.md#rbottom)

---

### ileft

#### Get Signature

> **get** **ileft**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1736](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1736)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`ileft`](widgets.box.Class.Box.md#ileft)

---

### itop

#### Get Signature

> **get** **itop**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1741](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1741)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`itop`](widgets.box.Class.Box.md#itop)

---

### iright

#### Get Signature

> **get** **iright**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1746](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1746)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`iright`](widgets.box.Class.Box.md#iright)

---

### ibottom

#### Get Signature

> **get** **ibottom**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1751](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1751)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`ibottom`](widgets.box.Class.Box.md#ibottom)

---

### iwidth

#### Get Signature

> **get** **iwidth**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1756](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1756)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`iwidth`](widgets.box.Class.Box.md#iwidth)

---

### iheight

#### Get Signature

> **get** **iheight**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1763](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1763)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`iheight`](widgets.box.Class.Box.md#iheight)

---

### tpadding

#### Get Signature

> **get** **tpadding**(): `number`

Defined in: [packages/core/src/widgets/element.ts:1770](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1770)

##### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`tpadding`](widgets.box.Class.Box.md#tpadding)

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

[`Box`](widgets.box.Class.Box.md).[`left`](widgets.box.Class.Box.md#left)

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

[`Box`](widgets.box.Class.Box.md).[`right`](widgets.box.Class.Box.md#right)

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

[`Box`](widgets.box.Class.Box.md).[`top`](widgets.box.Class.Box.md#top)

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

[`Box`](widgets.box.Class.Box.md).[`bottom`](widgets.box.Class.Box.md#bottom)

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

[`Box`](widgets.box.Class.Box.md).[`setMaxListeners`](widgets.box.Class.Box.md#setmaxlisteners)

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

[`Box`](widgets.box.Class.Box.md).[`addListener`](widgets.box.Class.Box.md#addlistener)

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

[`Box`](widgets.box.Class.Box.md).[`on`](widgets.box.Class.Box.md#on)

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

[`Box`](widgets.box.Class.Box.md).[`removeListener`](widgets.box.Class.Box.md#removelistener)

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

[`Box`](widgets.box.Class.Box.md).[`off`](widgets.box.Class.Box.md#off)

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

[`Box`](widgets.box.Class.Box.md).[`removeAllListeners`](widgets.box.Class.Box.md#removealllisteners)

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

[`Box`](widgets.box.Class.Box.md).[`once`](widgets.box.Class.Box.md#once)

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

[`Box`](widgets.box.Class.Box.md).[`listeners`](widgets.box.Class.Box.md#listeners)

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

[`Box`](widgets.box.Class.Box.md).[`_emit`](widgets.box.Class.Box.md#_emit)

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

[`Box`](widgets.box.Class.Box.md).[`emit`](widgets.box.Class.Box.md#emit)

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

[`Box`](widgets.box.Class.Box.md).[`sattr`](widgets.box.Class.Box.md#sattr)

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

[`Box`](widgets.box.Class.Box.md).[`onScreenEvent`](widgets.box.Class.Box.md#onscreenevent)

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

[`Box`](widgets.box.Class.Box.md).[`onceScreenEvent`](widgets.box.Class.Box.md#oncescreenevent)

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

[`Box`](widgets.box.Class.Box.md).[`removeScreenEvent`](widgets.box.Class.Box.md#removescreenevent)

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

[`Box`](widgets.box.Class.Box.md).[`free`](widgets.box.Class.Box.md#free)

---

### hide()

> **hide**(): `void`

Defined in: [packages/core/src/widgets/element.ts:432](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L432)

Hide element.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`hide`](widgets.box.Class.Box.md#hide)

---

### show()

> **show**(): `void`

Defined in: [packages/core/src/widgets/element.ts:445](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L445)

Show element.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`show`](widgets.box.Class.Box.md#show)

---

### toggle()

> **toggle**(): `void`

Defined in: [packages/core/src/widgets/element.ts:454](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L454)

Toggle hidden/shown.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`toggle`](widgets.box.Class.Box.md#toggle)

---

### focus()

> **focus**(): `any`

Defined in: [packages/core/src/widgets/element.ts:461](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L461)

Focus element.

#### Returns

`any`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`focus`](widgets.box.Class.Box.md#focus)

---

### isFocusable()

> **isFocusable**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:469](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L469)

Check if this element can receive keyboard focus.
Elements are focusable if they have tabIndex >= -1 and are visible/attached.

#### Returns

`boolean`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`isFocusable`](widgets.box.Class.Box.md#isfocusable)

---

### isInTabOrder()

> **isInTabOrder**(): `boolean`

Defined in: [packages/core/src/widgets/element.ts:478](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L478)

Check if element participates in Tab key navigation.
Elements with tabIndex=-1 are focusable but excluded from Tab order.

#### Returns

`boolean`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`isInTabOrder`](widgets.box.Class.Box.md#isintaborder)

---

### getTabIndex()

> **getTabIndex**(): `number`

Defined in: [packages/core/src/widgets/element.ts:487](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L487)

Get effective tab index for focus navigation ordering.

#### Returns

`number`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getTabIndex`](widgets.box.Class.Box.md#gettabindex)

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

[`Box`](widgets.box.Class.Box.md).[`setContent`](widgets.box.Class.Box.md#setcontent)

---

### getContent()

> **getContent**(): `string`

Defined in: [packages/core/src/widgets/element.ts:509](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L509)

Return content, slightly different from el.content. Assume the above formatting.

#### Returns

`string`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getContent`](widgets.box.Class.Box.md#getcontent)

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

[`Box`](widgets.box.Class.Box.md).[`getBorderLength`](widgets.box.Class.Box.md#getborderlength)

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

[`Box`](widgets.box.Class.Box.md).[`getBorderColors`](widgets.box.Class.Box.md#getbordercolors)

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

[`Box`](widgets.box.Class.Box.md).[`setBorderColors`](widgets.box.Class.Box.md#setbordercolors)

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

[`Box`](widgets.box.Class.Box.md).[`setText`](widgets.box.Class.Box.md#settext)

---

### getText()

> **getText**(): `string`

Defined in: [packages/core/src/widgets/element.ts:576](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L576)

Similar to getContent, but return content with tags and escape codes removed.

#### Returns

`string`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getText`](widgets.box.Class.Box.md#gettext)

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

[`Box`](widgets.box.Class.Box.md).[`parseContent`](widgets.box.Class.Box.md#parsecontent)

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

[`Box`](widgets.box.Class.Box.md).[`_parseTags`](widgets.box.Class.Box.md#_parsetags)

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

[`Box`](widgets.box.Class.Box.md).[`_parseAttr`](widgets.box.Class.Box.md#_parseattr)

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

[`Box`](widgets.box.Class.Box.md).[`_align`](widgets.box.Class.Box.md#_align)

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

[`Box`](widgets.box.Class.Box.md).[`_wrapContent`](widgets.box.Class.Box.md#_wrapcontent)

---

### enableMouse()

> **enableMouse**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1007](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1007)

Enable mouse events for the element (automatically called when a form of on('mouse') is bound).
Registers the element as clickable with the screen.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`enableMouse`](widgets.box.Class.Box.md#enablemouse)

---

### enableKeys()

> **enableKeys**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1015](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1015)

Enable keypress events for the element (automatically called when a form of on('keypress') is bound).
Registers the element as keyable with the screen.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`enableKeys`](widgets.box.Class.Box.md#enablekeys)

---

### enableInput()

> **enableInput**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1022](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1022)

Enable key and mouse events. Calls both enableMouse() and enableKeys().

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`enableInput`](widgets.box.Class.Box.md#enableinput)

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

[`Box`](widgets.box.Class.Box.md).[`enableDrag`](widgets.box.Class.Box.md#enabledrag)

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

[`Box`](widgets.box.Class.Box.md).[`disableDrag`](widgets.box.Class.Box.md#disabledrag)

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

[`Box`](widgets.box.Class.Box.md).[`key`](widgets.box.Class.Box.md#key)

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

[`Box`](widgets.box.Class.Box.md).[`onceKey`](widgets.box.Class.Box.md#oncekey)

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

[`Box`](widgets.box.Class.Box.md).[`unkey`](widgets.box.Class.Box.md#unkey)

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

[`Box`](widgets.box.Class.Box.md).[`removeKey`](widgets.box.Class.Box.md#removekey)

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

[`Box`](widgets.box.Class.Box.md).[`setIndex`](widgets.box.Class.Box.md#setindex)

---

### setFront()

> **setFront**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1191](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1191)

Put the element in front of its siblings.
Sets the element's z-index to the highest value (renders last/on top).

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`setFront`](widgets.box.Class.Box.md#setfront)

---

### setBack()

> **setBack**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1199](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1199)

Put the element in back of its siblings.
Sets the element's z-index to the lowest value (renders first/at bottom).

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`setBack`](widgets.box.Class.Box.md#setback)

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

[`Box`](widgets.box.Class.Box.md).[`clearPos`](widgets.box.Class.Box.md#clearpos)

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

[`Box`](widgets.box.Class.Box.md).[`setLabel`](widgets.box.Class.Box.md#setlabel)

---

### removeLabel()

> **removeLabel**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1303](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1303)

Remove the label completely.
Detaches the label element and removes associated event listeners.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`removeLabel`](widgets.box.Class.Box.md#removelabel)

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

[`Box`](widgets.box.Class.Box.md).[`setHover`](widgets.box.Class.Box.md#sethover)

---

### removeHover()

> **removeHover**(): `void`

Defined in: [packages/core/src/widgets/element.ts:1334](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1334)

Remove the hover label completely.
Detaches the hover text box if it's currently displayed.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`removeHover`](widgets.box.Class.Box.md#removehover)

---

### \_getPos()

> **\_getPos**(): `any`

Defined in: [packages/core/src/widgets/element.ts:1360](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L1360)

Positioning

#### Returns

`any`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_getPos`](widgets.box.Class.Box.md#_getpos)

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

[`Box`](widgets.box.Class.Box.md).[`_getWidth`](widgets.box.Class.Box.md#_getwidth)

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

[`Box`](widgets.box.Class.Box.md).[`_getHeight`](widgets.box.Class.Box.md#_getheight)

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

[`Box`](widgets.box.Class.Box.md).[`_getLeft`](widgets.box.Class.Box.md#_getleft)

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

[`Box`](widgets.box.Class.Box.md).[`_getRight`](widgets.box.Class.Box.md#_getright)

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

[`Box`](widgets.box.Class.Box.md).[`_getTop`](widgets.box.Class.Box.md#_gettop)

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

[`Box`](widgets.box.Class.Box.md).[`_getBottom`](widgets.box.Class.Box.md#_getbottom)

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

[`Box`](widgets.box.Class.Box.md).[`_getShrinkBox`](widgets.box.Class.Box.md#_getshrinkbox)

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

[`Box`](widgets.box.Class.Box.md).[`_getShrinkContent`](widgets.box.Class.Box.md#_getshrinkcontent)

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

[`Box`](widgets.box.Class.Box.md).[`_getShrink`](widgets.box.Class.Box.md#_getshrink)

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

[`Box`](widgets.box.Class.Box.md).[`_getCoords`](widgets.box.Class.Box.md#_getcoords)

---

### render()

> **render**(): `any`

Defined in: [packages/core/src/widgets/element.ts:2224](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2224)

Write content and children to the screen buffer.
This is the main rendering method that draws the element, its border, scrollbar,
and all child elements to the screen buffer. Returns the rendered coordinates.

#### Returns

`any`

Rendered coordinates object, or undefined if hidden/invalid

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`render`](widgets.box.Class.Box.md#render)

---

### \_render()

> **\_render**(): `any`

Defined in: [packages/core/src/widgets/element.ts:2882](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L2882)

Internal alias for render().

#### Returns

`any`

Rendered coordinates object

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`_render`](widgets.box.Class.Box.md#_render)

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

[`Box`](widgets.box.Class.Box.md).[`insertLine`](widgets.box.Class.Box.md#insertline)

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

[`Box`](widgets.box.Class.Box.md).[`deleteLine`](widgets.box.Class.Box.md#deleteline)

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

[`Box`](widgets.box.Class.Box.md).[`insertTop`](widgets.box.Class.Box.md#inserttop)

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

[`Box`](widgets.box.Class.Box.md).[`insertBottom`](widgets.box.Class.Box.md#insertbottom)

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

[`Box`](widgets.box.Class.Box.md).[`deleteTop`](widgets.box.Class.Box.md#deletetop)

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

[`Box`](widgets.box.Class.Box.md).[`deleteBottom`](widgets.box.Class.Box.md#deletebottom)

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

[`Box`](widgets.box.Class.Box.md).[`setLine`](widgets.box.Class.Box.md#setline)

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

[`Box`](widgets.box.Class.Box.md).[`setBaseLine`](widgets.box.Class.Box.md#setbaseline)

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

[`Box`](widgets.box.Class.Box.md).[`getLine`](widgets.box.Class.Box.md#getline)

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

[`Box`](widgets.box.Class.Box.md).[`getBaseLine`](widgets.box.Class.Box.md#getbaseline)

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

[`Box`](widgets.box.Class.Box.md).[`clearLine`](widgets.box.Class.Box.md#clearline)

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

[`Box`](widgets.box.Class.Box.md).[`clearBaseLine`](widgets.box.Class.Box.md#clearbaseline)

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

[`Box`](widgets.box.Class.Box.md).[`unshiftLine`](widgets.box.Class.Box.md#unshiftline)

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

[`Box`](widgets.box.Class.Box.md).[`shiftLine`](widgets.box.Class.Box.md#shiftline)

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

[`Box`](widgets.box.Class.Box.md).[`pushLine`](widgets.box.Class.Box.md#pushline)

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

[`Box`](widgets.box.Class.Box.md).[`popLine`](widgets.box.Class.Box.md#popline)

---

### getLines()

> **getLines**(): `string`[]

Defined in: [packages/core/src/widgets/element.ts:3157](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3157)

An array containing the content lines.

#### Returns

`string`[]

Array of fake (unwrapped) lines

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getLines`](widgets.box.Class.Box.md#getlines)

---

### getScreenLines()

> **getScreenLines**(): `string`[]

Defined in: [packages/core/src/widgets/element.ts:3165](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/element.ts#L3165)

An array containing the lines as they are displayed on the screen.

#### Returns

`string`[]

Array of real (wrapped) lines

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`getScreenLines`](widgets.box.Class.Box.md#getscreenlines)

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

[`Box`](widgets.box.Class.Box.md).[`strWidth`](widgets.box.Class.Box.md#strwidth)

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

[`Box`](widgets.box.Class.Box.md).[`screenshot`](widgets.box.Class.Box.md#screenshot)

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

[`Box`](widgets.box.Class.Box.md).[`insert`](widgets.box.Class.Box.md#insert)

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

[`Box`](widgets.box.Class.Box.md).[`prepend`](widgets.box.Class.Box.md#prepend)

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

[`Box`](widgets.box.Class.Box.md).[`append`](widgets.box.Class.Box.md#append)

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

[`Box`](widgets.box.Class.Box.md).[`insertBefore`](widgets.box.Class.Box.md#insertbefore)

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

[`Box`](widgets.box.Class.Box.md).[`insertAfter`](widgets.box.Class.Box.md#insertafter)

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

[`Box`](widgets.box.Class.Box.md).[`remove`](widgets.box.Class.Box.md#remove)

---

### detach()

> **detach**(): `void`

Defined in: [packages/core/src/widgets/node.ts:255](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L255)

Remove node from its parent.

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`detach`](widgets.box.Class.Box.md#detach)

---

### destroy()

> **destroy**(): `void`

Defined in: [packages/core/src/widgets/node.ts:271](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/node.ts#L271)

Same as the detach() method, except this will automatically call free() and unbind any screen
events to prevent memory leaks. For use with onScreenEvent(), removeScreenEvent(), and free().

#### Returns

`void`

#### Inherited from

[`Box`](widgets.box.Class.Box.md).[`destroy`](widgets.box.Class.Box.md#destroy)

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

[`Box`](widgets.box.Class.Box.md).[`forDescendants`](widgets.box.Class.Box.md#fordescendants)

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

[`Box`](widgets.box.Class.Box.md).[`forAncestors`](widgets.box.Class.Box.md#forancestors)

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

[`Box`](widgets.box.Class.Box.md).[`collectDescendants`](widgets.box.Class.Box.md#collectdescendants)

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

[`Box`](widgets.box.Class.Box.md).[`collectAncestors`](widgets.box.Class.Box.md#collectancestors)

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

[`Box`](widgets.box.Class.Box.md).[`emitDescendants`](widgets.box.Class.Box.md#emitdescendants)

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

[`Box`](widgets.box.Class.Box.md).[`emitAncestors`](widgets.box.Class.Box.md#emitancestors)

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

[`Box`](widgets.box.Class.Box.md).[`hasDescendant`](widgets.box.Class.Box.md#hasdescendant)

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

[`Box`](widgets.box.Class.Box.md).[`hasAncestor`](widgets.box.Class.Box.md#hasancestor)

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

[`Box`](widgets.box.Class.Box.md).[`get`](widgets.box.Class.Box.md#get)

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

[`Box`](widgets.box.Class.Box.md).[`set`](widgets.box.Class.Box.md#set)

---

### setItems()

> **setItems**(`items`): `void`

Defined in: [packages/core/src/widgets/static.ts:84](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L84)

Set items array and render new items.
Only items added since last render will be rendered.

#### Parameters

##### items

`T`[]

New items array

#### Returns

`void`

---

### getItems()

> **getItems**(): readonly `T`[]

Defined in: [packages/core/src/widgets/static.ts:95](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L95)

Get current items array (read-only copy).
Returns a shallow copy to prevent external modifications.

#### Returns

readonly `T`[]

Read-only copy of items array

---

### addItem()

> **addItem**(`item`): `void`

Defined in: [packages/core/src/widgets/static.ts:104](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L104)

Add a single item and render it.

#### Parameters

##### item

`T`

Item to add

#### Returns

`void`

---

### addItems()

> **addItems**(`items`): `void`

Defined in: [packages/core/src/widgets/static.ts:114](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L114)

Add multiple items and render them.

#### Parameters

##### items

`T`[]

Items to add

#### Returns

`void`

---

### clearItems()

> **clearItems**(): `void`

Defined in: [packages/core/src/widgets/static.ts:123](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L123)

Clear all items and rendered content.
This is the only way to "reset" the static widget.

#### Returns

`void`

---

### getRenderedCount()

> **getRenderedCount**(): `number`

Defined in: [packages/core/src/widgets/static.ts:157](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L157)

Get the number of items that have been rendered.

#### Returns

`number`

Number of rendered items

---

### getItemCount()

> **getItemCount**(): `number`

Defined in: [packages/core/src/widgets/static.ts:166](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L166)

Get the total number of items.

#### Returns

`number`

Total item count

---

### isFullyRendered()

> **isFullyRendered**(): `boolean`

Defined in: [packages/core/src/widgets/static.ts:175](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/widgets/static.ts#L175)

Check if all items have been rendered.

#### Returns

`boolean`

True if all items are rendered
