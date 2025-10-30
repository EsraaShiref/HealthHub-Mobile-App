import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Entypo from "react-native-vector-icons/Entypo";
import { Card } from "../Card";
import { TINT_COLOR , PrimaryColor,gray,Background,babyblue} from '../../utils/colors';


export function DoctorButton(props) {
    const { name, title, disc, onpress } = props;

    return (
        <Card style={styles.container}>
            <TouchableOpacity  onPress={onpress} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                <View style={styles.leftSection}>
                    <View style={styles.IconContainer}>
                        <Entypo name={name} size={18} color="white" />
                    </View>
                    <View style={styles.textwrapper}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.disc}>{disc}</Text>
                    </View>
                </View>
                <Entypo name="chevron-right" size={20} color="gray" style={styles.icon2} />
            </View>
        </TouchableOpacity>
        </Card>
    );
}

const styles = ScaledSheet.create({
    container: {
        marginTop: "14@s",
        borderRadius:"10@s",
        height:"70@s",
        justifyContent: "center",

    },
    wrapper: {
        alignSelf: 'center',
        width: "98%",
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: "12@s",
        justifyContent: "space-between"
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center"
    },
    IconContainer: {
        width: "36@s",
        height: "36@s",
        borderRadius: "10@s",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: TINT_COLOR,
    },
    title: {
        fontSize: "13@s",
        fontWeight: "bold",
        color: "#333",
    },
    disc: {
        fontSize: "10@s",
        color: "gray",
    },
    textwrapper: {
        marginLeft: "10@s",
        width: "75%"
    },
    icon2: {
        alignSelf: "center",
    }
});
