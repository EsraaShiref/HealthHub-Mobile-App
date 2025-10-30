import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

export function MealDetailScreen({ route }) {
    const { meal } = route.params;
    const [selectedTab, setSelectedTab] = useState("Info");

    return (
        <View style={styles.container}>
            <View>
                <Image source={meal.image} style={styles.detailImage} />
            </View>

            {/* Meal Title & Author */}
            <Text style={styles.title}>{meal.title}</Text>
            <Text style={styles.author}>{meal.author}</Text>

            {/* Tab Selection */}
            <View style={styles.tabContainer}>
                {["Info", "Ingredients", "Instructions"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            selectedTab === tab && styles.activeTab
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === tab && styles.activeTabText
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            {selectedTab === "Info" && (
                <View>
                    {/* Preparation, Difficulty, Ratings */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statText}>{meal.time}</Text>
                            <Text style={styles.statLabel}>Preparation</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statText}>{meal.difficulty}</Text>
                            <Text style={styles.statLabel}>Difficulty</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statText}>{meal.rating}</Text>
                            <Text style={styles.statLabel}>Ratings</Text>
                        </View>
                    </View>

                    {/* Nutrition Per Serving */}
                    <Text style={styles.sectionTitle}>Nutrition per serving</Text>
                    <View style={styles.nutritionContainer}>
                        {Object.entries(meal.nutrition).map(([key, value]) => (
                            <View key={key} style={styles.nutritionItem}>
                                <Text style={styles.nutritionValue}>{value}</Text>
                                <Text style={styles.nutritionLabel}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Utensils Required */}
                    <Text style={styles.sectionTitle}>Utensils Required</Text>
                    <Text style={styles.utensils}>{meal.utensils.join(", ")}</Text>
                </View>
            )}

            {selectedTab === "Ingredients" && (
                <FlatList
                    data={meal.ingredients}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.ingredientItem}>• {item}</Text>
                    )}
                />
            )}

            {selectedTab === "Instructions" && (
                <FlatList
                    data={meal.instructions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Text style={styles.instructionItem}>{index + 1}. {item}</Text>
                    )}
                />
            )}
        </View>
    );
}
