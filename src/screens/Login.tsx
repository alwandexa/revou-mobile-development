import React, {useState} from "react";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";

import Button from "../components/molecules/Button";
import TextField, {TextFieldState} from "../components/molecules/TextField";
import Icon from "../components/atoms/icon/Icon";
import Typography from "../components/atoms/Typography";
import {COLORS} from "../constants/colors";
import Label from "../components/molecules/Label";

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
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState<TextFieldState>("default");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [loginError, setLoginError] = useState("");

  const validateEmail = (email: string) => {
    email = email.trim();

    email = email.toLowerCase();

    if (email.length > 254) {
      setEmailState("negative");
      setEmailMessage("Email terlalu panjang (max 254 karakter)");
      return false;
    }

    const illegalChars = /[(),<>:;\[\]"]/;
    if (illegalChars.test(email)) {
      setEmailState("negative");
      setEmailMessage("Email mengandung karakter ilegal ((),<>:;[])");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailState("negative");
      setEmailMessage("Format email salah (nama@domain.com)");
      return false;
    }

    setEmailState("positive");
    setEmailMessage("");
    setIsEmailValid(true);

    return true;
  };

  const validatePassword = (password: string) => {
    const MIN_LENGTH = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password,
    );

    if (password.length < MIN_LENGTH) {
      setPasswordState("negative");
      setPasswordMessage(`Password minimal ${MIN_LENGTH} karakter`);
      return false;
    }

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      setPasswordState("negative");
      setPasswordMessage(
        "Password harus mengandung huruf besar-kecil, angka, dan karakter khusus",
      );
      return false;
    }

    setPasswordState("positive");
    setPasswordMessage("");
    setIsPasswordValid(true);

    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const isLoginEnabled = () => {
    return isEmailValid && isPasswordValid ? false : true;
  };

  const validateCredential = () => {
    return email === "alwanwirawan@test.app" && password === "TestApp123!"
      ? true
      : false;
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isCredentialValid = validateCredential();

    if (isEmailValid && isPasswordValid) {
      if (isCredentialValid) {
        setLoginError("");
        navigation.navigate("HomeTab");
      } else {
        setLoginError("Email atau password salah. Silakan coba lagi.");

        setTimeout(() => {
          setLoginError("");
        }, 3000);
      }
    }
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{gap: 24}}>
        {loginError ? (
          <Label variant="tertiary" color="red">
            {loginError}
          </Label>
        ) : null}
        <TextField
          label="Email"
          placeholder="Email"
          state={emailState}
          message={emailMessage}
          value={email}
          onChangeText={text => handleEmailChange(text)}
        />
        <TextField
          label="Password"
          placeholder="Masukkan password"
          type="password"
          state={passwordState}
          message={passwordMessage}
          value={password}
          onChangeText={handlePasswordChange}
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
        onPress={handleSubmit}
        disabled={isLoginEnabled()}>
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
