import React from "react";
import {Image, ImageSourcePropType, StyleSheet, View} from "react-native";

import {COLORS} from "../../constants/colors";
import Icon from "../atoms/icon/Icon";

type AvatarProps = {
  source?: ImageSourcePropType;
  size?: "xxlarge" | "xlarge" | "large" | "medium" | "small" | "xsmall";
};

const Avatar: React.FC<AvatarProps> = ({source, size: size = "medium"}) => {
  const componentSize = size as keyof typeof personStyles;

  return (
    <View style={styles[componentSize]}>
      {source ? (
        <Image
          source={source}
          style={[styles.imageStyle, styles[componentSize]]}
        />
      ) : (
        <View style={[styles.placeholder, styles[componentSize]]}>
          <Icon
            name="person"
            width={personStyles[componentSize].width}
            height={personStyles[componentSize].height}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
    backgroundColor: COLORS.purple600,
    padding: 8,
  },
  imageStyle: {
    borderRadius: 80,
  },
  xxlarge: {
    width: 64,
    height: 64,
  },
  xlarge: {
    width: 52,
    height: 52,
  },
  large: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 32,
    height: 32,
  },
  small: {
    width: 24,
    height: 24,
  },
  xsmall: {
    width: 16,
    height: 16,
  },
});

const personStyles = StyleSheet.create({
  xxlarge: {
    width: 32,
    height: 32,
  },
  xlarge: {
    width: 28,
    height: 28,
  },
  large: {
    width: 24,
    height: 24,
  },
  medium: {
    width: 20,
    height: 20,
  },
  small: {
    width: 16,
    height: 16,
  },
  xsmall: {
    width: 12,
    height: 12,
  },
});

export default Avatar;
