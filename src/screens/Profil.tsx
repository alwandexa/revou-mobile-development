import {Button} from "@components/molecules";
import {COLORS} from "@constants/colors";
import {useAuth} from "@contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import analytics from "@react-native-firebase/analytics";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import InvestlyServices from "@services/InvestlyServices";
import {getAccessToken} from "@utils/index";
import React, {FunctionComponent} from "react";
import {SafeAreaView, StyleSheet} from "react-native";

const Profil: FunctionComponent = () => {
  const {user, setUser} = useAuth();
  const navigation = useNavigation<NavigationProp<Pages>>();

  console.log(getAccessToken());

  const handleLogout = async () => {
    try {
      await InvestlyServices.logout();

      await AsyncStorage.removeItem("access_token");

      setUser(null);

      navigation.reset({
        index: 0,
        routes: [{name: "Login"}],
      });

      await analytics().logEvent("click_logout", {
        username: user?.username || "username",
      });
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button size="large" variant="primary" onPress={handleLogout}>
        Logout
      </Button>
    </SafeAreaView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: COLORS.neutral100,
  },
});
