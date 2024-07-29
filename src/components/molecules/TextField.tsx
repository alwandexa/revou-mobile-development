import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
  ViewStyle,
} from "react-native";

import {COLORS} from "@constants/colors";
import {Icon, Typography} from "@components/atoms";

export type TextFieldState =
  | "default"
  | "positive"
  | "negative"
  | "filled"
  | "focused";

type TextFieldProps = TextInputProps & {
  state?: TextFieldState;
  type?: "text" | "password";
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  message?: string;
  containerStyle?: ViewStyle;
};

const TextField = ({
  state = "default",
  type = "text",
  placeholder = "",
  disabled = false,
  label,
  message,
  containerStyle,
  ...rest
}: TextFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  const getLabelStyle = () => {
    if (disabled) {
      return labelStyles.disabled;
    }
    return labelStyles.enabled;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography type="heading" size="small" style={getLabelStyle()}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.textFieldContainer,
          stateStyles[currentState as keyof typeof stateStyles],
        ]}>
        <TextInput
          secureTextEntry={type === "password" && !isVisible}
          placeholder={placeholder}
          editable={!disabled}
          placeholderTextColor={COLORS.neutral400}
          onFocus={() => {
            if (!disabled) setCurrentState("focused");
          }}
          onBlur={() => {
            if (!disabled) setCurrentState(state);
          }}
          style={styles.textInput}
          {...rest}
        />
        {type === "password" && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? (
              <Icon
                name="eye-slash"
                width={16}
                height={16}
                fill={COLORS.neutral500}
              />
            ) : (
              <Icon
                name="eye"
                width={16}
                height={16}
                fill={COLORS.neutral500}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {currentState === "negative" && (
        <Typography
          type="paragraph"
          size="small"
          style={{color: COLORS.red500}}>
          {message || "Something wrong"}
        </Typography>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  textFieldContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  eyeButton: {
    minHeight: 44,
    minWidth: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
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
