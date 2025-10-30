import React from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function Search(props) {
  const { 
    placeholder,
    placeholderTextColor = "#aaa", 
    bordered,
    bordercolor1 = "#bbb", 
    borderwidth = 1,
   
    icontyle,
    onChangeText,
    rendericonleft,
   onPress
  } = props;

  return (
    <View style={[styles.inputContainer,{ borderWidth: borderwidth, borderColor: bordercolor1 }]}>


      <View style={styles.inputWrapper}>
       
 {rendericonleft && <TouchableOpacity style={[styles.iconStyle, icontyle]}>{rendericonleft()}</TouchableOpacity>}
        <TextInput 
          style={styles.textInput} 
          placeholder={placeholder}  
          placeholderTextColor={placeholderTextColor}  
          onChangeText={onChangeText}
          textAlignVertical="center"
         
        />

       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 30,
    // paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
    backgroundColor:"#fff",
    alignItems:"center",
    width:"80%",
   alignSelf:'center',marginBottom:10
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    height: 40,
    textAlignVertical: "center",

  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  }
});
