import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";

const BASE_URL = "http://10.0.2.2:8000/api/e-commerce";
const HOST_URL = "http://10.0.2.2:8000";
const AUTH_TOKEN = "1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6";

axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
axios.defaults.headers.common["Accept"] = "application/json";

const { width } = Dimensions.get("window");

export  function OrderDetails({ route }) {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/show/${orderId}`);
      setOrder(response.data.data);
      console.log(order)
    } catch (error) {
      console.error("❌ Error fetching order:", error);
      Alert.alert("Error", "Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5b96fc" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "#999" }}>No order details found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📦 Order #{order.id}</Text>
      <Text style={styles.info}><Icon name="calendar" size={14} /> {order.created_at?.slice(0, 10)}</Text>
      <Text style={[styles.status, getStatusStyle(order.status)]}>{order.status}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛒 Products</Text>
        {(order.items || []).map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image
              source={{
                uri: item.product.image_url?.startsWith("http")
                  ? item.product.image_url
                  : HOST_URL + item.product.image_url,
              }}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.qty}>Qty: {item.quantity}</Text>
              <Text style={styles.price}>{item.price} EGP</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.totalLabel}>Total: </Text>
        <Text style={styles.totalValue}>{order.total_price} EGP</Text>
      </View>
    </ScrollView>
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#fdd835", color: "#000", alignSelf: "flex-start", padding: 5, borderRadius: 5, marginVertical: 5 };
    case "shipped":
      return { backgroundColor: "#4caf50", color: "#fff", alignSelf: "flex-start", padding: 5, borderRadius: 5, marginVertical: 5 };
    case "canceled":
      return { backgroundColor: "#f44336", color: "#fff", alignSelf: "flex-start", padding: 5, borderRadius: 5, marginVertical: 5 };
    default:
      return { backgroundColor: "#ccc", color: "#000", alignSelf: "flex-start", padding: 5, borderRadius: 5, marginVertical: 5 };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#777",
  },
  status: {
    fontSize: 13,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  qty: {
    fontSize: 13,
    color: "#666",
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5b96fc",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5b96fc",
    marginTop: 4,
  },
});
