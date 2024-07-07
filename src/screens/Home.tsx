import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {FunctionComponent} from "react";
import Icon from "../components/atoms/icon/Icon";
import {COLORS} from "../constants/colors";
import Avatar from "../components/molecules/Avatar";
import TextField from "../components/molecules/TextField";
import Button from "../components/molecules/Button";

export const HomeHeader: FunctionComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/images/investly-logo.png")} />
      <TouchableOpacity>
        <Icon name="bell" fill={COLORS.purple600} />
      </TouchableOpacity>
    </View>
  );
};
const Home: FunctionComponent = () => {
  return (
    <SafeAreaView>
      <View style={styles.modalContainer}>
        <View
          style={{
            backgroundColor: COLORS.neutral100,
            paddingHorizontal: 12,
            paddingVertical: 16,
            borderRadius: 16,
          }}>
          <View style={{gap: 8, flexDirection: "row"}}>
            <Avatar />
            <TextField placeholder="Apa yang ingin kamu tanyakan?" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            <Button icon="bell" size="small" variant="link">
              Pertanyaan
            </Button>
            <Text>|</Text>
            <Button icon="bell" size="small" variant="link">
              Post
            </Button>
          </View>
        </View>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bodyContainer: {},
  modalContainer: {
    padding: 10,
  },
});
