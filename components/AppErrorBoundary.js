import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default class AppErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[WeatherPocket] Rendering error:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>APP ERROR</Text>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.message}>The weather app encountered a JavaScript error. The technical message is shown below to help diagnose it.</Text>
          <Text selectable style={styles.detail}>{String(this.state.error?.message || this.state.error)}</Text>
          <Pressable style={styles.button} onPress={() => this.setState({ error: null })}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 26, paddingTop: 110, paddingBottom: 40 },
  eyebrow: { color: COLORS.aqua, fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: COLORS.white, fontSize: 29, fontWeight: '800', marginTop: 12 },
  message: { color: COLORS.secondary, lineHeight: 23, fontSize: 15, marginTop: 15 },
  detail: { color: COLORS.red, backgroundColor: '#192f49', padding: 14, borderRadius: 10, marginTop: 22 },
  button: { backgroundColor: COLORS.aqua, paddingVertical: 15, alignItems: 'center', borderRadius: 12, marginTop: 22 },
  buttonText: { color: COLORS.background, fontSize: 15, fontWeight: '800' }
});
