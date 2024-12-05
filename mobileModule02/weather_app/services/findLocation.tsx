export const findLocation = async (name: string): Promise<Location[]> => {
  if (!name.trim() || name.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=en&format=json`
    );

    if (!response.ok) {
      console.error(`Error fetching data: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (!data.results) {
      console.warn('No results found for the query.');
      return [];
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      admin1: item.admin1,
      country: item.country,
      countryCode: item.country_code,
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
    }));
  } catch (error) {
    console.error("Error fetching location data:", error);
    return [];
  }
};
