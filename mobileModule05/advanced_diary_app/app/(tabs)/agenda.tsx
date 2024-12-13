import DiaryEntriesList from "@/components/DiaryEntriesList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEntries } from "@/context/entriesContext";
import { SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function AgendaScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString().split("T")[0]
  );
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const { entries } = useEntries();

  useEffect(() => {
    const newMarkedDates: { [key: string]: any } = {};
    entries.forEach((entry) => {
      const date = entry.date.toISOString().split("T")[0];
      newMarkedDates[date] = {
        marked: true,
        dotColor: "#2f95dc",
      };
    });
    if (selectedDate) {
      newMarkedDates[selectedDate] = {
        ...newMarkedDates[selectedDate],
        selected: true,
        selectedColor: "#2f95dc",
      };
    }
    setMarkedDates(newMarkedDates);
  }, [entries, selectedDate]);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Agenda</ThemedText>
      <ThemedView style={{ marginBottom: 20, width: "100%" }}>
        <Calendar
          markedDates={markedDates}
          onDayPress={(day: { dateString: SetStateAction<string | null> }) =>
            setSelectedDate(day.dateString)
          }
        />
      </ThemedView>
      <DiaryEntriesList
        entries={entries.filter(
          (entry) => entry.date.toISOString().split("T")[0] === selectedDate
        )}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        maxLength={undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
});
