import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { Card } from '../../Component/Card';

export function AppointementDetail() {
  const route = useRoute();
  const { appointment } = route.params;

  const {
    doctor,
    status,
    appointment: appDetails,
    google_meet_link,
    client,
    ["slot_start_time||session_start_time"]: start,
    ["slot_end_time||session_end_time"]: end
  } = appointment;

  const formattedDate = new Date(appDetails.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Card>
          <Image
            source={require('../../../assets/images/Doctorperson1.jpg')}
            style={styles.image}
          />
        </Card>
        <View style={styles.wrapper1}>
          <View style={styles.wrapper3}>
            <Text style={styles.DoctorName}>Dr/{doctor} </Text>
            <Text style={styles.title3}>({appointment.specialty})</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Appointment Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}> 📅 {formattedDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Time Slot:</Text>
        <Text style={styles.value}> 🕒 {start} - {end}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Meet Link:</Text>
        <TouchableOpacity onPress={() => Linking.openURL(google_meet_link)}>
          <Text style={[styles.value, { color: '#007AFF' }]}>{google_meet_link}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


{/**
    
    <View style={styles.container}>
        <Card>
          <Image
            source={{ uri: doctor.image }}
            style={styles.image}
            progressiveRenderingEnabled={true}
            resizeMode="cover"
          />

        </Card>
        <View style={styles.wrapper1}>
          <View style={styles.wrapper3}>
            <Text style={styles.DoctorName}>{doctor.name}</Text>
          </View>
          <View style={styles.wrapper2}>
            <Text style={styles.title3}>
              {doctor.specialization?.length ? doctor.specialization.join(", ") : "Not specified"}
            </Text>
            <Text style={styles.title4}>({doctor.experience_year} years experience)</Text>
          </View>
          <View style={styles.starRatingContainer}>{generateStars(doctor.rate)}</View>
          <Text style={styles.title5}>{doctor.reviews || 0} + reviews</Text>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Doctor,</Text>
          <Text style={styles.aboutText}>{doctor.bio || "No information available."}</Text>
        </View>

        <View style={styles.cliniccontainer}>
          <Text style={styles.priceLabel}>Clinic Information:</Text>
          <View style={styles.wrapper2}>
            <Text style={styles.title3}>{doctor.clinicname}</Text>
            <Text style={styles.title4}>({doctor.clinicgovernate} - {doctor.clinicaddress})</Text>
          </View>
        </View>


        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Consultation Fee:</Text>
          <Text style={styles.priceValue}>${doctor.fees || "0.00"}</Text>
        </View>

        <View style={styles.bookButtonContainer}>
          <AppButton
            title="Book Appointment"
            wrapperStyle={styles.AppButton}
            titleStyle={styles.AppButtonTitle}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("BookAppointement", { doctor }));
            }}
          />
        </View>
      </View>
    
    */}