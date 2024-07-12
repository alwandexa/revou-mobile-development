import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";

import {Feed} from "../components/organism/Feed";
import {useAuth} from "../contexts/AuthContext";
import TextField from "../components/molecules/TextField";
import Button from "../components/molecules/Button";
import {COLORS} from "../constants/colors";
import Typography from "../components/atoms/Typography";
import {useNavigation} from "@react-navigation/native";

const DetailPost = () => {
  const {selectedItem} = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: "row", alignItems: "center", gap: 24}}>
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
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
});
