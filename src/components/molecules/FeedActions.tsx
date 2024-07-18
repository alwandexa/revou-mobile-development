import React, {FunctionComponent} from "react";
import {StyleSheet, View} from "react-native";

import Typography from "@components/atoms/Typography";
import ProtectedButton from "@components/molecules/ProtectedButton";
import {COLORS} from "@constants/colors";

export type FeedActionsProps = {
  upvotes: number;
  comments: number;
  retweets: number;
};

const FeedActions: FunctionComponent<FeedActionsProps> = ({
  upvotes,
  comments,
  retweets,
}) => {
  return (
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
            {upvotes}
          </Typography>
        </ProtectedButton>
        <View style={styles.divider} />
        <ProtectedButton
          variant="link"
          size="medium"
          icon="arrow-down"
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
          {comments}
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
          {retweets}
        </Typography>
      </ProtectedButton>
    </View>
  );
};

const styles = StyleSheet.create({
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
  actionButtonText: {
    color: COLORS.neutral700,
    lineHeight: 15,
  },
  divider: {
    height: 16,
    borderRightWidth: 1,
    borderColor: COLORS.neutral400,
  },
});

export default FeedActions;
