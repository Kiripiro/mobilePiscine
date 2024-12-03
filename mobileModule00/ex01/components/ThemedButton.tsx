import { Text, StyleSheet, Pressable, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedButton({ title, onPress }: { title: string, onPress: () => void }) {
  const backgroundColor = useThemeColor(
    { light: '#f0f0f0', dark: '#0000ff' },
    'background'
  );
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
