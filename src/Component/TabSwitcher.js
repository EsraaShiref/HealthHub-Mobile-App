// TabSwitcher.js
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Background , babyblue, primary ,primary1} from "../utils/colors";

export function TabSwitcher({ tabs, activeTab, onTabChange }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 2,
            borderColor: activeTab === tab ? primary1 : "#ccc",
            backgroundColor: activeTab === tab ? primary1 + "15" : "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius:15,
          }}
          onPress={() => onTabChange(tab)} // تغيير التبويب عند الضغط
        >
          <Text style={{ color: activeTab === tab ? primary : "#000", fontSize: 16 }}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
