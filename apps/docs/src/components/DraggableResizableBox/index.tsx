import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import './styles.css';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export interface DraggableResizableBoxProps {
  /** Initial position */
  initialPosition?: Position;
  /** Initial size (if not provided, uses 100% width and height) */
  initialSize?: Size;
  /** Default position in the layout (for absolute positioning) */
  defaultPosition?: Position;
  /** Custom class name */
  className?: string;
  /** Header content */
  header?: ReactNode;
  /** Box content */
  children: ReactNode;
  /** Whether dragging is enabled */
  draggable?: boolean;
  /** Whether resizing is enabled */
  resizable?: boolean;
  /** Minimum width */
  minWidth?: number;
  /** Minimum height */
  minHeight?: number;
  /** Use responsive sizing (100% width/height) */
  responsive?: boolean;
  /** Callback when size changes */
  onSizeChange?: (size: Size) => void;
  /** Callback when position changes */
  onPositionChange?: (position: Position) => void;
  /** Callback when box is focused/brought to front */
  onFocus?: () => void;
  /** Z-index for stacking order */
  zIndex?: number;
}

export default function DraggableResizableBox({
  initialPosition = { x: 0, y: 0 },
  initialSize,
  defaultPosition,
  className = '',
  header,
  children,
  draggable = true,
  resizable = true,
  minWidth = 300,
  minHeight = 200,
  responsive = false,
  onSizeChange,
  onPositionChange,
  onFocus,
  zIndex = 1,
}: DraggableResizableBoxProps) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [size, setSize] = useState<Size>(initialSize || { width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState<{ pos: Position; size: Size }>({
    pos: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
  });
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [absolutePosition, setAbsolutePosition] = useState<Position | null>(null);

  // Initialize size from parent container when responsive is true
  React.useEffect(() => {
    if (responsive && !hasInteracted && boxRef.current) {
      const parent = boxRef.current.parentElement;
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        setSize({ width, height });
      }
    }
  }, [responsive, hasInteracted]);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!draggable) return;
    // Check if clicked element is the header or a child of the header
    if ((e.target as HTMLElement).closest('.drb-header')) {
      e.preventDefault();

      // Bring to front
      onFocus?.();

      // If switching from responsive to absolute positioning, capture current position
      if (responsive && !hasInteracted && boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        // Find the closest positioned ancestor (the offset parent for absolute positioning)
        let offsetParent = boxRef.current.offsetParent as HTMLElement | null;

        if (offsetParent) {
          const parentRect = offsetParent.getBoundingClientRect();
          // Position relative to offset parent
          setAbsolutePosition({
            x: rect.left - parentRect.left,
            y: rect.top - parentRect.top,
          });
        } else {
          setAbsolutePosition({
            x: rect.left,
            y: rect.top,
          });
        }
        setPosition({ x: 0, y: 0 });
      }

      setDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setHasInteracted(true);
    }
  }, [draggable, responsive, hasInteracted, onFocus]);

  // Resize handlers
  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    e.preventDefault();
    e.stopPropagation();

    // Bring to front
    onFocus?.();

    // If switching from responsive to absolute positioning, capture current position
    if (responsive && !hasInteracted && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      // Find the closest positioned ancestor (the offset parent for absolute positioning)
      let offsetParent = boxRef.current.offsetParent as HTMLElement | null;

      if (offsetParent) {
        const parentRect = offsetParent.getBoundingClientRect();
        // Position relative to offset parent
        setAbsolutePosition({
          x: rect.left - parentRect.left,
          y: rect.top - parentRect.top,
        });
      } else {
        setAbsolutePosition({
          x: rect.left,
          y: rect.top,
        });
      }
      setPosition({ x: 0, y: 0 });
    }

    setResizing(true);
    setResizeStart({
      pos: { x: e.clientX, y: e.clientY },
      size: { width: size.width, height: size.height },
    });
    setHasInteracted(true);
  }, [resizable, size, responsive, hasInteracted, onFocus]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newPosition = {
          x: position.x + deltaX,
          y: position.y + deltaY,
        };

        setPosition(newPosition);
        setDragStart({ x: e.clientX, y: e.clientY });
        onPositionChange?.(newPosition);
      }

      if (resizing) {
        const deltaX = e.clientX - resizeStart.pos.x;
        const deltaY = e.clientY - resizeStart.pos.y;

        const newSize = {
          width: Math.max(minWidth, resizeStart.size.width + deltaX),
          height: Math.max(minHeight, resizeStart.size.height + deltaY),
        };

        setSize(newSize);
        onSizeChange?.(newSize);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
    };

    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragStart, resizing, resizeStart, position, minWidth, minHeight, onSizeChange, onPositionChange]);

  const boxStyle: React.CSSProperties = responsive && !hasInteracted
    ? {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: (dragging || resizing) ? 'none' : 'transform 0.2s ease',
        width: '100%',
        height: '100%',
        left: defaultPosition?.x ?? 0,
        top: defaultPosition?.y ?? 0,
        zIndex,
      }
    : {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: (dragging || resizing) ? 'none' : 'transform 0.2s ease',
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: absolutePosition?.x ?? defaultPosition?.x ?? 0,
        top: absolutePosition?.y ?? defaultPosition?.y ?? 0,
        zIndex,
      };

  return (
    <div
      ref={boxRef}
      className={`drb-box ${responsive && !hasInteracted ? 'drb-responsive' : ''} ${className} ${dragging ? 'drb-dragging' : ''} ${resizing ? 'drb-resizing' : ''}`}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onClick={() => onFocus?.()}
    >
      {header && (
        <div className={`drb-header ${draggable ? 'drb-draggable' : ''}`}>
          {header}
        </div>
      )}
      <div className="drb-content">
        {children}
      </div>
      {resizable && (
        <div
          className="drb-resize-handle"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}
