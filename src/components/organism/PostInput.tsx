import React, {FunctionComponent} from "react";
import {NavigationProp} from "@react-navigation/native";
import {StyleSheet, View} from "react-native";

import {COLORS} from "../../constants/colors";
import Avatar from "../molecules/Avatar";
import ProtectedButton from "../molecules/ProtectedButton";
import ProtectedTextField from "../molecules/ProtectedTextField";

export type PostInputSectionProps = {
  avatar: string;
  navigation: NavigationProp<any>;
  onPress: () => void;
};

const PostInput: FunctionComponent<PostInputSectionProps> = ({
  avatar,
  navigation,
  onPress,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.inputRow}>
      <Avatar source={{uri: avatar}} />
      <ProtectedTextField
        placeholder="Apa yang ingin kamu tanyakan?"
        containerStyle={{flex: 1}}
        onPress={() => navigation.navigate("Post")}
      />
    </View>
    <View style={styles.buttonRow}>
      <SectionSeparator>
        <ProtectedButton
          icon="question-circle"
          iconColor={COLORS.yellow600}
          textStyle={{color: COLORS.neutral700}}
          size="small"
          variant="link">
          Pertanyaan
        </ProtectedButton>
      </SectionSeparator>
      <View style={{flex: 2, height: 20, justifyContent: "center"}}>
        <ProtectedButton
          icon="plus"
          iconColor={COLORS.green600}
          textStyle={{color: COLORS.neutral700}}
          size="small"
          variant="link"
          onPress={onPress}>
          Post
        </ProtectedButton>
      </View>
    </View>
  </View>
);

const SectionSeparator: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => (
  <View
    style={{
      flex: 2,
      height: 20,
      borderRightWidth: 1,
      borderColor: COLORS.neutral300,
      justifyContent: "center",
    }}>
    {children}
  </View>
);

export default PostInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.neutral100,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 16,
  },
  inputRow: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  separator: {
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    height: 20,
    flex: 1,
  },
});
