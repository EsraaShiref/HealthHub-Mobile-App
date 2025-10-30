import React from "react";
import { ScrollView, Text , View ,Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import { PlatformTouchable } from "../PlatformTouchable";
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';

export function DepartmentComponent (props){
      const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
        <Text style={styles.Header}>Departments</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PlatformTouchable onPress={()=>{
            navigation.navigate('Blogs')
  
        }}>
            <View style={styles.iconContainer}>
            <Image source={require('../../../assets/images/logo.jpg')}  style={styles.icon}/>
            </View>
            <Text style={styles.iconName}>Blog</Text>
        </PlatformTouchable>
        <PlatformTouchable onPress={()=>{
            navigation.navigate('Scan')
  
        }}>
            <View style={styles.iconContainer}>
            <Image source={require('../../../assets/images/jobs.png')} style={styles.icon}/>
            </View>
            <Text style={styles.iconName}>Food Scan</Text>
        </PlatformTouchable>
        <PlatformTouchable onPress={()=>{
            navigation.navigate('Market')
  
        }}>
            <View style={styles.iconContainer}>
            <Image source={require('../../../assets/images/market.jpg')} style={styles.icon}/>
            </View>
            <Text style={styles.iconName}>Market</Text>
        </PlatformTouchable>
        <PlatformTouchable onPress={() =>{
          navigation.navigate('Doctors')
        }}>
            <View style={styles.iconContainer}>
            <Image source={require('../../../assets/images/doctor.jpg')} style={styles.icon}/>
            </View>
            <Text style={styles.iconName}>Doctors</Text>
        </PlatformTouchable>
        </ScrollView>
        </View>
    );
}