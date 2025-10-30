// HomeCalories.js
import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Styles } from "./styles";
import { ScaledSheet, moderateScale as ms, scale as s, verticalScale as vs } from 'react-native-size-matters';

const PAT = "b1cc3d22cbca46b2896d6f6cdb8a1836";
const USER_ID = "l2e94dxv7hwv";
const APP_ID = "food";
const WORKFLOW_ID = "food-item-recognition-workflow-yvw7wn";
const SPOON_KEY = "152b18c0dbf8461988228493be4e4ce6";

export function HomeCalories({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [analysisResult, setAnalysisResult] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    Alert.alert("Choose an option", "Select an option to capture or choose an image", [
      { text: "Take a photo", onPress: () => pickFromCamera() },
      { text: "Choose from library", onPress: () => pickFromLibrary() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const pickFromCamera = () => {
    launchCamera({ mediaType: "photo", includeBase64: true }, async (res) => {
      if (res.assets?.length) {
        const selectedImage = res.assets[0];
        setPhoto(selectedImage);
        await analyzeImage(selectedImage.base64, selectedImage.uri);
      }
    });
  };
  
  const pickFromLibrary = () => {
    launchImageLibrary({ mediaType: "photo", includeBase64: true }, async (res) => {
      if (res.assets?.length) {
        const selectedImage = res.assets[0];
        setPhoto(selectedImage);
        await analyzeImage(selectedImage.base64, selectedImage.uri);
      }
    });
  };
  
  const analyzeImage = async (base64Image, photoUri) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.clarifai.com/v2/workflows/${WORKFLOW_ID}/results`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_app_id: { user_id: USER_ID, app_id: APP_ID },
          inputs: [{ data: { image: { base64: base64Image } } }],
        }),
      });
  
      const data = await response.json();
      const topConcept = data.results[0].outputs[0].data.concepts[0];
  
      const detectedName = topConcept.name;
      setAnalysisResult(detectedName);
  
      const recipeId = await searchSpoonacularRecipe(detectedName);
  
      if (recipeId) {
        navigation.navigate("Info", {
          title: detectedName,
          image: photoUri,
          recipeId: recipeId,
        });
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      Alert.alert("Error", "Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  const searchSpoonacularRecipe = async (query) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=1&apiKey=${SPOON_KEY}`);
      const data = await response.json();
  
      if (data.results?.length) {
        const topRecipe = data.results[0];
        return topRecipe.id; // فقط نحتاج الـ ID هنا
      } else {
        Alert.alert("No matching food found on Spoonacular.");
        return null;
      }
    } catch (error) {
      console.error("Spoonacular Error:", error);
      return null;
    }
  };
  

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${SPOON_KEY}`)
      .then(res => res.json())
      .then(data => { if (data.results) setRecipes(data.results); })
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {/* Header + Search + Camera */}
      <View style={Styles.top}>
        <View style={Styles.header}>
          <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: "https://th.bing.com/th/id/OIP.vKHdWEntpqxd4GXRAqM5ngHaHy?w=185&h=195" }} />
          <TouchableOpacity
            style={{
              width: "70%",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              height: 40,
              paddingHorizontal: 10,
              textAlignVertical: "center", justifyContent:"center"
            }}
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Text style={{color:"#bbb"}}>search a food database</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:"#5b96fc",height:40,width:40,borderRadius:10,alignItems:'center',justifyContent:"center"}}>
            <Icon2 size={24} name="bars"/>
          </TouchableOpacity>
        </View>

        {/* Upload Button */}
        <TouchableOpacity onPress={pickImage} style={Styles.uploadButton}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
          ) : (
            <>
              <Icon2 name="camera" size={32} color="#bbb" />
              <Text style={Styles.camera}>Take a photo</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Detected Text */}
        {analysisResult !== "" && (
          <View style={localStyles.analysisResultContainer}>
            <Text style={localStyles.analysisResultText}>Meal Detected: </Text>
            <Text style={localStyles.analysisResult}>{analysisResult}</Text>
          </View>
        )}

        {/* Start Analysis Button */}
        <TouchableOpacity
          style={[Styles.wrapper, loading && { opacity: 0.6 }]}
          disabled={loading}
          onPress={() => photo && analyzeImage(photo.base64)}
        >
          <View style={Styles.button}>
            <Text style={Styles.buttontext}>
              {loading ? "Analyzing..." : "Start Analysis"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Meals List */}
      <View style={localStyles.mealsSection}>
        <Text style={localStyles.sectionTitle}>Meals</Text>
        <ScrollView>
          <View style={localStyles.cardWrapper}>
            {recipes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Info", {
                  title: item.title,
                  image: item.image,
                  recipeId: item.id,
                })}
                style={localStyles.cardContainer}
              >
                <Image source={{ uri: item.image }} style={localStyles.cardImage} />
                <Text style={localStyles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const localStyles = ScaledSheet.create({
  analysisResultContainer: { marginTop: vs(20), paddingHorizontal: s(16), flexDirection: "row" },
  analysisResultText: { fontSize: s(16), fontWeight: "600" },
  analysisResult: { fontSize: s(14), color: "#555" },
  mealsSection: { backgroundColor: "#E0F8FF", flex: 1, marginTop: 16, borderTopRightRadius: 50, borderTopLeftRadius: 50, paddingTop: 16 },
  sectionTitle: { fontSize: s(20), fontWeight: "bold", color: "#333", marginBottom: 10, marginLeft: 16 },
  cardWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  cardContainer: { width: '45%', marginBottom: 16, backgroundColor: "#fff", borderRadius: 16, overflow: "hidden" },
  cardImage: { width: "100%", height: 120 },
  cardTitle: { fontSize: s(12), fontWeight: "600", padding: s(8), color: "#333", textAlign: "center" },
});
