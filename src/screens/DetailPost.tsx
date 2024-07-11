import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Feed} from "../components/organism/Feed";
import {useAuth} from "../contexts/AuthContext";
import TextField from "../components/molecules/TextField";
import Button from "../components/molecules/Button";
import {COLORS} from "../constants/colors";

const DetailPost = () => {
  const {selectedItem} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Feed item={selectedItem} />
      <View style={styles.bottomBar}>
        <TextField placeholder="Ketik disini" containerStyle={{flex: 1}} />
        <Button variant="primary" size="medium" icon="paper-plane" disabled />
      </View>
    </SafeAreaView>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  bottomBar: {
    backgroundColor: COLORS.neutral100,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
});
