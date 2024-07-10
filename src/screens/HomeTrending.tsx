import React, {memo, useCallback, useMemo} from "react";
import {FlatList, StyleSheet} from "react-native";

import Typography from "../components/atoms/Typography";
import {FeedItem, feed} from "../components/organism/Feed";
import {COLORS} from "../constants/colors";
import {generateFeedData} from "../utils";
import {HomeScreenProps} from "./Home";

const HomeTrending: React.FC<HomeScreenProps> = memo(
  ({feedData, refreshing, setFeedData, setRefreshing}) => {
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      const newFeed = generateFeedData(100);
      setFeedData(newFeed);
      setRefreshing(false);
    }, [setRefreshing, setFeedData]);

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

    const sortedFeedData = useMemo(() => [...feedData].sort((a, b) => b.post_upvote - a.post_upvote), [feedData]);

    return (
      <FlatList
        data={sortedFeedData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={feed}
        keyExtractor={keyExtractor}
        ListFooterComponent={FeedFooter}
        ListFooterComponentStyle={styles.listFooter}
      />
    );
  },
);

const styles = StyleSheet.create({
  footerText: {color: COLORS.neutral500},
  listFooter: {
    gap: 24,
    marginVertical: 24,
    alignItems: "center",
  },
});

export default HomeTrending;
