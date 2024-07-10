import React, {useMemo, useCallback} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {faker} from "@faker-js/faker";

import Typography from "../components/atoms/Typography";
import {COLORS} from "../constants/colors";
import { feed} from "../components/organism/Feed";

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
      renderItem={feed}
      keyExtractor={keyExtractor}
      ListFooterComponent={FeedFooter}
      ListFooterComponentStyle={styles.listFooter}
    />
  );
});

const styles = StyleSheet.create({
  footerText: {color: COLORS.neutral500},
  listFooter: {
    gap: 24,
    marginVertical: 24,
    alignItems: "center",
  },
});

export default HomeTrending;
