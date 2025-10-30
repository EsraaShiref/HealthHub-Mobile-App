// PatientProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { Card } from '../../Component/Card';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function PatientProfileScreen() {
  const { user, setUser } = useUser();
  const navigation = useNavigation();
  const token = user?.token;

  const [gender, setGender] = useState(null);

  // ✅ Fetch profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/profile/show', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await response.json();
        console.log('👤 Profile:', data);

        if (response.ok && data?.data?.gender) {
          setGender(data.data.gender);
        } else {
          console.warn('Failed to get gender');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  // ✅ اختر الصورة بناءً على النوع
  const displayImage =
    gender === 'female'
      ? require('../../../assets/images/Female_profile.png')
      : require('../../../assets/images/Male_profile.png');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setUser(null);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        Alert.alert('Logout Failed', data.message || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during logout.');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch('http://10.0.2.2:8000/api/auth/user/delete', {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });

              const data = await response.json();

              if (response.ok) {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
                setUser(null);

                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } else {
                Alert.alert('Delete Failed', data.message || 'Unknown error');
              }
            } catch (error) {
              Alert.alert('Error', 'Something went wrong while deleting your account.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image source={displayImage} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('edit')}
          >
            <View style={styles.editIconInner}>
              <Icon name="pencil" size={14} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.location}>{user?.email}</Text>
      </View>

      <Text style={styles.sectionTitle}>User Information</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('edit')}>
          <Card style={styles.Card}>
            <Icon name="account-circle-outline" style={styles.icon} />
            <Text style={styles.text}>Edit Your Profile</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MedicalInfo')}>
          <Card style={styles.Card}>
            <Icon name="heart-pulse" style={styles.icon} />
            <Text style={styles.text}>Medical Information</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AppoientementHistory')}>
          <Card style={styles.Card}>
            <Icon name="calendar-check" style={styles.icon} />
            <Text style={styles.text}>Appointment History</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <Card style={styles.Card}>
            <Icon name="lock-reset" style={styles.icon} />
            <Text style={styles.text}>Change your Password</Text>
            <Icon name="chevron-right" style={styles.icon1} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Card style={styles.Card}>
            <Icon name="exit-to-app" style={styles.icon} />
            <Text style={styles.text}>Log Out</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteAccount}>
          <Card style={styles.Card}>
            <Icon name="delete-outline" style={styles.icon} />
            <Text style={[styles.text, { color: 'red' }]}>Delete Your Account</Text>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
