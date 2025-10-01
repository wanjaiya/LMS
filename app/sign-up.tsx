import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import { Link } from "expo-router";
import axiosInstance from "@/config/axiosConfig";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";

const Signup = () => {
  const { currentTheme } = useTheme();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false); //Add loading state
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setErrors({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    try {
      await axiosInstance.post("/api/signup", data);

      resetForm(); //Rest form after successful signup
      setSuccessMessage(
        " Account created successfully! please check your email to verify account."
      );
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

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    setErrors({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <View
      className={`flex-1 justify-center items-center p-5 ${currentTheme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <View className="items-center mb-8">
        <Text
          className={`text-2xl font-bold mt-4 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Imaginary
        </Text>
      </View>
      <Text
        className={`text-2xl font-bold mt-4 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Signup
      </Text>
      {!!successMessage && (
        <Text className="bg-emerald-600 text-white rounde-lg py-3 px-4 mb-4">
          {successMessage}
        </Text>
      )}

      <Input
        placeholder="Name"
        value={data.name}
        onChangeText={(value) => handleChange("name", value)}
        error={errors.name}
      />

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
         <Input
        placeholder="Confirm Password"
        value={data.password_confirmation}
        onChangeText={(value) => handleChange("password_confirmation", value)}
        secureTextEntry
      />
      <Button 
      className="w-full bg-primary mb-4"
       onPress={handleSignup}
       disabled={loading}
       loading ={loading}
      >
        <View className="flex-row items-center justify-center">
          
           <Text className="text-white text-center">Signup</Text>
        </View>

      </Button>
    </View>
  );
};

export default Signup;
