import React, {useState} from "react";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";

import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";
import Eye from "../atoms/icon/Eye";
import EyeSlash from "../atoms/icon/EyeSlash";

type TextFieldProps = {
  state?: "default" | "positive" | "negative" | "filled" | "focused";
  type?: "text" | "password";
  placeholder?: string;
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
  const [componentState, setComponentState] = useState(state);
  const [isVisible, setIsVisible] = useState(false);

  const getLabelStyle = () => {
    if (disabled) {
      return labelStyles.disabled;
    }

    return labelStyles.enabled;
  };

  return (
    <View style={styles.container}>
      {label && (
        <Typography type="heading" size="small" style={getLabelStyle()}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.textFieldContainer,
          stateStyles[componentState as keyof typeof stateStyles],
        ]}>
        <TextInput
          secureTextEntry={type === "password" && !isVisible}
          placeholder={placeholder}
          editable={!disabled}
          placeholderTextColor={COLORS.neutral400}
          onFocus={() => {
            setComponentState("focused");
          }}
          onBlur={() => {
            setComponentState("default");
          }}
          style={styles.textInput}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? (
              <EyeSlash width={16} height={16} fill={COLORS.neutral700} />
            ) : (
              <Eye width={16} height={16} fill={COLORS.neutral700} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {componentState === "negative" ? (
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
  textFieldContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    paddingVertical: 0,
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
