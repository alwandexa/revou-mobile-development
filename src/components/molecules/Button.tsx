import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";
import Icon, {IconName} from "../atoms/icon/Icon";
import {WithAuthInteractionProps} from "../../contexts/AuthContext";

export type ButtonProps = TouchableOpacityProps &
  WithAuthInteractionProps & {
    variant?: "primary" | "outline" | "tertiary" | "link";
    size?: "large" | "medium" | "small";
    icon?: IconName;
    iconPosition?: "left" | "right";
    iconColor?: string;
    textStyle?: TextStyle;
    customStyle?: ViewStyle;
    children?: React.ReactNode;
  };

type ButtonTextSize = "medium" | "small" | "xsmall";

const Button = ({
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  iconColor,
  disabled,
  textStyle,
  customStyle,
  children,
  ...props
}: ButtonProps) => {
  const getSizeStyle = (): ViewStyle => {
    return sizeStyles[size] || {};
  };

  const getTypeStyle = (): ViewStyle => {
    return variantStyles[variant] || {};
  };

  const getIconStyle = (): ViewStyle => {
    if (!children && icon) {
      return {width: sizeStyles[size].height};
    }
    return {};
  };

  const getDisabledStyle = (): ViewStyle => {
    if (disabled) {
      return disabledButtonStyles[variant] || {};
    }
    return {};
  };

  const getTextStyle = () => {
    if (disabled) {
      const disabledTextStyle = disabledTextStyles[variant] || {};
      return disabledTextStyle;
    }

    const buttonTextStyle = textStyles[variant] || {};

    return {...buttonTextStyle, ...textStyle};
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
      style={[
        variantStyles.button,
        getTypeStyle(),
        getSizeStyle(),
        getIconStyle(),
        getDisabledStyle(),
        customStyle,
      ]}
      disabled={disabled}
      {...props}>
      {icon && iconPosition === "left" && (
        <Icon
          name={icon}
          width={getIconSize()}
          height={getIconSize()}
          fill={iconColor ? iconColor : (getTextStyle().color as string)}
        />
      )}
      {children && (
        <Typography
          type="heading"
          size={getTypographySize()}
          style={getTextStyle()}>
          {children}
        </Typography>
      )}
      {icon && iconPosition === "right" && (
        <Icon
          name={icon}
          width={getIconSize()}
          height={getIconSize()}
          fill={iconColor ? iconColor : (getTextStyle().color as string)}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const variantStyles = StyleSheet.create({
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
