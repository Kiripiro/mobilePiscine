import React, { useState, useEffect, Dispatch } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Entry } from "@/types/Entry";
import { IconSymbol } from "./IconSymbol";
import { useEntries } from "@/context/entriesContext";

type EntryDetailProps = {
  entry: Entry | null;
  modalVisible: Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

export default function EntryDetail({ entry, onClose }: EntryDetailProps) {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(entry);
  const { deleteEntry } = useEntries();

  useEffect(() => {
    setSelectedEntry(entry);
  }, [entry]);

  const handleDeleteEntry = () => {
    if (selectedEntry) {
      deleteEntry(selectedEntry.id);
      setSelectedEntry(null);
      onClose();
    }
  };

  return (
    <Modal visible={!!entry} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteEntry}
          >
            <IconSymbol name="xmark.bin.fill" color="white" />
          </TouchableOpacity>
          {selectedEntry && (
            <View style={styles.container}>
              <ThemedText style={styles.icon}>{selectedEntry.icon}</ThemedText>
              <ThemedText type="subtitle" style={styles.title}>
                {selectedEntry.title}
              </ThemedText>
              <ThemedText type="default" style={styles.text}>
                {selectedEntry.text}
              </ThemedText>
              <Text style={styles.date}>
                {selectedEntry.date.toLocaleString("fr-FR", {
                  timeZone: "Europe/Paris",
                })}
              </Text>
            </View>
          )}
          <View style={styles.fixedBottom}>
            <Button title="Close" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    flex: 0.45,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  icon: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 50,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
    height: 150,
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
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
  fixedBottom: {
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
});
