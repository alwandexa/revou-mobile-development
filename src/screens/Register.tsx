import {NavigationProp, useNavigation} from "@react-navigation/native";
import React, {FunctionComponent, useEffect, useMemo, useState} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import {Icon, Typography} from "@components/atoms";
import {Button, CustomToast} from "@components/molecules";
import TextField, {TextFieldState} from "@components/molecules/TextField";
import {COLORS} from "@constants/colors";
import ProgressBar from "@components/molecules/ProgressBar";
import InvestlyServices, {CheckEmailResponse} from "@services/InvestlyServices";
import axios, {AxiosError} from "axios";

interface Topic {
  id: string;
  file: {
    name_display: string;
    full_path: string;
    size: number;
    mime_type: string;
  };
  label: string;
}

const Register: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<Pages>>();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 states
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
  const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
    useState("");
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] =
    useState(false);

  // Step 2 states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // Step 3 states
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentStep === 3) {
      fetchTopics();
    }
  }, [currentStep]);

  const fetchTopics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await InvestlyServices.getTopics();
      if (response.data.status) {
        setTopics(response.data.data);
      } else {
        setError("Failed to fetch topics");
      }
    } catch (err) {
      setError("An error occurred while fetching topics");
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = async (currentEmail: string) => {
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

    try {
      const checkEmailRequest = {email: currentEmail};
      const response = await InvestlyServices.checkEmail(checkEmailRequest);

      if (response.data.status) {
        setEmailState("positive");
        setEmailMessage("");
        setIsEmailValid(true);
      }
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<CheckEmailResponse>;
        setEmailState("negative");
        setEmailMessage(
          axiosError.response?.data.messages || "Email sudah digunakan",
        );
      } else {
        console.error("Unexpected error:", err);
        setEmailState("negative");
        setEmailMessage("Terjadi kesalahan yang tidak terduga");
      }
      setIsEmailValid(false);
      return false;
    }
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

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handleTopicSelection = (topic: string) => {
    setSelectedTopics(prevTopics => {
      if (prevTopics.includes(topic)) {
        return prevTopics.filter(t => t !== topic);
      } else if (prevTopics.length < 3) {
        return [...prevTopics, topic];
      }
      return prevTopics;
    });
  };

  const isNextEnabled = useMemo(() => {
    switch (currentStep) {
      case 1:
        return isEmailValid && isPasswordValid && isPasswordConfirmationValid;
      case 2:
        return name.trim() !== "" && username.trim() !== "";
      case 3:
        return selectedTopics.length === 3;
      default:
        return false;
    }
  }, [
    currentStep,
    isEmailValid,
    isPasswordValid,
    isPasswordConfirmationValid,
    name,
    username,
    selectedTopics,
  ]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log("Registration complete");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
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
              message={passwordConfirmationMessage}
              value={passwordConfirmation}
              onChangeText={handlePasswordConfirmationChange}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.formContainer}>
            <TextField
              label="Nama"
              placeholder="Nama"
              value={name}
              onChangeText={handleNameChange}
            />
            <TextField
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={handleUsernameChange}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.topicContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : error ? (
              <Typography type="special" size="large">
                {error}
              </Typography>
            ) : (
              <FlatList
                data={topics}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={({item}) => (
                  <View style={styles.topicCard}>
                    <Pressable
                      style={[
                        styles.topic,
                        selectedTopics.includes(item.id) &&
                          styles.selectedTopic,
                      ]}
                      onPress={() => handleTopicSelection(item.id)}>
                      <Image
                        source={{uri: item.file.full_path}}
                        style={[
                          styles.topicImage,
                          selectedTopics.includes(item.id) &&
                            styles.selectedImage,
                        ]}
                      />
                    </Pressable>
                    <Typography
                      type="heading"
                      size="xsmall"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.topicLabel}>
                      {item.label}
                    </Typography>
                  </View>
                )}
              />
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.leftContainer}>
            <Pressable
              style={styles.backButton}
              onPress={() =>
                currentStep > 1
                  ? setCurrentStep(prev => prev - 1)
                  : navigation.goBack()
              }>
              <Icon
                name="chevron-left"
                fill={COLORS.neutral400}
                height={20}
                width={20}
              />
            </Pressable>
          </View>
          <View style={styles.middleContainer}>
            {currentStep !== 2 && (
              <Image source={require("../assets/images/ic_investly.png")} />
            )}
          </View>
          <View style={styles.rightContainer}>
            {currentStep === 1 && (
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
          {currentStep === 1
            ? "Buat Akun"
            : currentStep === 2
              ? "Tambahkan Nama & Username"
              : "Pilih 3 Topik Favorit"}
        </Typography>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.contentContainer}>{renderStep()}</View>
        <CustomToast />
      </View>
      <View style={styles.bottomSection}>
        <ProgressBar current={currentStep} total={3} height={4} />
        <Button
          variant="primary"
          size="large"
          onPress={handleNext}
          disabled={isNextEnabled}>
          {currentStep < 3 ? "Selanjutnya" : "Daftar"}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  headerContainer: {
    gap: 24,
    padding: 20,
  },
  leftContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 6,
    alignContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    height: 32,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    gap: 24,
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
    paddingTop: 8,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  topicContainer: {
    gap: 1,
    rowGap: 16,
    columnGap: 10,
  },
  topicCard: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    gap: 4,
    minHeight: 120,
    maxHeight: 140,
    marginTop: 16,
  },
  topic: {
    borderWidth: 4,
    borderColor: COLORS.neutral100,
  },
  topicLabel: {
    textAlign: "center",
    width: 97.33,
  },
  selectedTopic: {
    borderColor: COLORS.purple500,
    borderWidth: 4,
    borderRadius: 8,
  },
  topicImage: {
    borderRadius: 8,
    width: 97.33,
    height: 96,
  },
  selectedImage: {
    borderRadius: 0,
  },
});
