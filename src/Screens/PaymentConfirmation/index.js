import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export function PaymentConfirmationScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const doctor = route.params?.doctor;
    const selectedDate = route.params?.selectedDate;
    const selectedDayName = route.params?.selectedDayName;
    const selectedTime = route.params?.selectedTime;
    const finalPayment = route.params?.finalPayment ?? 0;  // Ensure it's always a number
    const meetingLink = route.params?.link;  // استخدم `link` مباشرة هنا

    console.log("Route Params:", route.params);  // Debugging log

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name="checkmark-circle" size={60} color="white" style={styles.icon} />
                <Text style={styles.message}>
                    Your appointment has been booked with{" "}
                    <Text style={styles.doctorName}> Dr. {doctor?.name}</Text>.
                </Text>

                {/* Appointment Details */}
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeItem}>
                        <Ionicons name="calendar" size={20} color="white" />
                        <Text style={styles.dateTimeText}>{selectedDayName}, {selectedDate}</Text>
                    </View>
                    <View style={styles.dateTimeItem}>
                        <Ionicons name="time" size={20} color="white" />
                        <Text style={styles.dateTimeText}>{selectedTime}</Text>
                    </View>
                </View>
                {/* Appointment Type */}
                <View style={styles.ccccc1}>
                    <Ionicons name="location" size={18} color="#fff" style={styles.icon} />
                    <Text style={styles.typeText}>{doctor?.clinicgovernate} - {doctor?.clinicaddress}</Text>
                </View>

                {/* Total Payment Section */}
                <View style={styles.paymentContainer}>
                    <Text style={styles.paymentLabel}>Total Payment :</Text>
                    <Text style={styles.paymentAmount}>${finalPayment.toFixed(2)}</Text>
                </View>

                {/* Display the meeting link if available */}
                {meetingLink && (
                    <View style={styles.meetingLinkContainer}>
                        <Text style={styles.meetingLinkText}>Meeting Link: </Text>
                        <TouchableOpacity onPress={() => Linking.openURL(meetingLink)}>
                            <Text style={styles.meetingLink}>{meetingLink}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button}
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }], // This ensures only "Home" remains in the stack
                    });
                }}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>

        </View>
    );
}
