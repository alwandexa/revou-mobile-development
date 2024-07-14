import React, {FC, memo, useCallback, useEffect, useMemo} from "react";
import {FlatList, StyleSheet} from "react-native";
import {useRoute} from "@react-navigation/native";
import dayjs from "dayjs";

import Typography from "../components/atoms/Typography";
import {FeedItem, Feed} from "../components/organism/Feed";
import {COLORS} from "../constants/colors";
import {generateFeedData} from "../utils";
import {HomeScreenProps} from "./Home";

const HomeTerbaru: FC<HomeScreenProps> = memo(
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

    const sortedFeedData = useMemo(
      () =>
        [...feedData].sort((a, b) =>
          dayjs(b.created_at).diff(dayjs(a.created_at)),
        ),
      [feedData],
    );

    const route = useRoute();

    useEffect(() => {
      if (route.params) {
        setFeedData([...feedData, route.params as FeedItem]);
      }
    }, [route.params as FeedItem]);

    return (
      <FlatList
        data={sortedFeedData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({item}) => <Feed item={item} />}
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

export default HomeTerbaru;
