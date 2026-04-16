import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { Text, IconButton, Surface, Avatar, Divider, Card } from 'react-native-paper';
import { COLORS } from '../constants';
import { useThemeColors } from '../hooks';
import { useAppStore } from '../store';
import { answerTransitQuery } from '../chat/rag';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export function ChatWidget() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm Pothiq AI. Ask me about Dhaka bus routes or fares!",
      sender: 'ai',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const flatListRef = useRef<FlatList>(null);
  const fabScale = useRef(new Animated.Value(1)).current;

  // AI Response Logic
  const generateResponse = async (query: string) => {
    return answerTransitQuery(query, lang);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(async () => {
      const respText = await generateResponse(userMsg.text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: respText,
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleChat = () => {
    Animated.sequence([
      Animated.timing(fabScale, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(fabScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    setVisible(!visible);
  };

  return (
    <>
      {/* Floating Action Button */}
      <Animated.View style={[styles.fabContainer, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          onPress={toggleChat}
          style={[styles.fab, { backgroundColor: COLORS.primary }]}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 24 }}>🤖</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Chat Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <Surface style={[styles.chatWindow, { backgroundColor: colors.surface }]} elevation={5}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.divider }]}>
              <View style={styles.headerInfo}>
                <Avatar.Text size={36} label="AI" style={{ backgroundColor: COLORS.primary }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.headerTitle, { color: colors.text }]}>Pothiq Assistant</Text>
                  <Text style={[styles.headerStatus, { color: COLORS.success }]}>Online</Text>
                </View>
              </View>
              <IconButton icon="close" size={24} iconColor={colors.textSecondary} onPress={() => setVisible(false)} />
            </View>

            {/* Message List */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.messageList}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
              renderItem={({ item }) => (
                <View style={[
                  styles.messageBubble,
                  item.sender === 'user' ? styles.userBubble : [styles.aiBubble, { backgroundColor: colors.input }]
                ]}>
                  <Text style={{ 
                    color: item.sender === 'user' ? '#fff' : colors.text,
                    fontSize: 14 
                  }}>
                    {item.text}
                  </Text>
                </View>
              )}
            />

            {isTyping && (
                <Text style={styles.typingText}>{lang === 'bn' ? 'AI উত্তর তৈরি করছে...' : 'AI is retrieving answer...'}</Text>
            )}

            {/* Input Area */}
            <Surface style={[styles.inputArea, { borderTopColor: colors.divider, backgroundColor: colors.surface }]} elevation={2}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Ask Pothiq AI..."
                placeholderTextColor={colors.textSecondary}
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
              />
              <IconButton 
                icon="send" 
                iconColor={COLORS.primary} 
                disabled={!input.trim()} 
                onPress={handleSend} 
              />
            </Surface>
          </Surface>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 85,
    right: 20,
    zIndex: 999,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  chatWindow: {
    height: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerStatus: {
    fontSize: 12,
  },
  messageList: {
    padding: 20,
    paddingBottom: 40,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 0,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  typingText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    paddingLeft: 20,
    marginBottom: 5,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 15,
  },
});
