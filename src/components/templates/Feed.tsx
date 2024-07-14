import React, {memo, useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

import {COLORS} from "../../constants/colors";
import {formatRelativeTime} from "../../utils";
import Typography from "../atoms/Typography";
import Avatar from "../molecules/Avatar";
import Label from "../molecules/Label";
import ProtectedButton from "../molecules/ProtectedButton";
import WithAuthInteraction from "../hoc/WithAuthInteraction";
import {useAuth} from "../../contexts/AuthContext";

export type FeedItem = {
  avatar_url: string;
  name: string;
  headline: string;
  created_at: string;
  post_header: string;
  post_content: string;
  post_topic: string;
  post_upvote: number;
  post_downvote: number;
  post_comment: number;
  post_retweet: number;
};

const MAX_CONTENT_LENGTH = 120;

const FeedContent = WithAuthInteraction(
  ({item, ...props}: {item: FeedItem}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const shouldShowReadMore = item.post_content.length > MAX_CONTENT_LENGTH;
    const displayContent = expanded
      ? item.post_content
      : item.post_content.slice(0, MAX_CONTENT_LENGTH) + "...";

    return (
      <TouchableOpacity style={styles.postContent} {...props}>
        <Typography type="heading" size="medium" style={styles.postHeader}>
          {item.post_header}
        </Typography>
        <Typography
          type="paragraph"
          size="medium"
          style={{color: COLORS.neutral700}}>
          {displayContent}
        </Typography>
        {shouldShowReadMore && (
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.readMoreButton}>
            <Typography
              type="paragraph"
              size="medium"
              style={styles.readMoreText}>
              {expanded ? "Baca Lebih Sedikit" : "Baca Lebih Lanjut"}
            </Typography>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  },
);

export const Feed = memo(
  ({item}: {item: FeedItem}) => {
    const {setSelectedItem} = useAuth();
    const navigation = useNavigation();

    const handleFeedContentClicked = (item: FeedItem) => {
      setSelectedItem(item);
      // @ts-ignore
      navigation.navigate("Post");
    };

    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar size="large" source={{uri: item.avatar_url}} />
            <View style={styles.headerText}>
              <Typography type="heading" size="xsmall" style={styles.name}>
                {item.name}
              </Typography>
              <Typography type="paragraph" size="small">
                {item.headline}
              </Typography>
              <Typography type="paragraph" size="xsmall">
                {formatRelativeTime(item.created_at)}
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
        <FeedContent
          item={item}
          onPress={() => handleFeedContentClicked(item)}
        />
        <View style={styles.footer}>
          <Label variant="tertiary" color="green">
            {item.post_topic}
          </Label>
        </View>
        <View style={styles.footerActions}>
          <View style={[styles.actionButton, styles.groupActionButton]}>
            <ProtectedButton
              variant="link"
              size="medium"
              icon="arrow-up"
              textStyle={styles.actionButtonText}>
              <Typography
                type="paragraph"
                size="small"
                style={styles.actionButtonText}>
                {item.post_upvote}
              </Typography>
            </ProtectedButton>
            <View style={styles.divider} />
            <ProtectedButton
              variant="link"
              size="medium"
              icon="arrow-down"
              style={styles.downvoteButton}
              textStyle={styles.actionButtonText}
            />
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
              {item.post_comment}
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
              {item.post_retweet}
            </Typography>
          </ProtectedButton>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => prevProps.item === nextProps.item,
);

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: COLORS.neutral100,
    padding: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
