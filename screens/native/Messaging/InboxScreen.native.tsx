import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/native/Header';
import ChatRoomScreen from './ChatRoomScreen.native';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar?: string;
  isOnline?: boolean;
}

// Mock data for conversations
const mockConversations: Conversation[] = [
  { id: '1', name: 'John Carlos', lastMessage: 'When you will be here?', timestamp: '12:40 PM', unreadCount: 3 },
  { id: '2', name: 'Nicki', lastMessage: 'Hey Man!', timestamp: '01:40 AM' },
  { id: '3', name: 'Martin Luther', lastMessage: 'Bro Dinner?', timestamp: '04:40 PM', unreadCount: 4 },
  { id: '4', name: 'Steve Smith', lastMessage: 'On my way!', timestamp: '09:30 AM' },
  { id: '5', name: 'Sarah', lastMessage: 'How cute! isn\'t it?', timestamp: '08:40 AM' },
  { id: '6', name: 'Nelson Nail', lastMessage: 'Meeting off, call me!', timestamp: '10:10 AM', unreadCount: 2 },
  { id: '7', name: 'Amanda', lastMessage: 'Waiting for you mate!', timestamp: '03:25 PM' },
  { id: '8', name: 'Warner Lems', lastMessage: 'Can you please pick me up?', timestamp: '07:00 AM', unreadCount: 1 },
];

interface InboxScreenProps {
  onChatRoomChange?: (isActive: boolean) => void;
  onNavigateToProfile?: () => void;
}

export default function InboxScreen({ onChatRoomChange, onNavigateToProfile }: InboxScreenProps = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle conversation press
  const handleConversationPress = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  // Handle back from chat room
  const handleBackFromChatRoom = () => {
    setSelectedConversationId(null);
  };

  // Notify parent when chat room is shown/hidden
  React.useEffect(() => {
    onChatRoomChange?.(selectedConversationId !== null);
  }, [selectedConversationId, onChatRoomChange]);

  // If a conversation is selected, show chat room
  if (selectedConversationId) {
    const conversation = mockConversations.find(c => c.id === selectedConversationId);
    if (conversation) {
      return (
        <ChatRoomScreen
          conversation={conversation}
          onBack={handleBackFromChatRoom}
        />
      );
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-[#151718]">
      {/* Header Section */}
      <Header onProfilePress={onNavigateToProfile} />

      {/* Search Bar */}
      <View className="px-5 py-2 mb-4">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1">
          <Ionicons name="search-outline" size={20} color={colors.icon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-base"
            style={{ color: colors.text }}
          />
        </View>
      </View>

      {/* Conversations List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            onPress={() => handleConversationPress(conversation.id)}
            className="flex-row items-center px-5 py-4 border-b border-gray-100 dark:border-[#2a2a2a]"
            activeOpacity={0.7}
          >
            {/* Avatar */}
            <View className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#2a2a2a] items-center justify-center mr-3">
              {conversation.avatar ? (
                <Image
                  source={{ uri: conversation.avatar }}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <Text
                  className="text-lg font-semibold"
                  style={{ color: colors.primary }}
                >
                  {conversation.name.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>

            {/* Conversation Info */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.text }}
                >
                  {conversation.name}
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: colors.icon }}
                >
                  {conversation.timestamp}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-sm flex-1 mr-2"
                  numberOfLines={1}
                  style={{ color: colors.icon }}
                >
                  {conversation.lastMessage}
                </Text>
                {conversation.unreadCount && conversation.unreadCount > 0 && (
                  <View
                    className="min-w-[20px] h-5 rounded-full items-center justify-center px-1.5"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: '#fff' }}
                    >
                      {conversation.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
