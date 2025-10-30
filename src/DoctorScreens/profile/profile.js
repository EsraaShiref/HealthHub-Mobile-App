import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";
import styles from "./style";
import { Card } from "../../Component/Card";

export function DoctorInfoScreen() {
  const { user, setUser } = useUser();
  const token = user?.token;
  const navigation = useNavigation();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/api/profile/show", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.status === 200) {
          const data = response.data.data;

          setDoctor({
            image: data.image ? { uri: data.image } : null,
            name: data.name || "Unknown",
            email: data.email || "Email not available",
            specialty: data.specialties?.[0] || "Unknown Specialty",
            experience: data.experience_year
              ? `${data.experience_year} years experience`
              : "Experience not available",
          });
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        Alert.alert("Error", "Unable to load profile.");
      }
    };

    if (token) {
      fetchDoctor();
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setUser(null);

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        Alert.alert("Logout Failed", data.message || "Unknown error");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong during logout.");
    }
  };

  const handleDeleteUser = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch("http://10.0.2.2:8000/api/auth/user/delete", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });

              const data = await response.json();
              if (response.ok) {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("user");
                setUser(null);

                Alert.alert("Deleted", "Your account has been deleted.");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              } else {
                Alert.alert("Deletion Failed", data.message || "Unknown error");
              }
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Error", "Something went wrong during account deletion.");
            }
          },
        },
      ]
    );
  };

  if (!doctor) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image source={doctor.image} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate("Edit")}
          >
            <View style={styles.editIconInner}>
              <Icon name="pencil" size={14} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Dr. {doctor.name}</Text>
        <Text style={styles.location}>{doctor.email}</Text>
      </View>

      {/* Section: Profile Actions */}
      <Text style={styles.sectionTitle}>Profile Actions</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
          <Card style={styles.Card}>
            <Icon name="account-edit-outline" style={styles.icon} />
            <Text style={styles.text}>Edit Profile</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AddAppointment")}>
          <Card style={styles.Card}>
            <Icon name="calendar-plus" style={styles.icon} />
            <Text style={styles.text}>Create New Appointment</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("DoctorAppointments")}>
          <Card style={styles.Card}>
            <Icon name="clipboard-list-outline" style={styles.icon} />
            <Text style={styles.text}>My Appointments</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>
      </View>

      {/* Section: Settings */}
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
          <Card style={styles.Card}>
            <Icon name="lock-reset" style={styles.icon} />
            <Text style={styles.text}>Change Password</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Card style={styles.Card}>
            <Icon name="exit-to-app" style={styles.icon} />
            <Text style={styles.text}>Log Out</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteUser}>
          <Card style={[styles.Card]}>
            <Icon name="delete-outline"  style={styles.icon} />
            <Text style={[styles.text, { color: "red" }]}>Delete Account</Text>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}



