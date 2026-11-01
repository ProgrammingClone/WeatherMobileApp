import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

export default function NotFound() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.label}>404 · PAGE NOT FOUND</Text>
        <Text style={styles.title}>Forecast not found.</Text>
        <Link href="/" style={styles.link}>← Back to the weather</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 28, paddingTop: 72 },
  label: { color: COLORS.aqua, fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: '800', marginVertical: 20 },
  link: { color: COLORS.aqua, fontSize: 16, fontWeight: '600' }
});
