import {useNavigation} from "@react-navigation/native";
import React, {FunctionComponent, useState} from "react";
import {Image, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import Toast from "react-native-toast-message";

import {Button, CustomToast} from "@components/molecules";
import {Icon, Typography} from "@components/atoms";
import {COLORS} from "@constants/colors";
import TextField, {TextFieldState} from "@components/molecules/TextField";
import {useAuth} from "@contexts/AuthContext";

export const LoginHeader: FunctionComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            fill={COLORS.neutral400}
            height={20}
            width={20}
          />
        </Pressable>
        <Image source={require("../assets/images/ic_investly.png")} />
        <Button
          variant="link"
          size="small"
          // @ts-ignore
          onPress={() => navigation.navigate("HomeTab")}>
          Lewati
        </Button>
      </View>
      <Typography type="heading" size="large" style={styles.title}>
        Masuk ke Investly
      </Typography>
    </View>
  );
};

const Login: FunctionComponent = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<TextFieldState>("default");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState<TextFieldState>("default");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const {login} = useAuth();

  const validateEmail = (currentEmail: string) => {
    currentEmail = currentEmail.trim().toLowerCase();

    if (currentEmail.length > 254) {
      setEmailState("negative");
      setEmailMessage("Email terlalu panjang (max 254 karakter)");
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    const illegalChars = /[(),<>:;\[\]"]/;
    if (illegalChars.test(currentEmail)) {
      setEmailState("negative");
      setEmailMessage("Email mengandung karakter ilegal ((),<>:;[])");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentEmail)) {
      setEmailState("negative");
      setEmailMessage("Format email salah (nama@domain.com)");
      return false;
    }

    setEmailState("positive");
    setEmailMessage("");
    setIsEmailValid(true);

    return true;
  };

  const validatePassword = (currentPassword: string) => {
    const MIN_LENGTH = 8;
    const hasUpperCase = /[A-Z]/.test(currentPassword);
    const hasLowerCase = /[a-z]/.test(currentPassword);
    const hasNumbers = /\d/.test(currentPassword);
    // eslint-disable-next-line no-useless-escape
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      currentPassword,
    );

    if (currentPassword.length < MIN_LENGTH) {
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
    return email === "alwanwirawan@test.app" && password === "TestApp123!";
  };

  const getUserData = () => {
    const avatar =
      "https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png";

    return avatar;
  };

  const handleSubmit = () => {
    const isCurrentEmailValid = validateEmail(email);
    const isCurrentPasswordValid = validatePassword(password);
    const isCredentialValid = validateCredential();

    if (isCurrentEmailValid && isCurrentPasswordValid) {
      if (isCredentialValid) {
        login("Alwan Wirawan", getUserData());

        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{name: "HomeTab"}],
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Email atau password salah. Silakan coba lagi.",
          text1Style: {color: COLORS.red600},
          visibilityTime: 3000,
          autoHide: true,
          position: "bottom",
          bottomOffset: 100,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <TextField
            label="Email"
            placeholder="Email"
            state={emailState}
            message={emailMessage}
            value={email}
            onChangeText={handleEmailChange}
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
        </View>
        <Button variant="link" size="small" style={styles.forgetPasswordButton}>
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
      <CustomToast />
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
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  contentContainer: {
    gap: 16,
  },
  formContainer: {
    gap: 24,
  },
  title: {
    color: COLORS.neutral700,
    justifyContent: "center",
    textAlign: "center",
  },
  forgetPasswordButton: {
    alignContent: "flex-start",
  },
  backButton: {
    borderColor: COLORS.neutral100,
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
