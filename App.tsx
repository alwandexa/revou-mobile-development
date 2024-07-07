import React, {FunctionComponent} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Onboarding from "./src/screeens/Onboarding";

const Stack = createNativeStackNavigator();

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Onboarding"
          component={Onboarding}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
