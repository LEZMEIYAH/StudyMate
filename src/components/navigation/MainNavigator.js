import React from "react";
import { Icon } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TaskScreen from "../screens/Task/TaskScreen";
import TimerScreen from "../screens/Timer/TimerScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: { height: 55 }, }} initialRouteName="">
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source="account"
                size={30}
              />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source="notebook"
                size={30}
              />
            ),
          }}
          name="Task"
          component={TaskScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source="timer"
                size={30}
              />
            ),
          }}
          name="StudyTimer"
          component={TimerScreen}
        />

        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source="settings-helper"
                size={30}
              />
            ),
          }}
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

