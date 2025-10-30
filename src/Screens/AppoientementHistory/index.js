import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./style";
import { Card } from '../../Component/Card';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';


const API_BASE_URL = 'http://10.0.2.2:8000/api/Client/bookings';

export function AppoientementHistoryScreen() {
    const [activeTab, setActiveTab] = useState('Confirmed');
    const [appointments, setAppointments] = useState({ Confirmed: [], Pending: [], Served: [] });
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const token = user?.token;
    const navigation = useNavigation();


    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/${activeTab.toLowerCase()}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const json = await response.json();
                console.log(json)
                if (response.ok) {
                    const mappedData = json.data.data.map(item => ({
                        ...item,
                        doctor: item.doctor.name,
                        specialty: item.doctor.specialties?.[0] || '',
                        time: formatAppointmentTime(item),
                        status: capitalize(item.status),
                        image: require('../../../assets/images/Doctorperson1.jpg'),
                    }));

                    setAppointments(prev => ({ ...prev, [activeTab]: mappedData }));
                }
                else {
                    console.error('Error fetching appointments:', json.msg);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
            setLoading(false);
        };

        fetchAppointments();
    }, [activeTab]);

    const formatAppointmentTime = (item) => {
        const dateStr = item.appointment?.date;
        const start = item["slot_start_time||session_start_time"];
        const end = item["slot_end_time||session_end_time"];

        if (!dateStr || !start || !end) return 'Invalid date/time';

        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        return (
            <View>
                <Text style={styles.time}>{`📅 ${formattedDate}`}</Text>
                <Text style={styles.time}>{`🕒 ${start} - ${end}`}</Text>
            </View>
        )
    };


    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <View style={styles.container}>
            <View style={styles.tabsWrapper}>
                {['Confirmed', 'Pending', 'Served'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView style={styles.listWrapper} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}>
                    {appointments[activeTab].map(app => (
                        <TouchableOpacity
                            key={app.id}
                            onPress={() => navigation.navigate('AppointementDetail', { appointment: app })}
                        >

                            <Card style={styles.appointmentCard}>
                                <Image source={app.image} style={styles.doctorImage} />
                                <View style={styles.details}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.doctorName}>{app.doctor}</Text>
                                        <Text style={styles.specialty}>({app.specialty})</Text>
                                    </View>
                                    <Text style={styles.time}>{app.time}</Text>
                                    <Text style={[styles.status, getStatusStyle(app.status)]}>{app.status}</Text>
                                </View>
                                <Icon name="chevron-right" size={24} color="#ccc" />
                            </Card>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
            )}
        </View>
    );
}

function getStatusStyle(status) {
    switch (status) {
        case 'Confirmed': return { color: '#4CD964' };  // Green
        case 'Pending': return { color: '#FF9500' };    // Orange
        case 'Served': return { color: '#007AFF' };     // Blue
        default: return { color: 'gray' };
    }
};

{/**
    
    navigation.navigate("AppointementDetails", {
          doctor,
          selectedDate,
          selectedDayName,
          selectedTime,
          selectedType: "In Clinic",
          appointmentId: response.data.data.id,
        });
    
    */}