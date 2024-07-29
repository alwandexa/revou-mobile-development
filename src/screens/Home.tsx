import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import dayjs from "dayjs";
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
import {generateFeedData} from "@utils/index";
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

const Home: FunctionComponent = () => {
  const {user, avatar} = useAuth();
  const navigation = useNavigation<NavigationProp<any>>();

  const [feedData, setFeedData] = useState<FeedItem[]>(generateFeedData(100));
  const [refreshing, setRefreshing] = useState(false);

  const handlePostOnPress = useCallback(() => {
    navigation.navigate("CreatePost");
  }, [navigation]);

  const FeedFooter = useMemo(
    () => (
      <Typography type="paragraph" size="small" style={styles.footerText}>
        Semua feed sudah kamu lihat 🎉
      </Typography>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: FeedItem, index: number) => index.toString(),
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const newFeed = generateFeedData(100);
    setFeedData(newFeed);
    setRefreshing(false);
  }, []);

  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      const newFeedItem = route.params as FeedItem;
      setFeedData(prevFeedData => [newFeedItem, ...prevFeedData]);
      navigation.navigate("Terbaru");
    }
  }, [navigation, route.params]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/images/investly-logo.png")} />
        {/* <Button
          icon="bell"
          variant="outline"
          size="large"
          customStyle={styles.bellButton}
        /> */}
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
        <TopTab.Navigator tabBar={TabBar}>
          <TopTab.Screen
            name="Trending"
            children={() => (
              <FlatList
                data={[...feedData].sort(
                  (a, b) => b.post_upvote - a.post_upvote,
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({item}) => <Feed item={item} />}
                keyExtractor={keyExtractor}
                ListFooterComponent={FeedFooter}
                ListFooterComponentStyle={styles.listFooter}
              />
            )}
          />
          <TopTab.Screen
            name="Terbaru"
            children={() => (
              <FlatList
                data={[...feedData].sort((a, b) =>
                  dayjs(b.created_at).diff(dayjs(a.created_at)),
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({item}) => <Feed item={item} />}
                keyExtractor={keyExtractor}
                ListFooterComponent={FeedFooter}
                ListFooterComponentStyle={styles.listFooter}
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
