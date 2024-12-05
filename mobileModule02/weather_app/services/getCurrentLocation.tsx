import * as Location from 'expo-location';

interface LocationResponse {
  errorStatus: boolean;
  message: string;
}

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return ({ errorStatus: true, message: 'Permission to access location was denied' } as LocationResponse);
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    return ({ errorStatus: false, message: `Latitude: ${latitude}, Longitude: ${longitude}` } as LocationResponse);
  } catch (error) {
    return ({ errorStatus: true, message: 'Error fetch location' } as LocationResponse);
  }
};