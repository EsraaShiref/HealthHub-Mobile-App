import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { Background ,TINT_COLOR} from "../../utils/colors";

const { width, height } = Dimensions.get('window');

function Bubble({ size, startX, delay }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 5000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [anim, delay]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [height + size, -size],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 0.5, 0.5, 0],
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 1, 1.2],
  });

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#fff", // ← هنا التعديل
          position: 'absolute',
          left: startX,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    />
  );
}

function LoadingTitle() {
  const dotAnim = useRef(new Animated.Value(0)).current;
  const [dotIndex, setDotIndex] = useState(0);
  const dotsArray = ['', '.', '..', '...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex(prev => (prev + 1) % dotsArray.length);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text style={styles.title}>
      Health<Text style={styles.hub}>Hub{dotsArray[dotIndex]}</Text>
    </Text>
  );
}

export function SplashScreen({ navigation }) {
  const [videoReady, setVideoReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (videoReady) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        navigation.replace('Splash2');
      }, 3500);

      return () => clearTimeout(timeout);
    }
  }, [videoReady, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, zIndex: 1 }]}>
        <View style={styles.logoContainer}>
          <View style={styles.videoWrapper}>
            <Video
              source={require('../../../assets/images/logo-video.mp4')}
              style={styles.video}
              resizeMode="contain"
              repeat
              muted
              onReadyForDisplay={() => setVideoReady(true)}
            />
          </View>
        </View>

        {/* الكلمة المتحركة مع النقاط */}
        {videoReady && <LoadingTitle />}
      </Animated.View>

      {videoReady && (
        <View style={[styles.bubblesContainer, { zIndex: 0 }]}>
          <Bubble size={60} startX={20} delay={0} />
          <Bubble size={80} startX={90} delay={1000} />
          <Bubble size={40} startX={150} delay={500} />
          <Bubble size={100} startX={210} delay={1500} />
          <Bubble size={50} startX={270} delay={2000} />
          <Bubble size={70} startX={330} delay={700} />
          <Bubble size={90} startX={380} delay={1200} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:Background},
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    padding: 25,
    marginBottom: 25,
  },
  videoWrapper: {
    width: 320,
    height: 320,
    borderRadius: 160,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#094aa0',
  },
  hub: {
    color: TINT_COLOR,
  },
});

//export const Background = "#D9F1F8";
