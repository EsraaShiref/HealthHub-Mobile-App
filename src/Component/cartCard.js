import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../consts/const';
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/MaterialIcons";

export function CartCard(props) {
  const { image, name, price, description } = props;
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = price * quantity;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity>
            <Icon3 name="delete" size={22} color="#999" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>{description}</Text>

        <View style={styles.qtyRow}>
          <View style={styles.qtyButtons}>
            <TouchableOpacity style={styles.qtyButton} onPress={decreaseQty}>
              <Icon2 name="minus" size={16} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyButton} onPress={increaseQty}>
              <Icon2 name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>{totalPrice} EGP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {marginTop:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '35%',
    height: 120,
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginVertical: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyButton: {
    padding: 6,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  price: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  }
});
