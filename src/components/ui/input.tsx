import { Colors, FontSize, Radius, Spacing } from "@/constants";
import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => (
  <View style={[{ marginBottom: Spacing.md }, containerStyle]}>
    {label && (
      <Text
        style={{
          fontSize: FontSize.sm,
          fontWeight: "500",
          color: Colors.gray700,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
    )}
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: error ? Colors.danger : Colors.gray200,
        borderRadius: Radius.md,
        paddingHorizontal: 12,
      }}
    >
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
      <TextInput
        style={[
          {
            flex: 1,
            paddingVertical: 13,
            fontSize: FontSize.md,
            color: Colors.text,
          },
          style,
        ]}
        placeholderTextColor={Colors.textMuted}
        {...props}
      />
      {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
    </View>
    {error && (
      <Text
        style={{ fontSize: FontSize.xs, color: Colors.danger, marginTop: 4 }}
      >
        {error}
      </Text>
    )}
  </View>
);
