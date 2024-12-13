import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

// Add your SFSymbol to MaterialIcons/MaterialCommunityIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": { icon: "home", type: "MaterialIcons" },
  "paperplane.fill": { icon: "send", type: "MaterialIcons" },
  "chevron.left.forwardslash.chevron.right": {
    icon: "code",
    type: "MaterialIcons",
  },
  "chevron.right": { icon: "chevron-right", type: "MaterialIcons" },
  "calendar.day.timeline.leading": {
    icon: "calendar-view-day",
    type: "MaterialIcons",
  },
  "calendar.circle": { icon: "calendar-today", type: "MaterialIcons" },
  calendar: { icon: "calendar-month", type: "MaterialIcons" },
  "xmarkbin.fill": { icon: "delete", type: "MaterialIcons" },
  "rectangle.portrait.and.arrow.right": {
    icon: "logout",
    type: "MaterialIcons",
  },
  house: { icon: "home", type: "MaterialIcons" },
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    {
      icon: React.ComponentProps<
        typeof MaterialIcons | typeof MaterialCommunityIcons
      >["name"];
      type: "MaterialIcons" | "MaterialCommunityIcons";
    }
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons/MaterialCommunityIcons on Android and web.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons or MaterialCommunityIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mapping = MAPPING[name];

  if (!mapping) {
    console.error(`No mapping found for icon name: ${name}`);
    return null;
  }

  const { icon, type } = mapping;

  if (type === "MaterialIcons") {
    return (
      <MaterialIcons color={color} size={size} name={icon} style={style} />
    );
  }

  if (type === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        color={color}
        size={size}
        name={icon}
        style={style}
      />
    );
  }

  return null;
}
