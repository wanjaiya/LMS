import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import { Link, router } from "expo-router";
import axiosInstance from "@/config/axiosConfig";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import { useSession } from "@/context/AuthContext";

const Signin = () => {
  const { signIn } = useSession();
  const { currentTheme } = useTheme();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrors({ email: "", password: "" });

    try {
      console.log(data);

      const response = await axiosInstance.post("/api/login", data);
      console.log(response.data);

      await signIn(response.data.token, response.data.user);
      router.replace("/");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        if (responseData?.errors) {
          setErrors(responseData.errors);
        } else if (responseData?.message) {
          Alert.alert("Error", responseData.message);
        }
      } else {
        console.error("Error", error);
        Alert.alert("Error", "Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      className={`flex-1 justify-center items-center p-5 ${currentTheme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <View className="items-center mb-8">
        <Text
          className={`text-2xl font-bold mt-4 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          The AKI Knowledge Hub
        </Text>
      </View>
      <Text
        className={`text-2xl font-bold mt-4 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Login
      </Text>

      <Input
        placeholder="Email"
        value={data.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        error={errors.email}
      />
      <Input
        placeholder="Password"
        value={data.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
        error={errors.password}
      />

      <Button
        className="w-full bg-primary mb-4"
        onPress={handleLogin}
        disabled={loading}
        loading={loading}
      >
        <View className="flex-row items-center justify-center">
          <Text className="text-white text-center text-xl">Signin</Text>
        </View>
      </Button>
    </View>
  );
};

export default Signin;
