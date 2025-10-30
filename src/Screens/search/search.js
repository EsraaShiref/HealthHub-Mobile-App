import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import StarIcon from "react-native-vector-icons/FontAwesome";
import CartIcon from "react-native-vector-icons/Feather";
import axios from "axios";

const { width } = Dimensions.get("window");

// ✅ Axios إعداد
const API_TOKEN = '1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6';
const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/e-commerce',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: 'application/json',
  },
});

// ✅ دالة استخلاص رابط الصورة
const extractRealImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/150';
  const httpsIndex = url.indexOf("https://");
  return httpsIndex !== -1 ? url.slice(httpsIndex) : 'https://via.placeholder.com/150';
};

export function Search({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null); // لتتبع الزر المضغوط

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const params = {
        sort_by: "price",
        sort_dir: "desc",
      };

      if (query.trim() !== "") {
        params.search = query.trim();
      }

      const response = await axiosInstance.get("/products", { params });
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const renderStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starRow}>{stars}</View>;
  };

  const handleAddToCart = async (productId) => {
    setAddingToCart(productId);
    try {
      const response = await axiosInstance.post("/cart/add", {
        product_id: productId,
        quantity: 1,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Product added to cart");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      Alert.alert("Error", "Failed to add product to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9", alignItems: "center" }}>
      {/* 🔍 Search Bar */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.searchButton}>
          <Icon2 name="search1" size={24} color="#fff" />
        </View>
      </View>

      {/* 🛒 Products List */}
      <ScrollView style={{ width: "100%", marginTop: 10 }}>
        <View style={{ paddingHorizontal: 10 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#5b96fc" />
          ) : products.length > 0 ? (
            products.map((item) => (
              <View key={item.id} style={styles.cardContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("ProductDetails", { productId: item.id })
                  }
                >
                  <Image
                    source={{ uri: extractRealImageUrl(item.image_url) }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <View style={styles.cardContent}>
               <View style={{marginTop:30}}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                 
                  <Text style={styles.price}>{item.price} EGP</Text>
                  </View>
<View style={{flexDirection:"row",justifyContent:'space-between',marginTop:0}}>
 {renderStars(item.rating || 4)}
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item.id)}
                    style={styles.addToCartBtn}
                    disabled={addingToCart === item.id}
                  >
                    {addingToCart === item.id ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <CartIcon name="shopping-cart" size={16} color="#fff" />
                        <Text style={styles.addToCartText}> Add to Cart</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: "#555", marginLeft: 10 }}>
              No products found.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#5b96fc",
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  cardImage: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "500",
    color: "#5b96fc",
    marginVertical: 4,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  addToCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5b96fc",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 6,
  
    alignSelf:"flex-end"
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
});
