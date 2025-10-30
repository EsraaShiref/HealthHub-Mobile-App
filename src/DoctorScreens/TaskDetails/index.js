import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { primary } from "../../utils/colors";

export function TaskDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingDetails } = route.params;
  const { user } = useUser();
  const token = user?.token;

  const [served, setServed] = useState(bookingDetails.served);
  const [loading, setLoading] = useState(false);

  const handleMarkAsServed = async () => {
    if (served) {
      Alert.alert("Already Served", "This booking has already been marked as served.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `http://10.0.2.2:8000/api/BookingMangement/markBookingAsServed/${bookingDetails.booking_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setServed(true);
        Alert.alert("Success", "Booking marked as served.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("OnHold", { refresh: true }); // ✅ الرجوع وتحديث الصفحة
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Error marking as served:", error?.response?.data || error.message);
      Alert.alert("Error", "Failed to update booking status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📝 Booking Details</Text>
      <View style={styles.detailBox}>
        <Text style={styles.label}>Client:</Text>
        <Text style={styles.value}>{bookingDetails.client?.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{bookingDetails.client?.email}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{bookingDetails.client?.phone}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{bookingDetails.appointment_date}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>
          {bookingDetails.slot_start_time} - {bookingDetails.slot_end_time}
        </Text>

        <Text style={styles.label}>Google Meet:</Text>
        <Text
          style={[styles.value, { color: "#3B82F6" }]}
          onPress={() => Linking.openURL(bookingDetails.google_meet_link)}
        >
          {bookingDetails.google_meet_link}
        </Text>

        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>
          {bookingDetails.doctor_name} ({bookingDetails.doctor_specialty})
        </Text>

        <Text style={styles.label}>Appointment Duration:</Text>
        <Text style={styles.value}>
          {bookingDetails.appointment_info?.start_time} -{" "}
          {bookingDetails.appointment_info?.end_time}
        </Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>
          {served ? "✅ Served" : "⏳ Not Served"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleMarkAsServed}
        style={[styles.button, served && { backgroundColor: "#ccc" }]}
        disabled={served || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {served ? "Already Served" : "Mark As Served"}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#3B5AFB",
  },
  detailBox: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    color: "#374151",
    marginTop: 10,
  },
  value: {
    color: "#1F2937",
    marginTop: 2,
    fontSize: 16,
  },
  button: {
    backgroundColor: primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
