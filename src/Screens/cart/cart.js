import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  StyleSheet
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Style } from "./styles";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";

const BASE_URL = 'http://10.0.2.2:8000/api/e-commerce';
const AUTH_TOKEN = '1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6';
axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

export function Cart({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/cart`);
      setItems(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch cart items.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const getImageForProduct = (imageToUse) => {
    const PREFIX = 'http://127.0.0.1:8000/storage/products/';
    if (imageToUse) {
      if (imageToUse.startsWith(PREFIX)) {
        imageToUse = imageToUse.replace(PREFIX, '');
        console.log(imageToUse)
       
      }
      return imageToUse;
    } else {
      return 'https://via.placeholder.com/300x200?text=No+Image'; // fallback image
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`${BASE_URL}/cart/update/${itemId}`, {
        quantity: newQuantity
      });
      fetchCart();
    } catch (error) {
      Alert.alert("خطأ", "فشل تعديل الكمية");
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/cart/destroy/${itemId}`);
      fetchCart();
    } catch (error) {
      Alert.alert("Error", "Failed to delete item.");
      console.error(error);
    }
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? "star" : "staro"}
          size={18}
          color={i <= rating ? "#FFD700" : "#ccc"}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const handleProceedToPayment = () => {
    if (items.length === 0) {
      Alert.alert("Cart Empty", "Your cart is empty. Please add items before proceeding.");
    } else {
      // Navigate to OrderSummary and pass items, total and address
      navigation.navigate('OrderSummary', {
        items,
        total: meta.total_price,
        address: 'Alexandria, Egypt' // يمكنك لاحقًا ربطه بـ input أو location
      });
    }
  };

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={Style.pagename}>Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {items.length === 0 ? (
        <View style={Style.emptyCart}>
          <Image
            source={require("../../consts/images/empty.png")}
            style={Style.emptyCartImage}
          />
          <Text style={Style.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, paddingTop: 20 }}
          refreshing={loading}
          onRefresh={fetchCart}
          renderItem={({ item }) => {
            const imageUrl = getImageForProduct(item.product_image);
            return (
              <View style={{ marginBottom: 16 }}>
                <View style={Style.cardContainer}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={Style.image}
                  />
                  <View style={Style.content}>
                    <View style={Style.headerRow}>
                      <Text style={Style.name}>{item.product_name}</Text>
                      <TouchableOpacity onPress={() => deleteItem(item.id)}>
                        <Icon2 name="delete" size={22} color="#999" />
                      </TouchableOpacity>
                    </View>
                    <View style={Style.ratingRow}>
                      {renderStars(4)}
                      <Text style={Style.ratingText}>4 / 5</Text>
                    </View>
                    <View style={Style.qtyRow}>
                      <View style={Style.qtyButtons}>
                        <TouchableOpacity
                          style={Style.qtyButton}
                          onPress={() =>
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : Alert.alert("Minimum quantity is 1")
                          }
                        >
                          <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={Style.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={Style.qtyButton}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Text>+</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={Style.price}>
                        {item.product_price * item.quantity} EGP
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      <View style={Style.footer}>
        <View style={Style.totalRow}>
          <Text style={Style.totalText}>Total:</Text>
          <Text style={Style.totalAmount}>{meta.total_price} EGP</Text>
        </View>
        <TouchableOpacity
          style={Style.paymentButton}
          onPress={handleProceedToPayment}
        >
          <Text style={Style.paymentButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
