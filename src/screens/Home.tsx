import React, {FunctionComponent} from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "../components/atoms/icon/Icon";
import Avatar from "../components/molecules/Avatar";
import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import {COLORS} from "../constants/colors";

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
              icon="bell"
              iconColor={COLORS.yellow600}
              textStyle={{color: COLORS.neutral700}}
              size="small"
              variant="link">
              Pertanyaan
            </Button>
            <Text>|</Text>
            <Button
              icon="bell"
              iconColor={COLORS.green600}
              textStyle={{color: COLORS.neutral700}}
              size="small"
              variant="link"
              onPress={() => navigation.navigate("Login")}>
              Post
            </Button>
          </View>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: COLORS.neutral100}}></View>
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
  },
});
