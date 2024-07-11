import React from "react";
import {StyleSheet} from "react-native";

import {COLORS} from "../../../constants/colors";

export type IconName =
  | "arrow-down"
  | "arrow-left"
  | "arrow-up"
  | "bell"
  | "comment"
  | "chevron-left"
  | "ellipsis"
  | "eye"
  | "eye-slash"
  | "heart"
  | "house"
  | "paper-plane"
  | "person"
  | "plus"
  | "question-circle"
  | "retweet";

const iconMap: Record<
  IconName,
  React.FC<{width?: number; height?: number; fill?: string}>
> = {
  "arrow-down": require("./ArrowDown").default,
  "arrow-left": require("./ArrowLeft").default,
  "arrow-up": require("./ArrowUp").default,
  bell: require("./Bell").default,
  comment: require("./Comment").default,
  "chevron-left": require("./ChevronLeft").default,
  ellipsis: require("./Ellipsis").default,
  eye: require("./Eye").default,
  "eye-slash": require("./EyeSlash").default,
  heart: require("./Heart").default,
  house: require("./House").default,
  "paper-plane": require("./PaperPlane").default,
  person: require("./Person").default,
  plus: require("./Plus").default,
  "question-circle": require("./QuestionCircle").default,
  retweet: require("./Retweet").default,
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
