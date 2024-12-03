import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedSafeAreaView } from './ThemedSafeArea';
import { ThemedTextInput } from './ThemedTextInput';

const Header = ({ onSearch, onGeoLocate }: { onSearch: any, onGeoLocate(): void }) => {

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedTextInput
          style={styles.searchBar}
          placeholder="Search location..."
          onChangeText={onSearch}
        />
        <TouchableOpacity style={styles.geoButton} onPress={onGeoLocate}>
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
  searchBar: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  geoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#03dac6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
