import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {useNavigation} from "@react-navigation/native";

type AuthContextType = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (user: string) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
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
