import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { useState, } from 'react';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');

  const { width: windowWidth, height } = useWindowDimensions();
  const isLandscape = windowWidth > height;

  const handlePress = (button: string) => {
    console.debug("button pressed: ", button);
  };

  const renderButton = (label: string, style?: object) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => handlePress(label)}
    >
      <Text style={[styles.buttonText, { fontSize: isLandscape ? 18 : 24 }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
          <Text style={[styles.expression, { fontSize: isLandscape ? 30 : 40 }]}>
            {expression}
          </Text>
        <Text style={[styles.result, { fontSize: isLandscape ? 22 : 30 }]}>
          {result}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('C', { backgroundColor: '#ffa07a' })}
          {renderButton('AC', { backgroundColor: '#ff6666' })}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('+', { backgroundColor: '#ffd700' })}
          {renderButton('-', { backgroundColor: '#ffd700' })}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('*', { backgroundColor: '#ffd700' })}
          {renderButton('/', { backgroundColor: '#ffd700' })}
        </View>
        <View style={styles.row}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('00')}
          {renderButton('=', { backgroundColor: '#66ff66', flex: 2 })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  display: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#333',
  },
  expressionContainer: {
    maxHeight: 500,
    width: '100%',
  },
  expression: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'right',
    maxWidth: width - 20,
  },
  result: {
    fontSize: 30,
    color: '#76ff03',
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ddd',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
});
