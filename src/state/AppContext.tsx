import React, { createContext, useContext, useReducer, useCallback, useEffect, useMemo, useRef } from 'react';
import { AppState } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song, LoveLetter, songs } from '../data';

// ============================================================
// AUDIO ASSETS MAP
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

// ============================================================
// TYPES
// ============================================================
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface MusicState {
  isPlaying: boolean;
  currentTrackIndex: number;
  progress: number;
  duration: number;
}

export interface AppState {
  music: MusicState;
  selectedLetter: LoveLetter | null;
  greetingVisible: boolean;
  greetingMessage: string;
  greetingPrayer: string;
  timePeriod: 'morning' | 'afternoon' | 'night';
  isBirthday: boolean;
  theme: 'day' | 'night';
  chatMessages: ChatMessage[];
  chatLoading: boolean;
}

type Action =
  | { type: 'SET_TRACK'; index: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_PROGRESS'; progress: number; duration: number }
  | { type: 'SELECT_LETTER'; letter: LoveLetter | null }
  | { type: 'SHOW_GREETING'; message: string; prayer: string; period: 'morning' | 'afternoon' | 'night'; isBirthday: boolean }
  | { type: 'HIDE_GREETING' }
  | { type: 'SET_TIME_PERIOD'; period: 'morning' | 'afternoon' | 'night' }
  | { type: 'SET_BIRTHDAY'; isBirthday: boolean }
  | { type: 'SET_THEME'; theme: 'day' | 'night' }
  | { type: 'ADD_CHAT_MESSAGE'; message: ChatMessage }
  | { type: 'SET_CHAT_LOADING'; loading: boolean }
  | { type: 'CLEAR_CHAT' }
  | { type: 'LOAD_CHAT'; messages: ChatMessage[] };

const initialState: AppState = {
  music: {
    isPlaying: false,
    currentTrackIndex: 0,
    progress: 0,
    duration: 0,
  },
  selectedLetter: null,
  greetingVisible: false,
  greetingMessage: '',
  greetingPrayer: '',
  timePeriod: 'morning',
  isBirthday: false,
  theme: 'day',
  chatMessages: [],
  chatLoading: false,
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
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.message] };
    case 'SET_CHAT_LOADING':
      return { ...state, chatLoading: action.loading };
    case 'CLEAR_CHAT':
      return { ...state, chatMessages: [] };
    case 'LOAD_CHAT':
      return { ...state, chatMessages: action.messages };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  loadTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  playTrack: (index: number) => void;
  togglePlayPause: () => void;
  skipNext: () => void;
  skipPrev: () => void;
  loadChat: () => Promise<void>;
  saveChat: (messages: ChatMessage[]) => Promise<void>;
  clearChat: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = 'myfatima_chat_history';

// ============================================================
// AUDIO CONTROLLER — handles playback with background support
// ============================================================
function AudioController() {
  const { state, dispatch } = useApp();
  const appStateRef = useRef(AppState.currentState);

  // Get current song and memoize the source to prevent player recreation
  const currentSong = songs[state.music.currentTrackIndex];
  const source = useMemo(() => {
    return currentSong ? getSongSource(currentSong.filename) : null;
  }, [currentSong?.filename]);

  // Create player only when we have a valid source
  const player = useAudioPlayer(source || '');
  const status = useAudioPlayerStatus(player);

  // Handle play/pause from state
  useEffect(() => {
    if (!player || !source) return;
    try {
      if (state.music.isPlaying) {
        player.play();
      } else {
        player.pause();
      }
    } catch (e) {
      console.warn('Audio control error:', e);
    }
  }, [state.music.isPlaying, player, source]);

  // Update progress from status
  useEffect(() => {
    if (!status?.isLoaded) return;
    dispatch({
      type: 'SET_PROGRESS',
      progress: status.currentTime / 1000,
      duration: status.duration ? status.duration / 1000 : 0,
    });
    if (status.didJustFinish) {
      dispatch({ type: 'PAUSE' });
      // Auto-advance to next track
      setTimeout(() => {
        dispatch({ type: 'SET_TRACK', index: (state.music.currentTrackIndex + 1) % songs.length });
      }, 500);
    }
  }, [status]);

  // Keep audio playing when app goes to background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' && state.music.isPlaying && player) {
        // Audio should continue playing in background
        // The expo-audio plugin with enableBackgroundPlayback handles this natively
        try {
          player.play();
        } catch (e) {
          console.warn('Background audio error:', e);
        }
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [state.music.isPlaying, player]);

  return null;
}

// ============================================================
// APP PROVIDER
// ============================================================
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const playTrack = useCallback((index: number) => {
    dispatch({ type: 'SET_TRACK', index });
  }, []);

  const togglePlayPause = useCallback(() => {
    dispatch({ type: state.music.isPlaying ? 'PAUSE' : 'PLAY' });
  }, [state.music.isPlaying]);

  const skipNext = useCallback(() => {
    const nextIndex = (state.music.currentTrackIndex + 1) % songs.length;
    dispatch({ type: 'SET_TRACK', index: nextIndex });
  }, [state.music.currentTrackIndex]);

  const skipPrev = useCallback(() => {
    const prevIndex = (state.music.currentTrackIndex - 1 + songs.length) % songs.length;
    dispatch({ type: 'SET_TRACK', index: prevIndex });
  }, [state.music.currentTrackIndex]);

  const loadChat = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const messages = JSON.parse(saved);
        dispatch({ type: 'LOAD_CHAT', messages });
      }
    } catch (e) {
      console.warn('Failed to load chat:', e);
    }
  }, []);

  const saveChat = useCallback(async (messages: ChatMessage[]) => {
    try {
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat:', e);
    }
  }, []);

  const clearChat = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
      dispatch({ type: 'CLEAR_CHAT' });
    } catch (e) {
      console.warn('Failed to clear chat:', e);
    }
  }, []);

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
        loadChat,
        saveChat,
        clearChat,
      }}
    >
      <AudioController />
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
