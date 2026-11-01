import { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LocalIcon from './LocalIcon';
import { COLORS } from '../constants/theme';

export default function SearchBar({ initialCity, onSearch, loading }) {
  const [input, setInput] = useState(initialCity);
  const [validation, setValidation] = useState('');

  useEffect(() => { setInput(initialCity); }, [initialCity]);

  function submit() {
    if (loading) return;
    const nextCity = input.trim();
    if (!nextCity) {
      setValidation('Please enter a city name.');
      return;
    }
    setValidation('');
    Keyboard.dismiss();
    onSearch(nextCity);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchBox}>
        <LocalIcon name="search" size={21} color={COLORS.muted} style={styles.searchIcon} />
        <TextInput
          value={input}
          onChangeText={(value) => { setInput(value); setValidation(''); }}
          onSubmitEditing={submit}
          placeholder="Search for a city..."
          placeholderTextColor={COLORS.subtle}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="words"
          accessibilityLabel="City name"
          maxLength={120}
        />
        <Pressable
          onPress={submit}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Search for city weather"
          style={({ pressed }) => [styles.searchButton, (pressed || loading) && styles.dimmed]}
        >
          <Text style={styles.searchButtonText}>{loading ? 'Loading' : 'Search'}</Text>
        </Pressable>
      </View>
      {Boolean(validation) && <Text accessibilityRole="alert" style={styles.validation}>{validation}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 24 },
  searchBox: {
    borderRadius: 15, padding: 7, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#192f49', borderWidth: 1, borderColor: '#405672', minHeight: 64
  },
  searchIcon: { marginLeft: 9, marginRight: 6 },
  input: {
    flex: 1, minWidth: 0, color: COLORS.white, fontSize: 15,
    paddingVertical: 12, paddingHorizontal: 4
  },
  searchButton: {
    minWidth: 82, paddingHorizontal: 14, minHeight: 43, borderRadius: 10,
    backgroundColor: COLORS.aqua, alignItems: 'center', justifyContent: 'center'
  },
  searchButtonText: { fontSize: 14, color: COLORS.background, fontWeight: '800' },
  dimmed: { opacity: 0.62 },
  validation: { color: COLORS.red, marginTop: 9, fontSize: 13 }
});
