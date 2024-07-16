import React, {FunctionComponent} from "react";
import {Image, SafeAreaView, StyleSheet} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import {Typography} from "@components/atoms";
import {WithAuth} from "@contexts/AuthContext";

const Profil: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/invest-logo.png")} />
      <Typography
        type="heading"
        size="xxlarge"
        style={{color: Colors.neutral700}}>
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
