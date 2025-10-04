import { Redirect, Slot, Stack, router } from "expo-router";
import "../global.css";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { SessionProvider, useSession } from "@/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

function Header() {
  const { currentTheme } = useTheme();
  const { session, isLoading } = useSession();

  //If we have a session and we're not on the welcome screen redirect to dashboard

  if (session && !isLoading) {
    return (
      <>
        <StatusBar
          style={currentTheme === "dark" ? "dark" : "light"}
          backgroundColor={currentTheme === "dark" ? "#111827" : "#ffffff"}
        />

        <Redirect href="/(dashboard)" />
      </>
    );
  }

  return (
    <StatusBar
      style={currentTheme === "dark" ? "dark" : "light"}
      backgroundColor={currentTheme === "dark" ? "#111827" : "#ffffff"}
    />
  );
}

export default function RootLayout() {
 
  return (

    <SessionProvider>
      <SafeAreaProvider>
        <SafeAreaView className={`flex-1`}>
          <ThemeProvider>
            <Header />
            <Slot />
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </SessionProvider>
  );
}
