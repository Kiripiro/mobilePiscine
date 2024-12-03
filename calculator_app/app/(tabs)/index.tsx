import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useState, useRef } from 'react';
import { create, all, ConfigOptions } from "mathjs";

const config: ConfigOptions = {
  number: 'BigNumber',
  precision: 20,
};

const Mathjs = create(all, config);
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');

  const { width: windowWidth, height } = useWindowDimensions();
  const isLandscape = windowWidth > height;

  const scrollViewRef = useRef<ScrollView | null>(null);

  const handlePress = (button: string) => {
    switch (button) {
      case 'AC':
        resetCalculator();
        break;
      case 'C':
        deleteLastCharacter();
        break;
      case '=':
        evaluateExpression();
        break;
      default:
        appendToExpression(button);
        break;
    }
  };

  const resetCalculator = () => {
    setExpression('0');
    setResult('0');
  };

  const deleteLastCharacter = () => {
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const appendToExpression = (button: string) => {
    setExpression((prev) => {
      const operators = ['+', '-', '*', '/'];
  
      if (operators.includes(prev.slice(-1)) && operators.includes(button)) {
        if (button === '-') {
          return prev + button;
        }
        return prev.slice(0, -1) + button;
      }
  
      if (prev === '0') {
        if (button === '.') {
          return prev + button;
        }
        if (operators.includes(button)) {
          return prev + button;
        }
        return button;
      }
  
      return prev + button;
    });
  };

  const evaluateExpression = () => {
    try {
      const resultValue = Mathjs.evaluate(expression);
      const roundedResult = roundResult(resultValue);
    setResult(roundedResult.toString());
    } catch (error) {
      console.error('Erreur lors de l’évaluation :', error);
      setResult('Erreur');
    }
  };
  
  const roundResult = (value: number, precision: number = 10): number => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
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
        <ScrollView
          ref={scrollViewRef}
          style={styles.expressionContainer}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          <Text style={[styles.expression, { fontSize: isLandscape ? 30 : 40 }]}>
            {expression}
          </Text>
        </ScrollView>
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
