import { Image, StyleSheet, View } from 'react-native';

export default function WeatherBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Image
        source={require('../assets/weather-background.png')}
        resizeMode="stretch"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
