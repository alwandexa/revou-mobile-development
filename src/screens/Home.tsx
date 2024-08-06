import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import {Icon, Typography} from "@components/atoms";
import {TabBar, TabBarIcon} from "@components/molecules";
import {LoginBanner, PostInput} from "@components/organism";
import Feed, {FeedItem} from "@components/organism/Feed";
import {COLORS} from "@constants/colors";
import {useAuth} from "@contexts/AuthContext";
import InvestlyServices from "@services/InvestlyServices";
import Profil from "./Profil";

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

type TabBarIconProps = {
  focused: boolean;
};

const homeTabBarIcon = ({focused}: TabBarIconProps) => (
  <TabBarIcon name="house" label="Home" focused={focused} />
);

const profilTabBarIcon = ({focused}: TabBarIconProps) => (
  <TabBarIcon name="person" label="Profil" focused={focused} />
);

export const HomeTab: FunctionComponent = () => (
  <BottomTab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: styles.homeTabBar,
    }}>
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: homeTabBarIcon,
        headerShown: false,
      }}
    />
    <BottomTab.Screen
      name="Profil"
      component={Profil}
      options={{
        tabBarIcon: profilTabBarIcon,
        headerShown: false,
      }}
    />
  </BottomTab.Navigator>
);

type FeedState = {
  data: FeedItem[];
  page: number;
  hasMore: boolean;
  refreshing: boolean;
};

type TabName = "Trending" | "Terbaru";

const Home: FunctionComponent = () => {
  const {user, avatar} = useAuth();
  const navigation = useNavigation<NavigationProp<Pages>>();

  const [trendingFeed, setTrendingFeed] = useState<FeedState>({
    data: [],
    page: 1,
    hasMore: true,
    refreshing: false,
  });
  const [latestFeed, setLatestFeed] = useState<FeedState>({
    data: [],
    page: 1,
    hasMore: true,
    refreshing: false,
  });

  const fetchFeed = useCallback(
    async (
      pageNum: number,
      sortBy: "engagement" | "created_at",
      refresh = false,
    ) => {
      try {
        const response = await InvestlyServices.getPostList({
          sort_by: sortBy,
          page: pageNum,
          perpage: 10,
        });

        if (response.data.status) {
          const newData = response.data.data;
          const newState = {
            data: refresh
              ? newData
              : (prevData: FeedItem[]) => [...prevData, ...newData],
            page: response.data.meta.current_page,
            hasMore: response.data.meta.is_load_more,
            refreshing: false,
          };

          if (sortBy === "engagement") {
            setTrendingFeed(prev => ({
              ...prev,
              ...newState,
              data:
                typeof newState.data === "function"
                  ? newState.data(prev.data)
                  : newState.data,
            }));
          } else {
            setLatestFeed(prev => ({
              ...prev,
              ...newState,
              data:
                typeof newState.data === "function"
                  ? newState.data(prev.data)
                  : newState.data,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    },
    [],
  );

  const handleTabPress = useCallback(
    (tabName: TabName) => {
      const sortBy = tabName === "Trending" ? "engagement" : "created_at";
      const currentFeed = tabName === "Trending" ? trendingFeed : latestFeed;

      if (currentFeed.data.length === 0) {
        fetchFeed(1, sortBy, true);
      } else {
        fetchFeed(1, sortBy, true);
      }
    },
    [fetchFeed, trendingFeed, latestFeed],
  );

  const handlePostOnPress = useCallback(() => {
    navigation.navigate("CreatePost");
  }, [navigation]);

  const FeedFooter = useMemo(
    () =>
      ({hasMore}: {hasMore: boolean}) => (
        <Typography type="paragraph" size="small" style={styles.footerText}>
          {hasMore ? "Loading more posts..." : "All posts loaded 🎉"}
        </Typography>
      ),
    [],
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  const onRefresh = useCallback(
    (sortBy: "engagement" | "created_at") => {
      if (sortBy === "engagement") {
        setTrendingFeed(prev => ({...prev, refreshing: true}));
      } else {
        setLatestFeed(prev => ({...prev, refreshing: true}));
      }
      fetchFeed(1, sortBy, true);
    },
    [fetchFeed],
  );

  const loadMore = useCallback(
    (sortBy: "engagement" | "created_at") => {
      const currentFeed = sortBy === "engagement" ? trendingFeed : latestFeed;
      if (currentFeed.hasMore) {
        fetchFeed(currentFeed.page + 1, sortBy);
      }
    },
    [fetchFeed, trendingFeed, latestFeed],
  );

  const route = useRoute();

  useEffect(() => {
    fetchFeed(1, "engagement", true);
  }, [fetchFeed]);

  useEffect(() => {
    if (route.params) {
      const newFeedItem = route.params as FeedItem;
      setLatestFeed(prev => ({
        ...prev,
        data: [newFeedItem, ...prev.data],
      }));
      navigation.navigate("Terbaru");
    }
  }, [navigation, route.params]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/images/investly-logo.png")} />
        <Pressable style={styles.bellButton}>
          <Icon name="bell" width={20} height={20} fill={COLORS.purple500} />
        </Pressable>
      </View>
      <View style={styles.modalContainer}>
        <PostInput
          avatar={avatar}
          navigation={navigation}
          onPress={handlePostOnPress}
        />
      </View>
      <View style={styles.tabContainer}>
        <TopTab.Navigator
          tabBar={TabBar}
          screenListeners={{
            tabPress: e => {
              handleTabPress(e.target.split("-")[0] as TabName);
            },
          }}>
          <TopTab.Screen
            name="Trending"
            children={() => (
              <FlatList
                data={trendingFeed.data}
                refreshing={trendingFeed.refreshing}
                onRefresh={() => onRefresh("engagement")}
                renderItem={({item}) => <Feed item={item} />}
                keyExtractor={keyExtractor}
                ListFooterComponent={
                  <FeedFooter hasMore={trendingFeed.hasMore} />
                }
                ListFooterComponentStyle={styles.listFooter}
                onEndReached={() => loadMore("engagement")}
                onEndReachedThreshold={0.1}
              />
            )}
          />
          <TopTab.Screen
            name="Terbaru"
            children={() => (
              <FlatList
                data={latestFeed.data}
                refreshing={latestFeed.refreshing}
                onRefresh={() => onRefresh("created_at")}
                renderItem={({item}) => <Feed item={item} />}
                keyExtractor={keyExtractor}
                ListFooterComponent={
                  <FeedFooter hasMore={latestFeed.hasMore} />
                }
                ListFooterComponentStyle={styles.listFooter}
                onEndReached={() => loadMore("created_at")}
                onEndReachedThreshold={0.1}
              />
            )}
          />
        </TopTab.Navigator>
      </View>
      {!user && <LoginBanner />}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.neutral100,
    height: 48,
  },
  bellButton: {
    width: 44,
    height: 44,
    alignContent: "center",
    justifyContent: "center",
  },
  modalContainer: {
    padding: 10,
    gap: 10,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  footerText: {color: COLORS.neutral500},
  listFooter: {
    gap: 24,
    marginVertical: 24,
    alignItems: "center",
  },
  homeTabBar: {
    paddingBottom: 32,
    minHeight: 89,
  },
});
