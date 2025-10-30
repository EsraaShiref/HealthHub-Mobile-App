import styles from "./style";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function DoctorAppointments() {
  const { user } = useUser();
  const navigation = useNavigation();
  const token = user?.token;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true); // تأكد إن التحميل يشتغل مع كل ريفريش
      const response = await fetch("http://10.0.2.2:8000/api/doctor/appointments/show", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data?.data) {
        setAppointments(data.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/doctor/appointments/destroy/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAppointments((prev) => prev.filter((item) => item.id !== id));
        Alert.alert("Deleted", "Appointment deleted successfully.");
      } else {
        Alert.alert("Error", data.msg || "Something went wrong.");
      }
    } catch {
      Alert.alert("Error", "Failed to delete appointment.");
    }
  };

  const confirmDelete = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this appointment?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteAppointment(id) },
    ]);
  };

  // ⚡️ Fetch data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B5AFB" />
        <Text style={styles.loadingText}>Loading Appointments...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noData}>No appointments available.</Text>
      ) : (
        appointments.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>
                <Icon name="calendar" size={16} /> {item.date}
              </Text>
              <View style={styles.iconGroup}>
                <TouchableOpacity onPress={() => navigation.navigate("EditAppointmentScreen", { appointment: item })}>
                  <Icon name="pencil" size={20} color="#3B5AFB" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)} style={{ marginLeft: 10 }}>
                  <Icon name="delete" size={20} color="#FF4D4D" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.detail}><Icon name="clock-outline" size={16} /> {item.start_time} - {item.end_time}</Text>
            <Text style={styles.detail}><Icon name="timer-outline" size={16} /> Duration: {item.session_duration}</Text>
            <Text style={styles.detail}><Icon name="account-multiple-outline" size={16} /> Max Patients: {item.max_patients}</Text>
            <Text style={styles.detail}>
              <Icon name="check-circle" size={16} color="#00C566" /> {item.is_available ? "Available" : "Not Available"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
