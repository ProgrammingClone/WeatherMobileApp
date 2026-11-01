export function weatherIcon(icon) {
  return `https://openweathermap.org/img/wn/${encodeURIComponent(icon)}@2x.png`;
}

export function temperature(celsius, unit) {
  return `${Math.round(unit === 'C' ? celsius : celsius * 9 / 5 + 32)}°`;
}

export function windSpeed(metersPerSecond, unit) {
  return unit === 'C' ? `${metersPerSecond.toFixed(1)} m/s` : `${(metersPerSecond * 2.23694).toFixed(1)} mph`;
}

export function localDate(timestamp, timezone, options) {
  return new Date((timestamp + timezone) * 1000).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
}

export function buildDailyForecast(items, timezone) {
  const today = new Date(Date.now() + timezone * 1000).toISOString().slice(0, 10);
  const groups = new Map();

  for (const item of items) {
    const date = new Date((item.dt + timezone) * 1000).toISOString().slice(0, 10);
    if (date <= today) continue;
    groups.set(date, [...(groups.get(date) ?? []), item]);
  }

  return [...groups.entries()].slice(0, 5).map(([date, entries]) => {
    const distanceFromNoon = (item) => Math.abs(new Date((item.dt + timezone) * 1000).getUTCHours() - 12);
    const midday = entries.reduce((best, item) => distanceFromNoon(item) < distanceFromNoon(best) ? item : best);

    return {
      date,
      weekday: localDate(entries[0].dt, timezone, { weekday: 'short' }),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
      low: Math.min(...entries.map((item) => item.main.temp_min)),
      high: Math.max(...entries.map((item) => item.main.temp_max)),
      rain: Math.round(Math.max(...entries.map((item) => item.pop ?? 0)) * 100)
    };
  });
}
