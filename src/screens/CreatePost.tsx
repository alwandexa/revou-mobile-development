import React, {FunctionComponent, useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import dayjs from "dayjs";

import Typography from "../components/atoms/Typography";
import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import {COLORS} from "../constants/colors";
import {FeedItem} from "../components/organism/Feed";
import {useAuth} from "../contexts/AuthContext";

const CreatePost: FunctionComponent = () => {
  const {user} = useAuth();

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

  const handlePost = () => {
    const feed: FeedItem = {
      avatar_url:
        "https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png",
      name: user as string,
      headline: "Mobile Engineer Expert",
      created_at: dayjs().toISOString(),
      post_header: topic,
      post_content: description,
      post_topic: topic,
      post_upvote: 0,
      post_downvote: 0,
      post_comment: 0,
      post_retweet: 0,
    };

    navigation.navigate("Terbaru" as never, feed as never);
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
          disabled={topic && title && description ? false : true}
          onPress={handlePost}>
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
