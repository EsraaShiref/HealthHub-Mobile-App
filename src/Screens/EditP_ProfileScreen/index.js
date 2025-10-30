import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export function EditProfileScreen() {
    const { user } = useUser();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        blood_type: '',
        weight: '',
        height: '',
        address: '',
        medical_history: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onCalendarPress = () => setShowDatePicker(true);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear().toString();
            setProfile(prev => ({
                ...prev,
                dobDay: day,
                dobMonth: month,
                dobYear: year,
            }));
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://10.0.2.2:8000/api/profile/show', {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                });

                const result = await response.json();

                if (result.status === 200) {
                    const data = result.data;

                    setProfile(prev => ({
                        ...prev,
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        gender: data.gender || '',
                        blood_type: data.blood_type || '',
                        weight: String(data.weight || ''),
                        height: String(data.height || ''),
                        address: data.notes || '',
                        medical_history: data.medical_history || '',
                    }));
                } else {
                    Alert.alert("Error", result.msg || "Failed to fetch profile");
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Something went wrong while fetching the profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/profile/update', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    gender: profile.gender,
                    blood_type: profile.blood_type,
                    weight: profile.weight,
                    height: profile.height,
                    notes: profile.address,
                    medical_history: profile.medical_history,
                })
            });

            const result = await response.json();

            if (result.status === 200) {
                Alert.alert("Success", "Profile updated successfully");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.msg || "Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong while updating the profile.");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={profile.name}
                    onChangeText={text => setProfile(prev => ({ ...prev, name: text }))}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={profile.email}
                    onChangeText={text => setProfile(prev => ({ ...prev, email: text }))}
                />

                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.phoneRow}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        keyboardType="phone-pad"
                        value={profile.phone}
                        onChangeText={text => setProfile(prev => ({ ...prev, phone: text }))}
                    />
                    <TouchableOpacity style={styles.changeBtn}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Gender</Text>
                <TextInput
                    style={styles.input}
                    placeholder="male / female"
                    value={profile.gender}
                    onChangeText={text => setProfile(prev => ({ ...prev, gender: text }))}
                />

                <Text style={styles.label}>Date of Birth</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="DD"
                        keyboardType="numeric"
                        value={profile.dobDay}
                        onChangeText={text => setProfile(prev => ({ ...prev, dobDay: text }))}
                    />
                    <TextInput
                        style={styles.dateInput}
                        placeholder="MM"
                        keyboardType="numeric"
                        value={profile.dobMonth}
                        onChangeText={text => setProfile(prev => ({ ...prev, dobMonth: text }))}
                    />
                    <TextInput
                        style={styles.dateInput}
                        placeholder="YYYY"
                        keyboardType="numeric"
                        value={profile.dobYear}
                        onChangeText={text => setProfile(prev => ({ ...prev, dobYear: text }))}
                    />
                    <TouchableOpacity onPress={onCalendarPress}>
                        <Icon name="calendar-today" size={24} color="#999" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                    style={styles.input}
                    value={profile.weight}
                    keyboardType="numeric"
                    onChangeText={text => setProfile(prev => ({ ...prev, weight: text }))}
                />

                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                    style={styles.input}
                    value={profile.height}
                    keyboardType="numeric"
                    onChangeText={text => setProfile(prev => ({ ...prev, height: text }))}
                />

                <Text style={styles.label}>Blood Group</Text>
                <TextInput
                    style={styles.input}
                    value={profile.blood_type}
                    placeholder="B+"
                    onChangeText={text => setProfile(prev => ({ ...prev, blood_type: text }))}
                />

                <Text style={styles.label}>Medical History</Text>
                <TextInput
                    style={styles.input}
                    value={profile.medical_history}
                    placeholder="e.g. Diabetes, Hypertension"
                    onChangeText={text => setProfile(prev => ({ ...prev, medical_history: text }))}
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={profile.address}
                    placeholder="Your address"
                    onChangeText={text => setProfile(prev => ({ ...prev, address: text }))}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.updateText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </>
    );
}

