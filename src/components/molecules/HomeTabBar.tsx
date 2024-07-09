import React from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {MaterialTopTabBarProps} from "@react-navigation/material-top-tabs";

import Typography from "../atoms/Typography";
import {COLORS} from "../../constants/colors";

type HomeTabBarProps = Omit<MaterialTopTabBarProps, "insets">;

const HomeTabBar: React.FC<HomeTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}>
            <Typography
              type="heading"
              size="small"
              style={isFocused ? styles.activeLabel : styles.label}>
              {label as string}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.neutral100,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.purple600,
  },
  label: {
    color: COLORS.neutral700,
  },
  activeLabel: {
    color: COLORS.purple600,
  },
});

export default HomeTabBar;
