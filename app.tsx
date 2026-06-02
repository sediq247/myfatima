import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
} from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import {
  DancingScript_400Regular,
  DancingScript_700Bold,
} from '@expo-google-fonts/dancing-script';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';
import { AppProvider, useApp } from './src/state/AppContext';
import AppNavigator from './src/navigation';
import GreetingOverlay from './src/components/GreetingOverlay';
import {
  getTimePeriod,
  getGreetingKey,
  hasGreetingBeenShown,
  markGreetingShown,
  getGreetingText,
  getDailyIndex,
} from './src/core/engine';
import {
  morningPrayers,
  nightPrayers,
  birthdayPrayers,
  isBirthday,
} from './src/data';
import { Colors } from './src/theme';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { state, dispatch } = useApp();
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    Inter_400Regular,
    Inter_500Medium,
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

  const triggerGreeting = useCallback(async () => {
    const period = getTimePeriod();
    const key = getGreetingKey(period);
    const alreadyShown = await hasGreetingBeenShown(key);
    const bday = isBirthday();

    if (!alreadyShown) {
      let prayers;
      if (bday) {
        prayers = birthdayPrayers;
      } else {
        prayers = period === 'morning' ? morningPrayers : nightPrayers;
      }
      const prayerIndex = getDailyIndex(prayers.length);
      const prayer = prayers[prayerIndex].text;
      const message = getGreetingText(period, bday);
      dispatch({ type: 'SHOW_GREETING', message, prayer, period, isBirthday: bday });
      await markGreetingShown(key);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    dispatch({ type: 'SET_TIME_PERIOD', period });
    dispatch({ type: 'SET_BIRTHDAY', isBirthday: bday });
  }, [dispatch]);

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
      SplashScreen.hideAsync();
      triggerGreeting();
    }
  }, [fontsLoaded, triggerGreeting]);

  useEffect(() => {
    const interval = setInterval(() => {
      const period = getTimePeriod();
      const bday = isBirthday();
      if (period !== state.timePeriod || bday !== state.isBirthday) {
        dispatch({ type: 'SET_TIME_PERIOD', period });
        dispatch({ type: 'SET_BIRTHDAY', isBirthday: bday });
        triggerGreeting();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [state.timePeriod, state.isBirthday, dispatch, triggerGreeting]);

  if (!appReady) {
    return <View style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <AppNavigator />
      <GreetingOverlay
        visible={state.greetingVisible}
        message={state.greetingMessage}
        prayer={state.greetingPrayer}
        period={state.timePeriod}
        isBirthday={state.isBirthday}
        onDismiss={() => dispatch({ type: 'HIDE_GREETING' })}
      />
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.nightStart,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.bg.nightStart,
  },
});
