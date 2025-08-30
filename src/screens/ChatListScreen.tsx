import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { STREAM_CONFIG } from '../config/stream';
import { useTheme } from '../context/ThemeContext';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount: number;
}

const mockChats: ChatItem[] = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey there! How are you?',
    timestamp: '10:30 AM',
    avatar: 'https://picsum.photos/50/50?random=1',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Can we meet tomorrow?',
    timestamp: '9:15 AM',
    avatar: 'https://picsum.photos/50/50?random=2',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Yesterday',
    avatar: 'https://picsum.photos/50/50?random=3',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    lastMessage: 'See you later',
    timestamp: 'Yesterday',
    avatar: 'https://picsum.photos/50/50?random=4',
    unreadCount: 0,
  },
];

const chatClient = StreamChat.getInstance(STREAM_CONFIG.apiKey);

const ChatListScreen = () => {
  const { theme } = useTheme();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(
          {
            id: STREAM_CONFIG.userId,
            name: STREAM_CONFIG.userName,
          },
          STREAM_CONFIG.userToken,
        );
        setClientReady(true);
      } catch (error) {
        console.log('Error connecting to chat:', error);
        setClientReady(false);
      }
    };

    setupClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={[styles.chatItem, { borderBottomColor: theme.border }]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.timestamp, { color: theme.textTertiary }]}>{item.timestamp}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={[styles.lastMessage, { color: theme.textSecondary }]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.unreadBadge }]}>
              <Text style={[styles.unreadText, { color: theme.unreadText }]}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!clientReady) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Connecting to chat...</Text>
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <FlatList
            data={mockChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            style={styles.chatList}
          />
        </View>
      </Chat>
    </OverlayProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
});

export default ChatListScreen;