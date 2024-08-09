import React, {useState} from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {SafeAreaView, View, StyleSheet, Pressable, Image} from "react-native";
import {COLORS} from "@constants/colors";
import {useAuth} from "@contexts/AuthContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Toast from "react-native-toast-message";
import analytics from "@react-native-firebase/analytics";
import notifee from "@notifee/react-native";
import {Icon, Typography} from "@components/atoms";
import {Button, CustomToast} from "@components/molecules";
import ProgressBar from "@components/molecules/ProgressBar";
import InvestlyServices, {CheckEmailResponse} from "@services/InvestlyServices";
import {setUserData} from "@utils/index";
import axios, {AxiosError} from "axios";

const Register: React.FC = () => {
  const navigation = useNavigation<NavigationProp<Pages>>();
  const [currentStep, setCurrentStep] = useState(1);
  const {setUser} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    username: "",
    selectedTopics: [] as string[],
  });

  const isNextEnabled = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.email && formData.password && formData.passwordConfirmation
        );
      case 2:
        return formData.name && formData.username;
      case 3:
        return formData.selectedTopics.length === 3;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      if (currentStep === 1) {
        analytics().logEvent("click_register_button_step_1", {
          email: formData.email,
        });
      } else if (currentStep === 2) {
        analytics().logEvent("click_register_button_step_2", {
          email: formData.email,
          name: formData.name,
          username: formData.username,
        });
      }
      setCurrentStep(prev => prev + 1);
    } else {
      await handleRegister();
    }
  };

  const registerUser = async (userData: any) => {
    const response = await InvestlyServices.register(userData);
    const {access_token, refresh_token} = response.data.data;
    return setUserData(access_token, refresh_token);
  };

  const handleRegister = async () => {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    analytics().logEvent("click_register_button_step_3", {
      email: formData.email,
      name: formData.name,
      username: formData.username,
      topic_id: formData.selectedTopics.join(","),
    });

    try {
      const userData = await registerUser(formData);
      setUser(userData);

      analytics().logEvent("success_register_account", {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        topic_id: formData.selectedTopics.join(","),
      });

      await notifee.requestPermission();
      await notifee.displayNotification({
        title: "Horrrayy!",
        body: "Daftar Berhasil!",
        android: {
          channelId,
          pressAction: {
            id: "default",
          },
        },
      });

      navigation.reset({
        index: 0,
        routes: [{name: "HomeTab", params: {isRegister: true}}],
      });
    } catch (err) {
      let errorMessage = "";

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<CheckEmailResponse>;
        errorMessage = axiosError.response?.data.messages || "Register gagal";
      } else {
        const otherError = err as Error;
        errorMessage = otherError?.message as string;
      }

      analytics().logEvent("failed_register_account", {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        topic_id: formData.selectedTopics.join(","),
        error_message: errorMessage,
      });

      Toast.show({
        type: "error",
        text1: errorMessage,
        text1Style: {color: COLORS.red600},
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        bottomOffset: 50,
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
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
          disabled={!isNextEnabled()}>
          {currentStep < 3 ? "Selanjutnya" : "Daftar"}
        </Button>
      </View>
    </SafeAreaView>
  );
};

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
  title: {
    color: COLORS.neutral700,
    justifyContent: "center",
    textAlign: "center",
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
});

export default Register;
