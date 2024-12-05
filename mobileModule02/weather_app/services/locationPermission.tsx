import * as ExpoLocation from 'expo-location';
import { Platform } from 'react-native';

const requestForegroundPermissionsForIOSAsync = (): Promise<ExpoLocation.LocationPermissionResponse> => {
  let wasResolved = false;

  const permissionPromise = (async () => {
    const result = await ExpoLocation.requestForegroundPermissionsAsync();
    wasResolved = true;
    return result;
  })();

  const timeoutPromise = (async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (wasResolved) {
      return permissionPromise;
    }
    return requestForegroundPermissionsForIOSAsync();
  })();

  return Promise.race([permissionPromise, timeoutPromise]);
};

export const requestForegroundPermissionsAsync = Platform.select({
  ios: requestForegroundPermissionsForIOSAsync,
  default: ExpoLocation.requestForegroundPermissionsAsync,
});
