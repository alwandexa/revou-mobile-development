import React from "react";
import {StyleSheet, View} from "react-native";

import {Typography} from "@components/atoms";
import {COLORS} from "@constants/colors";

interface LabelProps {
  variant?: "primary" | "outline" | "tertiary";
  color?: "purple" | "blue" | "green" | "red" | "neutral";
  children: string;
}

const Label = ({
  variant = "primary",
  color = "purple",
  children,
}: LabelProps) => {
  const getVariantStyles = () => {
    const variantStyle = variantStyles[variant] || {};
    const primaryColor = COLORS[`${color}600`];
    const secondaryColor = COLORS[`${color}100`];

    let selectedStyle = {};
    let textStyle = {};

    if (variant === "primary") {
      selectedStyle = {
        backgroundColor: primaryColor,
      };
      textStyle = {
        color: COLORS.neutral100,
      };
    } else if (variant === "outline") {
      selectedStyle = {
        borderColor: primaryColor,
      };
      textStyle = {
        color: primaryColor,
      };
    } else if (variant === "tertiary") {
      textStyle = {
        color: primaryColor,
      };
      if (color === "neutral") {
        selectedStyle = {
          backgroundColor: COLORS.neutral300,
        };
      } else {
        selectedStyle = {
          backgroundColor: secondaryColor,
        };
      }
    }

    const viewStyle = {...variantStyle, ...selectedStyle};

    return {viewStyle, textStyle};
  };

  return (
    <View style={[styles.container, getVariantStyles().viewStyle]}>
      <Typography
        type="heading"
        size="xsmall"
        style={getVariantStyles().textStyle}>
        {children}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
});

const variantStyles = StyleSheet.create({
  primary: {},
  outline: {
    borderWidth: 1,
  },
  tertiary: {},
});

export default Label;
