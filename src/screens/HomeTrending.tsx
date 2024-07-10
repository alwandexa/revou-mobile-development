import React, {useMemo, useCallback} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {faker} from "@faker-js/faker";

import Typography from "../components/atoms/Typography";
import Avatar from "../components/molecules/Avatar";
import Button from "../components/molecules/Button";
import Label from "../components/molecules/Label";
import {COLORS} from "../constants/colors";

type FeedItem = {
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

const generateFeedItem = () => {
  return {
    avatar_url: faker.image.avatar(),
    name: faker.person.firstName(),
    headline: faker.person.jobTitle(),
    created_at: faker.date.recent().toISOString(),
    post_header: faker.lorem.sentence(),
    post_content: faker.lorem.paragraph(),
    post_topic: faker.helpers.arrayElement([
      "Investasi",
      "Sector Update",
      "Financial News",
      "Market Analysis",
    ]),
    post_upvote: faker.number.int({min: 0, max: 1000}),
    post_downvote: faker.number.int({min: 0, max: 1000}),
    post_comment: faker.number.int({min: 0, max: 100}),
    post_retweet: faker.number.int({min: 0, max: 50}),
  };
};

const generateFeedData = (count = 5) => {
  return Array.from({length: count}, generateFeedItem);
};

const HomeTrending = React.memo(() => {
  const feedData = useMemo(() => generateFeedData(100), []);

  const renderItem = useCallback(
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

  const keyExtractor = useCallback(
    (item: FeedItem, index: number) => index.toString(),
    [],
  );

  const FeedFooter = useMemo(
    () => (
      <Typography type="paragraph" size="small" style={styles.footerText}>
        Semua feed sudah kamu lihat 🎉
      </Typography>
    ),
    [],
  );

  return (
    <FlatList
      data={feedData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={FeedFooter}
      ListFooterComponentStyle={styles.listFooter}
    />
  );
});

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

export default HomeTrending;
