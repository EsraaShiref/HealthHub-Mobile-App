import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DoctorButton } from "../../Component/DoctorButton/doctorButtons";
import { PatientComponent } from "../../Component/PatientInfo";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScaledSheet } from "react-native-size-matters";

export function Home() {
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [servedBookings, setServedBookings] = useState([]);
  const [onHoldCount, setOnHoldCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setpendingCount] = useState(1); // always 1
  const [CancelCount, setCancelCount] = useState(0);

  const fullName = user?.name || "Doctor";
  const firstName = fullName.split(" ")[0];
  const token = user?.token;

  const fetchDoctorProfile = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/profile/show", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data?.data) {
        const updatedUser = {
          ...user,
          name: data.data.name,
          image: data.data.image,
          email: data.data.email,
        };
        setUser(updatedUser);
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchDoctorAppointments = async () => {
    try {
      if (!token) return [];
      const response = await fetch(
        "http://10.0.2.2:8000/api/doctor/appointments/show",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok && data?.data) {
        setAppointments(data.data);
        return data.data;
      } else {
        return [];
      }
    } catch {
      return [];
    }
  };

  const fetchConfirmedBookingsForAllAppointments = async (appointmentsList) => {
    try {
      if (!token || appointmentsList.length === 0) return;
      let allConfirmed = [];
      for (const appointment of appointmentsList) {
        const url = `http://10.0.2.2:8000/api/BookingMangement/getConfirmedBookings/${appointment.id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && data?.data?.data?.[0]?.slots) {
          const slots = data.data.data[0].slots;
          allConfirmed = [...allConfirmed, ...slots];
        }
      }
      setConfirmedBookings(allConfirmed);
      setOnHoldCount(allConfirmed.length);
      await AsyncStorage.setItem(
        "confirmedBookingsArray",
        JSON.stringify(allConfirmed)
      );
    } catch {}
  };

  const fetchServedBookingsForAllAppointments = async (appointmentsList) => {
    try {
      if (!token || appointmentsList.length === 0) return;
      let allServed = [];
      for (const appointment of appointmentsList) {
        const url = `http://10.0.2.2:8000/api/BookingMangement/getServedBookings/${appointment.id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && data?.data?.data?.[0]?.slots) {
          const slots = data.data.data[0].slots;
          allServed = [...allServed, ...slots];
        }
      }
      setServedBookings(allServed);
      setCompletedCount(allServed.length);
      await AsyncStorage.setItem(
        "servedBookingsArray",
        JSON.stringify(allServed)
      );
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        await fetchDoctorProfile(); // Fetch and update user profile data
        const appointmentsList = await fetchDoctorAppointments();
        await fetchConfirmedBookingsForAllAppointments(appointmentsList);
        await fetchServedBookingsForAllAppointments(appointmentsList);
        setpendingCount(1); // ثابت
        const randomCancel = Math.floor(Math.random() * 4) + 2;
        setCancelCount(randomCancel);
      };
      init();
    }, [])
  );

  const counts = [onHoldCount, completedCount, pendingCount, CancelCount];

  const summaryData = [
    {
      icon: "beaker",
      label: "On Hold",
      bgColor: "#FFF5E1",
      iconColor: "#F6A609",
      navigateTo: () => navigation.navigate("Task", { activeTab: "OnHold" }),
    },
    {
      icon: "check-circle",
      label: "Completed",
      bgColor: "#E3F8ED",
      iconColor: "#00C566",
      navigateTo: () => navigation.navigate("Task", { activeTab: "Completed" }),
    },
    {
      icon: "progress-clock",
      label: "OnGoing",
      bgColor: "#E3EBFF",
      iconColor: "#3B5AFB",
    },
    {
      icon: "cancel",
      label: "Canceled",
      bgColor: "#EEE7F9",
      iconColor: "#9B51E0",
    },
  ];

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <PatientComponent
          name={`Dr/${firstName}`}
          image={
            user?.image
              ? { uri: user.image }
              : null
          }
        />

        <View style={Styles.taskWrapper}>
          <Text style={styles.title}>Appointments summary</Text>
          <View style={styles.grid}>
            {counts.map((count, index) => (
              <TouchableOpacity
                key={index}
                onPress={summaryData[index].navigateTo || (() => {})}
                style={[styles.card, { backgroundColor: summaryData[index].bgColor }]}
              >
                <View style={styles.iconBox}>
                  <Icon
                    name={summaryData[index].icon}
                    size={22}
                    color={summaryData[index].iconColor}
                  />
                </View>
                <Text style={styles.count}>{count}</Text>
                <Text style={styles.label}>{summaryData[index].label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={Styles.tiltle}>Data</Text>
        </View>

        <View style={Styles.databtns}>
          <DoctorButton
            name={"user"}
            title={"Edit Your Profile"}
            disc={"You Can Add More Info About You"}
            onpress={() => navigation.navigate("Profile")}
          />
          <DoctorButton
            name={"back-in-time"}
            title={"Show on Hold Medical Examination"}
            disc={`You Have ${onHoldCount} Confirmed Medical Examination`}
            onpress={() => navigation.navigate("Task", { activeTab: "OnHold" })}
          />
          <DoctorButton
            name={"check"}
            title={"Show Completed Medical Examination"}
            disc={`You Have ${completedCount} Served Medical Examination`}
            onpress={() => navigation.navigate("Task", { activeTab: "Completed" })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  title: {
    fontSize: "18@ms",
    fontWeight: "600",
    marginBottom: "12@vs",
    color: "#000",
    paddingHorizontal: "10@s",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: "10@s",
  },
  card: {
    width: "48%",
    borderRadius: "12@ms",
    padding: "16@ms",
    marginBottom: "10@vs",
  },
  iconBox: {
    marginBottom: "10@vs",
  },
  count: {
    fontSize: "22@ms",
    fontWeight: "bold",
    color: "#000",
  },
  label: {
    fontSize: "14@ms",
    color: "#888",
  },
});
