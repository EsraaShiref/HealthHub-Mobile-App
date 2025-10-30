import React from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function INput1(props) {
  const { 
    placeholder,
    placeholderTextColor = "#aaa", 
    bordered,
    bordercolor1 = "#bbb", 
    borderwidth = 1,
    rendericonleft,
    rendericonright,
    stacked,
    icontyle,
    onChangeText,
    secureTextEntry ,
   onPress
  } = props;

  return (
    <View style={[styles.inputContainer, bordered ? { borderWidth: borderwidth, borderColor: bordercolor1 } : null]}>
      {stacked && <Text style={styles.label}>{placeholder}</Text>}

      <View style={styles.inputWrapper}>
        {rendericonleft && <TouchableOpacity style={[styles.iconStyle, icontyle]}>{rendericonleft()}</TouchableOpacity>}

        <TextInput 
          style={styles.textInput} 
          placeholder={stacked ? "" : placeholder}  
          placeholderTextColor={placeholderTextColor}  
          onChangeText={onChangeText}
          textAlignVertical="center"
          secureTextEntry={secureTextEntry} 
        />

        {rendericonright && <TouchableOpacity style={[styles.iconStyle, icontyle]} onPress={onPress}>{rendericonright()}</TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
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
