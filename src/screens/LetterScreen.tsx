import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useApp } from '../state/AppContext';
import { Colors, Fonts, Spacing, Radius } from '../theme';

const { height } = Dimensions.get('window');

export default function LetterScreen() {
  const navigation = useNavigation();
  const { state, cleanupMusic } = useApp();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const letter = state.selectedLetter;
  const isBday = state.isBirthday;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      cleanupMusic();
      navigation.goBack();
    });
  };

  if (!letter) {
    return (
      <View style={styles.errorRoot}>
        <Text style={styles.errorText}>No letter selected</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.errorBack}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backdropTouch} onPress={handleClose} activeOpacity={1} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          isBday && styles.birthdaySheet,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
          <Ionicons name="close" size={24} color={Colors.text.muted} />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Birthday Seal or Regular Seal */}
          <View style={styles.sealContainer}>
            <View style={[styles.sealOuter, isBday && styles.birthdaySealOuter]}>
              <View style={styles.sealInner}>
                <Text style={styles.sealText}>{isBday ? 'B' : letter.sealText}</Text>
              </View>
            </View>
          </View>

          {isBday && (
            <View style={styles.birthdayBadge}>
              <FontAwesome5 name="birthday-cake" size={14} color={Colors.accent.gold} />
              <Text style={styles.birthdayBadgeText}>Birthday Letter</Text>
              <FontAwesome5 name="birthday-cake" size={14} color={Colors.accent.gold} />
            </View>
          )}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <FontAwesome5 name="heart" size={12} color={isBday ? Colors.accent.gold : Colors.accent.roseLight} solid />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.letterTitle}>{letter.title}</Text>

          <Text style={styles.letterBody}>{letter.content}</Text>

          <View style={[styles.divider, { marginTop: Spacing.xl }]}>
            <View style={styles.dividerLine} />
            <FontAwesome5 name="heart" size={12} color={isBday ? Colors.accent.gold : Colors.accent.roseLight} solid />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.signature}>{isBday ? 'Happy Birthday, my love' : 'Yours always,Abubakar'}</Text>
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
    backgroundColor: 'rgba(15,5,24,0.85)',
  },
  backdropTouch: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#fdf6e3',
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
  birthdaySheet: {
    backgroundColor: '#fff9e6',
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: 60,
  },
  sealContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sealOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent.rose,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.rose,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  birthdaySealOuter: {
    backgroundColor: Colors.accent.gold,
    shadowColor: Colors.accent.gold,
  },
  sealInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sealText: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: '#fff',
  },
  birthdayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  birthdayBadgeText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.accent.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
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
    backgroundColor: 'rgba(139,69,19,0.2)',
    maxWidth: 80,
  },
  letterTitle: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: '#4a2c2a',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  letterBody: {
    fontFamily: Fonts.letter,
    fontSize: 20,
    color: '#5c3a35',
    lineHeight: 32,
    textAlign: 'left',
  },
  signature: {
    fontFamily: Fonts.letterBold,
    fontSize: 18,
    color: '#4a2c2a',
    textAlign: 'right',
    marginTop: Spacing.lg,
  },
  errorRoot: {
    flex: 1,
    backgroundColor: Colors.bg.nightStart,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  errorBack: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.accent.gold,
    marginTop: Spacing.md,
  },
});
