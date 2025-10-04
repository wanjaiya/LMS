import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
} from "react-native";
import { router } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const colors = useThemeColors();
  const { currentTheme } = useTheme();


  const image = { uri: "../assets/images/launch_background.jpg" };
  return (
      <View className={`flex-1 ${currentTheme === "dark" ? "bg-white" : "bg-white"}`}>
        <Image
          source={require("../assets/images/launch_background.jpg")}
          style={styles.image}
          resizeMode="cover"
        ></Image>
        <View className="flex justify-center items-center absolute bottom-10 w-full ">
          <TouchableOpacity
            className="h-[54px] w-80 border-[1.5px] justify-center items-center mb-4 "
            style={{ borderColor: colors.background, backgroundColor: colors.background }}
            onPress={() => router.push("/sign-in")}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.textWhite, fontSize: 20 }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default WelcomeScreen;
