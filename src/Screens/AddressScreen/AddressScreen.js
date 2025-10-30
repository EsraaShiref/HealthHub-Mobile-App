// screens/AddressScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../consts/const';

export function AddressScreen({ route, navigation }) {
  const { items, total } = route.params;
  const [address, setAddress] = useState('');

  const handleProceed = () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Please enter your address');
      return;
    }
    navigation.navigate('OrderSummary', { items, total, address });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery To</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 123 Example Street, City"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Confirm Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#232f3e' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 3 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#111' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, minHeight: 80, textAlignVertical: 'top', backgroundColor: '#fafafa' },
  button: { backgroundColor: Colors.primary, padding: 15, borderRadius: 8 },
  buttonText: { color: '#111', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
