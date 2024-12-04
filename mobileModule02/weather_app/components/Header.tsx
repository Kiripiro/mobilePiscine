import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedSafeAreaView } from './ThemedSafeArea';
import { ThemedTextInput } from './ThemedTextInput';
import { ThemedText } from './ThemedText';
import { useTextContext } from '@/hooks/useTextContext';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { functionFindLocation } from '@/services/findLocation';
import { Portal } from 'react-native-portalize';

const Header = () => {
  const { inputText, setGeolocationText } = useTextContext();
  const [data, setData] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('inputText', inputText);
      setData(await functionFindLocation(inputText));
      console.log('data', data);
    };
    fetchData();
  }, [inputText]);

  const getItemText = (item: Location) => {
    return `${item.name}, ${item.admin1}, ${item.country}`;
  };

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.searchContainer}>
          <ThemedTextInput
            style={styles.searchBar}
            placeholder="Search location..."
          />
          {data.length > 0 && (
            <Portal>
              <FlatList
                style={styles.list}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable onPress={() => console.log(item)}>
                    <ThemedText style={styles.text}>{getItemText(item)}</ThemedText>
                  </Pressable>
                )}
              />
            </Portal>
          )}
        </ThemedView>
        <TouchableOpacity style={styles.geoButton} onPress={setGeolocationText}>
          <IconSymbol size={28} name="location.fill" color={'white'} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchBar: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 50,
  },
  list: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    marginTop: 110,
    height: 200,
    elevation: 1,
    paddingHorizontal: 10,
    backgroundColor: '#9c9c9c',
  },
  text: {
    paddingVertical: 10,
  },
  geoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#03dac6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default Header;
