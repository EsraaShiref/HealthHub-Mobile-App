import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompletedTasks } from "../DoctorScreens/completedtask/completetask";
import { OnHold } from "../DoctorScreens/onholdtasks/onHolod";
import { useRoute } from "@react-navigation/native"; // ← استيراد useRoute
import { TaskDetail } from "../DoctorScreens/TaskDetails";
const Stack = createNativeStackNavigator();

export default function Taskstack() {
  const route = useRoute();
  const activeTab = route?.params?.activeTab || "Completed"; // ← قراءة activeTab

  return (
    <Stack.Navigator
      initialRouteName={activeTab === "OnHold" ? "OnHold" : "CompletedTasks"}
    >
      <Stack.Screen
        name="CompletedTasks"
        component={CompletedTasks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnHold"
        component={OnHold}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{ headerShown: false }}

      />
    </Stack.Navigator>
  );
}
