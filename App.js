import React, { createContext, useState, useContext, useEffect } from "react";
import { UserProvider } from "./src/context/UserContext";
import { AppContainer } from './src/Navigation';



export default function App() {
  return (
    <UserProvider>
      <AppContainer />
    </UserProvider>
  );
}

