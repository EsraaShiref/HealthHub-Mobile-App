import React, { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./style";
import { Card } from "../../Component/Card";
import Icon from "react-native-vector-icons/Ionicons";
import { AppButton } from "../../Component/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";


export function DoctorInfoScreen({ route }) {
  const navigation = useNavigation();

  if (!route || !route.params || !route.params.doctor) {
    console.error("Route or route.params.doctor is undefined");
    return <Text>Error: Missing doctor data</Text>;
  }

  const { doctor } = route.params;

  useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation]);

  const generateStars = (rate = 0) => {
    const validRate = Number.isFinite(rate) ? rate : 0;
    const fullStars = Math.floor(validRate);
    const halfStars = validRate % 1 >= 0.5 ? 1 : 0;
    const emptyStars = Math.max(0, 5 - fullStars - halfStars);

    return (
      <View style={styles.starContainer}>
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <Icon key={`full-${index}`} name="star-sharp" style={styles.starIcon} />
          ))}
        {Array(halfStars)
          .fill(null)
          .map((_, index) => (
            <Icon key={`half-${index}`} name="star-half-sharp" style={styles.starIcon} />
          ))}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <Icon key={`empty-${index}`} name="star-outline" style={styles.starIcon} />
          ))}
      </View>
    );
  };

  return (
    <ScrollView>
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
    </ScrollView>
  );
}

