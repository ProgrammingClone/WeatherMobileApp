import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { temperature } from '../utils/weather';
import WeatherIcon from './WeatherIcon';
import LocalIcon from './LocalIcon';

function DayRow({ day, unit }) {
  return (
    <View style={styles.dayCard}>
      <View style={styles.dayLeft}>
        <Text style={styles.weekday}>{day.weekday}</Text>
        <Text style={styles.condition} numberOfLines={1}>{day.description}</Text>
      </View>
      <WeatherIcon icon={day.icon} description={day.description} size={59} />
      <View style={styles.dayRight}>
        <Text style={styles.temps}>
          {temperature(day.high, unit)}<Text style={styles.low}> / {temperature(day.low, unit)}</Text>
        </Text>
        <View style={styles.rainRow}>
          <LocalIcon name="water" size={14} color={COLORS.aqua} />
          <Text style={styles.rain}>{day.rain}% rain</Text>
        </View>
      </View>
    </View>
  );
}

export default function ForecastCard({ days, unit }) {
  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>5 day forecast</Text>
        <Text style={styles.headerHint}>High / Low</Text>
      </View>
      {days.length ? days.map((day) => (
        <DayRow key={day.date} day={day} unit={unit} />
      )) : <Text style={styles.empty}>Forecast is not available for the next five days.</Text>}
      <Text style={styles.footnote}>Rain % is the highest forecast probability in the day's 3-hour periods.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 30 },
  headingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 15
  },
  heading: { fontSize: 23, fontWeight: '800', letterSpacing: -0.45, color: COLORS.white },
  headerHint: { color: COLORS.muted, fontSize: 12 },
  dayCard: {
    backgroundColor: '#1b3049ed', borderColor: '#334b66', borderWidth: 1,
    borderRadius: 15, minHeight: 79, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 15, marginBottom: 10, gap: 5
  },
  dayLeft: { flex: 1, minWidth: 0 },
  weekday: { color: COLORS.white, fontSize: 16, fontWeight: '800', marginBottom: 3 },
  condition: { color: COLORS.muted, fontSize: 11, textTransform: 'capitalize' },
  dayRight: { minWidth: 99, alignItems: 'flex-end' },
  temps: { color: COLORS.white, fontSize: 17, fontWeight: '800' },
  low: { color: COLORS.muted, fontSize: 16, fontWeight: '500' },
  rainRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  rain: { color: COLORS.aqua, fontSize: 12, fontWeight: '700' },
  footnote: { color: COLORS.subtle, fontSize: 11, lineHeight: 16, marginTop: 3 },
  empty: { color: COLORS.secondary, fontSize: 14 }
});
