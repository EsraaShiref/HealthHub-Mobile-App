import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Styles } from "./styles";
import { Card } from "../../Component/card";
import axios from "axios";

const BASE_URL = "http://10.0.2.2:8000";
const API_TOKEN = '1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;

const fixImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/150';
  if (url.includes("https://")) {
    return url.split("products/").pop(); // remove local path
  }
  return url;
};

export function CatScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/e-commerce/categories/${categoryId}`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load category products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/e-commerce/cart/add`, {
        product_id: product.id,
        quantity: 1,
      });
      if (response.status === 200) {
        Alert.alert('Product Added', `${product.name} has been added to your cart.`);
      } else {
        Alert.alert('Error', 'Failed to add product to cart.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add product to cart");
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={Styles.pagename}>Category Products</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={Styles.cardwrapper}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
          ) : products.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No products available.</Text>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                image={{ uri: fixImageUrl(product.image_url) }}
                name={product.name}
                price={product.price}
                onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                onAddToCart={() => addToCart(product)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
