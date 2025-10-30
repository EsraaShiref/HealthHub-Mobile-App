import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { Colors } from "../../consts/const";

const { width } = Dimensions.get("window");

export function ProductInfo({ route, navigation }) {
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { productId } = route.params;

  const BASE_URL = "http://10.0.2.2:8000/api/e-commerce";
  const API_TOKEN =
    "1|pQ51h5l2LRZxSHftBpY8NpT3QFVYJSsTlNHaPZmV486a89a6";
  axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      const productData = response.data.data;

      setProduct(productData);

      let imageToUse = productData.image_url;

      if (!imageToUse) {
        setSelectedImage("https://via.placeholder.com/300x200?text=No+Image");
      } else if (
        imageToUse.startsWith("http://") ||
        imageToUse.startsWith("https://")
      ) {
        // ✅ الصورة من رابط خارجي زي bing
        const lastHttp = imageToUse.lastIndexOf("http");
        if (lastHttp !== 0) {
          // فيه لينك داخلي قبله زي localhost
          imageToUse = imageToUse.substring(lastHttp);
        }
        setSelectedImage(imageToUse);
      } else {
        // ✅ الصورة داخل لاراڤيل
        setSelectedImage(`http://10.0.2.2:8000/storage/${imageToUse}`);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load product details.");
      console.error(error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const addToCart = async () => {
    try {
      const cartResponse = await axios.get(`${BASE_URL}/cart`);
      const cartItems = cartResponse.data.data;

      const productExists = cartItems.some(
        (item) => item.product_id === product.id
      );

      if (productExists) {
        Alert.alert("⚠️ Already in Cart", "This product is already in your cart.");
      } else {
        const response = await axios.post(`${BASE_URL}/cart/add`, {
          product_id: product.id,
          quantity: 1,
        });

        if (response.status === 200) {
          Alert.alert("✅ Added to Cart", "The product has been added to your cart.");
        }
      }
    } catch (error) {
      Alert.alert("❌ Error", "Failed to add product to cart.");
      console.error(error);
    }
  };

  const navigateToCart = () => {
    navigation.navigate("Cart");
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

  const reviews = [
    {
      user_name: "John Doe",
      rating: 5,
      comment: "Great product, I love it! Highly recommended.",
    },
    {
      user_name: "Jane Smith",
      rating: 4,
      comment: "Good value for the price. Will buy again.",
    },
    {
      user_name: "Alex Johnson",
      rating: 3,
      comment: "Decent product, but could be better. Not bad though.",
    },
  ];

  if (!product) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Product Details</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? "heart" : "hearto"}
            size={24}
            color={isFavorite ? "red" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={styles.imagesSection}>
        <Image
          source={{ uri: selectedImage }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <View style={styles.namePriceRow}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price} LE</Text>
        </View>

        <View style={styles.ratingRow}>
          {renderStars(4)}
          <Text style={styles.ratingText}>4 / 5</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartButtonText}>➕ Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowButton} onPress={navigateToCart}>
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      {/* Reviews */}
      <ScrollView contentContainerStyle={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Customer Reviews</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.user_name}</Text>
              <View style={styles.reviewRating}>{renderStars(review.rating)}</View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: { fontSize: 20, fontWeight: "bold", color: "#111" },
  imagesSection: {
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
  },mainImage: {
  width: "90%",
  height: 320,
  borderRadius: 12,

  alignSelf: "center",
},

  infoContainer: { paddingHorizontal: 16 },
  namePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productName: { fontSize: 26, fontWeight: "bold", color: "#333" },
  productPrice: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "bold",
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  ratingText: { marginLeft: 8, fontSize: 16, color: "#333" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: "#FF9900",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  addToCartButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  buyNowButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buyNowButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    lineHeight: 22,
  },
  reviewsContainer: { padding: 16 },
  reviewsTitle: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  reviewCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewerName: { fontSize: 16, fontWeight: "bold" },
  reviewRating: { flexDirection: "row" },
  reviewComment: { fontSize: 16, color: "#555" },
});
