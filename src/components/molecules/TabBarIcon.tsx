import React, {FunctionComponent} from "react";
import {StyleSheet, View} from "react-native";

import {Icon, Typography} from "@components/atoms";
import {IconName} from "@components/atoms/icon/Icon";
import {COLORS} from "@constants/colors";

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
  <View style={styles.container}>
    <Icon name={name} fill={focused ? COLORS.purple600 : COLORS.neutral400} />
    <Typography
      type="heading"
      size="xsmall"
      style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
      {label}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBarIcon;
