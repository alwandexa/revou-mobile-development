import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

import {WithAuth, useAuth} from "@contexts/AuthContext";
import {Button, TextField} from "@components/molecules";
import {Typography} from "@components/atoms";
import {COLORS} from "@constants/colors";
import {Feed} from "@components/templates";

const DetailPost = () => {
  const {selectedItem} = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Button
            variant="outline"
            style={styles.backButton}
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
      <View style={styles.feedContainer}>
        <Feed item={selectedItem} />
      </View>
      <View style={styles.bottomBar}>
        <TextField
          placeholder="Ketik disini"
          containerStyle={styles.textFieldContainer}
        />
        <Button variant="primary" size="medium" icon="paper-plane" disabled />
      </View>
    </SafeAreaView>
  );
};

export default WithAuth(DetailPost);

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
  backButton: {borderWidth: 0},
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  feedContainer: {flex: 1},
  textFieldContainer: {flex: 1},
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
});
