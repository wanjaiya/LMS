import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosConfig";
import FeatureCard from "@/components/app/FeaturedCard";
import CourseCard from "@/components/app/CourseCard";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Index() {
  const { user, session } = useSession();
  const colors = useThemeColors();
  const [stats, setStats] = useState([]);
  const [suggested, setSuggested] = useState([]);

  const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/api/request-dashboard", {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        });

        setStats(response.data);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

  const fetchSuggestedCourses = async () => {
    const type = 'suggested';
    try {
        const response = await axiosInstance.get(`/api/request-courses/${type}`, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        });

        setSuggested(response.data);

      } catch (error) {
        console.error("Failed to fetch suggested courses:", error);
      }
    };
  

  useEffect(() => {
  

    fetchDashboardData();
    fetchSuggestedCourses();

  }, []);


  return (
    <ScrollView >
      <View className="p-4">
        <View className="flex flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome, {user?.name}!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="flex-row items-center"
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Dashboard Stats
          </Text>
        </View>
       <ScrollView horizontal style={{ flex: 1, padding: 16 }}>
        <View className="flex flex-row mb-4">
          {stats.map((card, index) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon as keyof typeof MaterialIcons.glyphMap}
              gradient={
                [colors.card, colors.surface] as readonly [
                  string,
                  string,
                  ...string[],
                ]
              }
              onPress={() => router.push(card.route as any)}
              className={index > 0 ? 'ml-4' : ''}
            />
          ))}
        </View>
        </ScrollView>

         <View className="flex flex-row">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Suggested Courses
          </Text>
        </View>
       <ScrollView horizontal >
       <View className="flex flex-row mb-4">
          {suggested.map((course, index) => (
            <CourseCard
              key={index}
              display_name={course.display_name}
              effort={course.effort}
              course_image_uri={course.course_image_uri}
              course_id={course.course_id}
              gradient={
                [colors.card, colors.surface] as readonly [
                  string,
                  string,
                  ...string[],
                ]
              }
              onPress={() => router.push(course.course_image_uri as any)}
              className={index > 0 ? 'ml-4' : ''}
            />
          ))}
        </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
