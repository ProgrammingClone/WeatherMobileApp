import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AppErrorBoundary from '../components/AppErrorBoundary';
import { WeatherProvider } from '../context/WeatherContext';

export default function RootLayout() {
  return (
    <AppErrorBoundary>
      <WeatherProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#08162b' } }} />
      </WeatherProvider>
    </AppErrorBoundary>
  );
}
