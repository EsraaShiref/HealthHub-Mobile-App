import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ecommerce from "./E-Commerce";

export default function AppContainer() {
 
  return (
    <NavigationContainer>
      <Ecommerce />

    </NavigationContainer>
  );
}
