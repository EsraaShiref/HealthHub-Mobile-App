import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/AntDesign";

const BASE_URL = 'http://10.0.2.2:8000/api/e-commerce';
const HOST_URL = 'http://10.0.2.2:8000';
const AUTH_TOKEN = '1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6';

axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
axios.defaults.headers.common['Accept'] = 'application/json';

const { width } = Dimensions.get("window");

export function MyOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/orders/history?page=1&per_page=2`);
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      Alert.alert("Error", "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon2 name="profile" size={22} color="#000" style={{ marginRight: 8 }} />
        <Text style={styles.title}>My Orders</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#5b96fc" style={{ marginTop: 30 }} />
      ) : (
        <ScrollView style={{ width: "100%" }}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => navigation.navigate("OrderDetails", { orderId: order.id })}
                activeOpacity={0.9}
              >
                <View style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={[styles.status, getStatusStyle(order.status)]}>
                      {order.status}
                    </Text>
                  </View>

                  <Text style={styles.orderDate}>
                    <Icon name="calendar" size={14} /> {order.created_at?.slice(0, 10)}
                  </Text>

                  <View style={styles.itemsContainer}>
                    {(order.items || []).map((item) => (
                      <View key={item.id} style={styles.itemRow}>
                        <Image
                          source={{
                            uri: item.product.image_url?.startsWith("http")
                              ? item.product.image_url
                              : HOST_URL + item.product.image_url,
                          }}
                          style={styles.productImage}
                        />
                        <View style={styles.itemDetails}>
                          <Text style={styles.productName}>{item.product.name}</Text>
                          <Text style={styles.productPrice}>{item.price} EGP</Text>
                          <Text style={styles.productQty}>Qty: {item.quantity}</Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* ✅ زر الطباعة */}
                  <TouchableOpacity
                    onPress={() => Alert.alert("Print", `Printing Order #${order.id}...`)}
                    style={styles.printButton}
                  >
                    <Text style={styles.printButtonText}>🖨️ Print Order</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
              You don't have any orders yet.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#fdd835", color: "#000" };
    case "shipped":
      return { backgroundColor: "#4caf50", color: "#fff" };
    case "canceled":
      return { backgroundColor: "#f44336", color: "#fff" };
    default:
      return { backgroundColor: "#ccc", color: "#000" };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  status: {
    fontSize: 13,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  orderDate: {
    marginTop: 6,
    color: "#888",
    fontSize: 13,
  },
  itemsContainer: {
    marginTop: 10,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#ddd",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#5b96fc",
    fontWeight: "bold",
  },
  productQty: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  printButton: {
    marginTop: 10,
    backgroundColor: "#5b96fc",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  printButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
