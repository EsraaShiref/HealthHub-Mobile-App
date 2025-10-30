import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Styles } from "./styles";
import { Card } from "../../Component/card";

export function HomeEcommerce({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://10.0.2.2:8000/api/e-commerce';
  const API_TOKEN = '1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6';

  axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;

  const fixImageUrl = (url) => {
    if (url.includes("https://")) {
      return url.split("products/").pop();
    }
    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchCategories(), fetchProducts()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      const allProducts = response.data.data;
      const selectedProducts = allProducts.slice(0, 6);
      const shuffledProducts = selectedProducts.sort(() => Math.random() - 0.5);
      setProducts(shuffledProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart/add`, {
        product_id: product.id,
        quantity: 1,
      });

      if (response.status === 200) {
        Alert.alert('Product Added', `${product.name} has been added to your cart.`);
      } else {
        Alert.alert('Product Added', `${product.name}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add product to cart");
    }
  };

  const getCategoryIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'herbs':
        return 'leaf';
      case 'machines':
        return 'cog';
      case 'medicines':
        return 'pill';
      default:
        return 'shopping';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={Styles.container}>
          {/* Header */}
          <View style={Styles.header}>
            <View style={Styles.topheader}>
              <View>
                <View style={Styles.directionraw}>
                  <Text style={Styles.textloc}>Your location</Text>
                  <Icon2 name="down" size={16} color="#fff" style={{ marginTop: 5 }} />
                </View>
                <Text style={Styles.trueloc}>Nasr City</Text>
              </View>

              <View style={Styles.iconwrapper}>
                <TouchableOpacity style={Styles.icon}
                    onPress={() => navigation.navigate('MyOrders')}
                >
                 <Icon2 name="profile" size={20} color="#000" />

                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.icon}
                  onPress={() => navigation.navigate('Cart')}
                >
                  <Icon2 name="shoppingcart" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              style={{
                width: "100%", backgroundColor: "#fefe", alignSelf: "center", height: 40,
                borderRadius: 30, borderWidth: 0.5, borderColor: "#ccc",
                alignItems: "center", justifyContent: "space-between",
                paddingHorizontal: 20, flexDirection: "row"
              }}
              onPress={() => navigation.navigate('Search')}>
              <Text>Search</Text>
              <Icon2 name="search1" size={15} color="#bbb" />
            </TouchableOpacity>
          </View>

          {/* Poster */}
          <View style={Styles.poster}>
            <Image
              source={require('../../consts/images/medicin.png')}
              style={Styles.posterImage}
            />
            <View style={Styles.posterOverlay}>
              <Text style={Styles.posterTitle}>All-In-One Healthy Ecommerce</Text>
              <Text style={Styles.posterSubtitle}>
                Your one-stop shop for all things healthy!
              </Text>
            </View>
          </View>

          {/* Categories */}
          <SectionTitle title="Categories" onPress={() => { }} />
          <View style={Styles.categoryContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
            ) : categories.length === 0 ? (
              <Text>No categories available.</Text>
            ) : (
              <View style={Styles.categoryList}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={Styles.categoryCard}
                    onPress={() => navigation.navigate('CategoryProducts', { categoryId: cat.id })}
                  >
                    <View style={Styles.iconCircle}>
                      <Icon
                        name={getCategoryIcon(cat.name)}
                        size={30}
                        color="#fff"
                      />
                    </View>
                    <Text style={Styles.categoryText}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Most Popular */}
          <SectionTitle title="Most Popular" onPress={() => { }} />
          <View style={Styles.cardwrapper}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
            ) : products.length === 0 ? (
              <Text>No products available.</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title, onPress }) {
  return (
    <View style={Styles.title}>
      <Text style={Styles.largetitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={Styles.smalltitle}>View all</Text>
      </TouchableOpacity>
    </View>
  );
}
