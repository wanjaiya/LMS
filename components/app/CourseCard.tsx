import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import GradientCard from "../core/GradientCard";
import { useThemeColors } from "@/hooks/useThemeColors";


export interface CourseCardProps {
    course_id: string;
    display_name?: string;
    short_description?: string;
    effort?:string;
    course_image_uri?: string;
    onPress: () => void;
    gradient?: readonly [string, string, ...string[]];
    disabled?: boolean;
    className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
course_id,
display_name,
short_description,
onPress,
gradient,
effort,
course_image_uri,
disabled = false,
className
})=> {
    const colors = useThemeColors();
    const pieces = effort?.split(":");

    return(
         <GradientCard 
         onPress={onPress}
         gradientColors={gradient || [colors.card, colors.surface] as readonly [string, string, ...string[]]}
         disabled= {disabled}
         style={{ width: '38%', marginBottom: 16 }}
         className={className}
         >  
         <View className="flex flex-row">
          <Image
            source={{ uri: course_image_uri }}
            style={{ width: 480, height:200 }}
            resizeMode="cover"
        />
         </View>

         <View className="flex flex-row w-full p-2 pt-4">
           <Text className="text-xl text-center font-bold  mb-2 text-gray-800 dark:text-white"> {display_name}</Text>
            
         </View>
         <View className="flex flex-row p-4">
         <Text>
                <MaterialIcons
                name="access-time"
                size={16}
                color={colors.primary}
                style={{ marginRight: 20, paddingTop: 20}}
                />
                {pieces[2]} Mins
            </Text>
        </View>
        </GradientCard>
    );

}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    height: "%",
    width: "100%",
  },
});


export default CourseCard