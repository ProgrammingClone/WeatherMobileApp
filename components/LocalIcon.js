import { Image } from 'react-native';

const ICONS = {
  search: require('../assets/search.png'),
  sun: require('../assets/sun.png'),
  pin: require('../assets/pin.png'),
  thermometer: require('../assets/thermometer.png'),
  water: require('../assets/water.png'),
  wind: require('../assets/wind.png'),
  alert: require('../assets/alert.png'),
};

export default function LocalIcon({ name, size = 20, color = '#ffffff', style }) {
  return (
    <Image
      source={ICONS[name] || ICONS.sun}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
      style={[{ width: size, height: size, tintColor: color }, style]}
    />
  );
}
