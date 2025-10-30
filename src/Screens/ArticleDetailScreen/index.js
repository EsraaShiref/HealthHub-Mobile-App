import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import styles from "./style";

export function ArticleDetailScreen({ route }) {
    const { article } = route.params;

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent} // Use contentContainerStyle to define the scrollable area
            showsVerticalScrollIndicator={false} // Hide the scroll bar (optional)
        >
            <Image source={article.image} style={styles.image} />
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.content}>{article.description}</Text>
        </ScrollView>
    );
}
