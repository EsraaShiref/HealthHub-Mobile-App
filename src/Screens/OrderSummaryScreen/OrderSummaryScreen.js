// screens/OrderSummaryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { Colors } from '../../consts/const';

const BASE_URL = 'http://10.0.2.2:8000/api/e-commerce';

export function OrderSummaryScreen({ route, navigation }) {
  const { items, total, address } = route.params;
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const submitOrder = async () => {
    try {
      const products = items.map(item => ({
        id: item.product_id || item.productId || item.id,
        quantity: item.quantity,
        price: item.product_price,
      }));

      const body = { products, total_price: total, address };

      const response = await axios.post(`${BASE_URL}/orders/store`, body);
      setOrderData(response.data.data);
    } catch (error) {
      console.error(error);
      alert('Failed to submit the order, please try again');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    submitOrder();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Creating your order...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Created Successfully!</Text>
      <Text style={styles.orderId}>Order ID: #{orderData.id}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Address</Text>
        <Text style={styles.cardText}>{orderData.address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📦 Order Status</Text>
        <Text style={[styles.cardText, { color: '#e67e22', fontWeight: 'bold' }]}>{orderData.status}</Text>
      </View>

      <Text style={styles.sectionHeader}>🛒 Ordered Products</Text>

      {orderData.products.map((p, index) => (
        <View key={index} style={styles.productCard}>
          {/* If you want product images, make sure image_url exists in orderData.products[index] */}
          {/* <Image source={{ uri: p.image_url }} style={styles.productImage} /> */}
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{p.name}</Text>
            <Text style={styles.productDetails}>{p.quantity} × {p.price_per_unit} EGP</Text>
            <Text style={styles.productSubtotal}>Subtotal: {p.subtotal} EGP</Text>
          </View>
        </View>
      ))}

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>{orderData.total_price} EGP</Text>
      </View>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('PaymentMethod', { orderId: orderData.id, totalAmount: orderData.total_price })}>
  <Text style={styles.homeButtonText}>💳 Proceed to Payment</Text>
</TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f8f8' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#2c3e50' },
  orderId: { textAlign: 'center', marginBottom: 20, fontSize: 16, color: '#7f8c8d' },

  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#34495e' },
  cardText: { fontSize: 14, color: '#333' },

  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: '#2c3e50' },

  productCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  productName: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  productDetails: { fontSize: 13, color: '#7f8c8d' },
  productSubtotal: { fontSize: 13, color: '#27ae60', marginTop: 5, fontWeight: 'bold' },

  totalContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginTop: 10, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#34495e' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#27ae60', marginTop: 5 },

  homeButton: { backgroundColor: Colors.primary, padding: 14, borderRadius: 10 },
  homeButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
