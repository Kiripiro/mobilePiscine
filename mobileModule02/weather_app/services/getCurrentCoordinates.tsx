import * as Location from 'expo-location';

export const getCurrentCoordinates = async (): Promise<Location | string> => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(latitude, longitude);

    const locationData = await fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await locationData.json();
    console.log(data);

    return ({
      latitude: latitude,
      longitude: longitude,
      name: data.city,
      country: data.countryName,
      admin1: data.principalSubdivision
    } as Location);
  } catch (error) {
    return ('Error fetching location data.');
  }
};