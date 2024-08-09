import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {TextField} from "@components/molecules";
import {TextFieldState} from "@components/molecules/TextField";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "@utils/index";

interface Step1Props {
  formData: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Step1: React.FC<Step1Props> = ({formData, setFormData}) => {
  const [emailState, setEmailState] = useState<TextFieldState>("default");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [passwordState, setPasswordState] = useState<TextFieldState>("default");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordConfirmationState, setPasswordConfirmationState] =
    useState<TextFieldState>("default");
  const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
    useState("");

  const handleEmailChange = async (text: string) => {
    const trimmedEmail = text.toLowerCase().trim();
    setFormData(prev => ({...prev, email: trimmedEmail}));
    setIsEmailLoading(true);
    const {isValid, message} = await validateEmail(trimmedEmail);
    setIsEmailLoading(false);
    setEmailState(isValid ? "positive" : "negative");
    setEmailMessage(message);
  };

  const handlePasswordChange = (text: string) => {
    setFormData(prev => ({...prev, password: text}));
    const {isValid, message} = validatePassword(text);
    setPasswordState(isValid ? "positive" : "negative");
    setPasswordMessage(message);
  };

  const handlePasswordConfirmationChange = (text: string) => {
    setFormData(prev => ({...prev, passwordConfirmation: text}));
    const {isValid, message} = validatePasswordConfirmation(
      formData.password,
      text,
    );
    setPasswordConfirmationState(isValid ? "positive" : "negative");
    setPasswordConfirmationMessage(message);
  };

  return (
    <View style={styles.formContainer}>
      <TextField
        label="Email"
        placeholder="Masukkan email kamu"
        state={emailState}
        message={emailMessage}
        value={formData.email}
        onChangeText={handleEmailChange}
        loading={isEmailLoading}
      />
      <TextField
        label="Password"
        placeholder="Masukkan password kamu"
        type="password"
        state={passwordState}
        message={passwordMessage}
        value={formData.password}
        onChangeText={handlePasswordChange}
      />
      <TextField
        label="Konfirmasi Password"
        placeholder="Masukkan konfirmasi password"
        type="password"
        state={passwordConfirmationState}
        message={passwordConfirmationMessage}
        value={formData.passwordConfirmation}
        onChangeText={handlePasswordConfirmationChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 24,
  },
});

export default Step1;
