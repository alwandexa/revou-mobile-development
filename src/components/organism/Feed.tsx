import {Avatar, Typography} from "@components/atoms";
import {Label, ProtectedButton} from "@components/molecules";
import FeedContent from "@components/molecules/FeedContent";
import {COLORS} from "@constants/colors";
import analytics from "@react-native-firebase/analytics";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import InvestlyServices, {CheckEmailResponse} from "@services/InvestlyServices";
import axios, {AxiosError} from "axios";
import React, {memo, useCallback} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Toast} from "react-native-toast-message/lib/src/Toast";

export type FeedItem = {
  id: string;
  header: string;
  content: string;
  attachments: string[];
  created_at: string;
  is_upvoted: boolean;
  is_downvoted: boolean;
  is_reposted: boolean;
  total_comments: number;
  upvotes: number;
  reposts: number;
  time: string;
  topic: {
    id: string;
    label: string;
  };
  user: {
    user_id: string;
    name: string;
    username: string;
    profile_path: string | null;
    bio: string;
    headline: string;
  };
};

const Feed = memo(({item}: {item: FeedItem}) => {
  const navigation = useNavigation<NavigationProp<Pages>>();
  // const [globalState, dispatch] = useGlobalState();

  const handleFeedContentClicked = useCallback(() => {
    navigation.navigate("Post", {id: item.id});
  }, [navigation, item]);

  const handleUpvote = async () => {
    // dispatch({type: "INCREMENT_UPVOTE", payload: item.id});

    try {
      const response = await InvestlyServices.setPostUpvote({id: item.id});
      Toast.show({
        type: "success",
        // text1: JSON.stringify(response),
        text1: response.data.messages,
        // text1Style: {color: COLORS.purple600},
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        bottomOffset: 0,
      });
      analytics().logEvent("click_upvote", {
        username: item.user.username,
        post_id: item.id,
      });
    } catch (err) {
      // dispatch({type: "DECREMENT_UPVOTE", payload: item.id});
      let errorMessage = "";
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<CheckEmailResponse>;
        errorMessage = axiosError.response?.data.messages || "Register gagal";
      } else {
        errorMessage = err?.message;
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
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.postContainer}
        onPress={handleFeedContentClicked}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar
              size="large"
              source={{uri: item?.user.profile_path || ""}}
            />
            <View style={styles.headerText}>
              <Typography type="heading" size="xsmall" style={styles.name}>
                {item.user.name}
              </Typography>
              <Typography type="paragraph" size="small">
                {item.user.headline}
              </Typography>
              <Typography type="paragraph" size="xsmall">
                {item.time}
              </Typography>
            </View>
            <View>
              <ProtectedButton
                icon="ellipsis"
                variant="outline"
                size="medium"
                style={styles.ellipsisButton}
                textStyle={styles.ellipsisButtonText}
              />
            </View>
          </View>
        </View>
        <FeedContent post_header={item.header} post_content={item.content} />
        <View style={styles.footer}>
          <Label variant="tertiary" color="green">
            {item.topic.label}
          </Label>
        </View>
        <View style={styles.footerActions}>
          <View style={[styles.actionButton, styles.groupActionButton]}>
            <ProtectedButton
              variant="link"
              size="medium"
              icon="arrow-up"
              textStyle={styles.actionButtonText}
              onPress={handleUpvote}>
              <Typography
                type="paragraph"
                size="small"
                style={styles.actionButtonText}>
                {item.upvotes}
              </Typography>
            </ProtectedButton>
            <View style={styles.divider} />
            <ProtectedButton
              variant="link"
              size="medium"
              icon="arrow-down"
              textStyle={styles.actionButtonText}>
              {" "}
            </ProtectedButton>
          </View>
          <ProtectedButton
            variant="link"
            size="medium"
            icon="comment"
            style={styles.actionButton}
            textStyle={styles.actionButtonText}>
            <Typography
              type="paragraph"
              size="small"
              style={styles.actionButtonText}>
              {item.total_comments}
            </Typography>
          </ProtectedButton>
          <ProtectedButton
            variant="link"
            size="medium"
            icon="retweet"
            style={styles.actionButton}
            textStyle={styles.actionButtonText}>
            <Typography
              type="paragraph"
              size="small"
              style={styles.actionButtonText}>
              {item.reposts}
            </Typography>
          </ProtectedButton>
        </View>
      </TouchableOpacity>
    </>
  );
});

export default Feed;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: COLORS.neutral100,
    padding: 16,
    gap: 12,
    marginTop: 1,
  },
  header: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 12,
  },
  headerContent: {
    flexDirection: "row",
    flex: 2,
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 36,
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: COLORS.neutral200,
    borderRadius: 96,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    alignItems: "center",
    gap: 12,
  },
  groupActionButton: {
    justifyContent: "space-around",
  },
  name: {color: COLORS.neutral700},
  ellipsisButton: {
    borderWidth: 0,
    minWidth: 44,
    minHeight: 44,
    alignItems: "flex-end",
  },
  ellipsisButtonText: {color: COLORS.neutral400},
  postContent: {gap: 4},
  postHeader: {color: COLORS.neutral700},
  actionButtonText: {
    color: COLORS.neutral700,
    lineHeight: 15,
  },
  downvoteButton: {width: 16},
  divider: {
    height: 16,
    borderRightWidth: 1,
    borderColor: COLORS.neutral400,
  },
  footerText: {color: COLORS.neutral500},
  listFooter: {
    gap: 24,
    marginVertical: 24,
    alignItems: "center",
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreText: {
    color: COLORS.neutral500,
  },
});
