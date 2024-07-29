import React, {FunctionComponent} from "react";
import {Image, SafeAreaView, StyleSheet} from "react-native";

import {Typography} from "@components/atoms";
import {WithAuth} from "@contexts/AuthContext";
import {COLORS} from "@constants/colors";

const Profil: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/invest-logo.png")} />
      <Typography
        type="heading"
        size="xxlarge"
        style={{color: COLORS.neutral700}}>
        Coming soon
      </Typography>
    </SafeAreaView>
  );
};

export default WithAuth(Profil);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.neutral100,
  },
});
