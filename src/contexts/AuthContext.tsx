import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {useNavigation} from "@react-navigation/native";
import {FeedItem} from "../components/templates/Feed";

type AuthContextType = {
  user: string | null;
  avatar: string;
  selectedItem: FeedItem;
  setSelectedItem: Function;
  login: (user: string, avatar: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string>("");

  const [selectedItem, setSelectedItem] = useState<FeedItem>({} as FeedItem);

  const login = (user: string, avatar: string) => {
    setUser(user);
    setAvatar(avatar);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{user, avatar, selectedItem, setSelectedItem, login, logout}}>
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

export const withAuth = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const {user} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
      if (!user) {
        // @ts-ignore
        navigation.navigate("Login");
      }
    }, [user, navigation]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
