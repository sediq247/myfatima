import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import MusicScreen from './screens/MusicScreen';
import ChatScreen from './screens/ChatScreen';
import LetterScreen from './screens/LetterScreen';
import { useApp } from './state/AppContext';
import { Themes } from './theme';

export type RootStackParamList = {
  Main: undefined;
  Letter: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Music: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { state } = useApp();
  const Colors = Themes[state.theme];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bg.card,
          borderTopColor: Colors.bg.cardBorder,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 10,
          paddingTop: 8,
          height: 68,
        },
        tabBarActiveTintColor: Colors.accent.gold,
        tabBarInactiveTintColor: Colors.text.muted,
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 11,
          marginTop: 3,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any = 'heart';
          if (route.name === 'Music') iconName = 'musical-notes';
          if (route.name === 'Chat') iconName = 'chatbubble-ellipses';
          return <Ionicons name={iconName} size={focused ? size + 2 : size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Music" component={MusicScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen 
          name="Letter" 
          component={LetterScreen} 
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
