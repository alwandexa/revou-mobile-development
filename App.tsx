import React, {FunctionComponent} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home, {HomeHeader} from "./src/screens/Home";
import Login, {LoginHeader} from "./src/screens/Login";
import Onboarding from "./src/screens/Onboarding";
import Profil from "./src/screens/Profil";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: HomeHeader,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="HomeTab"
          component={HomeTab}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
