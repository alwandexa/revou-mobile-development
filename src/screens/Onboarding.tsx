import React, {useRef, useState} from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Typography from "../components/atoms/Typography";
import Button from "../components/molecules/Button";
import {COLORS} from "../constants/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const onboardingData = [
  {
    title: "Connect",
    description:
      "Dapatkan akses ke investor profesional terpercaya dan mulai investasi bareng teman dan komunitas",
    image: require("../assets/images/connect-logo.png"),
  },
  {
    title: "Learn",
    description:
      "Dapatkan ide investasi dan informasi terpercaya langsung dari ahlinya biar kamu makin jago dan makin cuan!",
    image: require("../assets/images/learn-logo.png"),
  },
  {
    title: "Invest",
    description:
      "Atur portfolio kamu dan langsung berinvestasi dengan mudah dengan beragam pilihan aset",
    image: require("../assets/images/invest-logo.png"),
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item}: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Typography type="heading" size="large" style={styles.title}>
          {item.title}
        </Typography>
        <Typography type="paragraph" size="medium" style={styles.description}>
          {item.description}
        </Typography>
      </View>
    </View>
  );

  const goToNextSlide = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
      return;
    }

    // @ts-ignore
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.slideContainer}>
          <FlatList
            ref={flatListRef}
            data={onboardingData}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
              );
              setCurrentIndex(newIndex);
            }}
          />
          <View style={styles.indicatorContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      <Button
        variant="primary"
        size="medium"
        customStyle={styles.button}
        onPress={goToNextSlide}>
        {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  slideContainer: {
    alignItems: "center",
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: COLORS.neutral700,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    color: COLORS.neutral700,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20, // Add some space between FlatList and indicators
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.neutral300,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.purple600,
    width: 20,
  },
  button: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Onboarding;
