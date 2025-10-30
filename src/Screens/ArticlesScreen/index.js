import React from "react";
import { Text, View, FlatList, Image } from "react-native";
import styles from "./style";
import { articles } from "../../utils/DummyData";
import { useNavigation } from "@react-navigation/native";
import { PlatformTouchable } from "../../Component/PlatformTouchable";

export function ArticlesScreen() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <PlatformTouchable
            style={styles.card}
            onPress={() => navigation.navigate('ArticleDetail', { article: item })}
        >
            <View style={styles.con1}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.description} numberOfLines={9}>
                    {item.description}
                </Text>
            </View>
        </PlatformTouchable>
    );

    return (
        <FlatList
            data={articles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            style={{ flex: 1 }}
        />
    );
}
