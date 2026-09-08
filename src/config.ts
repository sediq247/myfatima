import Constants from 'expo-constants';

export const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || '';

export const RELATIONSHIP_START_DATE = new Date('2021-09-01T00:00:00');
