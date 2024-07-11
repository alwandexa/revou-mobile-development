import React from "react";
import {useNavigation} from "@react-navigation/native";

import {useAuth} from "../../contexts/AuthContext";

export type WithAuthInteractionProps = {
  onPress?: Function;
  onFocus?: Function;
};

const withAuthInteraction = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P & WithAuthInteractionProps> => {
  return ({onPress, onFocus, ...props}: WithAuthInteractionProps) => {
    const {user} = useAuth();
    const navigation = useNavigation();
    
    const handlePress = () => {
      if (!user) {
        // @ts-ignore
        navigation.navigate("Login");
      } else if (onPress) {
        onPress();
      }
    };

    const handleFocus = () => {
      if (!user) {
        // @ts-ignore
        navigation.navigate("Login");
      } else if (onFocus) {
        onFocus();
      }
    };

    return (
      <WrappedComponent
        {...(props as P)}
        onPress={handlePress}
        onFocus={handleFocus}
      />
    );
  };
};

export default withAuthInteraction;
