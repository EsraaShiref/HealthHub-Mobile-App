import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export function DropdownComponent2(props) {
  const { datatype, value, onChange,placeholder } = props;
  
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={datatype}
   
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
    
      value={value}
      onChange={onChange} 
    />
  );
}



const styles = StyleSheet.create({
  dropdown: {
    width:"45%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
    height: 50,
    textAlignVertical: "center",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderStyle: {
    
    fontSize: 16,
    color: "#bbb",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "#bbb",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
