import React, { createContext, useState, useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../context/UserContext"; // import the hook

import AuthStack from "./Auth";
import { BottomTab } from "./BottomTab";
import AsyncStorage from '@react-native-async-storage/async-storage';

const printAllAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    console.log('🗂️ محتويات AsyncStorage:');
    result.forEach(([key, value]) => {
      console.log(`🔑 ${key}:`, value);
    });
  } catch (error) {
    console.error('❌ حصل خطأ أثناء طباعة AsyncStorage:', error);
  }
};


export function AppContainer() {
  useEffect(() => {
    printAllAsyncStorage();
  }, []);


  const { user, token, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
