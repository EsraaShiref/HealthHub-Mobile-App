import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import style from "./style";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../../assets/images/healthyeats1.png"),
    link: "https://www.healthline.com/nutrition/healthy-eating-tips",
  },
  {
    id: "2",
    image: require("../../../assets/images/healthyeats.png"),
    link: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
  },
  {
    id: "3",
    title: "Consult the Best",
    description: "Find and consult the best doctors with a few taps",
    image: require("../../../assets/images/healthyandfood.png"),
    link: "https://www.medicalnewstoday.com/articles/322268",
  },
];

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.link)} activeOpacity={0.7}>
      <View style={style.slide}>
        <Image source={item.image} style={style.image} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      {/* Carousel Section */}
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />

      {/* Pagination Section */}
      <View style={style.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              style.dot,
              activeSlide === index ? style.activeDot : style.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
