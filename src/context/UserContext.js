import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clearAsyncStorageIfDevReload = async () => {
      if (__DEV__) {
        await AsyncStorage.clear();
        console.log("🔁 AsyncStorage cleared due to dev reload");
      }
    };

    clearAsyncStorageIfDevReload();

    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          console.log("📦 Loaded user from storage:", parsed);
        }
      } catch (error) {
        console.error("❌ Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const setAndStoreUser = async (userDataUpdater) => {
    try {
      const updatedUser = typeof userDataUpdater === 'function' ? userDataUpdater(user) : userDataUpdater;
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("✅ User saved to AsyncStorage:", updatedUser);
    } catch (error) {
      console.error("❌ Error storing user:", error);
    }
  };
  // بعد setUser وداخل UserProvider
  const addFavoriteDoctor = async (doctor) => {
    const fullDoctorData = {
      ...doctor,
      specialization: doctor.specialization || [],
      experience_year: doctor.experience_year || 0,
      rate: doctor.rate || 0,
      reviews: doctor.reviews || 0,
    };
  
    const updatedUser = {
      ...user,
      favorites: user?.favorites ? [...user.favorites, fullDoctorData] : [fullDoctorData],
    };
    setUser(updatedUser);
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
  };
  

const removeFavoriteDoctor = async (doctorId) => {
  const updatedUser = {
    ...user,
    favorites: user?.favorites?.filter((doc) => doc.id !== doctorId) || [],
  };
  setUser(updatedUser);
  await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
};


  return (
    <UserContext.Provider value={{ user, setUser: setAndStoreUser, loading , addFavoriteDoctor, removeFavoriteDoctor }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
