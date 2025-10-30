import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CatScreen } from "../Screens/category/catscreen"

import { HomeEcommerce } from "../Screens/e-commercee/home"
import { Search } from "../Screens/search/search"
import { ProductInfo } from "../Screens//productinfo/product"
import { AddressScreen } from '../Screens/AddressScreen/AddressScreen';
import { OrderSummaryScreen } from '../Screens/OrderSummaryScreen/OrderSummaryScreen';
import { Cart } from "../Screens/cart/cart"
import { PaymentMethodScreen } from "../Screens/PaymentMethodScreen/PaymentMethodScreen";
import { MyOrders } from "../Screens/orders/orders"
import { OrderDetails } from "../Screens/orders/orderdetails"
const Stack = createNativeStackNavigator();

export default function Ecommerce() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeEcommerce" component={HomeEcommerce} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryProducts" component={CatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductInfo} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <Stack.Screen name="MyOrders" component={MyOrders} options={{ headerShown: false }} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
            <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        </Stack.Navigator>
    );
}
