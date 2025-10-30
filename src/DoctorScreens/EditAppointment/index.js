import styles from "./style";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditAppointmentScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { appointment } = useRoute().params;

  const [form, setForm] = useState({
    date: appointment.date,
    start_time: appointment.start_time,
    end_time: appointment.end_time,
    session_duration: appointment.session_duration,
    is_available: appointment.is_available,
    max_patients: String(appointment.max_patients),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      setForm((prev) => ({ ...prev, date: dateStr }));
    }
  };

  const getMinutes = (timeStr) => {
    const parts = timeStr.split(":");
    if (parts.length === 3) return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    return parseInt(timeStr); // fallback
  };

  const handleUpdate = async () => {
    const payload = {
      ...form,
      session_duration: getMinutes(form.session_duration),
      max_patients: Number(form.max_patients),
    };

    console.log("Request payload:", payload);

    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/doctor/appointments/update/${appointment.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        Alert.alert("Success", "Appointment updated successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", data.msg || JSON.stringify(data) || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Edit Appointment</Text>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Icon name="calendar-month" size={20} color="#3B5AFB" />
        <Text style={styles.inputText}> {form.date} </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={new Date(form.date)}
          onChange={handleDateChange}
        />
      )}

      {/* Time Inputs */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Start Time</Text>
          <TextInput
            style={styles.textInput}
            placeholder="HH:MM"
            keyboardType="numeric"
            value={form.start_time}
            onChangeText={(text) => setForm({ ...form, start_time: text })}
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>End Time</Text>
          <TextInput
            style={styles.textInput}
            placeholder="HH:MM"
            keyboardType="numeric"
            value={form.end_time}
            onChangeText={(text) => setForm({ ...form, end_time: text })}
          />
        </View>
      </View>

      {/* Session Duration */}
      <Text style={styles.label}>Session Duration (HH:MM:SS or Minutes)</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g., 00:30:00 or 30"
        keyboardType="numeric"
        value={form.session_duration}
        onChangeText={(text) => setForm({ ...form, session_duration: text })}
      />

      {/* Max Patients */}
      <Text style={styles.label}>Max Patients</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g., 5"
        keyboardType="numeric"
        value={form.max_patients}
        onChangeText={(text) => setForm({ ...form, max_patients: text })}
      />

      {/* Availability Switch */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>Is Available</Text>
        <Switch
          trackColor={{ false: "#ccc", true: "#3B5AFB" }}
          thumbColor={form.is_available ? "#fff" : "#fff"}
          value={form.is_available}
          onValueChange={(value) => setForm({ ...form, is_available: value })}
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.buttonText}>Update Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
