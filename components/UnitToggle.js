import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function UnitToggle({ unit, onChange }) {
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="Temperature units" style={styles.container}>
      {['C', 'F'].map((value) => {
        const active = unit === value;
        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            accessibilityLabel={`Degrees ${value === 'C' ? 'Celsius' : 'Fahrenheit'}`}
            style={({ pressed }) => [styles.button, active && styles.active, pressed && styles.pressed]}
          >
            <Text style={[styles.text, active && styles.activeText]}>°{value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 13,
    backgroundColor: '#ffffff16', borderWidth: 1, borderColor: '#ffffff14', padding: 4
  },
  button: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 9, minWidth: 43, alignItems: 'center' },
  active: { backgroundColor: COLORS.white },
  pressed: { opacity: 0.7 },
  text: { fontSize: 14, color: COLORS.secondary, fontWeight: '700' },
  activeText: { color: COLORS.background }
});
