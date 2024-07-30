import {Typography} from "@components/atoms";
import React from "react";
import {View, StyleSheet} from "react-native";

import {COLORS} from "@constants/colors";

const ProgressBar = ({
  current = 1,
  total = 1,
  height = 20,
  color = COLORS.purple600,
}) => {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <Typography type="heading" size="xxsmall">
        {`${current} dari ${total}`}
      </Typography>
      <View style={[styles.progressBar, {height: height}]}>
        <View
          style={[
            styles.progress,
            {width: `${progress}%`, backgroundColor: color},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  progressBar: {
    backgroundColor: COLORS.neutral300,
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
  },
  progress: {
    height: "100%",
  },
});

export default ProgressBar;
