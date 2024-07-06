import React from "react";
import {StyleSheet, TouchableOpacity, ViewStyle} from "react-native";

import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";
import Icon, {IconName} from "../atoms/icon/Icon";

type ButtonProps = {
  variant: "primary" | "outline" | "tertiary" | "link";
  size: "large" | "medium" | "small";
  type?: "text-only" | "icon-left" | "icon-right" | "icon-only";
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  customStyle?: ViewStyle;
  children?: React.ReactNode;
};

type ButtonTextSize = "medium" | "small" | "xsmall";

const Button = ({
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  disabled,
  customStyle,
  children,
}: ButtonProps) => {
  const getButtonStyles = () => {
    const sizeStyle = sizeStyles[size] || {};
    const typeStyle = typeStyles[variant] || {};

    let iconStyle = {};
    if (!children && icon) {
      iconStyle = {width: sizeStyle.height};
    }

    if (disabled) {
      const disabledButtonStyle = disabledButtonStyles[variant] || {};
      return {...disabledButtonStyle, ...sizeStyle, ...iconStyle};
    }

    return {...typeStyle, ...sizeStyle, ...iconStyle};
  };

  const getTextStyle = () => {
    if (disabled) {
      const disabledTextStyle = disabledTextStyles[variant] || {};
      return disabledTextStyle;
    }

    const textStyle = textStyles[variant] || {};

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
      style={[typeStyles.button, getButtonStyles(), customStyle]}
      disabled={disabled}>
      {icon && iconPosition === "left" ? (
        <Icon
          name={icon}
          width={getIconSize()}
          height={getIconSize()}
          fill={getTextStyle().color}
        />
      ) : null}
      {children ? (
        <Typography
          type="heading"
          size={getTypographySize()}
          style={getTextStyle()}>
          {children}
        </Typography>
      ) : (
        ""
      )}
      {icon && iconPosition === "right" ? (
        <Icon
          name={icon}
          width={getIconSize()}
          height={getIconSize()}
          fill={getTextStyle().color}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;

const typeStyles = StyleSheet.create({
  button: {
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
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
