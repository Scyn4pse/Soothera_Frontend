import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>User Profile</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>profile@soothera.com</Text>
        
        <View style={styles.infoSection}>
          <View style={[styles.infoItem, { borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e5e5' }]}>
            <Text style={[styles.infoLabel, { color: colors.icon }]}>Name</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>John Doe</Text>
          </View>
          <View style={[styles.infoItem, { borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e5e5' }]}>
            <Text style={[styles.infoLabel, { color: colors.icon }]}>Member Since</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>January 2024</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.icon }]}>Settings</Text>
            <Text style={[styles.infoValue, { color: colors.tint }]}>Manage</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  infoSection: {
    width: '100%',
    maxWidth: 400,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});
