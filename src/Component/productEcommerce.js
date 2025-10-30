import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors } from '../consts/const';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export function Prod({ product, onAddToCart }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={Styles.container} 
            onPress={() => navigation.navigate('ProductDetails', { product })}
        >
            <Image source={{ uri: product.image }} style={Styles.image} />
            <View style={Styles.textContainer}>
                <Text style={Styles.name} numberOfLines={1}>{product.name}</Text>
                <Text style={Styles.description} numberOfLines={2}>{product.description}</Text>
                <TouchableOpacity 
                    style={Styles.addToCart} 
                    onPress={() => onAddToCart && onAddToCart(product)}
                >
                    <Text style={Styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}


export function ProductList({ products = [], onAddToCart }) {
    return (
        <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Prod product={item} onAddToCart={onAddToCart} />}
            numColumns={2}
            contentContainerStyle={Styles.listContainer}
        />
    );
}

const Styles = ScaledSheet.create({
    container: {
        width: '160@s',
        padding: '10@s',
        backgroundColor:"rgb(245, 253, 255)",
        borderRadius: '12@s',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: '10@s',
        alignItems: 'center'
    },
    image: {
        width: '120@s',
        height: '120@s',
        borderRadius: '10@s',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: '8@s',
    },
    name: {
        fontSize: '14@s',
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: '12@s',
        color: '#666',
        textAlign: 'center',
        marginVertical: '4@s',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginVertical: '4@s',
    },
    price: {
        fontSize: '14@s',
        fontWeight: 'bold',
        color: Colors.primary,
    },
    addToCart: {
        marginTop: '6@s',
        backgroundColor: Colors.primary,
        paddingVertical: '6@s',
        paddingHorizontal: '12@s',
        borderRadius: '8@s',
    },
    addToCartText: {
        color: '#fff',
        fontSize: '12@s',
        fontWeight: 'bold',
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: "center",
        paddingRight: 10
    }
});
