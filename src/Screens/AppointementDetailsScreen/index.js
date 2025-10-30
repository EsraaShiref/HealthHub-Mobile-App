import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    Alert,
    TouchableOpacity,
    Modal,
    Pressable,
    Linking,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppButton } from "../../Component/AppButton";
import axios from "axios";
import styles from "./style";
import { useUser } from "../../context/UserContext";

export function AppointementDetailsScreen() {
    const [visaNumber, setVisaNumber] = useState("");
    const [pin, setPin] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const doctor = route.params?.doctor;
    const selectedDate = route.params?.selectedDate;
    const selectedDayName = route.params?.selectedDayName;
    const selectedTime = route.params?.selectedTime;
    const selectedType = route.params?.selectedType;
    const appointmentId = route.params?.appointmentId;
    const { user } = useUser();
    const token = user?.token;
    const [loading, setLoading] = useState(false);
    const [meetingLink, setMeetingLink] = useState("");

    const handleContinueAndConfirm = () => {
        const trimmed = visaNumber.trim();
        const isValidVisa = /^\d{16}$/.test(trimmed);
        if (!isValidVisa) {
            Alert.alert("Invalid Visa", "Please enter a valid 16-digit Visa card number.");
            return;
        }
        setModalVisible(true);
    };

    const handlePinSubmit = () => {
        if (pin === "6005") {
            setModalVisible(false);
            handleConfirmAppointment();
        } else {
            Alert.alert("Incorrect PIN", "The PIN you entered is incorrect.");
        }
    };

    const handleConfirmAppointment = async () => {
        if (!appointmentId) {
            Alert.alert("Error", "Invalid appointment details.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.patch(
                `http://10.0.2.2:8000/api/Booking/bookAppointment/confirm/${appointmentId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer  ${token}`,
                    },
                }
            );

            if (response.data.status === 200) {
                const link = response.data.data.appointment.meeting_link;
                setMeetingLink(link);
                navigation.navigate("PaymentConfirmation", {
                    finalPayment: Number(doctor?.fees) || 0,
                    selectedDate,
                    selectedDayName,
                    selectedTime,
                    selectedType,
                    doctor,
                    link,
                });
            } else {
                Alert.alert("Confirmation Failed", response.data.message || "Unexpected response.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to confirm the appointment. Please try again.");
        }
        setLoading(false);
    };

    const handleStripePayment = async () => {
        try {
            const response = await axios.post(
                "http://10.0.2.2:8000/api/payment/process",
                {
                    amount: Number(doctor?.fees) || 0,
                    currency: "USD",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success && response.data.url) {
                Linking.openURL(response.data.url);
            } else {
                Alert.alert("Stripe Error", "Failed to create Stripe session.");
            }
        } catch (error) {
            console.error("Stripe Error:", error);
            Alert.alert("Stripe Error", "Something went wrong with Stripe.");
        }
    };

    const generateStars = (rate) => {
        const fullStars = Math.floor(rate);
        const emptyStars = 5 - fullStars;
        return (
            <View style={styles.starContainer}>
                {Array(fullStars).fill(null).map((_, index) => (
                    <Icon key={`full-${index}`} name="star-sharp" style={styles.starFull} />
                ))}
                {Array(emptyStars).fill(null).map((_, index) => (
                    <Icon key={`empty-${index}`} name="star-outline" style={styles.starOutline} />
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                {doctor?.image && <Image source={{ uri: doctor.image }} style={styles.image} />}
                <View style={styles.container1}>
                    <Text style={styles.DoctorName}>{doctor?.name}</Text>
                    <View style={styles.container2}>
                        <Text style={styles.specialty}>{doctor.specialization?.join(", ") || "Not specified"}</Text>
                        <Text style={styles.experience}>({doctor.experience_year} years experience)</Text>
                    </View>
                    <View style={styles.starRatingContainer}>{generateStars(doctor.rate)}</View>
                    <Text style={styles.title5}>{doctor.reviews || 0} + reviews</Text>
                </View>

                <View style={styles.appointmentContainer}>
                    <View style={styles.appointmentCard}>
                        <View style={styles.ccccc}>
                            <Icon name="calendar" size={18} color="#fff" style={styles.icon} />
                            <Text style={styles.dateText}>{selectedDayName}, {selectedDate}</Text>
                        </View>
                        <View style={styles.ccccc1}>
                            <Icon name="time" size={18} color="#fff" style={styles.icon} />
                            <Text style={styles.timeText}>{selectedTime}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.ccccc1}>
                    <Icon name="location" size={18} color="#fff" style={styles.icon} />
                    <Text style={styles.typeText}>{doctor?.clinicgovernate} - {doctor?.clinicaddress}</Text>
                </View>

                <View style={styles.paymentContainer}>
                    <Text style={styles.paymentLabel}>Total Payment :</Text>
                    <Text style={styles.paymentAmount}>${(Number(doctor?.fees) || 0).toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.totalPayment}>
                <Text style={styles.totalLabel}>Enter Visa Number</Text>
                <TouchableOpacity style={[styles.paymentOption, styles.selectedOption]}>
                    <Icon name="card-outline" size={24} color="#1a1aff" style={styles.paymentIcon} />
                    <Text style={styles.paymentText}>Visa</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Enter 16-digit Visa number"
                    keyboardType="numeric"
                    value={visaNumber}
                    onChangeText={setVisaNumber}
                    maxLength={16}
                />
            </View>

            <AppButton
                wrapperStyle={styles.payButton1}
                title={loading ? "Confirming..." : "Confirm The Appointment"}
                onPress={handleContinueAndConfirm}
                disabled={loading}
            />

            {/* ✅ Pay with Stripe Button */}
            <AppButton
                wrapperStyle={styles.payButton}
                title="Pay with Stripe"
                onPress={handleStripePayment}
            />

            {/* PIN Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Enter PIN</Text>
                        <TextInput
                            placeholder="Enter 4-digit PIN"
                            keyboardType="numeric"
                            secureTextEntry
                            maxLength={4}
                            value={pin}
                            onChangeText={setPin}
                            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Text style={{ color: '#FF4444' }}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handlePinSubmit}>
                                <Text style={{ color: '#3B5AFB', fontWeight: 'bold' }}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
