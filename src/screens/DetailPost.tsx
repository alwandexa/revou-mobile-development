import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";

import {useNavigation} from "@react-navigation/native";
import Typography from "../components/atoms/Typography";
import Button from "../components/molecules/Button";
import TextField from "../components/molecules/TextField";
import {Feed} from "../components/organism/Feed";
import {COLORS} from "../constants/colors";
import {useAuth} from "../contexts/AuthContext";

const DetailPost = () => {
  const {selectedItem} = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Button
            variant="outline"
            style={{borderWidth: 0}}
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <Typography
            type="heading"
            size="medium"
            style={{color: COLORS.neutral700}}>
            Post
          </Typography>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Feed item={selectedItem} />
      </View>
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
    backgroundColor: COLORS.neutral100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
});
