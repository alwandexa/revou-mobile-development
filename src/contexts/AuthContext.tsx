import {NavigationProp, useNavigation} from "@react-navigation/native";
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

import {FeedItem} from "@components/organism/Feed";

type AuthContextType = {
  user: UserProfile | undefined;
  setUser: Function;
  selectedItem: FeedItem;
  setSelectedItem: Function;
  login: (user: UserProfile) => void;
  logout: () => void;
};

export type WithAuthInteractionProps = {
  onPress?: Function;
  onFocus?: Function;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | undefined>();

  const [selectedItem, setSelectedItem] = useState<FeedItem>({} as FeedItem);

  const login = (currentUser: UserProfile) => {
    setUser(currentUser);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        selectedItem,
        setSelectedItem,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper: React.FC<any> = props => {
    const {user} = useAuth();
    const navigation = useNavigation();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const checkAuthAndNavigate = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!user) {
          navigation.navigate("Login" as never);
        }

        setIsChecking(false);
      };

      checkAuthAndNavigate();
    }, [user, navigation]);

    if (isChecking) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return (props: any) => <AuthWrapper {...props} />;
};

export const WithAuthInteraction = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P & WithAuthInteractionProps> => {
  return ({onPress, onFocus, ...props}: WithAuthInteractionProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useAuth();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigation = useNavigation<NavigationProp<Pages>>();

    const handlePress = () => {
      if (!user) {
        navigation.navigate("Login");
      } else if (onPress) {
        onPress();
      }
    };

    const handleFocus = () => {
      if (!user) {
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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
