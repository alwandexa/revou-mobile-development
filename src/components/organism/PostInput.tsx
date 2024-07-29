import React, {FunctionComponent} from "react";
import {NavigationProp} from "@react-navigation/native";
import {StyleSheet, View} from "react-native";
import {ProtectedButton, ProtectedTextField} from "@components/molecules";
import {COLORS} from "@constants/colors";
import {Avatar} from "@components/atoms";

export type PostInputSectionProps = {
  avatar: string;
  navigation: NavigationProp<Pages>;
  onPress: () => void;
};

const PostInput: FunctionComponent<PostInputSectionProps> = ({
  avatar,
  navigation,
  onPress,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.inputRow}>
      <Avatar source={{uri: avatar}} size="large" />
      <ProtectedTextField
        placeholder="Apa yang ingin kamu tanyakan?"
        containerStyle={styles.textFieldContainer}
        onPress={() => navigation.navigate("CreatePost")}
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
      <View style={styles.postButton}>
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
}) => <View style={styles.sectionSeparator}>{children}</View>;

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
  textFieldContainer: {flex: 1},
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
  postButton: {
    flex: 2,
    height: 20,
    justifyContent: "center",
  },
  sectionSeparator: {
    flex: 2,
    height: 20,
    borderRightWidth: 1,
    borderColor: COLORS.neutral300,
    justifyContent: "center",
  },
});
