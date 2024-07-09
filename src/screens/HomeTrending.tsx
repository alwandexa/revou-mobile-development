import React from "react";
import {FlatList, StyleSheet, View} from "react-native";

import Typography from "../components/atoms/Typography";
import Avatar from "../components/molecules/Avatar";
import Button from "../components/molecules/Button";
import Label from "../components/molecules/Label";
import {COLORS} from "../constants/colors";

const feedData = [
  {
    avatar_url: "https://example.com/avatar1.png",
    name: "Tilamuta",
    headline: "Financial Enthusiast",
    created_at: "2023-07-08T12:00:00Z",
    post_header: "Buat yang pegang GoTo",
    post_content: "Mau beli milikta pake 5 lembar GoTo 😢",
    post_topic: "Investasi",
    post_upvote: 0,
    post_downvote: 0,
    post_comment: 0,
    post_retweet: 2,
  },
  {
    avatar_url: "https://example.com/avatar2.png",
    name: "Aldo",
    headline: "Software Engineer",
    created_at: "2023-07-08T12:00:00Z",
    post_header: "Sektor terbaik",
    post_content:
      "Gaes, menurut kalian sektor mana yang paling aman untuk kondisi saat ini?",
    post_topic: "Sector Update",
    post_upvote: 0,
    post_downvote: 0,
    post_comment: 0,
    post_retweet: 2,
  },
  {
    avatar_url: "https://example.com/avatar2.png",
    name: "Aldo",
    headline: "Software Engineer",
    created_at: "2023-07-08T12:00:00Z",
    post_header: "Sektor terbaik",
    post_content:
      "Gaes, menurut kalian sektor mana yang paling aman untuk kondisi saat ini?",
    post_topic: "Sector Update",
    post_upvote: 0,
    post_downvote: 0,
    post_comment: 0,
    post_retweet: 2,
  },
  {
    avatar_url: "https://example.com/avatar2.png",
    name: "Aldo",
    headline: "Software Engineer",
    created_at: "2023-07-08T12:00:00Z",
    post_header: "Sektor terbaik",
    post_content:
      "Gaes, menurut kalian sektor mana yang paling aman untuk kondisi saat ini?",
    post_topic: "Sector Update",
    post_upvote: 0,
    post_downvote: 0,
    post_comment: 0,
    post_retweet: 2,
  },
  {
    avatar_url: "https://example.com/avatar2.png",
    name: "Aldo",
    headline: "Software Engineer",
    created_at: "2023-07-08T12:00:00Z",
    post_header: "Sektor terbaik",
    post_content:
      "Gaes, menurut kalian sektor mana yang paling aman untuk kondisi saat ini?",
    post_topic: "Sector Update",
    post_upvote: 0,
    post_downvote: 0,
    post_comment: 0,
    post_retweet: 2,
  },
];

const HomeTrending = () => {
  const renderItem = ({item}: any) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Avatar size="large" />
          <View style={styles.headerText}>
            <Typography
              type="heading"
              size="xsmall"
              style={{color: COLORS.neutral700}}>
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
            style={{borderWidth: 0}}
            textStyle={{color: COLORS.neutral400}}
          />
        </View>
      </View>
      <View style={{gap: 4}}>
        <Typography
          type="heading"
          size="medium"
          style={{color: COLORS.neutral700}}>
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
          <View style={{borderColor: COLORS.neutral300, width: 16}}>
            <Button
              variant="link"
              size="medium"
              icon="arrow-up"
              textStyle={{color: COLORS.neutral700}}>
              <Typography
                type="paragraph"
                size="small"
                style={{color: COLORS.neutral700}}>
                {item.post_upvote}
              </Typography>
            </Button>
          </View>
          <View
            style={{
              height: 16,
              borderRightWidth: 1,
              borderColor: COLORS.neutral400,
            }}
          />
          <Button
            variant="link"
            size="medium"
            icon="arrow-down"
            style={{width: 16}}
            textStyle={{color: COLORS.neutral700}}
          />
        </View>
        <Button
          variant="link"
          size="medium"
          icon="comment"
          style={styles.actionButton}
          textStyle={{color: COLORS.neutral700, lineHeight: 20}}>
          <Typography
            type="paragraph"
            size="small"
            style={{color: COLORS.neutral700}}>
            {item.post_comment}
          </Typography>
        </Button>
        <Button
          variant="link"
          size="medium"
          icon="retweet"
          style={styles.actionButton}
          textStyle={{color: COLORS.neutral700, lineHeight: 20}}>
          <Typography
            type="paragraph"
            size="small"
            style={{color: COLORS.neutral700}}>
            {item.post_retweet}
          </Typography>
        </Button>
      </View>
    </View>
  );

  return (
    <FlatList
      data={feedData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        <Typography
          type="paragraph"
          size="small"
          style={{color: COLORS.neutral500}}>
          Semua feed sudah kamu lihat 🎉
        </Typography>
      }
      ListFooterComponentStyle={{
        gap: 24,
        marginVertical: 24,
        alignItems: "center",
      }}
    />
  );
};

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
});

export default HomeTrending;
