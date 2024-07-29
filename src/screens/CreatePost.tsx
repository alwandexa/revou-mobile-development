import React, {FunctionComponent, useState} from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import dayjs from "dayjs";

import {WithAuth, useAuth} from "@contexts/AuthContext";
import {Icon, Typography} from "@components/atoms";
import {FeedItem} from "@components/organism/Feed";
import {Button, TextField} from "@components/molecules";
import {COLORS} from "@constants/colors";
import {TypographySize, TypographyType} from "@components/atoms/Typography";

const CreatePost: FunctionComponent = () => {
  const {user} = useAuth();

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const getTypographyStyle = (
    typographyType: TypographyType,
    typographySize: TypographySize,
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

    navigation.navigate("Home" as never, feed as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              fill={COLORS.neutral400}
              height={20}
              width={20}
            />
          </Pressable>
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
          customStyle={styles.postButton}
          disabled={!(topic && title && description)}
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

export default WithAuth(CreatePost);

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
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  backButton: {borderWidth: 0},
  postButton: {minWidth: 59},
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
