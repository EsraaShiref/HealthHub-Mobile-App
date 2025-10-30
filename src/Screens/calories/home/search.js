import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Styles } from "./styles";

const { width, height } = Dimensions.get("window");  

const SPOON_KEY = "152b18c0dbf8461988228493be4e4ce6";

export function Search({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecipesWithNutrition = async (query = "") => {
    setLoading(true);
    try {
      const searchUrl = query
        ? `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=3&apiKey=${SPOON_KEY}`
        : `https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${SPOON_KEY}`;

      const res = await fetch(searchUrl);
      const data = await res.json();

      if (data.results && Array.isArray(data.results)) {
        const enrichedRecipes = await Promise.all(
          data.results.map(async (item) => {
            try {
              const nutritionRes = await fetch(
                `https://api.spoonacular.com/recipes/${item.id}/nutritionWidget.json?apiKey=${SPOON_KEY}`
              );
              const nutritionData = await nutritionRes.json();
              return {
                ...item,
                calories: nutritionData.calories,
                fat: nutritionData.fat,
                protein: nutritionData.protein,
                carbs: nutritionData.carbs,
              };
            } catch {
              return {
                ...item,
                calories: "N/A",
                fat: "N/A",
                protein: "N/A",
                carbs: "N/A",
              };
            }
          })
        );
        setRecipes(enrichedRecipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      Alert.alert("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    fetchRecipesWithNutrition(searchQuery);
  };

  useEffect(() => {
    fetchRecipesWithNutrition();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9", alignItems: "center" }}>
      <View style={Styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a food database"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchButton}
        >
          <Icon2 size={24} name="search1" color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10, width: "100%" }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#5b96fc" />
          ) : recipes.length > 0 ? (
            recipes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Info", {
                    title: item.title,
                    image: item.image,
                    recipeId: item.id,
                  })
                }
                style={styles.cardContainer}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionText}>Fat: {item.fat}</Text>
                    <Text style={styles.nutritionText}>Carbs: {item.carbs}</Text>
                    <Text style={styles.nutritionText}>Protein: {item.protein}</Text>
                    <Text style={styles.nutritionText}>Calories: {item.calories}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: "#555", marginLeft: 16 }}>
              No meals found
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: width * 0.04, 
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
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: width * 0.25, 
    height: width * 0.25,  
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: width * 0.05,  
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  nutritionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  nutritionText: {
    fontSize: width * 0.04, 
    color: "#555",
    marginRight: 12,
    marginBottom: 4,
  },
});
