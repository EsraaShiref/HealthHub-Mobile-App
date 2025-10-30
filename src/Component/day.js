import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { daysOfWeek } from "../dummy/dummydata";
import { ScaledSheet } from "react-native-size-matters";
import { primary } from "../utils/colors";
export function DaySelector() {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleSelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={daysOfWeek}
        numColumns={3} 
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => {
          const isSelected = selectedDays.includes(item.day);
          return (
            <TouchableOpacity
              style={[styles.wrapper, isSelected && styles.selected]}
              onPress={() => toggleSelection(item.day)}
            >
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {item.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

{/*    
      <Text style={styles.selectedDays}>
        Selected Days: {selectedDays.length > 0 ? selectedDays.join(", ") : "None"}
      </Text> */}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5
  },
  wrapper: {
    backgroundColor: "#ddd",
    width: "90@s",
    height: "30@s",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  selected: {
    backgroundColor:primary
  },
  text: {
    fontSize: "14@s",
    color: "black"
  },
  selectedText: {
    color: "white"
  },
  selectedDays: {
    marginTop: 15,
    fontSize: "10@s",
    fontWeight: "bold",
    color: "#000"
  }
});
