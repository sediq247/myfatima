import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../theme';
import { TimePeriod } from '../core/engine';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  message: string;
  prayer: string;
  period: TimePeriod;
  isBirthday: boolean;
  onDismiss: () => void;
}

export default function GreetingOverlay({ visible, message, prayer, period, isBirthday, onDismiss }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, isBirthday ? 8000 : 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, isBirthday]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={handleDismiss} activeOpacity={1} />
      <Animated.View
        style={[
          styles.card,
          isBirthday && styles.birthdayCard,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Birthday confetti or period icon */}
        <View style={[styles.iconCircle, isBirthday && styles.birthdayIconCircle]}>
          {isBirthday ? (
            <FontAwesome5 name="birthday-cake" size={36} color={Colors.accent.gold} />
          ) : (
            <Ionicons
              name={period === 'morning' ? 'sunny' : 'moon'}
              size={40}
              color={Colors.accent.gold}
            />
          )}
        </View>

        {isBirthday && (
          <View style={styles.birthdayStars}>
            <FontAwesome5 name="star" size={12} color={Colors.accent.gold} />
            <Text style={styles.birthdayLabel}>Happy Birthday</Text>
            <FontAwesome5 name="star" size={12} color={Colors.accent.gold} />
          </View>
        )}

        <Text style={[styles.greeting, isBirthday && styles.birthdayGreeting]}>{message}</Text>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Ionicons name="heart" size={14} color={isBirthday ? Colors.accent.gold : Colors.accent.roseLight} />
          <View style={styles.line} />
        </View>

        <Text style={[styles.prayer, isBirthday && styles.birthdayPrayer]}>{prayer}</Text>

        <TouchableOpacity style={[styles.dismissBtn, isBirthday && styles.birthdayDismissBtn]} onPress={handleDismiss}>
          <Text style={[styles.dismissText, isBirthday && styles.birthdayDismissText]}>
            {isBirthday ? 'Celebrate!' : 'Tap to continue'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,5,24,0.92)',
  },
  card: {
    width: width * 0.85,
    backgroundColor: Colors.bg.nightEnd,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
    padding: Spacing.xl,
    alignItems: 'center',
    shadowColor: Colors.accent.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  birthdayCard: {
    borderColor: 'rgba(212,175,55,0.6)',
    shadowColor: Colors.accent.gold,
    shadowOpacity: 0.4,
    backgroundColor: 'rgba(26,11,46,0.98)',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212,175,55,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.2)',
  },
  birthdayIconCircle: {
    backgroundColor: 'rgba(212,175,55,0.2)',
    borderColor: 'rgba(212,175,55,0.5)',
  },
  birthdayStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  birthdayLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: Colors.accent.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  greeting: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: Colors.accent.cream,
    textAlign: 'center',
    lineHeight: 32,
  },
  birthdayGreeting: {
    fontSize: 26,
    color: Colors.accent.goldLight,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  prayer: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  birthdayPrayer: {
    color: Colors.accent.creamMuted,
  },
  dismissBtn: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(212,175,55,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
  },
  birthdayDismissBtn: {
    backgroundColor: 'rgba(212,175,55,0.25)',
    borderColor: 'rgba(212,175,55,0.6)',
  },
  dismissText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.accent.gold,
    letterSpacing: 1,
  },
  birthdayDismissText: {
    color: Colors.accent.goldLight,
  },
});
