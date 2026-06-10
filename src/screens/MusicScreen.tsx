import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../state/AppContext';
import { songs } from '../data';
import { Themes, Fonts, Spacing, Radius } from '../theme';

const { width } = Dimensions.get('window');

export default function MusicScreen() {
  const { state, playTrack, togglePlayPause, skipNext, skipPrev } = useApp();
  const Colors = Themes[state.theme];
  const insets = useSafeAreaInsets();

  const currentSong = songs[state.music.currentTrackIndex];

  return (
    <View style={[styles.root, { backgroundColor: Colors.bg.start, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors.accent.cream }]}>Our Music</Text>
        <Text style={[styles.headerSubtitle, { color: Colors.text.muted }]}>
          Songs that remind me of you, my princess
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {songs.map((song, idx) => {
          const isActive = idx === state.music.currentTrackIndex;
          return (
            <TouchableOpacity
              key={song.id}
              style={[
                styles.songRow,
                {
                  backgroundColor: isActive ? 'rgba(212,175,55,0.12)' : Colors.bg.card,
                  borderColor: isActive ? Colors.accent.gold : Colors.bg.cardBorder,
                },
              ]}
              onPress={() => playTrack(idx, songs)}
              activeOpacity={0.7}
            >
              <View style={styles.songLeft}>
                <View style={[
                  styles.songIcon,
                  {
                    backgroundColor: isActive ? Colors.accent.gold : 'rgba(212,175,55,0.15)',
                  },
                ]}>
                  <FontAwesome5
                    name={isActive && state.music.isPlaying ? 'pause' : 'play'}
                    size={12}
                    color={isActive ? Colors.bg.start : Colors.accent.gold}
                  />
                </View>
                <View style={styles.songInfo}>
                  <Text
                    style={[
                      styles.songTitle,
                      { color: isActive ? Colors.accent.gold : Colors.accent.cream },
                    ]}
                    numberOfLines={1}
                  >
                    {song.title}
                  </Text>
                  <Text style={[styles.songArtist, { color: Colors.text.muted }]} numberOfLines={1}>
                    {song.artist}
                  </Text>
                </View>
              </View>
              <Text style={[styles.songDuration, { color: Colors.text.muted }]}>
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Player Bar */}
      {currentSong && (
        <View style={[
          styles.playerBar,
          { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }
        ]}>
          <View style={styles.playerInfo}>
            <Text style={[styles.playerTitle, { color: Colors.accent.cream }]} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={[styles.playerArtist, { color: Colors.text.muted }]} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>

          <View style={styles.playerControls}>
            <TouchableOpacity onPress={() => skipPrev(songs)} style={styles.controlBtn}>
              <Ionicons name="play-skip-back" size={24} color={Colors.accent.gold} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => togglePlayPause()} style={[
              styles.playBtn,
              { backgroundColor: Colors.accent.gold }
            ]}>
              <FontAwesome5
                name={state.music.isPlaying ? 'pause' : 'play'}
                size={20}
                color={Colors.bg.start}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => skipNext(songs)} style={styles.controlBtn}>
              <Ionicons name="play-skip-forward" size={24} color={Colors.accent.gold} />
            </TouchableOpacity>
          </View>

          <View style={styles.progressRow}>
            <View style={[styles.progressTrack, { backgroundColor: 'rgba(128,128,128,0.2)' }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: Colors.accent.gold,
                    width: state.music.duration > 0
                      ? `${(state.music.progress / state.music.duration) * 100}%`
                      : '0%',
                  },
                ]}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontFamily: Fonts.title,
    fontSize: 28,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 200,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  songLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  songIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
  },
  songArtist: {
    fontFamily: Fonts.body,
    fontSize: 13,
    marginTop: 2,
  },
  songDuration: {
    fontFamily: Fonts.body,
    fontSize: 12,
  },
  playerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 30,
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  playerTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
  },
  playerArtist: {
    fontFamily: Fonts.body,
    fontSize: 13,
    marginTop: 2,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.md,
  },
  controlBtn: {
    padding: Spacing.sm,
  },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRow: {
    marginBottom: Spacing.sm,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
});
