import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import GradientCard from "../core/GradientCard";
import { useThemeColors } from "@/hooks/useThemeColors";

export interface FeatureCardProps{
    title?: string,
    description?: string
    icon: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    gradient?: readonly [string, string, ...string[]];
    disabled?: boolean;
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
title,
description,
icon,
onPress,
gradient,
disabled = false,
className
})=> {
    const colors = useThemeColors();

    return(
         <GradientCard 
         onPress={onPress}
         gradientColors={gradient || [colors.card, colors.surface] as readonly [string, string, ...string[]]}
         disabled={disabled}
         style={{ width: '30%', marginBottom: 16 }}
         className={className}
         >  
            <View className={`flex flex-col p-6`}>
            <View className="items-center mb-4">
              <MaterialIcons
               name={icon}
               size={24}
               color={colors.primary}
              />
            </View>
            <View className="items-center">
                <Text className="text-lg font-semibold text-center mb-2 text-gray-800 dark:text-white">{title}</Text>
                <Text className="text-gray-600 dark:text-gray-300 text-center text-sm">{description}</Text>
            </View>
            </View>

         </GradientCard>
    )


};


export default FeatureCard;