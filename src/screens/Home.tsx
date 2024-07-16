import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import React, {FunctionComponent, useCallback, useMemo, useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, View} from "react-native";
import dayjs from "dayjs";

import Typography from "../components/atoms/Typography";
import Button from "../components/molecules/Button";
import TabBar from "../components/molecules/TabBar";
import TabBarIcon from "../components/molecules/TabBarIcon";
import LoginBanner from "../components/organism/LoginBanner";
import PostInput from "../components/organism/PostInput";
import {Feed, FeedItem} from "../components/templates/Feed";
import {COLORS} from "../constants/colors";
import {useAuth} from "../contexts/AuthContext";
import {generateFeedData} from "../utils";
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

export const HomeTab: React.FC = () => (
  <BottomTab.Navigator screenOptions={{tabBarShowLabel: false}}>
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

  const handlePostOnPress = () => {
    navigation.navigate("Create Post");
  };

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
  }, [setRefreshing, setFeedData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/images/investly-logo.png")} />
        <Button
          icon="bell"
          variant="outline"
          size="large"
          customStyle={styles.bellButton}
        />
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
  },
  bellButton: {
    width: 44,
    height: 44,
    borderWidth: 0,
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
});
