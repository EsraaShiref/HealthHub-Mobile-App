import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors } from "../consts/const";
import Entypo from "react-native-vector-icons/Entypo";

export function Patienthold(props) {
    const { name, title, month, date } = props;
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{ flexDirection: "row", alignItems: "center", width: '100%' }}>
                    <View style={styles.textwrapper}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.time}>
                            <Entypo name={name} size={15} color="gray" />
                            <Text style={styles.disc}> {month}</Text>
                            <Text style={styles.disc}> {date}</Text>
                        </View>
                    </View>


                    <CheckBox
                        value={isChecked}
                        onValueChange={(newValue) => setIsChecked(newValue)} // ✅ استخدام القيمة الصحيحة
                        tintColors={{ true: Colors.primary || "blue", false: "gray" }}
                        style={styles.checkbox}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        marginTop: 10,
        width: '100%',
    },
    time: {
        flexDirection: 'row'
    },
    wrapper: {
        alignSelf: 'center',
        borderColor: "#BBBB",
        borderWidth: 1,
        backgroundColor: "#fefefe",
        borderRadius: 10,
        width: "100%",
        flexDirection: 'row',
        paddingStart: 5,
        paddingVertical: 10,
        alignItems: "center",
        marginLeft: 10,
        justifyContent: "space-between",
    },
    textwrapper: {
        marginLeft: 10,
        width: "80%"
    },
    title: {
        fontSize: "16@s",
        fontWeight: "bold",
        color: "black",
    },
    disc: {
        fontSize: "12@s",
        color: "gray",
    },
    checkbox: {
        width: "20@s",
        height: "20@s"
    }
});
