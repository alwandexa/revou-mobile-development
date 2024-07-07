import React, {FunctionComponent} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login, {LoginHeader} from "./src/screens/Login";
import Onboarding from "./src/screens/Onboarding";
import Home, {HomeHeader} from "./src/screens/Home";

const Stack = createNativeStackNavigator();

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            header: HomeHeader,
          }}
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
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
