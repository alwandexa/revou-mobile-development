import {NavigationProp, useNavigation} from "@react-navigation/native";
import React, {FunctionComponent, useMemo, useState} from "react";
import {Image, Pressable, SafeAreaView, StyleSheet, View} from "react-native";

import {Icon, Typography} from "@components/atoms";
import {Button, CustomToast} from "@components/molecules";
import TextField, {TextFieldState} from "@components/molecules/TextField";
import {COLORS} from "@constants/colors";
import ProgressBar from "@components/molecules/ProgressBar";

const Register: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<Pages>>();
  const [currentIndex, setCurrentIndex] = useState(1);

  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<TextFieldState>("default");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState<TextFieldState>("default");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationState, setPasswordConfirmationState] =
    useState<TextFieldState>("default");
  const [passworConfirmationdMessage, setPasswordConfirmationMessage] =
    useState("");
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] =
    useState(false);

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

  const validatePasswordConfirmation = (
    currentPassword: string,
    confirmationPassword: string,
  ) => {
    if (currentPassword !== confirmationPassword) {
      setPasswordConfirmationState("negative");
      setPasswordConfirmationMessage("Konfirmasi password tidak sesuai");
      return false;
    }

    setPasswordConfirmationState("positive");
    setPasswordConfirmationMessage("");
    setIsPasswordConfirmationValid(true);
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

  const handlePasswordConfirmationChange = (text: string) => {
    setPasswordConfirmation(text);
    validatePasswordConfirmation(password, text);
  };

  const isRegisterEnabled = useMemo(
    () => () => {
      return isEmailValid && isPasswordValid && isPasswordConfirmationValid
        ? false
        : false;
    },
    [isEmailValid, isPasswordValid, isPasswordConfirmationValid],
  );

  const handleSubmit = () => {
    const isCurrentEmailValid = validateEmail(email);
    const isCurrentPasswordValid = validatePassword(password);
    const isCurrentPasswordConfirmationValid = validatePasswordConfirmation(
      password,
      passwordConfirmation,
    );

    if (
      isCurrentEmailValid &&
      isCurrentPasswordValid &&
      isCurrentPasswordConfirmationValid
    ) {
      setCurrentIndex(prev => prev + 1);
    }
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={{flex: 1}}>
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
          </View>
          <View style={{flex: 6, alignContent: "center", alignItems: "center"}}>
            <Image source={require("../assets/images/ic_investly.png")} />
          </View>
          <View style={{flex: 1, height: 32}}>
            {currentIndex === 1 && (
              <Button
                variant="link"
                size="small"
                onPress={() => navigation.navigate("Login")}>
                Masuk
              </Button>
            )}
          </View>
        </View>
        <Typography type="heading" size="large" style={styles.title}>
          Buat Akun
        </Typography>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <TextField
              label="Email"
              placeholder="Masukkan email kamu"
              state={emailState}
              message={emailMessage}
              value={email}
              onChangeText={handleEmailChange}
            />
            <TextField
              label="Password"
              placeholder="Masukkan password kamu"
              type="password"
              state={passwordState}
              message={passwordMessage}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TextField
              label="Konfirmasi Password"
              placeholder="Masukkan konfirmasi password"
              type="password"
              state={passwordConfirmationState}
              message={passworConfirmationdMessage}
              value={passwordConfirmation}
              onChangeText={handlePasswordConfirmationChange}
            />
          </View>
        </View>
        <View style={styles.bottomSection}>
          <ProgressBar current={currentIndex} total={3} height={4} />
          <Button
            variant="primary"
            size="large"
            onPress={handleSubmit}
            disabled={isRegisterEnabled()}>
            Selanjutnya
          </Button>
        </View>
        <CustomToast />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
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
    alignContent: "center",
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
    flex: 1,
    borderColor: COLORS.neutral100,
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    gap: 12,
  },
});
