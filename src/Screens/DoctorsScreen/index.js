import { DoctorButton } from "../../Component/Doctor";
import { ScrollView, View ,FlatList} from "react-native";
// import { Doctors } from "../../utils/DummyData";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

export function DoctorScreen (props) {
    const navigation = useNavigation();
    const sections = [{ key: "1" }];
    useEffect(() => {
        const parent = navigation.getParent();
        if (parent) {
            parent.setOptions({ tabBarStyle: { display: 'none' } });
        }
    }, [navigation]);
    return (
        <FlatList
                data={sections}
                renderItem={() => null} 
                ListHeaderComponent={
            <DoctorButton Header='All Doctors' token="1|QiGMLX4jIL8JDH4PvcwoQAHP66oeptJjDh96WsZi06cd9d07" Searchbar displayLimit={4}/>
                }/>
    );
}


