import React, { useState, useEffect, useRef } from "react";
import { Image, Text, View, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./Style";
import { PlatformTouchable } from "../PlatformTouchable";
import Icon from "react-native-vector-icons/Ionicons";
import { Card } from "../Card";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useUser } from "../../context/UserContext";


export function DoctorButton({ Header, text, Headerstyle, Searchbar }) {
  const [dates, setDates] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { user, addFavoriteDoctor, removeFavoriteDoctor } = useUser();
  const favourites = user?.favorites || [];
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const searchTimeout = useRef(null); // Initialize a ref to hold the timeout
  const token = user?.token;
  // console.log(token)


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/api/Doctor/allDoctors", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const initializedDoctors = response.data.data.data.map((doctor) => ({
            ...doctor,
            rate: doctor.rate ?? Math.floor(Math.random() * 5) + 1,
            reviews: doctor.reviews ?? Math.floor(Math.random() * 1000),
            experience: doctor.experience_year,
          }));
          setDoctors(initializedDoctors);
        }
      } catch (error) {
        setError("Failed to fetch doctors. Check your connection.");
        console.log("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDoctors();
    } else {
      setError("Token is missing. Please log in again.");
      setLoading(false);
    }
  }, [token]);

  const handleDoctorPress = async (doctor) => {
    console.log(doctor)
    const doctorInfo = await fetchDoctorInfo(doctor.id);
    if (doctorInfo) {
      navigation.navigate("DoctorInfo", {
        doctor: {
          ...doctorInfo,
          rate: doctor.rate,
          reviews: doctor.reviews,
          image: doctor.image ,
          experience_year: doctor.experience_year,
        }
      });
    } else {
      alert("Failed to load doctor information.");
    }
  };

  const fetchDoctorInfo = async (doctorId) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/Doctor/showDoctorInfo/${doctorId}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.status === 200 ? response.data.data : null;
    } catch (error) {
      console.log("Error fetching doctor info:", error);
      return null;
    }
  };

  const showDatePicker = (doctorId) => {
    setSelectedDoctor(doctorId);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDates((prevDates) => ({
      ...prevDates,
      [selectedDoctor]: selectedDate,
    }));
    hideDatePicker();
  };

  const toggleFavourite = (doctor) => {
    const isFav = favourites.some((fav) => fav.id === doctor.id);
    if (isFav) {
      removeFavoriteDoctor(doctor.id);
    } else {
      addFavoriteDoctor({
        ...doctor,
      });

    }
  };


  const filteredDoctors = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const initializedDoctors = response.data.data.data.map((doctor) => ({
          ...doctor,
          rate: doctor.rate ?? Math.floor(Math.random() * 5) + 1,
          reviews: doctor.reviews ?? Math.floor(Math.random() * 1000),
        }));
        setDoctors(initializedDoctors);
      }
    } catch (error) {
      setError("Failed to fetch doctors. Check your connection.");
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() !== "") {
      clearTimeout(searchTimeout.current); // Clear previous timeout
      searchTimeout.current = setTimeout(() => {
        filteredDoctors(`http://10.0.2.2:8000/api/Doctor/searchByName?name=${text}`);
      }, 500); // 500ms delay
    } else {
      clearTimeout(searchTimeout.current); // Clear previous timeout
      searchTimeout.current = setTimeout(() => {
        filteredDoctors("http://10.0.2.2:8000/api/Doctor/allDoctors");
      }, 5000); // 500ms delay
    }
  };

  const handleFilterBySpecialty = (specialtyId) => {
    clearTimeout(searchTimeout.current); // Clear previous timeout
    searchTimeout.current = setTimeout(() => {
      filteredDoctors(`http://10.0.2.2:8000/api/Doctor/filterBySpecialty?specialty_id=${specialtyId}`);
    }, 5000); // 500ms delay  
  };


  const renderDoctor = ({ item }) => {
    const generateStars = (rate) => {
      const fullStars = Math.min(Math.max(Math.floor(rate || 0), 0), 5);
      const emptyStars = 5 - fullStars;
      return (
        <>
          {Array(fullStars)
            .fill(null)
            .map((_, index) => (
              <Icon key={`full-${index}`} name="star-sharp" style={{ fontSize: 20, color: "orange" }} />
            ))}
          {Array(emptyStars)
            .fill(null)
            .map((_, index) => (
              <Icon key={`empty-${index}`} name="star-outline" style={{ fontSize: 20, color: "orange" }} />
            ))}
        </>
      );
    };

    const isFavourite = favourites.some((fav) => fav.id === item.id);

    return (

      <PlatformTouchable
        style={styles.DoctorComponent}
        onPress={() => handleDoctorPress(item)}
      >
        <Card>
          <View style={styles.wrapper}>
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : null// fallback
              }
              style={styles.image}
            />
            <View style={styles.wrapper1}>
              <View style={styles.wrapper3}>
                <Text style={styles.DoctorName}>{item.name}</Text>
                <TouchableOpacity onPress={() => toggleFavourite(item)}>
                  <Icon
                    name={isFavourite ? "heart-sharp" : "heart-outline"}
                    style={{ fontSize: 20, color: isFavourite ? "red" : "black" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.wrapper2}>
                <Text style={styles.title3}>{item.specialization?.length > 0 ? item.specialization.join(", ") : "Not specified"}</Text>
                <Text style={styles.title4}>({item.experience_year || 0} years experience)</Text>
              </View>
              <View style={styles.datePickerContainer}>
                <View>
                  <View style={styles.wrapperIcon}>{generateStars(item.rate)}</View>
                  <Text style={styles.title5}>{item.reviews || 0} + reviews</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </PlatformTouchable>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={[styles.title, Headerstyle]}>{Header}</Text>
        <PlatformTouchable onPress={() => navigation.navigate("Doctors")}>
          <Text style={styles.title1}>{text}</Text>
        </PlatformTouchable>
      </View>

      {Searchbar && (
        <View style={styles.Search}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Doctor name"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </View>
      )}

      <FlatList data={doctors} renderItem={renderDoctor} keyExtractor={(item) => item.id.toString()} />

      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
    </View>
  );
}

