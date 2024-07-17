import React, {FunctionComponent} from "react";
import {Image, StyleSheet, View} from "react-native";

import {Typography} from "@components/atoms";
import {ProtectedButton} from "@components/molecules";
import {COLORS} from "@constants/colors";

const LoginBanner: FunctionComponent = () => (
  <View style={styles.loginBanner}>
    <Image source={require("../../assets/images/investly-mascot-1.png")} />
    <View style={styles.bannerTextContainer}>
      <Typography type="paragraph" size="small">
        Temukan inspirasi investasi,{" "}
      </Typography>
      <ProtectedButton variant="link" size="small">
        Masuk Yuk!
      </ProtectedButton>
    </View>
  </View>
);

export default LoginBanner;

const styles = StyleSheet.create({
  loginBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.purple100,
  },
  bannerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
