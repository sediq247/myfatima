import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../state/AppContext';
import {
  getTimePeriod,
  getDaysTogether,
  getDailyIndex,
  formatDuration,
} from '../core/engine';
import {
  loveMessages,
  loveLetters,
  birthdayMessages,
  birthdayLetters,
  songs,
  photoMemories,
  isBirthday,
  Song,
  LoveLetter,
} from '../data';
import { Colors, Fonts, Spacing, Radius } from '../theme';

const { width } = Dimensions.get('window');
const RELATIONSHIP_START_DATE = new Date('2021-09-24');

function PhotoFrame({ photo, index }: { photo: typeof photoMemories[0]; index: number }) {
  return (
    <View style={[styles.photoCard, { marginLeft: index === 0 ? Spacing.lg : Spacing.md }]}>
      <View style={styles.photoPlaceholder}>
        <Ionicons name="image" size={32} color={Colors.accent.gold} />
        <Text style={styles.photoPlaceholderText}>Add {photo.caption}</Text>
      </View>
      <View style={styles.photoCaptionBox}>
        <Text style={styles.photoCaption}>{photo.caption}</Text>
        <Text style={styles.photoDate}>{photo.dateLabel}</Text>
      </View>
    </View>
  );
}

function LoveCard({ message, isBirthday }: { message: string; isBirthday?: boolean }) {
  return (
    <View style={[styles.loveCard, isBirthday && styles.birthdayCard]}>
      <MaterialCommunityIcons
        name={isBirthday ? "cake-variant" : "format-quote-open"}
        size={24}
        color={isBirthday ? Colors.accent.roseLight : Colors.accent.gold}
        style={styles.quoteIcon}
      />
      <Text style={[styles.loveMessage, isBirthday && styles.birthdayMessage]}>{message}</Text>
      <MaterialCommunityIcons
        name={isBirthday ? "party-popper" : "format-quote-close"}
        size={24}
        color={isBirthday ? Colors.accent.roseLight : Colors.accent.gold}
        style={[styles.quoteIcon, { alignSelf: 'flex-end' }]}
      />
    </View>
  );
}

function HeartEnvelope({ onOpen, isBirthday }: { onOpen: (letter: LoveLetter) => void; isBirthday?: boolean }) {
  const [opened, setOpened] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => {
      pulse.stop();
    };
  }, [pulseAnim]);

  const handlePress = () => {
    if (!opened) {
      setOpened(true);
    } else {
      const letters = isBirthday ? birthdayLetters : loveLetters;
      const index = getDailyIndex(letters.length);
      onOpen(letters[index]);
    }
  };

  const letters = isBirthday ? birthdayLetters : loveLetters;
  const todayLetter = letters[getDailyIndex(letters.length)];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={styles.envelopeContainer}>
      <Animated.View style={[styles.heartWrapper, isBirthday && styles.birthdayHeartWrapper, { transform: [{ scale: pulseAnim }] }]}>
        {!opened ? (
          <>
            <FontAwesome5 name="heart" size={48} color={isBirthday ? Colors.accent.gold : Colors.accent.rose} solid />
            <Text style={styles.heartLabel}>{isBirthday ? 'Tap for birthday wishes' : 'Tap to open'}</Text>
          </>
        ) : (
          <View style={styles.envelopePreview}>
            <FontAwesome5 name="envelope-open-text" size={32} color={Colors.accent.gold} />
            <Text style={styles.envelopePreviewText} numberOfLines={2}>
              {todayLetter.title}
            </Text>
            <Text style={styles.envelopeHint}>Tap again to read</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

function MusicPlayerInline({ songs }: { songs: Song[] }) {
  const { state, togglePlayPause, skipNext, skipPrev, playTrack } = useApp();
  const [expanded, setExpanded] = useState(false);

  const currentSong = songs[state.music.currentTrackIndex];

  return (
    <View style={styles.musicContainer}>
      <TouchableOpacity
        style={styles.musicCollapsed}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.9}
      >
        <View style={styles.musicLeft}>
          <View style={styles.musicIconCircle}>
            <FontAwesome5
              name={state.music.isPlaying ? 'pause' : 'play'}
              size={14}
              color={Colors.bg.nightStart}
            />
          </View>
          <View style={{ marginLeft: Spacing.md }}>
            <Text style={styles.musicTitle} numberOfLines={1}>
              {currentSong?.title ?? 'Select a song'}
            </Text>
            <Text style={styles.musicArtist} numberOfLines={1}>
              {currentSong?.artist ?? ''}
            </Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-down' : 'chevron-up'}
          size={20}
          color={Colors.accent.creamMuted}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.musicExpanded}>
          <View style={styles.musicControls}>
            <TouchableOpacity onPress={() => skipPrev(songs)}>
              <Ionicons name="play-skip-back" size={28} color={Colors.accent.gold} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => togglePlayPause()} style={styles.musicPlayBtn}>
              <FontAwesome5
                name={state.music.isPlaying ? 'pause' : 'play'}
                size={22}
                color={Colors.bg.nightStart}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => skipNext(songs)}>
              <Ionicons name="play-skip-forward" size={28} color={Colors.accent.gold} />
            </TouchableOpacity>
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>{formatDuration(state.music.progress)}</Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width:
                      state.music.duration > 0
                        ? `${(state.music.progress / state.music.duration) * 100}%`
                        : '0%',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{formatDuration(state.music.duration)}</Text>
          </View>
          <ScrollView style={styles.playlist} showsVerticalScrollIndicator={false}>
            {songs.map((song, idx) => (
              <TouchableOpacity
                key={song.id}
                style={[
                  styles.playlistItem,
                  idx === state.music.currentTrackIndex && styles.playlistItemActive,
                ]}
                onPress={() => playTrack(idx, songs)}
              >
                <Text
                  style={[
                    styles.playlistTitle,
                    idx === state.music.currentTrackIndex && styles.playlistTitleActive,
                  ]}
                >
                  {song.title}
                </Text>
                <Text style={styles.playlistArtist}>{song.artist}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { dispatch } = useApp();
  const [period, setPeriod] = useState(getTimePeriod());
  const [days, setDays] = useState(0);
  const [bday, setBday] = useState(isBirthday());

  useEffect(() => {
    setDays(getDaysTogether(RELATIONSHIP_START_DATE));
    const interval = setInterval(() => {
      setPeriod(getTimePeriod());
      setDays(getDaysTogether(RELATIONSHIP_START_DATE));
      setBday(isBirthday());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const messages = bday ? birthdayMessages : loveMessages;
  const dailyMessageIndex = getDailyIndex(messages.length);
  const dailyMessage = messages[dailyMessageIndex].text;

  const dailyPhotoIndices = [
    getDailyIndex(photoMemories.length),
    (getDailyIndex(photoMemories.length) + 1) % photoMemories.length,
    (getDailyIndex(photoMemories.length) + 2) % photoMemories.length,
  ];
  const dailyPhotos = dailyPhotoIndices.map((i) => photoMemories[i]);

  const handleOpenLetter = useCallback(
    (letter: LoveLetter) => {
      dispatch({ type: 'SELECT_LETTER', letter });
      navigation.navigate('Letter');
    },
    [dispatch, navigation]
  );

  const bgColors =
    period === 'morning'
      ? ([Colors.bg.morningStart, Colors.bg.morningEnd] as const)
      : ([Colors.bg.nightStart, Colors.bg.nightEnd] as const);

  return (
    <LinearGradient colors={bgColors} style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Birthday Banner */}
        {bday && (
          <View style={styles.birthdayBanner}>
            <FontAwesome5 name="birthday-cake" size={20} color={Colors.accent.gold} />
            <Text style={styles.birthdayBannerText}>Happy Birthday Fatima!</Text>
            <FontAwesome5 name="birthday-cake" size={20} color={Colors.accent.gold} />
          </View>
        )}

        <View style={styles.header}>
          <View style={styles.periodBadge}>
            <Ionicons
              name={period === 'morning' ? 'sunny' : 'moon'}
              size={16}
              color={Colors.accent.gold}
            />
            <Text style={styles.periodText}>{period === 'morning' ? 'Morning' : 'Night'}</Text>
          </View>
          <Text style={styles.headerTitle}>MyFatima</Text>
        </View>

        <View style={[styles.counterCard, bday && styles.birthdayCounterCard]}>
          <Text style={[styles.counterNumber, bday && styles.birthdayCounterNumber]}>{days}</Text>
          <Text style={styles.counterLabel}>Days Together</Text>
          {bday && <Text style={styles.birthdaySubtext}>And today she turns another year more beautiful</Text>}
        </View>

        <LoveCard message={dailyMessage} isBirthday={bday} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{bday ? "Birthday Memories" : "Today's Memories"}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photoScroll}
        >
          {dailyPhotos.map((photo, idx) => (
            <PhotoFrame key={photo.id} photo={photo} index={idx} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{bday ? "Birthday Letter" : "Today's Letter"}</Text>
        </View>
        <HeartEnvelope onOpen={handleOpenLetter} isBirthday={bday} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{bday ? "Birthday Music" : "Our Music"}</Text>
        </View>
        <MusicPlayerInline songs={songs} />

        <View style={styles.footer}>
          <FontAwesome5 name="heart" size={12} color={Colors.accent.roseLight} solid />
          <Text style={styles.footerText}>{bday ? 'Happy Birthday my love' : 'Made with love for Fatima'}</Text>
          <FontAwesome5 name="heart" size={12} color={Colors.accent.roseLight} solid />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.xxl },

  birthdayBanner: {
    marginHorizontal: Spacing.lg,
    marginTop: 50,
    backgroundColor: 'rgba(212,175,55,0.2)',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.4)',
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  birthdayBannerText: {
    fontFamily: Fonts.title,
    fontSize: 18,
    color: Colors.accent.gold,
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212,175,55,0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
  },
  periodText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.accent.gold,
    marginLeft: Spacing.sm,
    textTransform: 'capitalize',
  },
  headerTitle: {
    fontFamily: Fonts.title,
    fontSize: 22,
    color: Colors.accent.cream,
    letterSpacing: 1,
  },

  counterCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.bg.cardBorder,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  birthdayCounterCard: {
    borderColor: 'rgba(212,175,55,0.4)',
    backgroundColor: 'rgba(212,175,55,0.1)',
  },
  counterNumber: {
    fontFamily: Fonts.title,
    fontSize: 56,
    color: Colors.accent.gold,
    lineHeight: 64,
  },
  birthdayCounterNumber: {
    color: Colors.accent.goldLight,
  },
  counterLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  birthdaySubtext: {
    fontFamily: Fonts.letter,
    fontSize: 14,
    color: Colors.accent.gold,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },

  loveCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.bg.cardBorder,
    padding: Spacing.lg,
  },
  birthdayCard: {
    borderColor: 'rgba(212,175,55,0.4)',
    backgroundColor: 'rgba(212,175,55,0.08)',
  },
  quoteIcon: { marginBottom: Spacing.sm },
  loveMessage: {
    fontFamily: Fonts.titleItalic,
    fontSize: 18,
    color: Colors.accent.cream,
    lineHeight: 28,
    textAlign: 'center',
  },
  birthdayMessage: {
    color: Colors.accent.goldLight,
  },

  sectionHeader: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.accent.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  photoScroll: { paddingRight: Spacing.lg },
  photoCard: {
    width: width * 0.6,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.bg.cardBorder,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: Spacing.sm,
  },
  photoCaptionBox: { padding: Spacing.md },
  photoCaption: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.accent.cream,
  },
  photoDate: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: Spacing.xs,
  },

  envelopeContainer: {
    marginHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  heartWrapper: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.bg.cardBorder,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  birthdayHeartWrapper: {
    borderColor: 'rgba(212,175,55,0.4)',
    backgroundColor: 'rgba(212,175,55,0.1)',
  },
  heartLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
  envelopePreview: { alignItems: 'center' },
  envelopePreviewText: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.accent.cream,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  envelopeHint: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.accent.gold,
    marginTop: Spacing.sm,
  },

  musicContainer: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.bg.cardBorder,
    overflow: 'hidden',
  },
  musicCollapsed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  musicLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  musicIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.accent.cream,
    maxWidth: 200,
  },
  musicArtist: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 2,
  },
  musicExpanded: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md },
  musicControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginVertical: Spacing.md,
  },
  musicPlayBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressText: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.text.muted,
    width: 36,
    textAlign: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.accent.gold,
    borderRadius: 2,
  },
  playlist: { maxHeight: 180 },
  playlistItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  playlistItemActive: { backgroundColor: 'rgba(212,175,55,0.1)' },
  playlistTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.accent.cream,
  },
  playlistTitleActive: { color: Colors.accent.gold },
  playlistArtist: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: 2,
  },

  footer: {
    marginTop: Spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  footerText: {
    fontFamily: Fonts.letter,
    fontSize: 14,
    color: Colors.accent.creamMuted,
  },
});
