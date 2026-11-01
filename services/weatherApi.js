import { buildDailyForecast } from '../utils/weather';

const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

async function request(path, params, signal) {
  const query = Object.entries({ ...params, units: 'metric', appid: API_KEY }).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

  let response;

  try {
    response = await fetch(`${API_URL}/${path}?${query}`, { signal });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw new Error('Network error. Check your internet connection and try again.');
  }

  if (!response.ok) {
    if (response.status === 404) throw new Error('City not found. Try a different city name.');
    if (response.status === 401) throw new Error('Your OpenWeatherMap API key is invalid or not active yet.');
    if (response.status === 429) throw new Error('Too many weather requests. Please try again later.');
    throw new Error('Unable to load the weather right now. Please try again.');
  }

  return response.json();
}

export async function fetchCityWeather(city, signal) {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_KEY') {
    throw new Error('Add EXPO_PUBLIC_OPENWEATHER_API_KEY to your project .env, then restart Expo.');
  }

  const current = await request('weather', { q: city }, signal);
  const forecast = await request('forecast', {
    lat: String(current.coord.lat),
    lon: String(current.coord.lon)
  }, signal);

  if (!current.weather?.length || !forecast.list?.length || forecast.list.some(item => !item.weather?.length)) {
    throw new Error('Incomplete weather data received. Please try another city.');
  }

  return { current, days: buildDailyForecast(forecast.list, forecast.city.timezone) };
}
