import AsyncStorage from '@react-native-async-storage/async-storage';

export type TimePeriod = 'morning' | 'afternoon' | 'night';

const MORNING_START_HOUR = 5;
const MORNING_START_MINUTE = 30;
const AFTERNOON_START_HOUR = 12;
const AFTERNOON_START_MINUTE = 0;
const NIGHT_START_HOUR = 17;
const NIGHT_START_MINUTE = 0;

export function getTimePeriod(date: Date = new Date()): TimePeriod {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  const morningStart = MORNING_START_HOUR * 60 + MORNING_START_MINUTE;
  const afternoonStart = AFTERNOON_START_HOUR * 60 + AFTERNOON_START_MINUTE;
  const nightStart = NIGHT_START_HOUR * 60 + NIGHT_START_MINUTE;

  if (totalMinutes >= morningStart && totalMinutes < afternoonStart) {
    return 'morning';
  }
  if (totalMinutes >= afternoonStart && totalMinutes < nightStart) {
    return 'afternoon';
  }
  return 'night';
}

export function getDaysTogether(startDate: Date): number {
  const now = new Date();
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = today.getTime() - start.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

export function getDailyIndex(arrayLength: number, date: Date = new Date()): number {
  if (arrayLength <= 0) return 0;
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  let hash = 0;
  const str = seed.toString();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % arrayLength;
}

export function getGreetingKey(period: TimePeriod, date: Date = new Date()): string {
  return `greeting_shown_${period}_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
}

export async function hasGreetingBeenShown(key: string): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === '1';
  } catch {
    return false;
  }
}

export async function markGreetingShown(key: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, '1');
  } catch {
    // silently fail
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function getTimeLabel(period: TimePeriod): string {
  if (period === 'morning') return 'Morning';
  if (period === 'afternoon') return 'Afternoon';
  return 'Night';
}

export function getGreetingText(period: TimePeriod, isBday: boolean = false): string {
  if (isBday) {
    if (period === 'morning') return 'Happy Birthday my Fatima!';
    if (period === 'afternoon') return 'Happy Birthday my princess!';
    return 'Goodnight my birthday queen';
  }
  if (period === 'morning') return 'Good morning my Fatima';
  if (period === 'afternoon') return 'Good afternoon my princess';
  return 'Goodnight my Fatima';
}
