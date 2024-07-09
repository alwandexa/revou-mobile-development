import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";

import Icon from "../components/atoms/icon/Icon";
import Avatar from "../components/molecules/Avatar";
import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import {COLORS} from "../constants/colors";
import HomeTerbaru from "./HomeTerbaru";
import HomeTrending from "./HomeTrending";
import HomeTabBar from "../components/molecules/HomeTabBar";

const Tab = createMaterialTopTabNavigator();

export const HomeHeader = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/images/investly-logo.png")} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Icon name="bell" fill={COLORS.purple600} />
      </TouchableOpacity>
    </View>
  );
};

const Home = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView>
      <View style={styles.modalContainer}>
        <View
          style={{
            backgroundColor: COLORS.neutral100,
            paddingHorizontal: 12,
            paddingVertical: 16,
            borderRadius: 16,
            gap: 16,
          }}>
          <View style={{gap: 8, flexDirection: "row", alignItems: "center"}}>
            <Avatar />
            <TextField
              placeholder="Apa yang ingin kamu tanyakan?"
              containerStyle={{flex: 1}}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            <Button
              icon="question-circle"
              iconColor={COLORS.yellow600}
              textStyle={{color: COLORS.neutral700}}
              size="small"
              variant="link"
              style={{flex: 2, alignItems: "center"}}>
              Pertanyaan
            </Button>
            <View style={styles.separator} />
            <Button
              icon="plus"
              iconColor={COLORS.green600}
              textStyle={{color: COLORS.neutral700}}
              size="small"
              variant="link"
              style={{flex: 2, alignItems: "center"}}>
              Post
            </Button>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: COLORS.neutral100, height: "100%"}}>
        <Tab.Navigator
          tabBar={props => <HomeTabBar {...props} />}
          screenOptions={(): MaterialTopTabNavigationOptions => ({
            tabBarStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.neutral300,
            },
          })}>
          <Tab.Screen name="Trending" component={HomeTrending} />
          <Tab.Screen name="Terbaru" component={HomeTerbaru} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: COLORS.neutral100,
  },
  bodyContainer: {},
  modalContainer: {
    padding: 10,
    gap: 10,
  },
  separator: {
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    height: 20,
    flex: 1,
  },
});
