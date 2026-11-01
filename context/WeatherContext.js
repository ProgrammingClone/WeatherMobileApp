import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { fetchCityWeather } from '../services/weatherApi';

const DEFAULT_CITY = 'Seattle';
const STORAGE = { city: '@weather-pocket/city', unit: '@weather-pocket/unit' };
const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [unit, setUnitState] = useState('C');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const requestRef = useRef(null);
  const lastAttemptRef = useRef(DEFAULT_CITY);
  const mountedRef = useRef(true);

  const loadWeather = useCallback(async (requestedCity, isRefresh = false) => {
    lastAttemptRef.current = requestedCity.trim();
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    if (!isRefresh) {
      setWeather(null);
      setLoading(true);
    }
    setRefreshing(isRefresh);
    setError('');

    try {
      const result = await fetchCityWeather(requestedCity.trim(), controller.signal);
      if (controller.signal.aborted || !mountedRef.current) return;
      setWeather(result);
      setCity(requestedCity.trim());
      AsyncStorage.setItem(STORAGE.city, requestedCity.trim()).catch(() => { });
    } 
    catch (cause) {
      if (controller.signal.aborted || !mountedRef.current) return;
      setError(cause instanceof Error ? cause.message : 'Unable to load weather.');
    } 
    finally {
      if (!controller.signal.aborted && mountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    (async () => {
      let initialCity = DEFAULT_CITY;
      try {
        const [[, savedCity], [, savedUnit]] = await AsyncStorage.multiGet([ STORAGE.city, STORAGE.unit ]);

        if (cancelled) return;
        if (savedCity?.trim()) initialCity = savedCity.trim();
        if (savedUnit === 'F' || savedUnit === 'C') setUnitState(savedUnit);
      } 
      catch { }
      
      if (!cancelled) await loadWeather(initialCity);
    })();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      requestRef.current?.abort();
    };
  }, [loadWeather]);

  const setUnit = useCallback((nextUnit) => {
    if (nextUnit !== 'C' && nextUnit !== 'F') return;
    setUnitState(nextUnit);
    AsyncStorage.setItem(STORAGE.unit, nextUnit).catch(() => { });
  }, []);

  const searchCity = useCallback((nextCity) => loadWeather(nextCity, false), [loadWeather]);
  const refreshWeather = useCallback(() => loadWeather(city, true), [city, loadWeather]);
  const retryWeather = useCallback(() => loadWeather(lastAttemptRef.current), [loadWeather]);

  return (
    <WeatherContext.Provider value={{
      city, unit, weather, loading, refreshing, error,
      setUnit, searchCity, refreshWeather, retryWeather
    }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const value = useContext(WeatherContext);
  if (!value) throw new Error('useWeather must be used inside WeatherProvider');
  return value;
}
