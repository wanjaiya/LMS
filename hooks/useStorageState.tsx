import {useState, useEffect, useCallback} from 'react';
import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';


const storage = {
    get: async (key: string ): Promise<string | null> => {
        try{
            if(Platform.OS === 'web'){
                return localStorage.getItem(key)
            }

            return await SecureStore.getItemAsync(key);

        }catch(e){

          console.error('Storage is unavaibale:', e);
          return null;
        }

    },
    set: async (key: string, value: string | null): Promise<void> =>{
        try{
            if(Platform.OS === 'web'){
                if (value === null) {
                    localStorage.removeItem(key);
                } else {
                    localStorage.setItem(key, value);
                }
            }else{
                
               if (value === null) {
                    await SecureStore.deleteItemAsync(key);
                } else {
                    await SecureStore.setItemAsync(key, value);
                }
                // value === null ? await SecureStore.deleteItemAsync(key) : await SecureStore.setItemAsync(key, value);
            }

        }catch(e){
           console.error('Storage is unavailable:', e);
        }
    }
};

type StorageState = [[boolean, string | null], (value: string | null) => void];


export function useStorageState(key: string): StorageState{

    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState<string | null>(null);


    useEffect(() =>{
        storage.get(key).then(value =>{
            setValue(value);
            setIsLoading(false);
        });
    }, [key]);

     const updateValue = useCallback((newValue: string | null) => {
       setValue(newValue);
       storage.set(key, newValue);
     }, [key]);


     return [[isLoading,value], updateValue];


}