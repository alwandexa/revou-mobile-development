import {Text, StyleSheet, TextStyle, TextProps} from "react-native";
import React from "react";

export type TypographyType = "heading" | "paragraph" | "special";
type HeadingSize =
  | "xxlarge"
  | "xlarge"
  | "large"
  | "medium"
  | "small"
  | "xsmall"
  | "xxsmall";
type ParagraphSize = "large" | "medium" | "small" | "xsmall" | "xxsmall";
type SpecialSize = ParagraphSize;
export type TypographySize = HeadingSize | ParagraphSize | SpecialSize;

type TypographyProps = {
  type: TypographyType;
  size: TypographySize;
  style?: TextStyle;
  children: React.ReactNode;
} & Omit<TextProps, "style">;

export default function Typography({
  type = "paragraph",
  size = "medium",
  style,
  children,
  ...props
}: TypographyProps) {
  const getStyle = (): TextStyle => {
    const baseStyle = baseStyles[type] || {};

    let sizeStyle: TextStyle = {};

    if (type === "heading" && headingSize[size as HeadingSize]) {
      sizeStyle = headingSize[size as HeadingSize];
    } else if (type === "paragraph" && paragraphSize[size as ParagraphSize]) {
      sizeStyle = paragraphSize[size as ParagraphSize];
    } else if (type === "special" && specialSize[size as SpecialSize]) {
      sizeStyle = specialSize[size as SpecialSize];
    }

    return {...baseStyle, ...sizeStyle};
  };

  return (
    <Text style={[getStyle(), style]} {...props}>
      {children}
    </Text>
  );
}

const baseStyles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
  },
  paragraph: {
    fontWeight: "normal",
  },
  special: {
    fontStyle: "italic",
  },
});

const headingSize = StyleSheet.create({
  xxlarge: {
    fontSize: 28,
    lineHeight: 36,
  },
  xlarge: {
    fontSize: 24,
    lineHeight: 32,
  },
  large: {
    fontSize: 20,
    lineHeight: 28,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    lineHeight: 22,
  },
  xsmall: {
    fontSize: 12,
    lineHeight: 20,
  },
  xxsmall: {
    fontSize: 10,
    lineHeight: 18,
  },
});

const paragraphSize = StyleSheet.create({
  large: {
    fontSize: 16,
    lineHeight: 24,
  },
  medium: {
    fontSize: 14,
    lineHeight: 22,
  },
  small: {
    fontSize: 12,
    lineHeight: 20,
  },
  xsmall: {
    fontSize: 10,
    lineHeight: 18,
  },
  xxsmall: {
    fontSize: 8,
    lineHeight: 12,
  },
});

const specialSize = StyleSheet.create({
  large: {
    fontSize: 16,
    lineHeight: 24,
  },
  medium: {
    fontSize: 14,
    lineHeight: 22,
  },
  small: {
    fontSize: 12,
    lineHeight: 20,
  },
  xsmall: {
    fontSize: 10,
    lineHeight: 18,
  },
  xxsmall: {
    fontSize: 8,
    lineHeight: 12,
  },
});
