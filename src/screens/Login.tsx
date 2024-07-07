import React from "react";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";

import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import Icon from "../components/atoms/icon/Icon";
import Typography from "../components/atoms/Typography";
import {COLORS} from "../constants/colors";

export const LoginHeader = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}>
        <Icon name="chevron-left" />
        <Image source={require("../assets/images/ic_investly.png")} />
        <Button
          variant="link"
          size="small"
          onPress={() => navigation.navigate("HomeTab")}>
          Lewati
        </Button>
      </View>
      <Typography
        type="heading"
        size="large"
        style={{
          color: COLORS.neutral700,
          justifyContent: "center",
          textAlign: "center",
        }}>
        Masuk ke Investly
      </Typography>
    </View>
  );
};

const Login = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{gap: 24}}>
        <TextField label="Email" placeholder="Email" />
        <TextField
          label="Password"
          placeholder="Masukkan password"
          type="password"
        />
        <Button
          variant="link"
          size="small"
          style={{alignContent: "flex-start"}}>
          Lupa Password
        </Button>
      </View>
      <Button
        variant="primary"
        size="medium"
        onPress={() => navigation.navigate("HomeTab")}>
        Masuk
      </Button>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerContainer: {
    gap: 24,
    padding: 20,
    backgroundColor: COLORS.neutral100,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    gap: 24,
    backgroundColor: COLORS.neutral100,
  },
});
