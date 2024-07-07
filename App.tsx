import React, {FunctionComponent} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Onboarding from "./src/screeens/Onboarding";
import Login, {LoginHeader} from "./src/screeens/Login";
import Icon from "./src/components/atoms/icon/Icon";

const Stack = createNativeStackNavigator();

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
