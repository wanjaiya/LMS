import { useSession } from "@/context/AuthContext"
import { Redirect,Tabs } from "expo-router"
import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const DashboardLayout = () => {
    const {session, isLoading} = useSession();
    const colors  = useThemeColors();

    if(isLoading){
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
                <ActivityIndicator size="large" color={colors.primary} />
                 <Text className="mt-2 text-gray-800 dark:text-white">Loading</Text>
            </View>
        )
    }

    if(!session){
        return <Redirect href="/sign-in" />;
    }
   
  return (
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e6c619' }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ), }} />
        <Tabs.Screen name="inProgress" options={{ title: 'In Progress', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bookmark-sharp' : 'bookmark-outline'} color={color} size={24} />
          ), }} />
        <Tabs.Screen name="completed" options={{ title: 'Completed', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'checkmark-circle-sharp' : 'checkmark-circle-outline'} color={color} size={24} />
          ), }} />
        <Tabs.Screen name="list" options={{ title: 'All Courses', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
          ), }} />

           <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
          ), }} />
      
    </Tabs>
  )
}

export default DashboardLayout
