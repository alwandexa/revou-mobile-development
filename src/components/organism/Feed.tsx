import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";

import {COLORS} from "../../constants/colors";
import Typography from "../atoms/Typography";
import Avatar from "../molecules/Avatar";
import Button from "../molecules/Button";
import Label from "../molecules/Label";

export const feed = useCallback(
  ({item}: any) => (
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
              {new Date(item.created_at).toLocaleString()}
            </Typography>
          </View>
          <Button
            icon="ellipsis"
            variant="outline"
            size="medium"
            style={styles.ellipsisButton}
            textStyle={styles.ellipsisButtonText}
          />
        </View>
      </View>
      <View style={styles.postContent}>
        <Typography type="heading" size="medium" style={styles.postHeader}>
          {item.post_header}
        </Typography>
        <Typography type="paragraph" size="medium">
          {item.post_content}
        </Typography>
      </View>
      <View style={styles.footer}>
        <Label variant="tertiary" color="green">
          {item.post_topic}
        </Label>
      </View>
      <View style={styles.footerActions}>
        <View style={[styles.actionButton, styles.groupActionButton]}>
          <Button
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
          </Button>
          <View style={styles.divider} />
          <Button
            variant="link"
            size="medium"
            icon="arrow-down"
            style={styles.downvoteButton}
            textStyle={styles.actionButtonText}
          />
        </View>
        <Button
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
        </Button>
        <Button
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
        </Button>
      </View>
    </View>
  ),
  [],
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
  ellipsisButton: {borderWidth: 0},
  ellipsisButtonText: {color: COLORS.neutral400},
  postContent: {gap: 4},
  postHeader: {color: COLORS.neutral700},
  actionButtonText: {color: COLORS.neutral700},
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
});
