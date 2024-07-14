import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import React, {FunctionComponent, useState} from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "../components/atoms/icon/Icon";
import TabBar from "../components/molecules/TabBar";
import TabBarIcon from "../components/molecules/TabBarIcon";
import {FeedItem} from "../components/organism/Feed";
import LoginBanner from "../components/organism/LoginBanner";
import PostInput from "../components/organism/PostInput";
import {COLORS} from "../constants/colors";
import {useAuth} from "../contexts/AuthContext";
import {generateFeedData} from "../utils";
import HomeTerbaru from "./HomeTerbaru";
import HomeTrending from "./HomeTrending";
import Profil from "./Profil";

export type HomeScreenProps = {
  feedData: FeedItem[];
  refreshing: boolean;
  setFeedData: React.Dispatch<React.SetStateAction<FeedItem[]>>;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

export const HomeTab: FunctionComponent = () => (
  <BottomTab.Navigator screenOptions={{tabBarShowLabel: false}}>
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon name="house" label="Home" focused={focused} />
        ),
        headerShown: false,
      }}
    />
    <BottomTab.Screen
      name="Profil"
      component={Profil}
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon name="person" label="Profil" focused={focused} />
        ),
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/images/investly-logo.png")} />
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity>
            <Icon name="bell" fill={COLORS.purple600} />
          </TouchableOpacity>
        </View>
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
              <HomeTrending
                feedData={feedData}
                refreshing={refreshing}
                setFeedData={setFeedData}
                setRefreshing={setRefreshing}
              />
            )}
          />
          <TopTab.Screen
            name="Terbaru"
            children={() => (
              <HomeTerbaru
                feedData={feedData}
                refreshing={refreshing}
                setFeedData={setFeedData}
                setRefreshing={setRefreshing}
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
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: COLORS.neutral100,
  },
  modalContainer: {
    padding: 10,
    gap: 10,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
});
