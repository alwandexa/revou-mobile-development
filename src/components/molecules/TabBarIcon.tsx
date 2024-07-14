import {StyleSheet, Text, View} from "react-native";
import React, {FunctionComponent} from "react";

import Icon, {IconName} from "../atoms/icon/Icon";
import Typography from "../atoms/Typography";
import {COLORS} from "../../constants/colors";

export type TabBarIconProps = {
  name: IconName;
  label: string;
  focused: boolean;
};

const TabBarIcon: FunctionComponent<TabBarIconProps> = ({
  name,
  label,
  focused,
}) => (
  <View style={{alignItems: "center", justifyContent: "center"}}>
    <Icon name={name} fill={focused ? COLORS.purple600 : COLORS.neutral400} />
    <Typography
      type="heading"
      size="xsmall"
      style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
      {label}
    </Typography>
  </View>
);

export default TabBarIcon;
