import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { Card } from "../../Component/Card";
import styles from "./style";
import { AppButton } from "../../Component/AppButton";
import { useNavigation } from "@react-navigation/native";

export function BlogsScreen() {
    const navigation = useNavigation();

    // Hide bottom tab bar when BlogsScreen is mounted
    useEffect(() => {
        const parent = navigation.getParent();
        if (parent) {
            parent.setOptions({ tabBarStyle: { display: 'none' } });
        }

        return () => {
            // Don't restore here; will only restore when returning to Home
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Card style={styles.Card}>
                <View style={styles.con1}>
                    <Image source={require('../../../assets/images/Articles.png')} style={styles.image} />
                </View>
                <View style={styles.con2}>
                    <Text style={styles.blogTitle}>Articles</Text>
                    <Text style={styles.blogContent}>Read more Articles About Healthy Life</Text>
                    <AppButton 
                        title="Read More" 
                        wrapperStyle={styles.button} 
                        titleStyle={styles.buttontitle}
                        onPress={() => navigation.navigate("Articles")}
                    />
                </View>
            </Card>

            <Card style={styles.Card}>
                <View style={styles.con1}>
                    <Image source={require('../../../assets/images/Videos.png')} style={styles.image} />
                </View>
                <View style={styles.con2}>
                    <Text style={styles.blogTitle}>Videos</Text>
                    <Text style={styles.blogContent}>Watch more Videos About Healthy Life</Text>
                    <AppButton 
                        title="Watch More" 
                        wrapperStyle={styles.button} 
                        titleStyle={styles.buttontitle}
                        onPress={() => navigation.navigate("Videos")}
                    />
                </View>
            </Card>

            <Card style={styles.Card}>
                <View style={styles.con1}>
                    <Image source={require('../../../assets/images/Meals.png')} style={styles.image} />
                </View>
                <View style={styles.con2}>
                    <Text style={styles.blogTitle}>Meals</Text>
                    <Text style={styles.blogContent}>See more Healthy Meals To Stay Okay</Text>
                    <AppButton 
                        title="See More" 
                        wrapperStyle={styles.button} 
                        titleStyle={styles.buttontitle}
                        onPress={() => navigation.navigate("Meals")}
                    />
                </View>
            </Card>
        </View>
    );
}
