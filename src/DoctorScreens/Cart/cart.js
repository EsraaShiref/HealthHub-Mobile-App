import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Stylesheet } from "react-native";
import { Card } from "../../Component/cartCard"; 
import { INput1 } from "../../Component/TextInput";
import Icon2 from "react-native-vector-icons/Entypo";
import {Styles} from "./styles"
export function CartScreen({ route, navigation }) {
    const cart = route.params?.cart || []; 
    const [totalPrice, setTotalPrice] = useState(0);
    const [coupon,setcoupon]=useState("")
   
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <View style={Styles.container}>
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Card product={item} />}
                        padding={10}
                    />
                    <View style={{paddingHorizontal:10}}>
                    <INput1 
                    placeholder="Apply Coupons" bordered rendericonleft={() => <Icon2 name="credit-card" 
                    size={15} color="#bbb" />} onChangeText={setcoupon} value={coupon} />
                    </View>
                    <View style={Styles.orderinfo}>
                        <Text style={Styles.title}>Order Payment Details</Text>
                        <View style={Styles.disc}>
                            <Text  style={Styles.text1}>
                              Order Mount
                            </Text>
                            <TouchableOpacity>
                            <Text style={Styles.text2}>
                                lE 7.000.
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.disc}>
                            <Text  style={Styles.text1}>
                            Convience
                            </Text>
                            <TouchableOpacity>
                            <Text style={Styles.text2}>
                            Know more
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.disc}>
                            <Text  style={Styles.text1}>
                          Deleviry Free
                            </Text>
                            <TouchableOpacity>
                            <Text style={Styles.text2}>
                             Free
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={Styles.footer}>
                    <View style={Styles.totalContainer}>
                        <Text style={Styles.totalText}>Total:</Text>
                        <Text style={Styles.pricee}>lE {totalPrice.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={Styles.paymentButton} onPress={() => alert("Proceeding to payment...")}>
                        <Text style={Styles.paymentText}>Proceed to Payment</Text>
                    </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text style={Styles.emptyText}>Your cart is empty 🛒</Text>
            )}
        </View>
    );
}

