import { View, Text, Platform,Alert } from 'react-native'
import React from 'react'
import { useTheme } from "@/context/ThemeContext";
import { useSession } from '@/context/AuthContext';
import Button from '@/components/core/Button';


const settings = () => {
       const { user, signOut} = useSession();
    
        const handleLogout = () => {
          if(Platform.OS === 'web'){
          //for web browsers 
          if(window.confirm('Are you sure you want to logout?')){
            signOut();
          }
        }else{
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text:'Logout',
                style: 'destructive',
                onPress: () => signOut(), 
              }
    
            ],
            {cancelable: true}
          );
        }
      };
  return (
   <View className={`flex-1 p-5`}>
      <Button
       onPress={handleLogout}
       variant="danger"
       className='shadow-lg'
      >
        <Text className='text-white text-center font-semibold'>Logout</Text>
      </Button>
    </View>
  )
}

export default settings