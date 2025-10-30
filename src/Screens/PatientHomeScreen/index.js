import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { PatientComponent } from "../../Component/PatientInfo";
import SwipeableSection from "../../Component/Articles";
import { DepartmentComponent } from "../../Component/Department";
import { DoctorButton } from "../../Component/Doctor";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";

// Patient Home Screen
export function PatientHomeScreen() {
  const { user } = useUser();
  const token = user?.token;

  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const navigation = useNavigation();
  const sections = [{ key: "1" }];

  // Restore tab bar when returning to Home
  useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({ tabBarStyle: { display: "flex" } });
    }

    const unsubscribe = navigation.addListener("focus", () => {
      if (parent) {
        parent.setOptions({ tabBarStyle: { display: "flex" } });
      }
    });

    return unsubscribe;
  }, [navigation]);

  // 🔵 Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8000/api/profile/show", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        console.log("👤 Profile response:", data);

        if (response.ok && data?.data) {
          setProfileData(data.data);

          // اختيار الصورة حسب الجندر
          const genderImage =
            data.data.gender?.toLowerCase() === "female"
              ? require("../../../assets/images/Female_profile.png")
              : require("../../../assets/images/Male_profile.png");

          setProfileImage(genderImage);
        } else {
          console.warn("❗️Failed to load profile:", data);
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <FlatList
      data={sections}
      renderItem={() => null}
      ListHeaderComponent={
        <View>
          <PatientComponent
            name={profileData?.name || ""}
            image={profileImage}
          />
          <SwipeableSection />
          <DepartmentComponent />
          <DoctorButton
            Header="Popular Doctors"
            text="See All"
            Searchbar={false}
            token={token}
          />
        </View>
      }
    />
  );
}
