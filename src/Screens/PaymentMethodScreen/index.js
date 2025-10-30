import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import styles from "./style";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppButton } from "../../Component/AppButton";
import Ionicons from 'react-native-vector-icons/Ionicons';

const paymentMethods = [
    { id: 1, name: "Visa", icon: "card-outline", color: "#1a1aff" },
    { id: 2, name: "PayPal", icon: "logo-paypal", color: "#003087" },
    { id: 3, name: "MasterCard", icon: "card-outline", color: "#eb001b" },
    { id: 4, name: "Apple Pay", icon: "logo-apple", color: "#000000" }
];

export function PaymentMethodScreen(props) {
    const route = useRoute();
    const { totalCost, discount, finalPayment } = route.params;
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const navigation = useNavigation();
    const doctor = route.params?.doctor;
    const selectedDate = route.params?.selectedDate;
    const selectedDayName = route.params?.selectedDayName;
    const selectedTime = route.params?.selectedTime;
    const selectedType = route.params?.selectedType;
    const appointmentId = route.params?.appointmentId;

    const handleInputChange = (methodId, text) => {
        setInputValues({ ...inputValues, [methodId]: text });
    };

    const handleContinue = () => {
        if (selectedMethod === null) {
            Alert.alert("Payment Method Required", "Please select a payment method.");
            return;
        }
        const inputValue = inputValues[selectedMethod];
        if (!inputValue || inputValue.length < 6) {
            Alert.alert("Invalid Input", "Please enter a valid payment number with at least 6 digits.");
            return;
        }
        navigation.navigate("AppointementDetails", {
            doctor,
            selectedDate,
            selectedDayName,
            selectedTime,
            selectedType,
            appointmentId,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.card}>
                <View style={styles.Cost}>
                    <Text style={styles.CostText}>Cost</Text>
                    <Text style={styles.CostText}>${Number(doctor?.fees) || 0}</Text>
                </View>
                <View style={styles.Cost}>
                    <Text style={styles.CostText}>Discount</Text>
                    <Text style={styles.CostText}>- ${discount}</Text>
                </View>
                <View style={styles.Cost}>
                    <Text style={styles.CostText1}>Total </Text>
                    <Text style={styles.CostText1}>${finalPayment}</Text>
                </View>

                {/* Payment Method Selection */}
                <View style={styles.totalPayment}>
                    <Text style={styles.totalLabel}>Select Payment Method</Text>

                    {paymentMethods.map((method) => (
                        <View key={method.id}>
                            <TouchableOpacity
                                style={[
                                    styles.paymentOption,
                                    selectedMethod === method.id && styles.selectedOption
                                ]}
                                onPress={() => setSelectedMethod(method.id)}
                            >
                                <Ionicons name={method.icon} size={24} color={method.color} style={styles.paymentIcon} />
                                <Text style={styles.paymentText}>{method.name}</Text>
                            </TouchableOpacity>

                            {selectedMethod === method.id && (
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Enter ${method.name} number`}
                                    keyboardType="numeric"
                                    value={inputValues[method.id] || ""}
                                    onChangeText={(text) => handleInputChange(method.id, text)}
                                />
                            )}
                        </View>
                    ))}

                    {/* Continue Button */}
                    <AppButton wrapperStyle={styles.proceedButton} title="Continue"
                        onPress={handleContinue}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
