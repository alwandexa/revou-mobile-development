import {NavigationProp, useNavigation} from "@react-navigation/native";
import React, {FunctionComponent, useMemo, useState} from "react";
import {Image, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import Toast from "react-native-toast-message";

import {Icon, Typography} from "@components/atoms";
import {Button, CustomToast} from "@components/molecules";
import TextField, {TextFieldState} from "@components/molecules/TextField";
import {COLORS} from "@constants/colors";
import {useAuth} from "@contexts/AuthContext";
import InvestlyServices, {LoginResponse} from "@services/InvestlyServices";
import axios, {AxiosError} from "axios";

export const LoginHeader: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<Pages>>();

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
  const navigation = useNavigation<NavigationProp<Pages>>();

  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<TextFieldState>("default");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState<TextFieldState>("default");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    const MAX_LENGTH = 64;
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

    if (currentPassword.length > MAX_LENGTH) {
      setPasswordState("negative");
      setPasswordMessage(`Password maksimal ${MAX_LENGTH} karakter`);
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
    setEmail(text.toLowerCase().trim());
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleDaftar = () => {
    navigation.navigate("Register");
  };

  const isLoginEnabled = useMemo(
    () => () => {
      return !(isEmailValid && isPasswordValid) || isLoading;
    },
    [isEmailValid, isPasswordValid, isLoading],
  );

  const handleSubmit = async () => {
    const isCurrentEmailValid = validateEmail(email);
    const isCurrentPasswordValid = validatePassword(password);

    if (isCurrentEmailValid && isCurrentPasswordValid) {
      setIsLoading(true);
      try {
        const response = await InvestlyServices.login({email, password});
        const loginResponse = response.data as LoginResponse;

        if (loginResponse.status && loginResponse.data) {
          // Login successful
          login(
            loginResponse.data.access_token,
            loginResponse.data.refresh_token,
          );

          Toast.show({
            type: "success",
            text1: loginResponse.messages,
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            bottomOffset: 100,
          });

          navigation.reset({
            index: 0,
            routes: [{name: "HomeTab"}],
          });
        } else {
          // Login failed
          throw new Error(loginResponse.messages);
        }
      } catch (error) {
        let errorMessage = "Login error";

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<LoginResponse>;
          errorMessage = axiosError.response?.data.messages || errorMessage;
        }

        Toast.show({
          type: "error",
          text1: errorMessage,
          text1Style: {color: COLORS.red600},
          visibilityTime: 3000,
          autoHide: true,
          position: "bottom",
          bottomOffset: 100,
        });
      } finally {
        setIsLoading(false);
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
        <Button
          variant="primary"
          size="large"
          onPress={handleSubmit}
          disabled={isLoginEnabled()}
          loading={isLoading}>
          {isLoading ? "Sedang Masuk..." : "Masuk"}
        </Button>
      </View>
      <Button variant="outline" size="large" onPress={handleDaftar}>
        Daftar
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
