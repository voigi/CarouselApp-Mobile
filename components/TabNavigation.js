import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

// Composants pour les différents onglets
const TabOne = () => (
  <View>
    <Text>Tab One Content</Text>
  </View>
);

const TabTwo = () => (
  <View>
    <Text>Tab Two Content</Text>
  </View>
);

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="TabOne" component={TabOne} />
      <Tab.Screen name="TabTwo" component={TabTwo} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
