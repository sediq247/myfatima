import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song, LoveLetter } from '../data';

// ============================================================
// PRE-IMPORT ALL LOCAL AUDIO FILES (20 songs)
// ============================================================
const songAssets: Record<string, any> = {
  'song1.mp3': require('../../assets/music/song1.mp3'),
  'song2.mp3': require('../../assets/music/song2.mp3'),
  'song3.mp3': require('../../assets/music/song3.mp3'),
  'song4.mp3': require('../../assets/music/song4.mp3'),
  'song5.mp3': require('../../assets/music/song5.mp3'),
  'song6.mp3': require('../../assets/music/song6.mp3'),
  'song7.mp3': require('../../assets/music/song7.mp3'),
  'song8.mp3': require('../../assets/music/song8.mp3'),
  'song9.mp3': require('../../assets/music/song9.mp3'),
  'song10.mp3': require('../../assets/music/song10.mp3'),
  'song11.mp3': require('../../assets/music/song11.mp3'),
  'song12.mp3': require('../../assets/music/song12.mp3'),
  'song13.mp3': require('../../assets/music/song13.mp3'),
  'song14.mp3': require('../../assets/music/song14.mp3'),
  'song15.mp3': require('../../assets/music/song15.mp3'),
  'song16.mp3': require('../../assets/music/song16.mp3'),
  'song17.mp3': require('../../assets/music/song17.mp3'),
  'song18.mp3': require('../../assets/music/song18.mp3'),
  'song19.mp3': require('../../assets/music/song19.mp3'),
  'song20.mp3': require('../../assets/music/song20.mp3'),
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
}

export interface AppState {
  music: MusicState;
  selectedLetter: LoveLetter | null;
  greetingVisible: boolean;
  greetingMessage: string;
  greetingPrayer: string;
  timePeriod: 'morning' | 'night';
  isBirthday: boolean;
  theme: 'day' | 'night';
}

type Action =
  | { type: 'SET_TRACK'; index: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAYLIST' }
  | { type: 'SET_PROGRESS'; progress: number; duration: number }
  | { type: 'SELECT_LETTER'; letter: LoveLetter | null }
  | { type: 'SHOW_GREETING'; message: string; prayer: string; period: 'morning' | 'night'; isBirthday: boolean }
  | { type: 'HIDE_GREETING' }
  | { type: 'SET_TIME_PERIOD'; period: 'morning' | 'night' }
  | { type: 'SET_BIRTHDAY'; isBirthday: boolean }
  | { type: 'SET_THEME'; theme: 'day' | 'night' };

const initialState: AppState = {
  music: {
    isPlaying: false,
    currentTrackIndex: 0,
    progress: 0,
    duration: 0,
    playlistVisible: false,
  },
  selectedLetter: null,
  greetingVisible: false,
  greetingMessage: '',
  greetingPrayer: '',
  timePeriod: 'morning',
  isBirthday: false,
  theme: 'day',
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
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  loadTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  playTrack: (index: number, songs: Song[]) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  skipNext: (songs: Song[]) => Promise<void>;
  skipPrev: (songs: Song[]) => Promise<void>;
  cleanupMusic: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const playerRef = useRef<AudioPlayer | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const listenerRef = useRef<any>(null);

  // Setup audio mode with error handling
  useEffect(() => {
    let mounted = true;
    const setupAudio = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
        });
      } catch (e) {
        console.warn('Audio mode setup failed:', e);
      }
    };
    if (mounted) setupAudio();
    return () => { mounted = false; };
  }, []);

  const clearProgressInterval = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const startProgressPolling = useCallback((player: AudioPlayer) => {
    clearProgressInterval();
    progressInterval.current = setInterval(() => {
      const status = player.status;
      if (status.isLoaded) {
        dispatch({
          type: 'SET_PROGRESS',
          progress: status.currentTime / 1000,
          duration: status.duration ? status.duration / 1000 : 0,
        });
      }
    }, 1000);
  }, [clearProgressInterval]);

  const cleanupPlayer = useCallback(() => {
    clearProgressInterval();
    if (listenerRef.current && playerRef.current) {
      try {
        playerRef.current.removeListener('playbackStatusUpdate', listenerRef.current);
      } catch (e) {
        // Ignore
      }
      listenerRef.current = null;
    }
    if (playerRef.current) {
      try {
        playerRef.current.pause();
      } catch (e) {
        // Ignore
      }
      playerRef.current = null;
    }
  }, [clearProgressInterval]);

  const playTrack = useCallback(async (index: number, songs: Song[]) => {
    try {
      // Cleanup previous player completely
      cleanupPlayer();

      // Small delay to ensure native cleanup
      await new Promise(resolve => setTimeout(resolve, 50));

      const source = getSongSource(songs[index].filename);
      const newPlayer = createAudioPlayer(source, {
        shouldPlay: true,
        isLooping: false
      });

      playerRef.current = newPlayer;
      dispatch({ type: 'SET_TRACK', index });

      startProgressPolling(newPlayer);

      // Store listener reference for cleanup
      const listener = (status: any) => {
        if (status.didJustFinish) {
          const nextIndex = (index + 1) % songs.length;
          playTrack(nextIndex, songs);
        }
      };
     
      newPlayer.addListener('playbackStatusUpdate', listener);
      listenerRef.current = listener;

    } catch (e) {
      console.warn('Audio play failed', e);
      dispatch({ type: 'PAUSE' });
    }
  }, [cleanupPlayer, startProgressPolling]);

  const togglePlayPause = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      if (state.music.isPlaying) {
        player.pause();
        dispatch({ type: 'PAUSE' });
        clearProgressInterval();
      } else {
        player.play();
        dispatch({ type: 'PLAY' });
        startProgressPolling(player);
      }
    } catch (e) {
      console.warn('Toggle play failed', e);
    }
  }, [state.music.isPlaying, clearProgressInterval, startProgressPolling]);

  const skipNext = useCallback(async (songs: Song[]) => {
    const nextIndex = (state.music.currentTrackIndex + 1) % songs.length;
    await playTrack(nextIndex, songs);
  }, [state.music.currentTrackIndex, playTrack]);

  const skipPrev = useCallback(async (songs: Song[]) => {
    const prevIndex = (state.music.currentTrackIndex - 1 + songs.length) % songs.length;
    await playTrack(prevIndex, songs);
  }, [state.music.currentTrackIndex, playTrack]);

  const cleanupMusic = useCallback(async () => {
    cleanupPlayer();
  }, [cleanupPlayer]);

  const loadTheme = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem('myfatima_theme');
      if (saved === 'day' || saved === 'night') {
        dispatch({ type: 'SET_THEME', theme: saved });
      }
    } catch (e) {
      console.warn('Failed to load theme:', e);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    const newTheme = state.theme === 'day' ? 'night' : 'day';
    dispatch({ type: 'SET_THEME', theme: newTheme });
    try {
      await AsyncStorage.setItem('myfatima_theme', newTheme);
    } catch (e) {
      console.warn('Failed to save theme:', e);
    }
  }, [state.theme]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        loadTheme,
        toggleTheme,
        playTrack,
        togglePlayPause,
        skipNext,
        skipPrev,
        cleanupMusic
      }}
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