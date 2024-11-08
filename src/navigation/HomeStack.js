import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePaymentScreen } from "../screens/CreatePaymentScreen";
import { SelectCurrencyScreen } from "../screens/SelectCurrencyScreen";
import { PaymentDetailsScreen } from "../screens/PaymentDetailsScreen";
import { QRShareScreen } from "../screens/QRShareScreen";
import { PaymentSuccesfulScreen } from "../screens/PaymentSuccesfulScreen";
import { PhoneCodeScreen } from "../screens/PhoneCodeScreen";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CreatePaymentScreen"
    >
      <Stack.Screen
        name="CreatePaymentScreen"
        component={CreatePaymentScreen}
      />
      <Stack.Screen
        name="SelectCurrencyScreen"
        component={SelectCurrencyScreen}
      />
      <Stack.Screen
        name="PaymentDetailsScreen"
        component={PaymentDetailsScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="QRShareScreen" component={QRShareScreen} />
      <Stack.Screen
        name="PaymentSuccesfulScreen"
        component={PaymentSuccesfulScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="PhoneCodeScreen" component={PhoneCodeScreen} />
    </Stack.Navigator>
  );
};
