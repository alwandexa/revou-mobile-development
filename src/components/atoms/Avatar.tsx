import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import Person from '../../assets/images/Person';
import {COLORS} from '../../constants/colors';
import {capitalizeFirstChar} from '../../utils';

type AvatarProps = {
  source?: ImageSourcePropType;
  size?:
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
};

const Avatar: React.FC<AvatarProps> = ({source, size: size = 'medium'}) => {
  const componentSize = capitalizeFirstChar(size) as keyof typeof personStyles;

  return (
    <View style={styles[componentSize]}>
      {source ? (
        <Image
          source={source}
          style={[styles.imageStyle, styles[componentSize]]}
        />
      ) : (
        <View style={[styles.placeholder, styles[componentSize]]}>
          <Person
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
    backgroundColor: COLORS.purple600,
    padding: 8,
  },
  imageStyle: {
    borderRadius: 80,
  },
  Xxlarge: {
    width: 64,
    height: 64,
  },
  Xlarge: {
    width: 52,
    height: 52,
  },
  Large: {
    width: 40,
    height: 40,
  },
  Medium: {
    width: 32,
    height: 32,
  },
  Small: {
    width: 24,
    height: 24,
  },
  Xsmall: {
    width: 16,
    height: 16,
  },
});

const personStyles = StyleSheet.create({
  Xxlarge: {
    width: 32,
    height: 32,
  },
  Xlarge: {
    width: 28,
    height: 28,
  },
  Large: {
    width: 24,
    height: 24,
  },
  Medium: {
    width: 20,
    height: 20,
  },
  Small: {
    width: 16,
    height: 16,
  },
  Xsmall: {
    width: 12,
    height: 12,
  },
});

export default Avatar;
