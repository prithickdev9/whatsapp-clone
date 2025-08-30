import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    rightComponent 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.secondary }]}>
          <Icon name={icon} size={20} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <SettingItem
          icon="moon"
          title="Dark Mode"
          subtitle={isDark ? 'Enabled' : 'Disabled'}
          rightComponent={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.secondary }}
              thumbColor={isDark ? '#fff' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          icon="person-circle"
          title="Profile"
          subtitle="Name, photo, phone number"
        />
        
        <SettingItem
          icon="shield-checkmark"
          title="Privacy"
          subtitle="Last seen, profile photo, about"
        />
        
        <SettingItem
          icon="chatbubbles"
          title="Chats"
          subtitle="Theme, wallpapers, chat history"
        />
        
        <SettingItem
          icon="notifications"
          title="Notifications"
          subtitle="Message, group & call tones"
        />
        
        <SettingItem
          icon="cellular"
          title="Storage and Data"
          subtitle="Network usage, auto-download"
        />
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <SettingItem
          icon="help-circle"
          title="Help"
          subtitle="Help center, contact us, privacy policy"
        />
        
        <SettingItem
          icon="heart"
          title="Tell a friend"
          subtitle="Share WhatsApp with friends"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default SettingsScreen;