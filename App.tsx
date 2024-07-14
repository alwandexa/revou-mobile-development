import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/contexts/AuthContext";
import CreatePost from "./src/screens/CreatePost";
import DetailPost from "./src/screens/DetailPost";
import { HomeTab } from "./src/screens/Home";
import Login, { LoginHeader } from "./src/screens/Login";
import Onboarding from "./src/screens/Onboarding";

const Stack = createNativeStackNavigator();

const App: FunctionComponent = () => {
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
          <Stack.Screen
            name="Create Post"
            component={CreatePost}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
