import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEntries } from "@/context/entriesContext";
import { FlatList } from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";
import { emojis } from "@/constants/Emojis";

export default function DiaryEntriesStats() {
  const { entries } = useEntries();
  const [emojiStats, setEmojiStats] = useState<
    { emoji: string; percentage: number }[]
  >([]);

  useEffect(() => {
    const emojiCount: { [key: string]: number } = {};

    entries.forEach((entry) => {
      if (emojiCount[entry.icon]) {
        emojiCount[entry.icon]++;
      } else {
        emojiCount[entry.icon] = 1;
      }
    });

    const totalEntries = entries.length;

    const stats = emojis.map((emoji) => ({
      emoji,
      percentage: emojiCount[emoji]
        ? parseFloat(((emojiCount[emoji] / totalEntries) * 100).toFixed(2))
        : 0,
    }));

    setEmojiStats(stats.sort((a, b) => b.percentage - a.percentage));
  }, [entries]);

  return (
    <View style={styles.container}>
      <ThemedView style={{ width: "100%", height: "100%" }}>
        <ThemedText type="defaultSemiBold" style={{ marginBottom: 10 }}>
          Entries stats
        </ThemedText>
        <FlatList
          data={emojiStats}
          renderItem={({ item }) => (
            <View style={styles.statRow}>
              <Text style={styles.icon}>{item.emoji}</Text>
              <ThemedText type="default">{item.percentage}%</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.emoji}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 50,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  icon: {
    fontSize: 40,
    paddingRight: 20,
  },
});
