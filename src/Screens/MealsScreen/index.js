import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { mealsData } from "../../utils/DummyData";
import { useNavigation } from "@react-navigation/native";

const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
        <Icon
            key={index}
            name={index < rating ? "star" : "star-outline"}
            size={16}
            color="#FFB400"
        />
    ));
};

export function MealsScreen(props) {
    const [favourites, setFavourites] = useState([]); // Array to store favourite meals
    const navigation = useNavigation();

    // Toggle Favourite Functionality
    const toggleFavourite = (meal) => {
        setFavourites((prevFavourites) => {
            const isFavourite = prevFavourites.some((fav) => fav.id === meal.id);
            if (isFavourite) {
                return prevFavourites.filter((fav) => fav.id !== meal.id); // Remove from favourites
            } else {
                return [...prevFavourites, meal]; // Add to favourites
            }
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={mealsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isFavourite = favourites.some((fav) => fav.id === item.id);

                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("MealDetail", { meal: item })}
                        >
                            <View style={styles.card}>
                                <Image source={item.image} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.favoriteButton}
                                    onPress={() => toggleFavourite(item)}
                                >
                                    <Icon 
                                        name={isFavourite ? "heart" : "heart-outline"} 
                                        size={24} 
                                        color={isFavourite ? "#FF6B6B" : "#000"} 
                                    />
                                </TouchableOpacity>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.category}>{item.category}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <View style={styles.ratingContainer}>
                                        {renderStars(item.rating)}
                                        <Icon name="time-outline" size={16} color="#777" />
                                        <Text style={styles.time}>{item.time}</Text>
                                    </View>
                                    <Text style={styles.author}>{item.author}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}
