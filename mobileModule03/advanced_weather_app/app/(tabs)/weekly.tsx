import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useWeatherContext } from "@/hooks/useWeatherContext";

import React from "react";
import WeatherCardSlider from "@/components/ui/WeatherCardSlider";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { useEffect, useState } from "react";

export default function TabThreeScreen() {
  const { location, weatherConditions, error } = useWeatherContext();
  const font = useFont(spaceMono, 10);

  const [city, region, country] = location ? location.split(",") : [];

  const minTemperatures =
    weatherConditions?.weeklyWeather?.minTemperature || [];
  const maxTemperatures =
    weatherConditions?.weeklyWeather?.maxTemperature || [];

  const [data, setData] = useState<
    { day: string; lowTmp: number; highTmp: number }[]
  >([]);

  useEffect(() => {
    if (minTemperatures.length > 0 && maxTemperatures.length > 0) {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const DATA = maxTemperatures.map((maxTemp, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        const day = daysOfWeek[date.getDay()];
        return {
          day: day,
          highTmp: maxTemperatures[index],
          lowTmp: minTemperatures[index],
        };
      });
      setData(DATA);
    }
  }, [minTemperatures, maxTemperatures]);

  return (
    <View style={error ? styles.errorContainer : styles.viewContainer}>
      {location && weatherConditions ? (
        <View style={styles.weatherContainer}>
          <View style={styles.subContainer}>
            <ThemedText style={styles.cityText}>
              {city || "Unknown City"}
            </ThemedText>
            <ThemedText style={styles.regionText}>
              {region || "Unknown Region"}, {country || "Unknown Country"}
            </ThemedText>
            <ThemedText style={styles.text}>Weekly temperatures</ThemedText>
          </View>
          <View style={styles.chart}>
            <CartesianChart
              data={data}
              xKey="day"
              yKeys={["lowTmp", "highTmp"]}
              xAxis={{
                font,
                labelColor: "black",
                lineColor: "lightgrey",
              }}
              yAxis={[
                {
                  font,
                  labelColor: "black",
                  lineColor: "lightgrey",
                  tickCount: 5,
                },
              ]}
            >
              {({ points }) => (
                <>
                  <Line
                    points={points.highTmp}
                    color="#ff6347"
                    strokeWidth={3}
                    animate={{ type: "timing", duration: 300 }}
                  />
                  <Line
                    points={points.lowTmp}
                    color="#1E90FF"
                    strokeWidth={3}
                  />
                </>
              )}
            </CartesianChart>
          </View>
          <WeatherCardSlider
            date={weatherConditions.weeklyWeather.date}
            temperature={weatherConditions.weeklyWeather.minTemperature}
            maxTemperature={weatherConditions.weeklyWeather.maxTemperature}
            weatherCode={weatherConditions.weeklyWeather.weatherCode}
            type="weekly"
          />
        </View>
      ) : (
        <View
          style={
            error && !location ? styles.errorContainer : styles.viewContainer
          }
        >
          {error ? (
            <ThemedText style={{ color: "red" }}>{error}</ThemedText>
          ) : (
            <ThemedText>Waiting...</ThemedText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cityText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  regionText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 12,
  },
  text: {
    fontSize: 24,
    color: "#777",
    marginBottom: 12,
    lineHeight: 24,
    paddingVertical: 10,
  },
  chart: {
    flex: 1,
    width: "100%",
    height: 300,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    paddingInline: 5,
  },
  weatherContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
