import React, {memo, useCallback, useMemo, useState} from "react";
import {FlatList, StyleSheet} from "react-native";

import Typography from "../components/atoms/Typography";
import {FeedItem, feed} from "../components/organism/Feed";
import {COLORS} from "../constants/colors";
import {generateFeedData} from "../utils";

const HomeTrending = memo(() => {
  const [refreshing, setRefreshing] = useState(false);
  const [feedData, setFeedData] = useState(generateFeedData(100).sort());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFeedData(generateFeedData(100));
    setRefreshing(false);
  }, []);

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
      refreshing={refreshing}
      onRefresh={onRefresh}
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
