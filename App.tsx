import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {AuthProvider} from "./src/contexts/AuthContext";
import {HomeTab} from "./src/screens/Home";
import Login, {LoginHeader} from "./src/screens/Login";
import Onboarding from "./src/screens/Onboarding";
import DetailPost from "./src/screens/DetailPost";

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <AuthProvider>
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
          <Stack.Screen name="Post" component={DetailPost} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
