export const functionFindLocation = async (name: string): Promise<Location[]> => {
  if (!name) {
    return [];
  }
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const transformedData: Location[] = data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      admin1: item.admin1,
      country: item.country,
      countryCode: item.country_code,
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return [];
  }
};
