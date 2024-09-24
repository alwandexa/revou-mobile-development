import {NavigationContainer} from "@react-navigation/native";
import React, {FunctionComponent} from "react";

import {AuthProvider} from "./src/contexts/AuthContext";
import AppContent from "@navigators/AppContent";

const App: FunctionComponent = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
// rebuild workflow
