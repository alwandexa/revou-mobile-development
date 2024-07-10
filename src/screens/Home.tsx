import React, {useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "../components/atoms/icon/Icon";
import Typography from "../components/atoms/Typography";
import Avatar from "../components/molecules/Avatar";
import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import {FeedItem} from "../components/organism/Feed";
import {COLORS} from "../constants/colors";
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

export const HomeTab = () => {
  return (
    <BottomTab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <Icon
                name="house"
                fill={focused ? COLORS.purple600 : COLORS.neutral400}
              />
              <Typography
                type="heading"
                size="xsmall"
                style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
                Home
              </Typography>
            </View>
          ),
          headerShown: true,
          header: HomeHeader,
        }}
      />
      <BottomTab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <Icon
                name="person"
                fill={focused ? COLORS.purple600 : COLORS.neutral700}
              />
              <Typography
                type="heading"
                size="xsmall"
                style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
                Profil
              </Typography>
            </View>
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

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
  const [feedData, setFeedData] = useState<FeedItem[]>(generateFeedData(100));
  const [refreshing, setRefreshing] = useState(false);

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
        <TopTab.Navigator>
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
