import React, {FunctionComponent} from "react";
import {View, StyleSheet} from "react-native";
import Typography from "@components/atoms/Typography";
import ProtectedButton from "@components/molecules/ProtectedButton";
import Avatar from "../atoms/Avatar";
import {COLORS} from "@constants/colors";

export type FeedHeaderProps = {
  avatarUrl: string;
  name: string;
  headline: string;
  createdAt: string;
};

const FeedHeader: FunctionComponent<FeedHeaderProps> = ({
  avatarUrl,
  name,
  headline,
  createdAt,
}) => {
  return (
    <View style={styles.header}>
      <Avatar size="large" source={{uri: avatarUrl}} />
      <View style={styles.headerText}>
        <Typography type="heading" size="xsmall" style={styles.name}>
          {name}
        </Typography>
        <Typography type="paragraph" size="small">
          {headline}
        </Typography>
        <Typography type="paragraph" size="xsmall">
          {createdAt}
        </Typography>
      </View>
      <ProtectedButton
        icon="ellipsis"
        variant="outline"
        size="medium"
        style={styles.ellipsisButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {color: COLORS.neutral700},
  ellipsisButton: {
    borderWidth: 0,
    minWidth: 44,
    minHeight: 44,
    alignItems: "flex-end",
  },
});

export default FeedHeader;
