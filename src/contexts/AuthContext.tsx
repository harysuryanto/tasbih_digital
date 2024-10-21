import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ID, Models, OAuthProvider } from "react-native-appwrite";
import { account } from "../services/appwriteService";
import catchError from "../utils/catchError";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Experimental
WebBrowser.maybeCompleteAuthSession();

// Handle OAuth Callback
Linking.addEventListener("url", async ({ url }) => {
  const { queryParams } = Linking.parse(url);

  if (queryParams && queryParams.code) {
    alert("OAuth successful:" + queryParams);
    // Handle the code received from Google to create a session in Appwrite
  } else {
    console.error("OAuth failed or canceled");
  }
});

export type AuthState = Models.User<Models.Preferences>;

export interface AuthValue {
  authState?: AuthState | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthState>;
  signInWithGoogle: () => Promise<void>;
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
      const [, user] = await catchError(account.get());
      setAuthState(user);
      setIsLoading(false);
    };
    loadAuthState();
  }, []);

  // For iOS only because (ChatGPT says) currently, Expo doesn’t support direct modification of SceneDelegate.swift
  // since Expo projects avoid touching native code. However, there’s a workaround by creating
  // a custom native module if absolutely needed, or handling deep links in JavaScript.
  // You can listen for deep links using Expo’s built-in API.
  useEffect(() => {
    const subscription = Linking.addEventListener("url", async ({ url }) => {
      if (url.includes("appwrite-callback")) {
        alert(`Appwrite Callback URL: ${url}`);
        // Handle the callback logic here, similar to WebAuthComponent.handleIncomingCookie
      }
    });
    return () => subscription.remove();
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

  const signInWithGoogle = async () => {
    const result = account.createOAuth2Session(
      OAuthProvider.Google
      // "com.harysuryanto.tasbihdigital://home",
      // "com.harysuryanto.tasbihdigital://sign-in",
      // ["email", "profile", "openid"] // Experimental
    );

    if (!(result instanceof URL)) {
      console.log("it is not a URL");
      return;
    }

    console.log("OAuth2 URL", result);
    await WebBrowser.openBrowserAsync(result.toString());

    // const authState = await account.get();

    // console.log("authState:", authState);
    console.log("session", await account.getSession("current"));
    setAuthState(authState);
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
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
