import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>Discover new content</Text>
          
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f0f0f0' }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Feature 1</Text>
            <Text style={[styles.cardText, { color: colors.icon }]}>
              Explore amazing features and content in this section.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f0f0f0' }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Feature 2</Text>
            <Text style={[styles.cardText, { color: colors.icon }]}>
              Discover new possibilities and expand your horizons.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f0f0f0' }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Feature 3</Text>
            <Text style={[styles.cardText, { color: colors.icon }]}>
              Navigate through different sections using the bottom navigation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
