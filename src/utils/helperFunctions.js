import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export const configureAxios = () => {
    axios.defaults.baseURL = 'http://localhost:8000';
};


export function CustomHeader({ title }) {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
            <TouchableOpacity 
                style={{ position: 'absolute', left: 10, top: 15 }}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            </View>
        </View>
    );
};



