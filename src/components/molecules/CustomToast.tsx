import React from "react";
import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

import {COLORS} from "@constants/colors";

interface ToastStyles {
  borderLeftColor: string;
  backgroundColor: string;
}

const baseStyles: ToastStyles = {
  borderLeftColor: COLORS.green600,
  backgroundColor: COLORS.neutral100,
};

const textStyles = {
  fontSize: 14,
  fontWeight: "400",
  color: COLORS.neutral100,
};

const toastConfig: ToastConfig = {
  success: ({text1, text2, ...props}) => (
    <BaseToast
      {...props}
      style={baseStyles as ViewStyle}
      contentContainerStyle={styles.contentContainer}
      text1Style={textStyles as TextStyle}
      text2Style={
        {...textStyles, fontSize: 13, color: COLORS.neutral600} as TextStyle
      }
      text1={text1}
      text2={text2}
    />
  ),
  error: ({text1, text2, ...props}) => (
    <ErrorToast
      {...props}
      style={
        {
          ...baseStyles,
          backgroundColor: COLORS.red600,
          borderLeftColor: COLORS.red600,
        } as ViewStyle
      }
      text1Style={textStyles as TextStyle}
      text2Style={
        {...textStyles, fontSize: 13, color: COLORS.neutral600} as TextStyle
      }
      text1={text1}
      text2={text2}
    />
  ),
};

const CustomToast: React.FC = () => {
  return <Toast config={toastConfig} position="bottom" bottomOffset={40} />;
};

export default CustomToast;

const styles = StyleSheet.create({
  contentContainer: {paddingHorizontal: 15},
});
