import {useNavigation, useRoute} from "@react-navigation/native";
import React, {FunctionComponent, useEffect, useState} from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import {Icon, Typography} from "@components/atoms";
import {Button, CustomToast, TextField} from "@components/molecules";
import {Feed} from "@components/organism";
import {FeedItem} from "@components/organism/Feed";
import {COLORS} from "@constants/colors";
import {WithAuth} from "@contexts/AuthContext";
import InvestlyServices from "@services/InvestlyServices";

const DetailPost: FunctionComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as {id: string};
  const [postDetail, setPostDetail] = useState<FeedItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await InvestlyServices.getPostDetail({
          id: params.id,
        });
        if (response.data.status) {
          setPostDetail(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch post detail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [params.id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              fill={COLORS.neutral400}
              height={20}
              width={20}
            />
          </Pressable>
          <Typography
            type="heading"
            size="medium"
            style={{color: COLORS.neutral700}}>
            Post
          </Typography>
        </View>
      </View>
      <View style={styles.feedContainer}>
        {loading && <ActivityIndicator />}
        {postDetail && <Feed item={postDetail} />}
      </View>
      <View style={styles.bottomBar}>
        <TextField
          placeholder="Ketik disini"
          containerStyle={styles.textFieldContainer}
        />
        <Button variant="primary" size="medium" icon="paper-plane" disabled />
      </View>
      <CustomToast />
    </SafeAreaView>
  );
};

export default WithAuth(DetailPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  feedContainer: {flex: 1},
  textFieldContainer: {flex: 1},
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
});
