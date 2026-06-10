import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../state/AppContext';
import {
  getGreetingText,
  getDailyIndex,
} from '../core/engine';
import {
  loveMessages,
  loveLetters,
  birthdayMessages,
  birthdayLetters,
  photoMemories,
  morningPrayers,
  nightPrayers,
  birthdayPrayers,
  isBirthday,
  LoveLetter,
} from '../data';
import { Themes, Fonts, Spacing, Radius } from '../theme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { state, dispatch, toggleTheme } = useApp();
  const Colors = Themes[state.theme];

  const period = state.timePeriod;
  const bday = state.isBirthday;

  // Get daily content - all use same date for consistency
  const today = new Date();

  const messages = bday ? birthdayMessages : loveMessages;
  const dailyMessageIndex = getDailyIndex(messages.length, today);
  const dailyMessage = messages[dailyMessageIndex].text;

  const dailyPhotoIndex = getDailyIndex(photoMemories.length, today);
  const dailyPhoto = photoMemories[dailyPhotoIndex];

  const prayers = bday ? birthdayPrayers : (period === 'morning' ? morningPrayers : nightPrayers);
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

  const bgColors = [Colors.bg.start, Colors.bg.end] as const;

  return (
    <View style={styles.root}>
      <LinearGradient colors={bgColors} style={styles.gradient}>
        {/* Persistent Greeting Header */}
        <View style={[
          styles.greetingHeader,
          { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }
        ]}>
          <View style={styles.greetingTopRow}>
            <View style={styles.greetingIconText}>
              <Ionicons
                name={period === 'morning' ? 'sunny' : 'moon'}
                size={22}
                color={Colors.accent.gold}
              />
              <Text style={[styles.greetingText, { color: Colors.accent.cream }]}>
                {greetingText}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleTheme} style={[
              styles.themeBtn,
              { backgroundColor: state.theme === 'day' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)' }
            ]}>
              <Ionicons
                name={state.theme === 'day' ? 'moon' : 'sunny'}
                size={20}
                color={Colors.accent.gold}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.prayerText, { color: Colors.text.secondary }]}>
            {dailyPrayer}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Daily Love Message */}
          <View style={[
            styles.messageCard,
            { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }
          ]}>
            <MaterialCommunityIcons
              name="format-quote-open"
              size={24}
              color={Colors.accent.gold}
              style={styles.quoteIcon}
            />
            <Text style={[styles.messageText, { color: Colors.accent.cream }]}>
              {dailyMessage}
            </Text>
            <MaterialCommunityIcons
              name="format-quote-close"
              size={24}
              color={Colors.accent.gold}
              style={[styles.quoteIcon, { alignSelf: 'flex-end' }]}
            />
          </View>

          {/* Daily Photo */}
          <View style={[
            styles.photoCard,
            { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }
          ]}>
            <Image
              source={dailyPhoto.source}
              style={styles.photoImage}
              resizeMode="cover"
            />
            <View style={styles.photoCaptionBox}>
              <Text style={[styles.photoCaption, { color: Colors.accent.cream }]}>
                {dailyPhoto.caption}
              </Text>
              <Text style={[styles.photoDate, { color: Colors.text.muted }]}>
                {dailyPhoto.dateLabel}
              </Text>
            </View>
          </View>

          {/* Envelope */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleOpenLetter}
            style={[
              styles.envelopeCard,
              { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }
            ]}
          >
            <View style={styles.envelopeContent}>
              <FontAwesome5 name="envelope" size={40} color={Colors.accent.rose} solid />
              <Text style={[styles.envelopeTitle, { color: Colors.accent.cream }]}>
                A Letter For You
              </Text>
              <Text style={[styles.envelopeHint, { color: Colors.text.muted }]}>
                Tap to read your letter, my princess
              </Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <FontAwesome5 name="heart" size={12} color={Colors.accent.roseLight} solid />
            <Text style={[styles.footerText, { color: Colors.text.muted }]}>
              Made with love for Fatima
            </Text>
            <FontAwesome5 name="heart" size={12} color={Colors.accent.roseLight} solid />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  gradient: { flex: 1 },
  greetingHeader: {
    marginHorizontal: Spacing.lg,
    marginTop: 60,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  greetingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  greetingText: {
    fontFamily: Fonts.title,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prayerText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    marginTop: Spacing.sm,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.sm,
  },
  messageCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  quoteIcon: { marginBottom: Spacing.sm },
  messageText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'left',
  },
  photoCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
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
  envelopeCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  envelopeContent: {
    alignItems: 'center',
  },
  envelopeTitle: {
    fontFamily: Fonts.title,
    fontSize: 18,
    marginTop: Spacing.md,
  },
  envelopeHint: {
    fontFamily: Fonts.body,
    fontSize: 12,
    marginTop: Spacing.sm,
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
    fontSize: 12,
  },
});
