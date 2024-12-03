import { StyleSheet, Platform, Pressable, Text, View } from 'react-native';
import { ThemedButton } from '@/components/ThemedButton';

export default function HomeScreen() {
  const title = 'A simple button';
  const buttonText = 'Click me';

  function onPress() {
    console.debug("Button pressed");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <ThemedButton title={buttonText} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  pressed: {
    backgroundColor: 'gray',
  },
});
