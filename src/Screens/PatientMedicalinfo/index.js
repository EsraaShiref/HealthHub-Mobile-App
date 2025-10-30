import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from "react-native-vector-icons/Ionicons";
import styles from './style';
import { useUser } from '../../context/UserContext';

export function MedicalInfoScreen() {
  const [activeTab, setActiveTab] = useState('Prescriptions');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const savedDoctors = user?.favorites || [];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/profile/show', {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (result.status === 200) {
          setProfile(result.data);
        } else {
          Alert.alert("Error", result.msg || "Failed to fetch profile");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const generateStars = (rate) => {
    const fullStars = Math.floor(rate);
    const emptyStars = 5 - fullStars;
    return (
      <View style={styles.starContainer}>
        {Array(fullStars).fill(null).map((_, index) => (
          <Icon1 key={`full-${index}`} name="star-sharp" style={styles.starFull} />
        ))}
        {Array(emptyStars).fill(null).map((_, index) => (
          <Icon1 key={`empty-${index}`} name="star-outline" style={styles.starOutline} />
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.infoGrid}>
        <InfoCard icon="gender-male" label="Gender" value={profile?.gender || "N/A"} color="#4E6AF3" />
        <InfoCard icon="blood-bag" label="Blood_Type" value={profile?.blood_type || "N/A"} color="#FF9E45" />
        <InfoCard icon="human-male-height-variant" label="Height" value={`${profile?.height || 'N/A'} cm`} color="#FF5C80" />
        <InfoCard icon="scale-bathroom" label="Weight" value={`${profile?.weight || 'N/A'} kg`} color="#6F6AF8" />
        <InfoCard icon="account-alert" label="Age" value={`${profile?.age || 'N/A'} years`} color="#F4A958" />
      </View>

      <View style={styles.section}>
        <View style={styles.tabsWrapper}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Prescriptions' && styles.activeTabItem]}
            onPress={() => setActiveTab('Prescriptions')}
          >
            <Text style={[styles.tabLabel, activeTab === 'Prescriptions' && styles.activeTabLabel]}>
              Prescriptions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Medical History' && styles.activeTabItem]}
            onPress={() => setActiveTab('Medical History')}
          >
            <Text style={[styles.tabLabel, activeTab === 'Medical History' && styles.activeTabLabel]}>
              Medical History
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {activeTab === 'Prescriptions' ? (
            <>
              <ProfileOption icon="file-document-outline" label="Prescriptions" />
              <ProfileOption icon="test-tube" label="Lab test report" />
            </>
          ) : (
            <>
              <ProfileOption icon="history" label="Surgery History" />
              <ProfileOption icon="medical-bag" label="Previous Conditions" />
            </>
          )}
        </View>
      </View>

      <View style={styles.savedDoctorsHeader}>
        <Text style={styles.sectionTitle}>Saved Doctors</Text>
      </View>

      {savedDoctors.length === 0 ? (
        <Text style={{ paddingHorizontal: 16, color: 'gray' }}>No saved doctors!!</Text>
      ) : (
        savedDoctors.map((doctor) => (
          <View style={styles.card1} key={doctor.id}>
            <Image
              source={doctor.image ? { uri: doctor.image } : null}
              style={styles.image}
            />
            <View style={styles.wrapper1}>
              <Text style={styles.DoctorName}>{doctor.name}</Text>
              <Text style={styles.wrapper2}>
                <Text style={styles.title3}>
                  {doctor.specialization?.join(", ") || "Not specified"}
                </Text>
                <Text style={styles.title4}> ({doctor.experience_year} years experience)</Text>
              </Text>
              {generateStars(doctor.rate)}
              <Text style={styles.title5}>{doctor.reviews} + reviews</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

function InfoCard({ icon, label, value, color }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={icon} size={22} color={color} />
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

function ProfileOption({ icon, label }) {
  return (
    <TouchableOpacity style={styles.option}>
      <Icon name={icon} size={22} color="#007AFF" />
      <Text style={styles.optionText}>{label}</Text>
      <Icon name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );
}
