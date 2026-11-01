import { ImageBackground, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import LocalIcon from './LocalIcon';
import { COLORS } from '../constants/theme';
import { localDate, temperature, windSpeed } from '../utils/weather';
import WeatherIcon from './WeatherIcon';

function Metric({ icon, label, value }) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricLabelRow}>
        <LocalIcon name={icon} size={14} color={COLORS.muted} />
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
      <Text style={styles.metricValue} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
    </View>
  );
}

export default function CurrentWeatherCard({ weather, unit }) {
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const condition = weather.weather[0];
  const date = localDate(weather.dt, weather.timezone, {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <ImageBackground
      source={require('../assets/card-gradient.png')}
      resizeMode="stretch"
      imageStyle={styles.cardImage}
      style={styles.card}
    >
      <View style={styles.statusRow}>
        <View style={styles.statusDot} />
        <Text style={styles.eyebrow}>CURRENT CONDITIONS</Text>
      </View>
      <Text style={styles.location} numberOfLines={2}>{weather.name}, {weather.sys.country}</Text>
      <Text style={styles.date}>{date}</Text>

      <View style={styles.mainRow}>
        <View style={styles.tempColumn}>
          <View style={styles.tempRow}>
            <Text style={[styles.temp, compact && styles.tempCompact]}>{temperature(weather.main.temp, unit)}</Text>
            <Text style={styles.unit}>{unit}</Text>
          </View>
          <Text style={styles.description}>{condition.description}</Text>
        </View>
        <WeatherIcon icon={condition.icon} description={condition.description} size={compact ? 98 : 116} />
      </View>

      <View style={styles.divider} />
      <View style={styles.metricsRow}>
        <Metric icon="thermometer" label="Feels like" value={`${temperature(weather.main.feels_like, unit)}${unit}`} />
        <Metric icon="water" label="Humidity" value={`${weather.main.humidity}%`} />
        <Metric icon="wind" label="Wind speed" value={windSpeed(weather.wind.speed, unit)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22, borderWidth: 1, borderColor: '#46607a', padding: 22,
    overflow: 'hidden', shadowColor: '#020914', shadowOpacity: 0.16, shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 }, elevation: 4
  },
  cardImage: { borderRadius: 22 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 13 },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.aqua },
  eyebrow: { color: COLORS.aqua, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  location: { color: COLORS.white, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  date: { color: COLORS.secondary, fontSize: 13, marginTop: 5 },
  mainRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    minHeight: 145, paddingTop: 12, paddingBottom: 12
  },
  tempColumn: { flex: 1, minWidth: 0 },
  tempRow: { flexDirection: 'row', alignItems: 'flex-start' },
  temp: {
    fontSize: 74, fontWeight: '800', color: COLORS.white, letterSpacing: -4,
    includeFontPadding: false
  },
  tempCompact: { fontSize: 64 },
  unit: { color: COLORS.secondary, fontSize: 23, fontWeight: '700', marginTop: 12, marginLeft: 3 },
  description: { color: COLORS.secondary, fontSize: 15, textTransform: 'capitalize', marginTop: -1 },
  divider: { height: 1, backgroundColor: '#ffffff26', marginBottom: 20 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 7 },
  metric: { flex: 1, minWidth: 0 },
  metricLabelRow: { flexDirection: 'row', gap: 4, alignItems: 'center', marginBottom: 8 },
  metricLabel: { color: COLORS.muted, fontSize: 11, flexShrink: 1 },
  metricValue: { color: COLORS.white, fontSize: 16, fontWeight: '800' }
});
