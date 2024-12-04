import * as Location from 'expo-location';

interface LocationResponse {
  errorStatus: boolean;
  errorMessage: string;
}

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return ({ errorStatus: true, errorMessage: 'Permission to access location was denied' } as LocationResponse);
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    return ({ errorStatus: false, errorMessage: `Latitude: ${latitude}, Longitude: ${longitude}` } as LocationResponse);
  } catch (error) {
    return ({ errorStatus: true, errorMessage: 'Error fetch location' } as LocationResponse);
  }
};