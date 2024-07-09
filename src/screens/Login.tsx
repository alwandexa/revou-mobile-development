import React, {useState} from "react";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";

import Button from "../components/molecules/Button";
import TextField, {TextFieldState} from "../components/molecules/TextField";
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
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<TextFieldState>("default");
  const [emailMessage, setEmailMessage] = useState("");

  const validateEmail = (email: string) => {
    email = email.trim();

    email = email.toLowerCase();

    if (email.length > 254) {
      setEmailState("negative");
      setEmailMessage("Email address is too long (max 254 characters)");
      return false;
    }

    const illegalChars = /[(),<>:;\[\]"]/;
    if (illegalChars.test(email)) {
      setEmailState("negative");
      setEmailMessage("Email contains illegal characters");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailState("negative");
      setEmailMessage(
        "Invalid email format. Please use pattern: name@domain.com",
      );
      return false;
    }

    setEmailState("filled");
    setEmailMessage("");
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(email);
  };

  const handleSubmit = () => {
    console.log("email", email);
    if (validateEmail(email)) {
      navigation.navigate("HomeTab");
    }
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{gap: 24}}>
        <TextField
          label="Email"
          placeholder="Email"
          state={emailState}
          message={emailMessage}
          value={email}
          onChangeText={text => handleEmailChange(text)}
        />
        <TextField
          state="default"
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
      <Button variant="primary" size="medium" onPress={handleSubmit}>
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
