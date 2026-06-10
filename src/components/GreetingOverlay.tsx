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
import { Fonts, Spacing, Radius } from '../theme';
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
    }
  }, [visible]);

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
        <View style={[styles.iconCircle, isBirthday && styles.birthdayIconCircle]}>
          {isBirthday ? (
            <FontAwesome5 name="birthday-cake" size={36} color="#d4af37" />
          ) : (
            <Ionicons
              name={period === 'morning' ? 'sunny' : 'moon'}
              size={40}
              color="#d4af37"
            />
          )}
        </View>

        {isBirthday && (
          <View style={styles.birthdayStars}>
            <FontAwesome5 name="star" size={12} color="#d4af37" />
            <Text style={styles.birthdayLabel}>Happy Birthday</Text>
            <FontAwesome5 name="star" size={12} color="#d4af37" />
          </View>
        )}

        <Text style={[styles.greeting, isBirthday && styles.birthdayGreeting]}>{message}</Text>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Ionicons name="heart" size={14} color={isBirthday ? '#d4af37' : '#fb7185'} />
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
    backgroundColor: 'rgba(0,0,0,0.92)',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#141b2d',
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
    padding: Spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  birthdayCard: {
    borderColor: 'rgba(212,175,55,0.6)',
    shadowColor: '#d4af37',
    shadowOpacity: 0.4,
    backgroundColor: '#0a0e1a',
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
    color: '#d4af37',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  greeting: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: '#f0e6d2',
    textAlign: 'center',
    lineHeight: 32,
  },
  birthdayGreeting: {
    fontSize: 26,
    color: '#f0d878',
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
    color: '#b8a99a',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  birthdayPrayer: {
    color: '#b8a99a',
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
    color: '#d4af37',
    letterSpacing: 1,
  },
  birthdayDismissText: {
    color: '#f0d878',
  },
});
