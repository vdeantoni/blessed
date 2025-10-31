/**
 * yoga-node.ts - Yoga node lifecycle management
 */

import Yoga, { type Node as YogaNode } from "yoga-layout";
import type { FlexboxProps, LayoutNode } from "./types.js";

/**
 * Creates a new layout node with a Yoga node.
 * @param type - Type identifier for the node
 * @param props - Flexbox properties to apply
 * @returns A new LayoutNode
 */
export function createLayoutNode(
  type: string,
  props: FlexboxProps = {},
): LayoutNode {
  const config = Yoga.Config.create();
  config.setUseWebDefaults(true);

  const yogaNode = Yoga.Node.create(config);

  if (type === "box" && !props.width) {
    props.width = "100%";
  }

  const node: LayoutNode = {
    type,
    yogaNode,
    props,
    children: [],
    parent: null,
    widgetOptions: {},
  };

  // Apply initial styles
  applyFlexStyles(yogaNode, props);

  return node;
}

/**
 * Applies flexbox style properties to a Yoga node.
 * This is where React/framework props get translated to Yoga API calls.
 * @param yogaNode - The Yoga node to apply styles to
 * @param props - Flexbox properties
 */
export function applyFlexStyles(yogaNode: YogaNode, props: FlexboxProps): void {
  // Flex container properties
  if (props.flexDirection !== undefined) {
    switch (props.flexDirection) {
      case "row":
        yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
        break;
      case "column":
        yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN);
        break;
      case "row-reverse":
        yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_ROW_REVERSE);
        break;
      case "column-reverse":
        yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN_REVERSE);
        break;
    }
  }

  if (props.flexWrap !== undefined) {
    switch (props.flexWrap) {
      case "nowrap":
        yogaNode.setFlexWrap(Yoga.WRAP_NO_WRAP);
        break;
      case "wrap":
        yogaNode.setFlexWrap(Yoga.WRAP_WRAP);
        break;
      case "wrap-reverse":
        yogaNode.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
        break;
    }
  }

  if (props.justifyContent !== undefined) {
    switch (props.justifyContent) {
      case "flex-start":
        yogaNode.setJustifyContent(Yoga.JUSTIFY_FLEX_START);
        break;
      case "center":
        yogaNode.setJustifyContent(Yoga.JUSTIFY_CENTER);
        break;
      case "flex-end":
        yogaNode.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
        break;
      case "space-between":
        yogaNode.setJustifyContent(Yoga.JUSTIFY_SPACE_BETWEEN);
        break;
      case "space-around":
        yogaNode.setJustifyContent(Yoga.JUSTIFY_SPACE_AROUND);
        break;
      case "space-evenly":
        yogaNode.setJustifyContent(Yoga.JUSTIFY_SPACE_EVENLY);
        break;
    }
  }

  if (props.alignItems !== undefined) {
    switch (props.alignItems) {
      case "flex-start":
        yogaNode.setAlignItems(Yoga.ALIGN_FLEX_START);
        break;
      case "center":
        yogaNode.setAlignItems(Yoga.ALIGN_CENTER);
        break;
      case "flex-end":
        yogaNode.setAlignItems(Yoga.ALIGN_FLEX_END);
        break;
      case "stretch":
        yogaNode.setAlignItems(Yoga.ALIGN_STRETCH);
        break;
    }
  }

  if (props.alignSelf !== undefined) {
    switch (props.alignSelf) {
      case "auto":
        yogaNode.setAlignSelf(Yoga.ALIGN_AUTO);
        break;
      case "flex-start":
        yogaNode.setAlignSelf(Yoga.ALIGN_FLEX_START);
        break;
      case "center":
        yogaNode.setAlignSelf(Yoga.ALIGN_CENTER);
        break;
      case "flex-end":
        yogaNode.setAlignSelf(Yoga.ALIGN_FLEX_END);
        break;
      case "stretch":
        yogaNode.setAlignSelf(Yoga.ALIGN_STRETCH);
        break;
    }
  }

  // Flex item properties
  if (props.flexGrow !== undefined) {
    yogaNode.setFlexGrow(props.flexGrow);
  }

  if (props.flexShrink !== undefined) {
    yogaNode.setFlexShrink(props.flexShrink);
  }

  if (props.flexBasis !== undefined) {
    if (typeof props.flexBasis === "number") {
      yogaNode.setFlexBasis(props.flexBasis);
    } else if (typeof props.flexBasis === "string") {
      const value = parsePercentage(props.flexBasis);
      if (value !== null) {
        yogaNode.setFlexBasisPercent(value);
      }
    }
  }

  // Dimensions
  if (props.width !== undefined) {
    if (typeof props.width === "number") {
      yogaNode.setWidth(props.width);
    } else if (typeof props.width === "string") {
      const value = parsePercentage(props.width);
      if (value !== null) {
        yogaNode.setWidthPercent(value);
      } else if (props.width === "auto") {
        yogaNode.setWidthAuto();
      }
    }
  }

  if (props.height !== undefined) {
    if (typeof props.height === "number") {
      yogaNode.setHeight(props.height);
    } else if (typeof props.height === "string") {
      const value = parsePercentage(props.height);
      if (value !== null) {
        yogaNode.setHeightPercent(value);
      } else if (props.height === "auto") {
        yogaNode.setHeightAuto();
      }
    }
  }

  if (props.minWidth !== undefined) {
    if (typeof props.minWidth === "number") {
      yogaNode.setMinWidth(props.minWidth);
    } else if (typeof props.minWidth === "string") {
      const value = parsePercentage(props.minWidth);
      if (value !== null) {
        yogaNode.setMinWidthPercent(value);
      }
    }
  }

  if (props.minHeight !== undefined) {
    if (typeof props.minHeight === "number") {
      yogaNode.setMinHeight(props.minHeight);
    } else if (typeof props.minHeight === "string") {
      const value = parsePercentage(props.minHeight);
      if (value !== null) {
        yogaNode.setMinHeightPercent(value);
      }
    }
  }

  if (props.maxWidth !== undefined) {
    if (typeof props.maxWidth === "number") {
      yogaNode.setMaxWidth(props.maxWidth);
    } else if (typeof props.maxWidth === "string") {
      const value = parsePercentage(props.maxWidth);
      if (value !== null) {
        yogaNode.setMaxWidthPercent(value);
      }
    }
  }

  if (props.maxHeight !== undefined) {
    if (typeof props.maxHeight === "number") {
      yogaNode.setMaxHeight(props.maxHeight);
    } else if (typeof props.maxHeight === "string") {
      const value = parsePercentage(props.maxHeight);
      if (value !== null) {
        yogaNode.setMaxHeightPercent(value);
      }
    }
  }

  // Padding
  if (props.padding !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_TOP, props.padding);
    yogaNode.setPadding(Yoga.EDGE_BOTTOM, props.padding);
    yogaNode.setPadding(Yoga.EDGE_LEFT, props.padding);
    yogaNode.setPadding(Yoga.EDGE_RIGHT, props.padding);
  }

  if (props.paddingX !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_HORIZONTAL, props.paddingX);
  }

  if (props.paddingY !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_VERTICAL, props.paddingY);
  }

  if (props.paddingTop !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_TOP, props.paddingTop);
  }

  if (props.paddingBottom !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_BOTTOM, props.paddingBottom);
  }

  if (props.paddingLeft !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_LEFT, props.paddingLeft);
  }

  if (props.paddingRight !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_RIGHT, props.paddingRight);
  }

  // Margin
  if (props.margin !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_TOP, props.margin);
    yogaNode.setMargin(Yoga.EDGE_BOTTOM, props.margin);
    yogaNode.setMargin(Yoga.EDGE_LEFT, props.margin);
    yogaNode.setMargin(Yoga.EDGE_RIGHT, props.margin);
  }

  if (props.marginX !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_HORIZONTAL, props.marginX);
  }

  if (props.marginY !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_VERTICAL, props.marginY);
  }

  if (props.marginTop !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_TOP, props.marginTop);
  }

  if (props.marginBottom !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_BOTTOM, props.marginBottom);
  }

  if (props.marginLeft !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_LEFT, props.marginLeft);
  }

  if (props.marginRight !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_RIGHT, props.marginRight);
  }

  // Gap (Yoga 2.0+)
  if (props.gap !== undefined) {
    yogaNode.setGap(Yoga.GUTTER_ALL, props.gap);
  }

  if (props.columnGap !== undefined) {
    yogaNode.setGap(Yoga.GUTTER_COLUMN, props.columnGap);
  }

  if (props.rowGap !== undefined) {
    yogaNode.setGap(Yoga.GUTTER_ROW, props.rowGap);
  }

  // Position
  if (props.position !== undefined) {
    switch (props.position) {
      case "relative":
        yogaNode.setPositionType(Yoga.POSITION_TYPE_RELATIVE);
        break;
      case "absolute":
        yogaNode.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
        break;
    }
  }

  // Display
  if (props.display !== undefined) {
    switch (props.display) {
      case "flex":
        yogaNode.setDisplay(Yoga.DISPLAY_FLEX);
        break;
      case "none":
        yogaNode.setDisplay(Yoga.DISPLAY_NONE);
        break;
    }
  }

  // Border
  if (props.border !== undefined) {
    yogaNode.setBorder(Yoga.EDGE_TOP, props.border);
    yogaNode.setBorder(Yoga.EDGE_BOTTOM, props.border);
    yogaNode.setBorder(Yoga.EDGE_LEFT, props.border);
    yogaNode.setBorder(Yoga.EDGE_RIGHT, props.border);
  }

  if (props.borderTop !== undefined) {
    yogaNode.setBorder(Yoga.EDGE_TOP, props.borderTop);
  }

  if (props.borderBottom !== undefined) {
    yogaNode.setBorder(Yoga.EDGE_BOTTOM, props.borderBottom);
  }

  if (props.borderLeft !== undefined) {
    yogaNode.setBorder(Yoga.EDGE_LEFT, props.borderLeft);
  }

  if (props.borderRight !== undefined) {
    yogaNode.setBorder(Yoga.EDGE_RIGHT, props.borderRight);
  }
}

/**
 * Updates an existing layout node with new props.
 * @param node - The layout node to update
 * @param newProps - New flexbox properties
 */
export function updateLayoutNode(
  node: LayoutNode,
  newProps: FlexboxProps,
): void {
  node.props = newProps;
  applyFlexStyles(node.yogaNode, newProps);
}

/**
 * Appends a child node to a parent node.
 * Updates both the layout tree and Yoga tree.
 * @param parent - Parent layout node
 * @param child - Child layout node to append
 */
export function appendChild(parent: LayoutNode, child: LayoutNode): void {
  child.parent = parent;
  parent.children.push(child);
  parent.yogaNode.insertChild(child.yogaNode, parent.children.length - 1);
}

/**
 * Removes a child node from its parent.
 * Updates both the layout tree and Yoga tree.
 * @param parent - Parent layout node
 * @param child - Child layout node to remove
 */
export function removeChild(parent: LayoutNode, child: LayoutNode): void {
  const index = parent.children.indexOf(child);
  if (index === -1) return;

  parent.children.splice(index, 1);
  parent.yogaNode.removeChild(child.yogaNode);
  child.parent = null;
}

/**
 * Destroys a layout node and frees Yoga resources.
 * IMPORTANT: Always call this to prevent memory leaks.
 * @param node - The layout node to destroy
 */
export function destroyLayoutNode(node: LayoutNode): void {
  // Recursively destroy children
  node.children.forEach((child) => destroyLayoutNode(child));

  // Free Yoga node
  node.yogaNode.freeRecursive();

  // Clear references
  node.children = [];
  node.parent = null;
  node.widget = undefined;
}

/**
 * Parses a percentage string to a number (0-100).
 * @param value - String like '50%'
 * @returns Numeric percentage or null if invalid
 */
function parsePercentage(value: string): number | null {
  const match = value.match(/^(\d+(?:\.\d+)?)%$/);
  if (!match) return null;
  return parseFloat(match[1]);
}
