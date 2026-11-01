import { Image, StyleSheet } from 'react-native';
import { weatherIcon } from '../utils/weather';

export default function WeatherIcon({ icon, description, size = 100 }) {
  if (!icon) return null;
  return (
    <Image
      source={{ uri: weatherIcon(icon) }}
      accessibilityLabel={description || 'Weather conditions'}
      style={[styles.icon, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({ icon: { flexShrink: 0 } });
