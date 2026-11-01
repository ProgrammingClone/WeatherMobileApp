import {
  ActivityIndicator, Linking, Pressable, RefreshControl, ScrollView,
  StyleSheet, Text, View, useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import ForecastCard from '../components/ForecastCard';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import WeatherBackground from '../components/WeatherBackground';
import LocalIcon from '../components/LocalIcon';
import { COLORS } from '../constants/theme';
import { useWeather } from '../context/WeatherContext';

export default function WeatherScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const { city, unit, weather, loading, refreshing, error, setUnit, searchCity, refreshWeather, retryWeather } = useWeather();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <WeatherBackground />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[styles.scrollContent, compact && styles.compactContent]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshWeather}
            tintColor={COLORS.aqua} colors={[COLORS.aqua]} progressBackgroundColor={COLORS.surface} />
        }
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <LocalIcon name="sun" size={25} color={COLORS.background} />
            </View>
            <View>
              <Text style={styles.brandName}>WEATHER POCKET</Text>
              <Text style={styles.brandCaption}>YOUR DAILY FORECAST</Text>
            </View>
          </View>
          <UnitToggle unit={unit} onChange={setUnit} />
        </View>

        <View style={styles.hero}>
          <Text style={[styles.headline, compact && styles.compactHeadline]}>
            A clearer look at{'\n'}<Text style={styles.accent}>your day.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Realtime conditions and a five day outlook, anywhere in the world.
          </Text>
        </View>

        <SearchBar initialCity={city} onSearch={searchCity} loading={loading} />

        {Boolean(error) && (
          <View accessibilityRole="alert" style={styles.errorBox}>
            <LocalIcon name="alert" size={21} color={COLORS.red} />
            <View style={styles.errorContent}>
              <Text style={styles.errorText}>{error}</Text>
              <Pressable accessibilityRole="button" onPress={retryWeather}>
                <Text style={styles.retryText}>Try again</Text>
              </Pressable>
            </View>
          </View>
        )}

        {loading && (
          <View style={styles.loading} accessibilityRole="progressbar">
            <ActivityIndicator size="small" color={COLORS.aqua} />
            <Text style={styles.loadingText}>Fetching the latest forecast...</Text>
          </View>
        )}

        {weather && (
          <>
            <CurrentWeatherCard weather={weather.current} unit={unit} />
            <ForecastCard days={weather.days} unit={unit} />
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Weather data by </Text>
          <Pressable accessibilityRole="link" onPress={() => Linking.openURL('https://openweathermap.org/')}>
            <Text style={styles.footerLink}>OpenWeatherMap</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: {
    width: '100%', maxWidth: 720, alignSelf: 'center',
    paddingHorizontal: 22, paddingTop: 17, paddingBottom: 28, flexGrow: 1
  },
  compactContent: { paddingHorizontal: 16 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 48, gap: 8
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  brandIcon: {
    backgroundColor: COLORS.aqua, borderRadius: 12, width: 40,
    height: 40, alignItems: 'center', justifyContent: 'center'
  },
  brandName: { color: COLORS.white, fontSize: 12, fontWeight: '900', letterSpacing: 1.1 },
  brandCaption: { color: COLORS.subtle, fontSize: 9, fontWeight: '700', letterSpacing: 0.8, marginTop: 2 },
  hero: { marginBottom: 27 },
  headline: { color: COLORS.white, fontSize: 39, fontWeight: '900', letterSpacing: -1.7, lineHeight: 46 },
  compactHeadline: { fontSize: 35, lineHeight: 42 },
  accent: { color: COLORS.cyan },
  subtitle: { color: COLORS.secondary, fontSize: 14, lineHeight: 22, marginTop: 15, maxWidth: 370 },
  errorBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: COLORS.redSurface, borderWidth: 1, borderColor: '#894f5d',
    borderRadius: 12, padding: 15, marginBottom: 19
  },
  errorContent: { flex: 1 },
  errorText: { color: COLORS.red, lineHeight: 20, fontSize: 14 },
  retryText: { color: COLORS.white, marginTop: 9, fontWeight: '800' },
  loading: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  loadingText: { color: COLORS.secondary, fontSize: 14 },
  footer: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    flexWrap: 'wrap', marginTop: 'auto', paddingTop: 36
  },
  footerText: { color: COLORS.muted, fontSize: 12 },
  footerLink: { color: COLORS.aqua, fontWeight: '700', fontSize: 12 }
});
