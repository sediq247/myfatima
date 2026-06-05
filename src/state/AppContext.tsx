import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import { Audio } from 'expo-av';
import { Song, LoveLetter } from '../data';

// ============================================================
// PRE-IMPORT ALL LOCAL AUDIO FILES (20 slots)
// Add your MP3 files to assets/music/ and update this map:
// ============================================================
const songAssets: Record<string, any> = {
  'song1.mp3': require('../assets/music/song1.mp3'),
  'song2.mp3': require('../assets/music/song2.mp3'),
  'song3.mp3': require('../assets/music/song3.mp3'),
  'song4.mp3': require('../assets/music/song4.mp3'),
  'song5.mp3': require('../assets/music/song5.mp3'),
  'song6.mp3': require('../assets/music/song6.mp3'),
  'song7.mp3': require('../assets/music/song7.mp3'),
  'song8.mp3': require('../assets/music/song8.mp3'),
  'song9.mp3': require('../assets/music/song9.mp3'),
  'song10.mp3': require('../assets/music/song10.mp3'),
  'song11.mp3': require('../assets/music/song11.mp3'),
  'song12.mp3': require('../assets/music/song12.mp3'),
  'song13.mp3': require('../assets/music/song13.mp3'),
  'song14.mp3': require('../assets/music/song14.mp3'),
  'song15.mp3': require('../assets/music/song15.mp3'),
  'song16.mp3': require('../assets/music/song16.mp3'),
  'song17.mp3': require('../assets/music/song17.mp3'),
  'song18.mp3': require('../assets/music/song18.mp3'),
  'song19.mp3': require('../assets/music/song19.mp3'),
  'song20.mp3': require('../assets/music/song20.mp3'),
};

function getSongSource(filename: string): any {
  return songAssets[filename] || { uri: filename };
}

export interface MusicState {
  isPlaying: boolean;
  currentTrackIndex: number;
  progress: number;
  duration: number;
  playlistVisible: boolean;
  sound: Audio.Sound | null;
}

export interface AppState {
  music: MusicState;
  selectedLetter: LoveLetter | null;
  greetingVisible: boolean;
  greetingMessage: string;
  greetingPrayer: string;
  timePeriod: 'morning' | 'night';
  isBirthday: boolean;
}

type Action =
  | { type: 'SET_TRACK'; index: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAYLIST' }
  | { type: 'SET_PROGRESS'; progress: number; duration: number }
  | { type: 'SET_SOUND'; sound: Audio.Sound | null }
  | { type: 'SELECT_LETTER'; letter: LoveLetter | null }
  | { type: 'SHOW_GREETING'; message: string; prayer: string; period: 'morning' | 'night'; isBirthday: boolean }
  | { type: 'HIDE_GREETING' }
  | { type: 'SET_TIME_PERIOD'; period: 'morning' | 'night' }
  | { type: 'SET_BIRTHDAY'; isBirthday: boolean };

const initialState: AppState = {
  music: {
    isPlaying: false,
    currentTrackIndex: 0,
    progress: 0,
    duration: 0,
    playlistVisible: false,
    sound: null,
  },
  selectedLetter: null,
  greetingVisible: false,
  greetingMessage: '',
  greetingPrayer: '',
  timePeriod: 'morning',
  isBirthday: false,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_TRACK':
      return {
        ...state,
        music: { ...state.music, currentTrackIndex: action.index, progress: 0, isPlaying: true },
      };
    case 'PLAY':
      return { ...state, music: { ...state.music, isPlaying: true } };
    case 'PAUSE':
      return { ...state, music: { ...state.music, isPlaying: false } };
    case 'TOGGLE_PLAYLIST':
      return { ...state, music: { ...state.music, playlistVisible: !state.music.playlistVisible } };
    case 'SET_PROGRESS':
      return {
        ...state,
        music: { ...state.music, progress: action.progress, duration: action.duration },
      };
    case 'SET_SOUND':
      return { ...state, music: { ...state.music, sound: action.sound } };
    case 'SELECT_LETTER':
      return { ...state, selectedLetter: action.letter };
    case 'SHOW_GREETING':
      return {
        ...state,
        greetingVisible: true,
        greetingMessage: action.message,
        greetingPrayer: action.prayer,
        timePeriod: action.period,
        isBirthday: action.isBirthday,
      };
    case 'HIDE_GREETING':
      return { ...state, greetingVisible: false };
    case 'SET_TIME_PERIOD':
      return { ...state, timePeriod: action.period };
    case 'SET_BIRTHDAY':
      return { ...state, isBirthday: action.isBirthday };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  playTrack: (index: number, songs: Song[]) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  skipNext: (songs: Song[]) => Promise<void>;
  skipPrev: (songs: Song[]) => Promise<void>;
  cleanupMusic: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgressInterval = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const startProgressPolling = useCallback((sound: Audio.Sound) => {
    clearProgressInterval();
    progressInterval.current = setInterval(async () => {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          dispatch({
            type: 'SET_PROGRESS',
            progress: status.positionMillis / 1000,
            duration: status.durationMillis ? status.durationMillis / 1000 : 0,
          });
        }
      } catch {
        // ignore
      }
    }, 1000);
  }, [clearProgressInterval]);

  const playTrack = useCallback(async (index: number, songs: Song[]) => {
    try {
      if (state.music.sound) {
        await state.music.sound.unloadAsync();
      }
      const source = getSongSource(songs[index].filename);
      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true, isLooping: false }
      );
      dispatch({ type: 'SET_SOUND', sound });
      dispatch({ type: 'SET_TRACK', index });
      startProgressPolling(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          const nextIndex = (index + 1) % songs.length;
          playTrack(nextIndex, songs);
        }
      });
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  }, [state.music.sound, startProgressPolling]);

  const togglePlayPause = useCallback(async () => {
    if (!state.music.sound) return;
    try {
      if (state.music.isPlaying) {
        await state.music.sound.pauseAsync();
        dispatch({ type: 'PAUSE' });
        clearProgressInterval();
      } else {
        await state.music.sound.playAsync();
        dispatch({ type: 'PLAY' });
        startProgressPolling(state.music.sound);
      }
    } catch (e) {
      console.warn('Toggle play failed', e);
    }
  }, [state.music.sound, state.music.isPlaying, clearProgressInterval, startProgressPolling]);

  const skipNext = useCallback(async (songs: Song[]) => {
    const nextIndex = (state.music.currentTrackIndex + 1) % songs.length;
    await playTrack(nextIndex, songs);
  }, [state.music.currentTrackIndex, playTrack]);

  const skipPrev = useCallback(async (songs: Song[]) => {
    const prevIndex = (state.music.currentTrackIndex - 1 + songs.length) % songs.length;
    await playTrack(prevIndex, songs);
  }, [state.music.currentTrackIndex, playTrack]);

  const cleanupMusic = useCallback(async () => {
    clearProgressInterval();
    if (state.music.sound) {
      try {
        await state.music.sound.stopAsync();
        await state.music.sound.unloadAsync();
      } catch {
        // ignore
      }
      dispatch({ type: 'SET_SOUND', sound: null });
    }
  }, [state.music.sound, clearProgressInterval]);

  return (
    <AppContext.Provider
      value={{ state, dispatch, playTrack, togglePlayPause, skipNext, skipPrev, cleanupMusic }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
