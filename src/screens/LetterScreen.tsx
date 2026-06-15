import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useApp } from '../state/AppContext';
import { Themes, Fonts, Spacing, Radius } from '../theme';

const { height } = Dimensions.get('window');

export default function LetterScreen() {
  const navigation = useNavigation();
  const { state } = useApp();
  const Colors = Themes[state.theme];

  const letter = state.selectedLetter;
  const isBday = state.isBirthday;

  // Reanimated shared values
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Entrance animation
    translateY.value = withTiming(0, { duration: 600 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  const handleClose = () => {
    // Exit animation, then navigate back
    translateY.value = withTiming(height, { duration: 400 }, () => {
      runOnJS(() => navigation.goBack())();
    });
    opacity.value = withTiming(0, { duration: 300 });
  };

  if (!letter) {
    return (
      <View style={[styles.errorRoot, { backgroundColor: Colors.bg.start }]}>
        <Text style={[styles.errorText, { color: Colors.text.secondary }]}>No letter selected</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.errorBack, { color: Colors.accent.gold }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const dividerColor = state.theme === 'day' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
  const textColor = state.theme === 'day' ? '#3d2b24' : '#e8ddd0';

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.backdropTouch} onPress={handleClose} activeOpacity={1} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: state.theme === 'day' ? '#faf6f0' : '#1a1510',
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
          <Ionicons name="close" size={24} color={state.theme === 'day' ? '#5c4d3c' : Colors.text.muted} />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
            <FontAwesome5 name="heart" size={12} color={isBday ? Colors.accent.gold : Colors.accent.roseLight} solid />
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
          </View>

          <Text style={[
            styles.letterBody,
            { color: textColor, fontFamily: Fonts.body }
          ]}>
            {letter.content}
          </Text>

          <View style={[styles.divider, { marginTop: Spacing.xl }]}>
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
            <FontAwesome5 name="heart" size={12} color={isBday ? Colors.accent.gold : Colors.accent.roseLight} solid />
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
          </View>

          <Text style={[
            styles.signature,
            { color: textColor }
          ]}>
            *Abubakar*
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  backdropTouch: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: height * 0.88,
    minHeight: height * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(128,128,128,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: 60,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
    gap: Spacing.sm,
  },
  dividerLine: {
    height: 1,
    flex: 1,
    maxWidth: 80,
  },
  letterBody: {
    fontSize: 17,
    lineHeight: 28,
    textAlign: 'left',
  },
  signature: {
    fontFamily: Fonts.body,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: Spacing.lg,
  },
  errorRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: 16,
  },
  errorBack: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    marginTop: Spacing.md,
  },
});