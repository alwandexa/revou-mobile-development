import React, {FunctionComponent, useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Typography from "../components/atoms/Typography";
import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import {COLORS} from "../constants/colors";

const CreatePost: FunctionComponent = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const getTypographyStyle = (
    typographyType: any,
    typographySize: any,
  ): TextStyle => {
    const typographyStyle = Typography({
      type: typographyType,
      size: typographySize,
      children: null,
    }).props.style;

    return typographyStyle as TextStyle;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: "row", alignItems: "center", gap: 24}}>
          <Button
            variant="outline"
            style={{borderWidth: 0}}
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <Typography
            type="heading"
            size="medium"
            style={{color: COLORS.neutral700}}>
            Buat
          </Typography>
        </View>
        <Button
          variant="primary"
          size="small"
          customStyle={{minWidth: 59}}
          disabled={topic && title && description ? false : true}>
          Post
        </Button>
      </View>

      <View style={styles.contentHolder}>
        <TextField placeholder="Topic" value={topic} onChangeText={setTopic} />
        <TextInput
          placeholder="Judul"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={COLORS.neutral400}
          style={getTypographyStyle("heading", "xlarge")}
        />
        <TextInput
          placeholder="Deskripsi"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={COLORS.neutral400}
          style={getTypographyStyle("paragraph", "medium")}
          multiline
        />
      </View>

      <View style={styles.buttonHolder}>
        <Button
          variant="outline"
          style={styles.iconButton}
          size="large"
          icon="paper-clip"
          textStyle={{color: COLORS.neutral600}}
        />
        <Button
          variant="outline"
          style={styles.iconButton}
          size="large"
          icon="image"
          textStyle={{color: COLORS.neutral600}}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  contentHolder: {
    flex: 1,
    gap: 24,
    padding: 16,
  },
  buttonHolder: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
  },
  iconButton: {
    borderWidth: 0,
    padding: 8,
  },
});
