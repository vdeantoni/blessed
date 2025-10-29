# DraggableResizableBox

A reusable React component that provides draggable and resizable box functionality with customizable content.

## Features

- ✅ **Draggable** - Drag boxes by their header
- ✅ **Resizable** - Resize boxes from the bottom-right corner
- ✅ **Customizable** - Custom header and content
- ✅ **Configurable** - Enable/disable drag/resize independently
- ✅ **Callbacks** - Get notified on size and position changes
- ✅ **Styled** - VSCode-inspired dark theme

## Usage

```tsx
import DraggableResizableBox from "../DraggableResizableBox";

function MyComponent() {
  const handleSizeChange = (size) => {
    console.log("New size:", size);
  };

  const handlePositionChange = (position) => {
    console.log("New position:", position);
  };

  return (
    <DraggableResizableBox
      initialSize={{ width: 600, height: 400 }}
      defaultPosition={{ x: 0, y: 0 }}
      className="my-custom-class"
      header={
        <>
          <span>My Box Title</span>
          <button>Action</button>
        </>
      }
      onSizeChange={handleSizeChange}
      onPositionChange={handlePositionChange}
    >
      {/* Your content here */}
      <div>Box content</div>
    </DraggableResizableBox>
  );
}
```

## Props

| Prop               | Type                           | Default          | Description                                                  |
| ------------------ | ------------------------------ | ---------------- | ------------------------------------------------------------ |
| `initialSize`      | `Size`                         | Required         | Initial width and height `{ width: number, height: number }` |
| `initialPosition`  | `Position`                     | `{ x: 0, y: 0 }` | Initial x,y offset from default position                     |
| `defaultPosition`  | `Position`                     | `undefined`      | Base position in the layout (for absolute positioning)       |
| `className`        | `string`                       | `''`             | Custom CSS class name                                        |
| `header`           | `ReactNode`                    | `undefined`      | Custom header content                                        |
| `children`         | `ReactNode`                    | Required         | Box content                                                  |
| `draggable`        | `boolean`                      | `true`           | Enable/disable dragging                                      |
| `resizable`        | `boolean`                      | `true`           | Enable/disable resizing                                      |
| `minWidth`         | `number`                       | `300`            | Minimum width in pixels                                      |
| `minHeight`        | `number`                       | `200`            | Minimum height in pixels                                     |
| `onSizeChange`     | `(size: Size) => void`         | `undefined`      | Callback when size changes                                   |
| `onPositionChange` | `(position: Position) => void` | `undefined`      | Callback when position changes                               |

## Types

```typescript
interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}
```

## Styling

The component comes with default styles in `styles.css`. You can customize by:

1. **Using className prop** - Add custom classes for specific instances
2. **Override CSS variables** - Customize colors
3. **Target child elements** - Style specific parts:
   - `.drb-box` - Main container
   - `.drb-header` - Header area
   - `.drb-content` - Content area
   - `.drb-resize-handle` - Resize handle

Example:

```css
.my-custom-class {
  border-color: #ff0000;
}

.my-custom-class .drb-header {
  background: #2a2a2a;
}
```

## Layout

The component uses `position: absolute` by default. Place it inside a container with `position: relative` for proper positioning.

```tsx
<div style={{ position: "relative", height: "500px" }}>
  <DraggableResizableBox
    initialSize={{ width: 400, height: 300 }}
    defaultPosition={{ x: 0, y: 0 }}
  >
    Content
  </DraggableResizableBox>

  <DraggableResizableBox
    initialSize={{ width: 400, height: 300 }}
    defaultPosition={{ x: 450, y: 0 }}
  >
    More content
  </DraggableResizableBox>
</div>
```

## Example: Multiple Boxes

```tsx
const boxes = [
  { id: 1, title: "Box 1", x: 0, y: 0 },
  { id: 2, title: "Box 2", x: 700, y: 0 },
  { id: 3, title: "Box 3", x: 0, y: 550 },
];

return (
  <div style={{ position: "relative", height: "100vh" }}>
    {boxes.map((box) => (
      <DraggableResizableBox
        key={box.id}
        initialSize={{ width: 650, height: 500 }}
        defaultPosition={{ x: box.x, y: box.y }}
        header={<h3>{box.title}</h3>}
      >
        <div>Content for {box.title}</div>
      </DraggableResizableBox>
    ))}
  </div>
);
```

## Notes

- The component handles all drag and resize state internally
- Transform is used for smooth dragging (hardware accelerated)
- Size changes trigger callbacks for external updates (e.g., terminal fitting)
- Mobile responsiveness should be handled by parent component
