import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React from 'react';

type TypographyProps = {
  type: 'heading' | 'paragraph' | 'special';
  size:
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
  children: React.ReactNode;
};

export default function Typography({
  type = 'paragraph',
  size = 'medium',
  children,
}: TypographyProps) {
  const getStyle = (): TextStyle => {
    const baseStyle = styles[type] || {};

    const sizeStyle =
      // @ts-ignore
      styles[`${type}${size.charAt(0).toUpperCase() + size.slice(1)}`] || {};

    return {...baseStyle, ...sizeStyle};
  };

  return (
    <View>
      <Text style={getStyle()}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
  },
  headingXxlarge: {
    fontSize: 28,
    lineHeight: 36,
  },
  headingXlarge: {
    fontSize: 24,
    lineHeight: 32,
  },
  headingLarge: {
    fontSize: 20,
    lineHeight: 28,
  },
  headingMedium: {
    fontSize: 16,
    lineHeight: 24,
  },
  headingSmall: {
    fontSize: 14,
    lineHeight: 22,
  },
  headingXsmall: {
    fontSize: 12,
    lineHeight: 20,
  },
  headingXxsmall: {
    fontSize: 10,
    lineHeight: 18,
  },
  paragraph: {
    fontWeight: 'regular',
  },
  paragraphLarge: {
    fontSize: 16,
    lineHeight: 24,
  },
  paragraphMedium: {
    fontSize: 14,
    lineHeight: 22,
  },
  paragraphSmall: {
    fontSize: 12,
    lineHeight: 20,
  },
  paragraphXsmall: {
    fontSize: 10,
    lineHeight: 18,
  },
  special: {
    fontStyle: 'italic',
  },
  specialLarge: {
    fontSize: 16,
    lineHeight: 24,
  },
  specialMedium: {
    fontSize: 14,
    lineHeight: 22,
  },
  specialSmall: {
    fontSize: 12,
    lineHeight: 20,
  },
  specialXsmall: {
    fontSize: 10,
    lineHeight: 18,
  },
  specialXxsmall: {
    fontSize: 8,
    lineHeight: 12,
  },
});
