import styles from "./style";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";

export function AddAppointmentScreen() {
  const { user } = useUser();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    date: new Date(),
    start_time: "",
    end_time: "",
    session_duration: "",
    is_available: true,
    max_patients: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setForm((prev) => ({ ...prev, date: selectedDate }));
    }
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    const payload = {
      date: formatDate(form.date),
      start_time: form.start_time,
      end_time: form.end_time,
      session_duration: parseInt(form.session_duration),
      is_available: form.is_available,
      max_patients: parseInt(form.max_patients),
    };

    try {
      const response = await fetch("http://10.0.2.2:8000/api/doctor/appointments/store", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("✅ Success", "Appointment added successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("❌ Error", data?.msg || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("❌ Error", "Failed to add appointment");
      console.error("Add Error", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Add New Appointment</Text>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Icon name="calendar-month" size={20} color="#3B5AFB" />
        <Text style={styles.dateText}> {formatDate(form.date)} </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      {/* Start & End Time */}
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Start Time</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 09:00"
            keyboardType="numeric"
            value={form.start_time}
            onChangeText={(text) => setForm({ ...form, start_time: text })}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>End Time</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 12:00"
            keyboardType="numeric"
            value={form.end_time}
            onChangeText={(text) => setForm({ ...form, end_time: text })}
          />
        </View>
      </View>

      {/* Session Duration */}
      <Text style={styles.label}>Session Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 30"
        keyboardType="numeric"
        value={form.session_duration}
        onChangeText={(text) => setForm({ ...form, session_duration: text })}
      />

      {/* Max Patients */}
      <Text style={styles.label}>Max Patients</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 4"
        keyboardType="numeric"
        value={form.max_patients}
        onChangeText={(text) => setForm({ ...form, max_patients: text })}
      />

      {/* Availability Switch */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>Is Available</Text>
        <Switch
          trackColor={{ false: "#ccc", true: "#3B5AFB" }}
          thumbColor="#fff"
          value={form.is_available}
          onValueChange={(value) => setForm({ ...form, is_available: value })}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
