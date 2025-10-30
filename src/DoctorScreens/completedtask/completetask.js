import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Text,
  Image,
  BackHandler,
} from "react-native";
import axios from "axios";
import { Styles } from "./styles";
import { primary } from "../../utils/colors";
import { Card } from "../../Component/Card";
import { useNavigation } from "@react-navigation/native";
import { TabSwitcher } from "../../Component/TabSwitcher";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CompletedTasks() {
  const { user } = useUser();
  const token = user?.token;
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Completed");

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchAppointmentsAndBookings = async () => {
      setLoading(true);

      try {
        if (!token) {
          Alert.alert("Error", "Token is missing.");
          return;
        }

        const appointmentRes = await axios.get(
          "http://10.0.2.2:8000/api/doctor/appointments/show",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const appointments = appointmentRes?.data?.data || [];
        const allBookings = [];

        for (const appointment of appointments) {
          try {
            const res = await axios.get(
              `http://10.0.2.2:8000/api/BookingMangement/getServedBookings/${appointment.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
              }
            );

            const served = res?.data?.data?.data || [];

            // ✅ فلتر البيانات السليمة بس: فيها slots وفيها clients
            const valid = served.filter(
              (b) =>
                Array.isArray(b.slots) &&
                b.slots.some(
                  (slot) =>
                    Array.isArray(slot.clients) && slot.clients.length > 0
                )
            );

            const withAppointment = valid.map((b) => ({
              ...b,
              appointment: {
                ...appointment,
              },
            }));

            allBookings.push(...withAppointment);
          } catch (innerError) {
            if (innerError?.response?.status === 404) {
              console.log(`ℹ️ No served bookings for appointment ID ${appointment.id}`);
            } else {
              console.error("🔴 Error fetching served bookings:", innerError.message);
            }
          }
        }

        const completedCount = allBookings.length;
        await AsyncStorage.setItem('completedBookingsCount', completedCount.toString());
        setBookings(allBookings);
      } catch (error) {
        console.error("❌ Fetch error:", error.message);
        Alert.alert("Error", "Failed to fetch completed tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndBookings();

    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeStack" }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [activeTab]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} keyboardShouldPersistTaps="handled">
      <SafeAreaView style={Styles.container}>
        <TabSwitcher
          tabs={["Completed", "OnHold"]}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            navigation.navigate(tab === "Completed" ? "CompletedTasks" : "OnHold");
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color={primary} />
        ) : bookings.length > 0 ? (
          bookings.map((booking, i) => (
            <View key={i} style={{ marginBottom: 25, paddingHorizontal: 12 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8, color: primary }}>
                📅 {formatDate(booking.appointment?.date)}
              </Text>

              {booking.slots.map((slot, index) =>
                Array.isArray(slot.clients) && slot.clients.map((client, idx) => (
                  <Card key={`${i}-${index}-${idx}`} style={Styles.card}>
                    <Image
                      source={require("../../../assets/images/person.jpg")}
                      style={Styles.img}
                    />
                    <View style={Styles.cont}>
                      <View style={{ paddingLeft: 6 }}>
                        <Text style={Styles.clientname}>{client.name}</Text>
                        <Text style={Styles.clientmail}>📧 {client.email}</Text>
                        <Text style={Styles.clientmail}>📞 {client.phone}</Text>
                      </View>
                      <View style={Styles.timeCont}>
                        <Text style={Styles.Timetxt}>
                          🕒 {slot.slot_start_time} - {slot.slot_end_time}
                        </Text>
                      </View>
                    </View>
                  </Card>
                ))
              )}
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No completed tasks found
          </Text>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
