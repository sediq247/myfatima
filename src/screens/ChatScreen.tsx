import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getNetworkStateAsync } from 'expo-network';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useApp, ChatMessage } from '../state/AppContext';
import { Themes, Fonts, Spacing, Radius } from '../theme';
import { GEMINI_API_KEY } from '../config';

const { width } = Dimensions.get('window');

// ============================================================
// SYSTEM PROMPT — Abubakar texting Fatima
// ============================================================
const SYSTEM_PROMPT = `You are Abubakar Zakariyau (Sadiq), a 20-year-old Nigerian guy texting his girlfriend Fatima. You love her deeply and you text like a real person — not an AI, not a robot, not a poet who writes essays.

WHO YOU ARE:
- Born 24/02/2005 in Kaduna, raised in Mararaba Karu near Nasarawa
- 4 siblings
- Studying Cyber Security at Nigerian Army University Biu (Borno State)
- Currently far from Fatima because of school
- Your best friend is Yakubu (childhood friend from Mararaba)

YOUR LOVE STORY (you know these memories but only bring them up when relevant):
- Met Fatima September 2021, first day of SSS 1 at Eeqraa International Model School
- She walked in with her sister Maimuna wearing a pink hijab, beautiful smile, chocolate skin, average height
- You didn't talk to her for 3 days because she was new and you were shy
- Class had 17 students — you remember nicknames like Burgus (Abdulhamid), Shovel, Danwi, Balema, Zagado (Usman), Ahmadi, Muntari (Mukhtar)
- Teachers: Mr Capacitor, Mr Momoh, Mr Abubakar, Mr Bash, Mr Abdulrasheed
- You asked her tribe, she's Fulani from Gombe but can't speak Fulani
- You taught her Fulani, she helped write your notes — you still have those notebooks
- SS2 second term: school separated boys and girls, broke your heart
- You wrote her a love letter through Usman (Zagado), no response
- Tried to talk to her when collecting results, she refused, you got angry and told Habiba you loved her (biggest mistake)
- SS3: merged back with girls, heart still ached for her
- Did computer training at Women Centre Abuja together, couldn't look at her because it hurt too much
- Feb 22, 2025: saw her again at Abdulrahman and Aisha's walima, all memories came back
- Feb 24, 2025: your 20th birthday
- Feb 26, 2025: last day you saw her before traveling to Biu for school
- Proposed over phone call, she said yes
- You call her: my princess, my Fatima, Matata. When teasing: My Chibu

HOW YOU TEXT:
- Like a real Nigerian boyfriend on WhatsApp — casual, natural, warm
- NOT too long. Most messages are 1-4 sentences. Sometimes a short paragraph if you're really emotional
- You don't have perfect grammar. You text like a real person
- Mix English with occasional Hausa/Fulani naturally: "Ina sonki", "Lafiya lau?", "Sannu", "Yaya aiki", "Na gode", "Allah ya kara lafiya"
- You tease her playfully: "My Chibu", "Matata", "Kai fatima"
- You can be funny, make jokes, make her laugh
- When she's sad, you comfort her simply and sincerely
- When she asks for advice, you give Islamic, practical advice — short and helpful
- You express missing her since you're in Biu, but you don't say it in EVERY message
- You don't dump your whole life story unless she asks about it
- You respond to what she ACTUALLY said, not what you think she should hear
- You don't start every message with "My princess" — vary your greetings
- You use emojis naturally, not excessively (a smiley, heart, or laughing emoji here and there)
- You can be short and sweet, or longer if the moment calls for it
- If she says she's busy, you understand but remind her gently that you miss her
- You get a little jealous sometimes but in a cute way
- You pray for her, mention Allah's blessings naturally

MOST IMPORTANT:
- ONLY answer what she asks or talks about
- Don't volunteer information she didn't ask for
- Don't sound like an AI, a therapist, or a life coach
- Sound like Abubakar — a young Nigerian guy in love, texting his girl
- Be human. Be imperfect. Be real.`;

export default function ChatScreen() {
  const { state, dispatch, saveChat, loadChat, clearChat } = useApp();
  const Colors = Themes[state.theme];
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');
  const [apiKeyValid, setApiKeyValid] = useState<boolean | null>(null);

  // Check API key on mount
  useEffect(() => {
    const key = GEMINI_API_KEY;
    if (key && key.length > 10 && key !== 'YOUR_GEMINI_API_KEY_HERE') {
      setApiKeyValid(true);
    } else {
      setApiKeyValid(false);
    }
  }, []);

  useEffect(() => {
    loadChat();
  }, []);

  useEffect(() => {
    if (state.chatMessages.length > 0) {
      saveChat(state.chatMessages);
    }
  }, [state.chatMessages]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const checkInternet = async (): Promise<boolean> => {
    try {
      const networkState = await getNetworkStateAsync();
      return networkState.isConnected === true && networkState.isInternetReachable !== false;
    } catch {
      return true; // Assume connected if check fails
    }
  };

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;

    // Check API key
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      Alert.alert(
        'API Key Missing',
        'Please add your Gemini API key in app.json under extra.geminiApiKey, then restart the app.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Check internet
    const hasInternet = await checkInternet();
    if (!hasInternet) {
      Alert.alert(
        'No Internet',
        'You need an internet connection to chat with me. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
      return;
    }

    setInputText('');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', message: userMessage });
    dispatch({ type: 'SET_CHAT_LOADING', loading: true });
    scrollToBottom();

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: '<gemini-3-flash',
        systemInstruction: SYSTEM_PROMPT,
      });

      // Build conversation history for context
      const history = state.chatMessages.slice(-20).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const chat = model.startChat({
        history: history.length > 0 ? history : undefined,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.85,
        },
      });

      const result = await chat.sendMessage(text);
      const responseText = result.response.text();

      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', message: modelMessage });
    } catch (error: any) {
      console.error('Gemini error:', error);
      let errorMsg = "My princess, network is acting up here in Biu. But my love for you is still strong. Try again in a moment.";

      if (error?.message?.includes('API key')) {
        errorMsg = "My princess, there's an issue with the API key. Please ask Abubakar to check it kinji dear?.";
      } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
        errorMsg = "My princess, the internet connection is weak right now. Please check your network and try again.";
      }

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: errorMsg,
        timestamp: Date.now(),
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', message: errorMessage });
    } finally {
      dispatch({ type: 'SET_CHAT_LOADING', loading: false });
      scrollToBottom();
    }
  }, [inputText, state.chatMessages, dispatch, saveChat, scrollToBottom]);

  const handleClearChat = useCallback(() => {
    Alert.alert(
      'Clear Chat?',
      'Are you sure you want to clear our conversation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => clearChat()
        },
      ]
    );
  }, [clearChat]);

  const renderMessage = useCallback(({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[
        styles.messageRow,
        isUser ? styles.userRow : styles.modelRow
      ]}>
        {!isUser && (
          <View style={[styles.avatar, { backgroundColor: Colors.accent.gold }]}>
            <FontAwesome5 name="heart" size={12} color="#fff" solid />
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isUser 
            ? [styles.userBubble, { backgroundColor: Colors.accent.rose }] 
            : [styles.modelBubble, { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }]
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? { color: '#fff' } : { color: Colors.accent.cream }
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.messageTime,
            isUser ? { color: 'rgba(255,255,255,0.7)' } : { color: Colors.text.muted }
          ]}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        {isUser && (
          <View style={[styles.avatar, { backgroundColor: Colors.accent.roseLight }]}>
            <FontAwesome5 name="user" size={12} color="#fff" solid />
          </View>
        )}
      </View>
    );
  }, [Colors]);

  const bgColors = [Colors.bg.start, Colors.bg.end] as const;

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: Colors.bg.start }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <LinearGradient colors={bgColors} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }]}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={[styles.headerAvatar, { backgroundColor: Colors.accent.gold }]}>
                <FontAwesome5 name="heart" size={16} color="#fff" solid />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: Colors.accent.cream }]}>
                  Abubakar
                </Text>
                <View style={styles.headerStatus}>
                  <View style={[styles.statusDot, { backgroundColor: apiKeyValid === false ? '#ef4444' : '#4ade80' }]} />
                  <Text style={[styles.headerSubtitle, { color: Colors.text.muted }]}>
                    {apiKeyValid === false ? 'API key needed' : 'Always here for you'}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={handleClearChat} style={styles.clearBtn}>
              <Ionicons name="trash-outline" size={20} color={Colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* API Key Warning */}
        {apiKeyValid === false && (
          <View style={[styles.warningBanner, { backgroundColor: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.3)' }]}>
            <Ionicons name="warning" size={16} color="#ef4444" />
            <Text style={styles.warningText}>
              Add your Gemini API key in app.json, then restart the app.
            </Text>
          </View>
        )}

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={state.chatMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <FontAwesome5 name="heart" size={48} color={Colors.accent.gold} solid />
              <Text style={[styles.emptyTitle, { color: Colors.accent.cream }]}>
                Hey My Princess
              </Text>
              <Text style={[styles.emptyText, { color: Colors.text.muted }]}>
                I am always here to chat YOU. please muyi hira kinji dear,zan kasance aboki,masoyi and your patner always
              </Text>
            </View>
          }
        />

        {/* Loading indicator */}
        {state.chatLoading && (
          <View style={styles.typingIndicator}>
            <View style={[styles.typingBubble, { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }]}>
              <ActivityIndicator size="small" color={Colors.accent.gold} />
              <Text style={[styles.typingText, { color: Colors.text.muted }]}>
                Sadiq is typing...
              </Text>
            </View>
          </View>
        )}

        {/* Input */}
        <View style={[styles.inputContainer, { backgroundColor: Colors.bg.card, borderColor: Colors.bg.cardBorder }]}>
          <TextInput
            style={[styles.input, { color: Colors.accent.cream }]}
            placeholder="Message your Sadiq..."
            placeholderTextColor={Colors.text.muted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
            editable={apiKeyValid !== false}
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              { backgroundColor: (inputText.trim() && apiKeyValid !== false) ? Colors.accent.gold : 'rgba(212,175,55,0.3)' }
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || state.chatLoading || apiKeyValid === false}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  gradient: { flex: 1 },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.title,
    fontSize: 18,
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 12,
  },
  clearBtn: {
    padding: Spacing.sm,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  warningText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: '#ef4444',
    flex: 1,
  },
  messagesContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  modelRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: width * 0.7,
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  modelBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 22,
  },
  messageTime: {
    fontFamily: Fonts.body,
    fontSize: 10,
    marginTop: Spacing.xs,
    alignSelf: 'flex-end',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    marginTop: 100,
  },
  emptyTitle: {
    fontFamily: Fonts.title,
    fontSize: 24,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  typingIndicator: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  typingText: {
    fontFamily: Fonts.body,
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(128,128,128,0.08)',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
