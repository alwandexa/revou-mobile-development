import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";
import Label from "./Label";

type TextFieldProps = {
  state?: "default" | "positive" | "negative" | "focused" | "filled";
  type?: "text" | "password";
  placeholder?: string;
  visible?: boolean;
  disabled?: boolean;
  label?: string;
  message?: string;
};

const TextField = ({
  state = "default",
  type = "text",
  placeholder = "",
  disabled = false,
  label,
  message,
}: TextFieldProps) => {
  const getLabelStyle = () => {
    if (disabled) {
      console.log("disabled");
      return labelStyles.disabled;
    }

    return labelStyles.enabled;
  };

  return (
    <View style={styles.container}>
      {label ? (
        <Typography type="heading" size="small" style={getLabelStyle()}>
          {label}
        </Typography>
      ) : (
        ""
      )}
      <TextInput
        placeholder={placeholder}
        editable={!disabled}
        placeholderTextColor={COLORS.neutral400}
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
  container: {
    gap: 8,
  },
  textField: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    height: 40,
    fontFamily: "Inter-Regular",
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

const labelStyles = StyleSheet.create({
  disabled: {
    color: COLORS.neutral400,
  },
  enabled: {
    color: COLORS.neutral700,
  },
});
