import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useEntries } from "@/context/entriesContext";
import { FlatList } from "react-native-gesture-handler";
import { Entry } from "@/types/Entry";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "@/context/authContext";
import { randomUUID } from "expo-crypto";
import EntryDetail from "@/components/ui/DiaryEntryDetail";
import { ThemedView } from "./ThemedView";
import { emojis } from "@/constants/Emojis";

type DiaryEntriesListProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  maxLength: number | undefined;
  entries: Entry[];
};

export default function DiaryEntriesList({
  modalVisible,
  setModalVisible,
  maxLength,
  entries,
}: DiaryEntriesListProps) {
  const { user } = useAuth();
  const { addEntry } = useEntries();
  const [selectedEmoji, setSelectedEmoji] = useState(emojis[0]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {}, [entries]);

  const getDefaultEntry = () => {
    return {
      icon: emojis[0],
      text: "",
      title: "",
      userEmail: user?.email || "",
    };
  };

  const [newEntry, setNewEntry] = useState<Omit<Entry, "id" | "date">>(
    getDefaultEntry()
  );

  const handleAddEntry = () => {
    if (newEntry.title === "" || newEntry.text === "") {
      setError("Please fill in all the fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    addEntry({
      ...newEntry,
      id: randomUUID(),
      date: new Date(),
    });
    setModalVisible(false);
    setNewEntry(getDefaultEntry());
  };

  const handleCloseDetailModal = () => {
    setSelectedEntry(null);
  };

  return (
    <View style={styles.container}>
      {entries.length === 0 ? (
        <ThemedText type="default">No entries yet</ThemedText>
      ) : (
        <ThemedView style={{ width: "100%", height: "100%" }}>
          <FlatList
            scrollEnabled={maxLength ? false : true}
            style={{ width: "100%" }}
            data={maxLength ? entries.slice(0, maxLength) : entries}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedEntry(item)}>
                <View style={styles.entry}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ flexWrap: "wrap", width: "25%", fontSize: 12 }}
                  >
                    {item.date.toLocaleString("fr-FR", {
                      timeZone: "Europe/Paris",
                    })}
                  </ThemedText>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <ThemedText type="default">{item.title}</ThemedText>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </ThemedView>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              style={styles.modalContent}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ThemedText type="defaultSemiBold">New Entry</ThemedText>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedEmoji}
                  onValueChange={(itemValue) => {
                    setSelectedEmoji(itemValue);
                    setNewEntry({ ...newEntry, icon: itemValue });
                  }}
                  style={styles.picker}
                >
                  {emojis.map((emoji, index) => (
                    <Picker.Item key={index} label={emoji} value={emoji} />
                  ))}
                </Picker>
              </View>
              <TextInput
                placeholder="Title"
                style={styles.input}
                value={newEntry.title}
                onChangeText={(text) =>
                  setNewEntry({ ...newEntry, title: text })
                }
              />
              <TextInput
                placeholder="Text"
                multiline
                numberOfLines={4}
                maxLength={200}
                style={styles.longInput}
                value={newEntry.text}
                onChangeText={(text) => setNewEntry({ ...newEntry, text })}
              />
              {error && (
                <ThemedText type="defaultSemiBold" style={{ color: "red" }}>
                  {error}
                </ThemedText>
              )}
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Cancel"
                  color="red"
                  onPress={() => setModalVisible(false)}
                />
                <Button title="Add Entry" onPress={handleAddEntry} />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <EntryDetail
        entry={selectedEntry}
        setModalVisible={setModalVisible}
        onClose={handleCloseDetailModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "auto",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  longInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    height: 100,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    width: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  icon: {
    fontSize: 40,
    textAlign: "center",
    paddingRight: 10,
  },
});
