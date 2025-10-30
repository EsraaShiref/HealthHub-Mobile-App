import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Styles from "./style";

export function Info({ route, navigation }) {
  const staticRecipe = {
    title: "Spaghetti Carbonara",
    image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    recipeId: 716429,
  };

  const params = route.params || {};
  const { title, image, recipeId } = params.title && params.image && params.recipeId
    ? params
    : staticRecipe;

  const [selectedTab, setSelectedTab] = useState("Info");
  const [recipes, setRecipes] = useState([]);
  const [nutrition, setNutrition] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=152b18c0dbf8461988228493be4e4ce6`).then(res => res.json()),
      fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=152b18c0dbf8461988228493be4e4ce6`).then(res => res.json()),
      fetch(`https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=152b18c0dbf8461988228493be4e4ce6`).then(res => res.json()),
    ])
    .then(([nutritionData, infoData, recipesData]) => {
      setNutrition(nutritionData);
      setIngredients(infoData.extendedIngredients || []);
      setInstructions(infoData.instructions || "No instructions found.");
      setRecipes(recipesData.results || []);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, [recipeId]);


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.mealTitle}>{title}</Text>
      </View>

      {/* Image */}
      <ImageBackground source={{ uri: image }} style={styles.image} />
      

      {/* Tabs */}
      <View style={Styles.tabContainer}>
                {["Info", "Ingredients","Instruction"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                          Styles.tab,
                            selectedTab === tab && Styles.activeTab
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                              Styles.tabText,
                                selectedTab === tab && Styles.activeTabText
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

      <ScrollView style={{ paddingHorizontal: 16 }}>
        {/* Info Tab */}
        {selectedTab === "Info" && (
                <View>
                    <View style={Styles.statsContainer}>
                        <View style={Styles.statItem}>
                            <Text style={Styles.statText}>30 mins</Text>
                            <Text style={Styles.statLabel}>Preparation</Text>
                        </View>
                        <View style={Styles.statItem}>
                            <Text style={Styles.statText}>Easy</Text>
                            <Text style={Styles.statLabel}>Difficulty</Text>
                        </View>
                        <View style={Styles.statItem}>
                            <Text style={Styles.statText}>5</Text>
                            <Text style={Styles.statLabel}>Ratings</Text>
                        </View>
                    </View>

            {/* Nutrition */}
            <Text style={Styles.sectionTitle}>Nutrition per serving</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
            <View style={Styles.nutritionContainer}>
              <View style={styles.row}>
              <View style={Styles.statItem}>
                <Text style={styles.circleTitle}>{nutrition.calories}</Text>
                <Text style={styles.circleSubtitle}>Calories</Text>
              </View>
              <View style={Styles.statItem}>
                <Text style={styles.circleTitle}>{nutrition.protein}</Text>
                <Text style={styles.circleSubtitle}>Protein</Text>
              </View>
              <View style={Styles.statItem}>
                <Text style={styles.circleTitle}>{nutrition.fat}</Text>
                <Text style={styles.circleSubtitle}>Fat</Text>
              </View>
              <View style={Styles.statItem}>
                <Text style={styles.circleTitle}>{nutrition.carbs}</Text>
                <Text style={styles.circleSubtitle}>Carbs</Text>
              </View>
            </View>
            </View>
            </ScrollView>
          </View>
        )}

        {/* Ingredients Tab */}
        {selectedTab === 'Ingredients' && (
          <View>
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <Text key={index} style={styles.bulletItem}>• {item.original}</Text>
              ))
            ) : (
              <Text style={{ color: "#666", marginTop: 8 }}>No ingredients found.</Text>
            )}
          </View>
        )}


        {/* Instructions Section */}
        {selectedTab === 'Instruction' && (
  <View style={localStyles.section}>
    <Text style={localStyles.sectionTitle}>How to prepare</Text>

    {/* نعمل استخراج للي بين كل <li>...</li> */}
    {Array.from(instructions.matchAll(/<li>(.*?)<\/li>/g)).map((match, index) => (
      <View key={index} style={localStyles.stepContainer}>
        <Text style={localStyles.stepNumber}>Step {index + 1}</Text>
        <Text style={localStyles.stepText}>{match[1].trim()}</Text>
      </View>
    ))}
  </View>
)}




         {/* Recommendations Section */}
         <View style={localStyles.sectionHeader}>
          <Text style={localStyles.sectionTitle}>Recommendations</Text>
          <Text style={localStyles.sectionLink}>See All</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            {recipes.length > 0 ? (
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
                  style={localStyles.cardContainer}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={localStyles.cardImage}
                  />
                  <Text style={localStyles.cardTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ fontSize: 16, color: "#555", marginLeft: 16 }}>
                No meals found
              </Text>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: { fontSize: 24, color: "#000", marginRight: 16 },
  image: { width: "100%", height: 250, marginBottom: 16 },
  mealTitleContainer: { alignItems: "center", marginBottom: 16 },
  mealTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTab: {
    color: "#000",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  circleSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 20,
  },
  utensilsText: {
    fontSize: 16,
    color: "#444",
    marginTop: 8,
  },
  bulletItem: {
    fontSize: 16,
    color: "#444",
    marginVertical: 4,
    lineHeight: 24,
  },
  instructionsText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
    marginTop: 10,
  },
  
});

const localStyles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
    marginBottom: 8,
  },
  bulletItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
  },
  sectionHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionLink: {
    fontSize: 14,
    color: "#ccc",
  },
  cardContainer: {
    width: 190,
    height: 220,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "75%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginTop: 4,
  },
  stepContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5b96fc",
    marginBottom: 6,
  },
  stepText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  
});

