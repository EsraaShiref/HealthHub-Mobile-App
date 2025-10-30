import React, { useState, useEffect } from "react";
import {
  View, Text, Image, TouchableOpacity, ScrollView, FlatList,
  ActivityIndicator, Alert
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppButton } from "../../Component/AppButton";
import axios from "axios";
import style from "./style";
import { useUser } from "../../context/UserContext";


export function BookAppointementScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const doctor = route.params?.doctor;
  const { user } = useUser();
  const token = user?.token;
  console.log(token)

  if (!doctor) {
    return (
      <View style={style.container}>
        <Text>No doctor data available</Text>
      </View>
    );
  }

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayName, setSelectedDayName] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsData, setSlotsData] = useState({});
  const [bookingLoading, setBookingLoading] = useState(false);

  const dates = doctor.appointments || [];

  useEffect(() => {
    fetchSlotsForAllDates();
  }, []);

  useEffect(() => {
    if (selectedDateId) {
      fetchAvailableSlots(selectedDateId);
    }
  }, [selectedDateId]);

  const fetchSlotsForAllDates = async () => {
    let slotsMap = {};
    for (let date of dates) {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/api/Booking/availableSlots/${date.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        // Count only slots where available is true
        const availableSlotsCount = response.data.data.filter(slot => slot.available).length;
        slotsMap[date.id] = availableSlotsCount;

      } catch (error) {
        console.error(`Error fetching slots for date ${date.id}:`, error);
        slotsMap[date.id] = 0;
      }
    }
    setSlotsData(slotsMap);
  };

  const fetchAvailableSlots = async (dateId) => {
    setLoadingSlots(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/Booking/availableSlots/${dateId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // Filter only available slots
      const filteredSlots = response.data.data.filter(slot => slot.available);
      setAvailableSlots(filteredSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    }
    setLoadingSlots(false);
  };


  const handleBooking = async () => {
    if (!selectedDateId || !selectedTime) {
      Alert.alert("Error", "Please select a date and time before booking.");
      return;
    }

    setBookingLoading(true);

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/Booking/bookAppointment",
        {
          doctor_id: doctor.id,
          appointment_id: selectedDateId,
          slot_start_time: selectedTime,
        },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      console.log("Booking Response:", response.data);

      if (response.data.status === 200) {
        console.log("Success", "Your appointment has been booked successfully!");

        // Remove the booked slot from available slots
        setAvailableSlots(prevSlots =>
          prevSlots.filter(slot => slot.time !== selectedTime)
        );

        // Refresh available slots
        fetchSlotsForAllDates();

        // Navigate to Appointment Details screen with the booked details
        navigation.navigate("AppointementDetails", {
          doctor,
          selectedDate,
          selectedDayName,
          selectedTime,
          selectedType: "In Clinic",
          appointmentId: response.data.data.id,
        });
        console.log("Booking Response:", response.data.data);
      } else {
        Alert.alert("Booking Failed", "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      Alert.alert("Booking Failed", "Something went wrong. Please try again later.");
    }

    setBookingLoading(false);
  };

  const generateStars = (rate) => {
    const fullStars = Math.floor(rate);
    const emptyStars = 5 - fullStars;
    return (
      <View style={style.starContainer}>
        {Array(fullStars).fill(null).map((_, index) => (
          <Icon key={`full-${index}`} name="star-sharp" style={style.starFull} />
        ))}
        {Array(emptyStars).fill(null).map((_, index) => (
          <Icon key={`empty-${index}`} name="star-outline" style={style.starOutline} />
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.card}>
        <Image source={{ uri: doctor.image }} style={style.image} />
        <View style={style.wrapper1}>
          <Text style={style.DoctorName}>{doctor.name}</Text>
          <Text style={style.wrapper2}>
            <Text style={style.title3}>
              {doctor.specialization?.join(", ") || "Not specified"}
            </Text>
            <Text style={style.title4}> ({doctor.experience_year} years experience)</Text>
          </Text>
          {generateStars(doctor.rate)}
          <Text style={style.title5}>{doctor.reviews} + reviews</Text>
        </View>
      </View>

      <View style={style.section}>
        <Text style={style.sectionTitle}>Available Dates</Text>
        {dates.length === 0 ? (
          <Text style={style.noAppointments}>No available appointments</Text>
        ) : (
          <FlatList
            horizontal
            data={dates}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isActive = selectedDate === item.date;
              return (
                <TouchableOpacity
                  style={[style.dateButton, isActive && style.activeDate]}
                  onPress={() => {
                    setSelectedDate(item.date);
                    setSelectedDayName(item.day);
                    setSelectedTime(null);
                    setSelectedDateId(item.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[style.dateText, isActive && style.activeDateText]}>
                    {item.date}
                  </Text>
                  <Text style={[style.slotText, isActive && style.activeSlotText]}>
                    {item.day} | {slotsData[item.id] ?? "Loading..."} slots available
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View style={style.section}>
        <Text style={style.sectionTitle}>Time Slot</Text>
        {loadingSlots ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : availableSlots.length > 0 ? (
          <View style={style.grid}>
            {availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[style.timeButton, selectedTime === slot.time && style.activeTime]}
                onPress={() => setSelectedTime(slot.time)}
                activeOpacity={0.6}
              >
                <Text style={[style.timeText, selectedTime === slot.time && style.activeText]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={style.noSlots}>No slots available</Text>
        )}
      </View>

      <AppButton title="Contact Clinic" wrapperStyle={style.contactButton} titleStyle={style.contactText} />
      <AppButton title="Book Appointment" wrapperStyle={style.bookButton} disabled={!selectedTime || bookingLoading} onPress={handleBooking} />
    </ScrollView>
  );
}



{/*
  http://localhost:8000/api/Booking/bookAppointment

  Bearer 16|evj7hNJvXw82IL6DMBAxYap13RslxShzoctqNtYWcc5c5fda
  */}