import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { ThemedButton } from '@/components/ThemedButton';

export default function HomeScreen() {
  const defaultText = 'A simple text';
  const helloWorld = 'Hello World';
  const [title, setTitle] = useState(defaultText);

  function onPress() {
    setTitle((prevTitle) =>
      prevTitle === defaultText ? helloWorld : defaultText
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <ThemedButton title="Click Me" onPress={onPress} />
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
