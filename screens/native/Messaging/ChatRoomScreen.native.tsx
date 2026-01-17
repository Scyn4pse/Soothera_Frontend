import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Image, Platform, Keyboard } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
  timestamp: string;
  media?: {
    type: 'music';
    title: string;
    artist?: string;
  };
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar?: string;
  isOnline?: boolean;
}

interface ChatRoomScreenProps {
  conversation: Conversation;
  onBack: () => void;
}

// Mock messages
const mockMessages: Message[] = [
  { id: '1', text: 'When you will be here?', isOutgoing: false, timestamp: '12:30 PM' },
  { id: '2', text: 'On my way! Mate', isOutgoing: true, timestamp: '12:32 PM' },
  { id: '3', text: 'Just waiting for you!!!!!!!!!!', isOutgoing: false, timestamp: '12:35 PM' },
  { id: '4', text: 'Just few minutes!', isOutgoing: true, timestamp: '12:36 PM' },
  { id: '5', text: 'Bro have you listen to this song?', isOutgoing: false, timestamp: '12:40 PM' },
  {
    id: '6',
    text: '',
    isOutgoing: true,
    timestamp: '12:42 PM',
    media: { type: 'music', title: 'HALSEY - WITHOUT ME' }
  },
  { id: '7', text: 'Yep Mate, Crazy!!!', isOutgoing: true, timestamp: '12:43 PM' },
  { id: '8', text: 'Check this out!!!!', isOutgoing: true, timestamp: '12:45 PM' },
  {
    id: '9',
    text: '',
    isOutgoing: true,
    timestamp: '12:46 PM',
    media: { type: 'music', title: 'PERFECT - JAMES PERRY REMIX' }
  },
];

export default function ChatRoomScreen({ conversation, onBack }: ChatRoomScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  // Handle keyboard show/hide
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Scroll to bottom when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 300);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isOutgoing: true,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  // Calculate input area height (approximate)
  const inputAreaHeight = 60;

  return (
    <View className="flex-1 bg-white dark:bg-[#151718]">
      {/* Header */}
      <View
        className="flex-row items-center px-5 py-3 border-b border-gray-200 dark:border-[#2a2a2a]"
      >
        <TouchableOpacity onPress={onBack} className="mr-3" activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} style={{ color: colors.primary }} />
        </TouchableOpacity>

        {/* Profile Picture */}
        <View className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2a2a2a] items-center justify-center mr-3">
          {conversation.avatar ? (
            <Image
              source={{ uri: conversation.avatar }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Text
              className="text-base font-semibold"
              style={{ color: colors.primary }}
            >
              {conversation.name.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        {/* Name and Status */}
        <View className="flex-1">
          <Text
            className="text-base font-semibold"
            style={{ color: colors.text }}
          >
            {conversation.name}
          </Text>
          <Text
            className="text-xs"
            style={{ color: colors.primary }}
          >
            Online
          </Text>
        </View>
      </View>

      {/* Messages Area */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-5"
        contentContainerStyle={{ 
          paddingVertical: 16,
          paddingBottom: keyboardHeight > 0 ? keyboardHeight + inputAreaHeight : inputAreaHeight
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`mb-4 ${msg.isOutgoing ? 'items-end' : 'items-start'}`}
          >
            {msg.media ? (
              // Media Message (Music Card)
              <View
                className="px-4 py-3 rounded-2xl max-w-[80%]"
                style={{
                  backgroundColor: msg.isOutgoing ? colors.primary : (colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6'),
                }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="musical-notes"
                    size={24}
                    style={{ color: msg.isOutgoing ? '#fff' : colors.primary, marginRight: 12 }}
                  />
                  <View className="flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: msg.isOutgoing ? '#fff' : colors.text }}
                    >
                      {msg.media.title}
                    </Text>
                    {msg.media.artist && (
                      <Text
                        className="text-xs mt-1"
                        style={{ color: msg.isOutgoing ? 'rgba(255,255,255,0.8)' : colors.icon }}
                      >
                        {msg.media.artist}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              // Text Message
              <View
                className="px-4 py-3 rounded-2xl max-w-[80%]"
                style={{
                  backgroundColor: msg.isOutgoing ? colors.primary : (colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6'),
                }}
              >
                <Text
                  className="text-sm"
                  style={{ color: msg.isOutgoing ? '#fff' : colors.text }}
                >
                  {msg.text}
                </Text>
              </View>
            )}
            <Text
              className="text-xs mt-1 px-2"
              style={{ color: colors.icon }}
            >
              {msg.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area - Positioned on top of keyboard */}
      <View
        className="flex-row items-center px-5 py-2 border-t border-gray-200 dark:border-[#2a2a2a] absolute left-0 right-0"
        style={{
          backgroundColor: colorScheme === 'dark' ? '#151718' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
          bottom: keyboardHeight > 0 ? keyboardHeight : 0,
        }}
      >
        <View
          className="flex-1 flex-row items-center px-4 py-2 rounded-full mr-3"
          style={{
            backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f3f4f6',
          }}
        >
          <TextInput
            ref={textInputRef}
            placeholder="Type your message here!"
            placeholderTextColor={colors.icon}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
            className="flex-1 text-sm"
            style={{ color: colors.text }}
            multiline
            maxLength={500}
            onFocus={() => {
              // Scroll to bottom when input is focused
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />
        </View>
        <TouchableOpacity onPress={handleSendMessage} activeOpacity={0.7}>
          <Ionicons name="send" size={24} style={{ color: colors.primary }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
