import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../state/AppContext';
import {
  getGreetingText,
  getDailyIndex,
  getDaysTogether,
} from '../core/engine';
import {
  loveMessages,
  loveLetters,
  birthdayMessages,
  birthdayLetters,
  photoMemories,
  morningPrayers,
  afternoonPrayers,
  nightPrayers,
  birthdayPrayers,
  isBirthday,
} from '../data';
import { Themes, Fonts, Spacing, Radius } from '../theme';
import { RELATIONSHIP_START_DATE } from '../config';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { state, dispatch, toggleTheme } = useApp();
  const Colors = Themes[state.theme];

  const period = state.timePeriod;
  const bday = state.isBirthday;

  const [daysCount, setDaysCount] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setDaysCount(getDaysTogether(RELATIONSHIP_START_DATE));
    const interval = setInterval(() => {
      setDaysCount(getDaysTogether(RELATIONSHIP_START_DATE));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const today = new Date();

  const messages = bday ? birthdayMessages : loveMessages;
  const dailyMessageIndex = getDailyIndex(messages.length, today);
  const dailyMessage = messages[dailyMessageIndex].text;

  const dailyPhotoIndex = getDailyIndex(photoMemories.length, today);
  const dailyPhoto = photoMemories[dailyPhotoIndex];

  const prayers = bday
    ? birthdayPrayers
    : period === 'morning'
    ? morningPrayers
    : period === 'afternoon'
    ? afternoonPrayers
    : nightPrayers;
  const dailyPrayerIndex = getDailyIndex(prayers.length, today);
  const dailyPrayer = prayers[dailyPrayerIndex].text;

  const greetingText = getGreetingText(period, bday);

  const letters = bday ? birthdayLetters : loveLetters;
  const dailyLetterIndex = getDailyIndex(letters.length, today);
  const dailyLetter = letters[dailyLetterIndex];

  const handleOpenLetter = useCallback(() => {
    dispatch({ type: 'SELECT_LETTER', letter: dailyLetter });
    navigation.navigate('Letter');
  }, [dispatch, navigation, dailyLetter]);

  const getPeriodIcon = () => {
    if (period === 'morning') return 'sunny';
    if (period === 'afternoon') return 'partly-sunny';
    return 'moon';
  };

  return (
    <View style={[styles.root, { backgroundColor: Colors.bg.start }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.greetingBox}>
            <Ionicons name={getPeriodIcon() as any} size={20} color={Colors.accent.gold} />
            <Text style={[styles.greetingText, { color: Colors.accent.cream }]}>
              {greetingText}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={[
            styles.themeBtn,
            { backgroundColor: state.theme === 'day' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)' }
          ]}>
            <Ionicons
              name={state.theme === 'day' ? 'moon' : 'sunny'}
              size={18}
              color={Colors.accent.gold}
            />
          </TouchableOpacity>
        </View>

        {/* Relationship Counter */}
        <View style={[styles.counterCard, {
          backgroundColor: Colors.bg.card,
          borderColor: Colors.bg.cardBorder,
          shadowColor: state.theme === 'day' ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.3)',
        }]}>
          <View style={styles.counterInner}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <FontAwesome5 name="heart" size={20} color={Colors.accent.rose} solid />
            </Animated.View>
            <View style={styles.counterTextBox}>
              <Text style={[styles.counterNumber, { color: Colors.accent.gold }]}>
                {daysCount.toLocaleString()}
              </Text>
              <Text style={[styles.counterLabel, { color: Colors.text.muted }]}>
                My love for you
              </Text>
            </View>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <FontAwesome5 name="heart" size={20} color={Colors.accent.rose} solid />
            </Animated.View>
          </View>
          <Text style={[styles.counterDate, { color: Colors.text.secondary }]}>
            Since September 2021
          </Text>
        </View>

        {/* Daily Prayer */}
        <View style={[styles.prayerCard, {
          backgroundColor: Colors.bg.card,
          borderColor: Colors.bg.cardBorder,
        }]}>
          <MaterialCommunityIcons name="hands-pray" size={16} color={Colors.accent.gold} />
          <Text style={[styles.prayerText, { color: Colors.text.secondary }]}>
            {dailyPrayer}
          </Text>
        </View>

        {/* Daily Love Message */}
        <View style={[styles.messageCard, {
          backgroundColor: Colors.bg.card,
          borderColor: Colors.bg.cardBorder,
        }]}>
          <View style={styles.messageHeader}>
            <FontAwesome5 name="quote-left" size={14} color={Colors.accent.gold} />
          </View>
          <Text style={[styles.messageText, { color: Colors.accent.cream }]}>
            {dailyMessage}
          </Text>
          <FontAwesome5
            name="quote-right"
            size={14}
            color={Colors.accent.gold}
            style={{ alignSelf: 'flex-end', marginTop: Spacing.sm }}
          />
        </View>

        {/* Daily Photo */}
        <View style={[styles.photoCard, {
          backgroundColor: Colors.bg.card,
          borderColor: Colors.bg.cardBorder,
        }]}>
          <Image
            source={dailyPhoto.source}
            style={styles.photoImage}
            resizeMode="cover"
          />
          <View style={[styles.photoCaptionBox, { backgroundColor: Colors.bg.card }]}>
            <Text style={[styles.photoCaption, { color: Colors.accent.cream }]}>
              {dailyPhoto.caption}
            </Text>
            <Text style={[styles.photoDate, { color: Colors.text.muted }]}>
              {dailyPhoto.dateLabel}
            </Text>
          </View>
        </View>

        {/* Letter Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleOpenLetter}
          style={[styles.letterCard, {
            backgroundColor: Colors.bg.card,
            borderColor: Colors.bg.cardBorder,
          }]}
        >
          <View style={styles.letterInner}>
            <View style={[styles.letterSeal, { borderColor: 'rgba(212,175,55,0.3)' }]}>
              <Text style={styles.letterSealText}>F</Text>
            </View>
            <FontAwesome5 name="envelope-open-text" size={32} color={Colors.accent.rose} solid />
            <Text style={[styles.letterTitle, { color: Colors.accent.cream }]}>
              A Letter For You
            </Text>
            <Text style={[styles.letterHint, { color: Colors.text.muted }]}>
              Tap to read your letter, my princess
            </Text>
            <View style={styles.letterDivider}>
              <View style={[styles.letterLine, { backgroundColor: Colors.bg.cardBorder }]} />
              <FontAwesome5 name="heart" size={8} color={Colors.accent.roseLight} solid />
              <View style={[styles.letterLine, { backgroundColor: Colors.bg.cardBorder }]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionBtn, {
              backgroundColor: Colors.bg.card,
              borderColor: Colors.bg.cardBorder,
            }]}
            onPress={() => navigation.navigate('Main', { screen: 'Chat' })}
          >
            <Ionicons name="chatbubble-ellipses" size={22} color={Colors.accent.gold} />
            <Text style={[styles.actionText, { color: Colors.accent.cream }]}>Chat with Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, {
              backgroundColor: Colors.bg.card,
              borderColor: Colors.bg.cardBorder,
            }]}
            onPress={() => navigation.navigate('Main', { screen: 'Music' })}
          >
            <Ionicons name="musical-notes" size={22} color={Colors.accent.gold} />
            <Text style={[styles.actionText, { color: Colors.accent.cream }]}>Our Music</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <FontAwesome5 name="heart" size={10} color={Colors.accent.roseLight} solid />
          <Text style={[styles.footerText, { color: Colors.text.muted }]}>
            Made with love for Fatima
          </Text>
          <FontAwesome5 name="heart" size={10} color={Colors.accent.roseLight} solid />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
    paddingTop: 55,
    paddingHorizontal: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  greetingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  greetingText: {
    fontFamily: Fonts.title,
    fontSize: 20,
    letterSpacing: 0.3,
  },
  themeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  counterInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  counterTextBox: {
    alignItems: 'center',
  },
  counterNumber: {
    fontFamily: Fonts.title,
    fontSize: 32,
    letterSpacing: 1,
  },
  counterLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    marginTop: 2,
  },
  counterDate: {
    fontFamily: Fonts.body,
    fontSize: 11,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  prayerCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  prayerText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    flex: 1,
  },
  messageCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  messageLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  messageText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'left',
  },
  photoCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  photoImage: {
    width: '100%',
    height: 280,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  photoCaptionBox: {
    padding: Spacing.md,
  },
  photoCaption: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
  },
  photoDate: {
    fontFamily: Fonts.body,
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  letterCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  letterInner: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  letterSeal: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212,175,55,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  letterSealText: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: '#d4af37',
  },
  letterTitle: {
    fontFamily: Fonts.title,
    fontSize: 18,
    marginTop: Spacing.md,
  },
  letterHint: {
    fontFamily: Fonts.body,
    fontSize: 13,
    marginTop: Spacing.sm,
  },
  letterDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  letterLine: {
    width: 24,
    height: 1,
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionBtn: {
    flex: 1,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
  },
  footer: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  footerText: {
    fontFamily: Fonts.body,
    fontSize: 11,
  },
});
