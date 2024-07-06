import React from "react";
import {StyleSheet} from "react-native";

import {COLORS} from "../../../constants/colors";

export type IconName = "eye" | "eye-slash" | "heart" | "person";

const iconMap: Record<
  IconName,
  React.FC<{width?: number; height?: number; fill?: string}>
> = {
  eye: require("./Eye").default,
  "eye-slash": require("./EyeSlash").default,
  heart: require("./Heart").default,
  person: require("./Person").default,
};

type IconProps = {
  name: IconName;
  fill?: string;
  width?: number;
  height?: number;
};

const Icon = ({
  name,
  fill = COLORS.neutral700,
  width = 24,
  height = 24,
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];

  return <IconComponent fill={fill} width={width} height={height} {...props} />;
};

export default Icon;

const styles = StyleSheet.create({});
