import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { router } from "expo-router";
import axios from "axios";
import axiosInstance from "@/config/axiosConfig";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  email_verified_at: string | null;
  company_id: number;
  job_role_id: number;
  published: boolean;
}

interface AuthContextType {
  signIn: (token: string, user: User, edxinstanceId: string) => void;
  signOut: () => void;
  session?: string | null;
  user?: User | null;
  isLoading: boolean;
  updateUser: (userData: any) => Promise<void>;
  edxSessionId?: string| null;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
  updateUser: async () => {},
  edxSessionId: null
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider/>");
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[, user], setUser] = useStorageState("user");
  const [[, edxSessionId], setEdxSessionId] = useStorageState("edxSession");

  // Add this function to update user data
  const updateUser = async (userData: any) => {
    await setUser(userData);
  };

  const handleSignOut = async () => {
    try {
      if (session) {
        await axiosInstance.post("/api/logout", null, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        });
        setSession(null);
        setUser(null);
        setEdxSessionId(null);
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loadUserInfo = async (token: string) => {
    try {
      const response = await axiosInstance.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       

      setUser(JSON.stringify(response.data));

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setSession(null);
        setUser(null);
        setEdxSessionId(null);
        router.replace("/sign-in");
      } else {
        console.error("Error fetching user info:", error);
      }
    }
  };

  useEffect(() => {
    
    if (session) {
      loadUserInfo(session);
    }
  }, [session]);

  //parse user data from storage if available
  const parsedUser = user
    ? (() => {
        try {
          return JSON.parse(user);
        } catch (e) {
          console.error("Failed to parse user data:", e);
          return null;
        }
      })()
    : null;

  //Fucntion to Update user Data with proper JSON Stringification
  const handleUpdateUser = async (userData: any) => {
    try {
      const userString = JSON.stringify(userData);
      await setUser(userString);
    } catch (e) {
      console.error("Failed to update user:", e);
      throw e;
    }
  };

  // Function to Sign in User
  const handleSiginIn = async (token: string, userData: User, edxinstanceId: string) => {
    try {
      console.log(token);
      await setSession(token);
      await setUser(JSON.stringify(userData));
      await setEdxSessionId(edxinstanceId);
    } catch (e) {
      console.error("Failed to sign in:", e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSiginIn,
        signOut: handleSignOut,
        session,
        user: parsedUser,
        isLoading,
        updateUser: handleUpdateUser,
        edxSessionId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
