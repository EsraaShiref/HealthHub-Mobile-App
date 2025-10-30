// screens/PaymentMethodScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export function PaymentMethodScreen({ navigation }) {
  useEffect(() => {
    // ⏳ يرجع لصفحة Home بعد 3 ثواني
    const timer = setTimeout(() => {
      navigation.navigate('HomeEcommerce');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Icon name="checkcircle" size={100} color="#4caf50" style={styles.icon} />
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.subtitle}>Thank you for your purchase.</Text>
      <Text style={styles.redirect}>Redirecting to home...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "#4caf50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  redirect: {
    fontSize: 14,
    color: "#aaa",
  }
});
