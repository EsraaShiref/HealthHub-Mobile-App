import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../consts/const';

export const Card = ({ image, name, price, onPress, onAddToCart }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>{name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {price.toFixed(2)}
            </Text>
            <Text style={styles.currency}> EGP</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.cartBtn} 
        onPress={onAddToCart}
        activeOpacity={0.8}
      >
        <Text style={styles.cartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '46%',
    margin: '2%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingBottom: 12,
  },
  card: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 12,
    paddingBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
    minHeight: 36,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary || '#2e7d32',
  },
  currency: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  cartBtn: {
    marginHorizontal: 12,
    backgroundColor: Colors.primary || '#2e7d32',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});