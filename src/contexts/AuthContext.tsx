import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ID, Models, OAuthProvider } from "react-native-appwrite";
import { account } from "../services/appwriteService";

export type AuthState = Models.User<Models.Preferences>;

export interface AuthValue {
  authState?: AuthState | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthState>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthState | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      if (value) {
        setAuthState(await account.get());
      }
      setIsLoading(false);
    };
    loadAuthState();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    await account.create(ID.unique(), email, password, name);
    await signIn(email, password);
  };

  const signIn = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    const authState = await account.get();

    setAuthState(authState);

    return authState;
  };

  const signOut = async () => {
    await account.deleteSession("current");
    setAuthState(undefined);
    // Reset all states
    // queryClient.resetQueries({ type: "all" });
  };

  const value = {
    authState,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
