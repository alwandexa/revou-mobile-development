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
import Typography from "../components/atoms/Typography";

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Avatar />
            <TextField
              placeholder="Apa yang ingin kamu tanyakan?"
              containerStyle={{flex: 1}}
            />
          </View>
          <View style={styles.buttonRow}>
            <View
              style={{
                flex: 2,
                height: 20,
                borderRightWidth: 1,
                borderColor: COLORS.neutral300,
                justifyContent: "center",
              }}>
              <Button
                icon="question-circle"
                iconColor={COLORS.yellow600}
                textStyle={{color: COLORS.neutral700}}
                size="small"
                variant="link">
                Pertanyaan
              </Button>
            </View>
            <View style={{flex: 2, height: 20, justifyContent: "center"}}>
              <Button
                icon="plus"
                iconColor={COLORS.green600}
                textStyle={{color: COLORS.neutral700}}
                size="small"
                variant="link">
                Post
              </Button>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tabContainer}>
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
      <View style={styles.loginBanner}>
        <Image source={require("../assets/images/investly-mascot-1.png")} />
        <View style={styles.bannerTextContainer}>
          <Typography type="paragraph" size="small">
            Temukan inspirasi investasi,{" "}
          </Typography>
          <Button variant="link" size="small">
            Masuk Yuk!
          </Button>
        </View>
      </View>
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
  inputContainer: {
    backgroundColor: COLORS.neutral100,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 16,
  },
  loginBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.purple100,
  },
  bannerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputRow: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  separator: {
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    height: 20,
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
});
