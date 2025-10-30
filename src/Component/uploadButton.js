import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import DocumentPicker from "react-native-document-picker";

export default function FilePickerButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(res);
      Alert.alert("File Selected", `File Name: ${res[0]?.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Cancelled", "No file selected");
      } else {
        Alert.alert("Error", "An error occurred while picking the file");
      }
    }
  };

  return (
    <View style={{flex:1,
        marginBottom: 10,
        justifyContent: "center", alignItems: "center" ,
        borderWidth:1,
        borderColor:'#bbb',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,}}
        >
      <TouchableOpacity
        onPress={pickDocument}
        style={{
          backgroundColor: "#007bff",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Upload Official Documents</Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={{ marginTop: 10, color: "#000" }}>
          Selected File: {selectedFile[0]?.name}
        </Text>
      )}
    </View>
  );
}
