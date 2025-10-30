import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useUser } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { validateConfirmPassword, validatePassword } from '../../DoctorScreens/Signup/functions';


export function ChangePasswordScreen() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');



    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const token = user?.token;
    const navigation = useNavigation();


    const handleNewPasswordChange = (text) => {
        setNewPassword(text);
        if (!validatePassword(text)) {
            setPasswordError('Password must be at least 8 characters and contain one uppercase and one lowercase letter');
        } else {
            setPasswordError('');
        }

        // أيضاً تحقق من تأكيد الباسورد عندما تتغير الباسورد
        if (confirmPassword && !validateConfirmPassword(text, confirmPassword)) {
            setConfirmError('Passwords do not match');
        } else {
            setConfirmError('');
        }
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (!validateConfirmPassword(newPassword, text)) {
            setConfirmError('Passwords do not match');
        } else {
            setConfirmError('');
        }
    };

    const handleChangePassword = async () => {

        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        if (!validatePassword(newPassword)) {
            Alert.alert('Error', 'Password must be at least 8 characters and contain one uppercase and one lowercase letter');
            return;
        }

        if (!validateConfirmPassword(newPassword, confirmPassword)) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://10.0.2.2:8000/api/profile/changePassword', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPassword_confirmation: confirmPassword
                })
            });

            const data = await response.json();
            console.log(response);

            if (response.ok) {
                Alert.alert('Success', 'Password changed successfully');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            } else {
                Alert.alert('Error', data.message || 'Failed to change password');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error');
            console.error(error);
        }
        setLoading(false);
    };


    const renderPasswordInput = (label, value, onChangeText, secure, toggleSecure) => (
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder={label}
                secureTextEntry={!secure}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleSecure}>
                <Icon name={secure ? 'eye-off' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>

            {renderPasswordInput("Old Password", oldPassword, setOldPassword, showOld, () => setShowOld(!showOld))}

            {renderPasswordInput("New Password", newPassword, handleNewPasswordChange, showNew, () => setShowNew(!showNew))}
            {passwordError ? <Text style={styles.warn}>{passwordError}</Text> : null}

            {renderPasswordInput("Confirm New Password", confirmPassword, handleConfirmPasswordChange, showConfirm, () => setShowConfirm(!showConfirm))}
            {confirmError ? <Text style={styles.warn}>{confirmError}</Text> : null}



            <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Change Password'}</Text>
            </TouchableOpacity>
        </View>
    );
}
