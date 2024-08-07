import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {FunctionComponent, useEffect, useState} from "react";
import {ActivityIndicator} from "react-native";

import Register from "@screens/Register";
import {getUserData} from "@utils/index";
import {useAuth} from "@contexts/AuthContext";
import Onboarding from "@screens/Onboarding";
import Login, {LoginHeader} from "@screens/Login";
import {HomeTab} from "@screens/Home";
import DetailPost from "@screens/DetailPost";
import CreatePost from "@screens/CreatePost";

const Stack = createNativeStackNavigator();

const AppContent: FunctionComponent = () => {
  const {setUser} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [userDataExists, setUserDataExists] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
        setUserDataExists(!!userData);
      } catch (error) {
        console.error("Error checking user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserData();
  }, [setUser]);

  if (isLoading) {
    <ActivityIndicator />;
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={userDataExists ? "HomeTab" : "Onboarding"}>
      {!userDataExists && (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              header: LoginHeader,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Post"
        component={DetailPost}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{headerShown: false}}
      />
      {userDataExists && (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              header: LoginHeader,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppContent;
