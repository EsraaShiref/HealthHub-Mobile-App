import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import { Styles } from "./styles";
import { primary1 } from "../../utils/colors";
import { Card } from "../../Component/Card";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { TabSwitcher } from "../../Component/TabSwitcher";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function OnHold() {
  const { user } = useUser();
  const token = user?.token;
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // ✅ لمعرفة متى يتم الرجوع للصفحة

  const [bookings, setBookings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("OnHold");

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const fetchConfirmedBookings = async () => {
  setLoading(true);

  if (!token) {
    Alert.alert("Error", "Token is missing.");
    return;
  }

  try {
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
    setAppointments(appointments);

    if (appointments.length === 0) {
      setLoading(false);
      return;
    }

    const allConfirmed = [];

    for (const appointment of appointments) {
      try {
        const confirmedResponse = await axios.get(
          `http://10.0.2.2:8000/api/BookingMangement/getConfirmedBookings/${appointment.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const confirmedData = confirmedResponse.data?.data?.data || [];

        for (const booking of confirmedData) {
          booking.slots.forEach((slot) => {
            allConfirmed.push({
              booking_id: slot.booking_id,
              appointment_id: booking.appointment_id,
              doctor_name: booking.doctor?.name || "Unknown",
              doctor_specialty: booking.doctor?.specialties?.[0] || "",
              slot_start_time: slot.slot_start_time,
              slot_end_time: slot.slot_end_time,
              google_meet_link: slot.google_meet_link,
              client: slot.clients?.[0],
              appointment_date: appointment.date,
              served: booking.served || false,
              appointment_info: booking.appointment, // start, end, capacity
            });
          });
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          // ❗️ مش مشكلة، معناها مفيش حجوزات مؤكدة للميعاد ده
          console.warn(
            `🔎 No confirmed bookings for appointment ID ${appointment.id}`
          );
        } else {
          console.error("❌ Error fetching confirmed bookings:", error);
        }
      }
    }

    await AsyncStorage.setItem(
      "onHoldBookingsCount",
      JSON.stringify(allConfirmed.length)
    );
    setBookings(allConfirmed);
  } catch (error) {
    console.error("❌ Main fetch error:", error);
  } finally {
    setLoading(false);
  }
};


  // ✅ إعادة تحميل البيانات عند رجوع الصفحة
  useEffect(() => {
    if (isFocused && activeTab === "OnHold") {
      fetchConfirmedBookings();
    }
  }, [isFocused, token, activeTab]);

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TaskDetail", { bookingDetails: item })}
    >
      <Card
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 14,
          padding: 12,
          borderRadius: 16,
          marginHorizontal: 12,
        }}
      >
        <Image
          source={require("../../../assets/images/person.jpg")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginRight: 12,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1F2937" }}>
            {item.client?.name || "Unknown"}
          </Text>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>
            📅 {formatDate(item.appointment_date)}
          </Text>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>
            🕒 {item.slot_start_time} - {item.slot_end_time}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: primary1,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 13 }}>
            View Details
          </Text>
        </View>

      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Styles.container}>
      <TabSwitcher
        tabs={["Completed", "OnHold"]}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "Completed") {
            navigation.navigate("CompletedTasks");
          }
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={primary1} />
      ) : bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item, index) =>
            `${item.appointment_id}-${item.slot_start_time}`
          }
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          {appointments.length === 0
            ? "No appointments available at the moment"
            : "No confirmed bookings found"}
        </Text>
      )}
    </SafeAreaView>
  );
}
