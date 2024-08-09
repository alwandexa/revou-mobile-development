import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {TextField} from "@components/molecules";
import {TextFieldState} from "@components/molecules/TextField";
import {validateName, validateUsername} from "@utils/index";

interface Step2Props {
  formData: {
    name: string;
    username: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Step2: React.FC<Step2Props> = ({formData, setFormData}) => {
  const [nameState, setNameState] = useState<TextFieldState>("default");
  const [nameMessage, setNameMessage] = useState("");
  const [usernameState, setUsernameState] = useState<TextFieldState>("default");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [isUsernameLoading, setIsUsernameLoading] = useState(false);

  const handleNameChange = (text: string) => {
    setFormData(prev => ({...prev, name: text}));
    const {isValid, message} = validateName(text);
    setNameState(isValid ? "positive" : "negative");
    setNameMessage(message);
  };

  const handleUsernameChange = async (text: string) => {
    setFormData(prev => ({...prev, username: text}));
    setIsUsernameLoading(true);
    const {isValid, message} = await validateUsername(text);
    setIsUsernameLoading(false);
    setUsernameState(isValid ? "positive" : "negative");
    setUsernameMessage(message);
  };

  return (
    <View style={styles.formContainer}>
      <TextField
        label="Nama"
        placeholder="Nama"
        value={formData.name}
        onChangeText={handleNameChange}
        state={nameState}
        message={nameMessage}
      />
      <TextField
        label="Username"
        placeholder="Username"
        value={formData.username}
        onChangeText={handleUsernameChange}
        state={usernameState}
        message={usernameMessage}
        loading={isUsernameLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 24,
  },
});

export default Step2;
