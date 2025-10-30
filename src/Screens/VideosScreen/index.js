import React, { useState } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./style";
import { TINT_COLOR } from "../../utils/colors";
import { videoData } from "../../utils/DummyData";



export function VideosScreen() {
    const [loading, setLoading] = useState(true);

    const handleLoadEnd = () => {
        setLoading(false);
    };

    const renderVideo = ({ item }) => (
        <View style={styles.videoCard}>
            {/* Show loader while loading */}
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={TINT_COLOR} />
                    <Text style={styles.loadingText}>Loading video...</Text>
                </View>
            )}
            {/* Embedded YouTube Video */}
            <WebView
                source={{ uri: item.url }}
                style={[styles.videoPlayer, loading && { opacity: 0 }]}
                allowsFullscreenVideo
                onLoadEnd={handleLoadEnd}
            />
        </View>
    );

    return (
        <FlatList
            data={videoData}
            keyExtractor={(item) => item.id}
            renderItem={renderVideo}
            contentContainerStyle={styles.container}
        />
    );
}
