import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskNavigator from './TaskNavigator'; // Create TaskNavigator for Task-related screens
import StudyTimerScreen from '../screens/StudyTimer/StudyTimerScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Task" component={TaskNavigator} />
        <Tab.Screen name="StudyTimer" component={StudyTimerScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

export default MainNavigator;
