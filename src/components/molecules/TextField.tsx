import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";
import Label from "./Label";

type TextFieldProps = {
  state?: "default" | "positive" | "negative" | "focused" | "filled";
  type?: "text" | "password";
  visible?: boolean;
  label?: string;
  placeholder?: string;
  message?: string;
};

const TextField = ({
  state = "default",
  type = "text",
  placeholder = "Placeholder",
  label,
  message,
}: TextFieldProps) => {
  return (
    <View style={styles.container}>
      {label ? (
        <Typography
          type="heading"
          size="small"
          style={{color: COLORS.neutral700}}>
          {label}
        </Typography>
      ) : (
        ""
      )}
      <TextInput
        style={[
          styles.textField,
          stateStyles[state as keyof typeof stateStyles],
        ]}
      />
      {state === "negative" ? (
        <Typography
          type="paragraph"
          size="small"
          style={{color: COLORS.red500}}>
          {message || "Something wrong"}
        </Typography>
      ) : (
        ""
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {},
  textField: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
  },
});

const stateStyles = StyleSheet.create({
  default: {
    backgroundColor: COLORS.neutral200,
    borderColor: COLORS.neutral300,
  },
  positive: {
    backgroundColor: COLORS.green100,
    borderColor: COLORS.green500,
  },
  negative: {
    backgroundColor: COLORS.red100,
    borderColor: COLORS.red500,
  },
  focused: {
    backgroundColor: COLORS.purple100,
    borderColor: COLORS.purple500,
  },
  disabled: {
    backgroundColor: COLORS.neutral200,
    borderColor: COLORS.neutral300,
  },
});
