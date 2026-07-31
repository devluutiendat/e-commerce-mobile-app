import { Colors, FontSize, Radius } from "@/constants";
import React from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}) => {
  const bg = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: "transparent",
    danger: Colors.danger,
    ghost: "transparent",
  }[variant];

  const color = {
    primary: Colors.white,
    secondary: Colors.white,
    outline: Colors.primary,
    danger: Colors.white,
    ghost: Colors.gray600,
  }[variant];

  const borderColor = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: Colors.primary,
    danger: Colors.danger,
    ghost: "transparent",
  }[variant];

  const pad = { sm: 8, md: 14, lg: 18 }[size];
  const fontSize = { sm: FontSize.sm, md: FontSize.md, lg: FontSize.lg }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: disabled ? Colors.gray200 : bg,
          borderColor: disabled ? Colors.gray200 : borderColor,
          borderWidth: 1.5,
          borderRadius: Radius.md,
          paddingVertical: pad,
          paddingHorizontal: pad * 1.5,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          alignSelf: fullWidth ? "stretch" : "auto",
        },
        style,
      ]}
    >
      {loading && <ActivityIndicator size="small" color={color} />}
      <Text
        style={{
          color: disabled ? Colors.gray400 : color,
          fontSize,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
