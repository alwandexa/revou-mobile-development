import React, {FunctionComponent} from "react";
import {Image, SafeAreaView, StyleSheet} from "react-native";

import Typography from "../components/atoms/Typography";
import {COLORS} from "../constants/colors";
import {WithAuth} from "../contexts/AuthContext";

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
  },
});
