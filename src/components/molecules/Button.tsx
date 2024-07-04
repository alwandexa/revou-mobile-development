import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";

import Heart from "../../assets/images/Heart";
import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";

type ButtonProps = {
  type: "primary" | "outline" | "tertiary" | "link";
  size: "large" | "medium" | "small";
  disabled?: Boolean;
  customStyle?: StyleMedia;
  children?: React.ReactNode;
};

type ButtonTextSize = "medium" | "small" | "xsmall";

const Button = ({type, size, disabled, customStyle, children}: ButtonProps) => {
  const getButtonStyles = () => {
    const sizeStyle = sizeStyles[size] || {};
    const typeStyle = typeStyles[type] || {};

    if (disabled) {
      const disabledButtonStyle = disabledButtonStyles[type] || {};
      return {...disabledButtonStyle, ...sizeStyle};
    }

    return {...typeStyle, ...sizeStyle};
  };

  const getTextStyle = () => {
    if (disabled) {
      const disabledTextStyle = disabledTextStyles[type] || {};
      return disabledTextStyle;
    }

    const textStyle = textStyles[type] || {};

    return textStyle;
  };

  const getTypographySize = (): ButtonTextSize => {
    const sizeMap: Record<typeof size, ButtonTextSize> = {
      large: "medium",
      medium: "small",
      small: "xsmall",
    };

    return sizeMap[size];
  };

  const getIconSize = () => {
    const sizeMap = {
      large: 20,
      medium: 16,
      small: 12,
    };

    return sizeMap[size];
  };

  return (
    <TouchableOpacity
      style={[typeStyles.button, getButtonStyles(), customStyle]}>
      <Typography
        type="heading"
        size={getTypographySize()}
        style={getTextStyle()}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;

const typeStyles = StyleSheet.create({
  button: {
    minWidth: 160,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    gap: 8,
  },
  primary: {
    backgroundColor: COLORS.purple600,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.purple600,
  },
  tertiary: {
    backgroundColor: COLORS.purple100,
  },
  link: {},
});

const disabledButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.neutral400,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.neutral400,
  },
  tertiary: {
    backgroundColor: COLORS.neutral400,
  },
  link: {},
});

const sizeStyles = StyleSheet.create({
  large: {
    height: 48,
  },
  medium: {
    height: 40,
  },
  small: {
    height: 32,
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: COLORS.neutral100,
  },
  outline: {
    color: COLORS.purple600,
  },
  tertiary: {
    color: COLORS.purple600,
  },
  link: {
    color: COLORS.purple600,
  },
});

const disabledTextStyles = StyleSheet.create({
  primary: {
    color: COLORS.neutral100,
  },
  outline: {
    color: COLORS.neutral400,
  },
  tertiary: {
    color: COLORS.neutral100,
  },
  link: {
    color: COLORS.neutral400,
  },
});
