import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
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
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';
import { Asset } from 'expo-asset';
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
  photoMemories,
} from './src/data';
import { Themes } from './src/theme';

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Handle/ignore re-entrance errors gracefully */
});

function AppContent() {
  const { state, dispatch, loadTheme } = useApp();
  const [appReady, setAppReady] = useState(false);

  // Load Google Fonts
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    Inter_400Regular,
    Inter_500Medium,
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

  // Handle the logic for triggering the greeting modal
  const triggerGreeting = useCallback(async () => {
    try {
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
       
        if (prayers && prayers.length > 0) {
          const prayerIndex = getDailyIndex(prayers.length);
          const prayer = prayers[prayerIndex].text;
          const message = getGreetingText(period, bday);
         
          dispatch({ type: 'SHOW_GREETING', message, prayer, period, isBirthday: bday });
          await markGreetingShown(key);
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }

      dispatch({ type: 'SET_TIME_PERIOD', period });
      dispatch({ type: 'SET_BIRTHDAY', isBirthday: bday });
    } catch (error) {
      console.warn('Error inside triggerGreeting:', error);
    }
  }, [dispatch]);

  // Step 1: Preload images and themes in the background
  useEffect(() => {
    async function prepare() {
      try {
        if (photoMemories && photoMemories.length > 0) {
          const imageAssets = photoMemories.map(p => p.source);
          await Asset.loadAsync(imageAssets);
        }
        await loadTheme();
      } catch (e) {
        console.warn('Error preloading assets or theme:', e);
      } finally {
        // Only declare app ready if fonts have finished loading as well
        if (fontsLoaded) {
          setAppReady(true);
        }
      }
    }
    prepare();
  }, [fontsLoaded, loadTheme]);

  // Step 2: Once app is ready and rendering, hide Splash Screen safely
  useEffect(() => {
    async function hideSplashAndGreet() {
      if (appReady) {
        try {
          // Hide native splash screen safely
          await SplashScreen.hideAsync();
          // Immediately pop up the greeting overlay if needed
          await triggerGreeting();
        } catch (e) {
          console.warn('Error hiding splash screen:', e);
        }
      }
    }
    hideSplashAndGreet();
  }, [appReady, triggerGreeting]);

  // Step 3: Monitor time period background changes every minute
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

  // Render nothing while initializing so the native splash screen stays locked in place
  if (!appReady) {
    return null;
  }

  // Resolve active background theme color safely
  const currentThemeData = Themes[state.theme] || Themes['day'] || { bg: { start: '#ffffff' } };

  return (
    <View style={[styles.container, { backgroundColor: currentThemeData.bg.start }]}>
      <StatusBar style={state.theme === 'day' ? 'dark' : 'light'} />
     
      {/* App Core Navigation */}
      <AppNavigator />
     
      {/* Dynamic Popups */}
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

// Global Context Wrapper Setup
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
  },
});