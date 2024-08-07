import {Icon, Typography} from "@components/atoms";
import {TypographySize, TypographyType} from "@components/atoms/Typography";
import {Button} from "@components/molecules";
import {COLORS} from "@constants/colors";
import {WithAuth, useAuth} from "@contexts/AuthContext";
import analytics from "@react-native-firebase/analytics";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import InvestlyServices, {
  CheckEmailResponse,
  Topic,
} from "@services/InvestlyServices";
import axios, {AxiosError} from "axios";
import React, {FunctionComponent, useEffect, useState} from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {Toast} from "react-native-toast-message/lib/src/Toast";

const CreatePost: FunctionComponent = () => {
  const {user} = useAuth();

  const email = "dummys";

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigation = useNavigation<NavigationProp<Pages>>();

  useEffect(() => {
    InvestlyServices.getTopics()
      .then(response => {
        setTopics(
          response.data.data.map((topicData: Topic) => ({
            label: topicData.label,
            value: topicData.id,
          })),
        );
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

  const handlePost = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("content", description);
    data.append("header", title);
    data.append("is_anonim", "false");
    data.append("topic_id", topic);

    await InvestlyServices.createPost(data)
      .then(_ => {
        setLoading(false);
        navigation.navigate("HomeTab");
        analytics().logEvent("success_create_post", {
          username: user,
          email: email,
        });
      })
      .catch(error => {
        let errorMessage = "";
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<CheckEmailResponse>;
          errorMessage = axiosError.response?.data.messages || "Error api";
        } else {
          errorMessage = error.message;
        }
        Toast.show({
          type: "error",
          text1: errorMessage,
          text1Style: {color: COLORS.red600},
          visibilityTime: 3000,
          autoHide: true,
          position: "bottom",
          bottomOffset: 50,
        });
        analytics().logEvent("failed_create_post", {
          username: user,
          email: email,
          error_message: error.response.data.message,
        });
      })
      .finally(() => setLoading(false));
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
          disabled={!(topic && title && description) || loading}
          onPress={handlePost}>
          {loading ? <ActivityIndicator color={COLORS.neutral100} /> : "Post"}
        </Button>
      </View>

      <View style={styles.contentHolder}>
        <DropDownPicker
          open={dropdownOpen}
          value={topic}
          items={topics}
          setOpen={setDropdownOpen}
          setValue={setTopic}
          placeholder="Select a topic"
          style={getTypographyStyle("heading", "xlarge")}
          dropDownContainerStyle={{borderColor: COLORS.neutral300}}
        />
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
