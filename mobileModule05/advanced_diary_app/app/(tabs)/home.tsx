import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import DiaryEntriesList from "@/components/DiaryEntriesList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import DiaryEntriesStats from "@/components/ui/DiaryEntriesStats";
import { useEntries } from "@/context/entriesContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { entries } = useEntries();

  const handleLogout = async () => {
    logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.profile}>
        <Image
          source={{ uri: user?.photoURL ?? "" }}
          style={styles.profileImage}
        />
        <ThemedView style={styles.infos}>
          <ThemedText type="subtitle" style={{ width: "70%" }}>
            {user?.displayName}
          </ThemedText>
          <TouchableOpacity onPress={handleLogout}>
            <IconSymbol
              name="rectangle.portrait.and.arrow.right"
              color={"red"}
            ></IconSymbol>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <ThemedText style={{ marginBottom: 10 }}>
        Total entries: {entries.length}
      </ThemedText>
      <ThemedText type="defaultSemiBold">Last entries</ThemedText>
      <DiaryEntriesList
        entries={entries}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        maxLength={2}
      />
      <DiaryEntriesStats />
      <View style={styles.fixedBottom}>
        <Button
          title="Add a new entry"
          color={"white"}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  profile: {
    flexDirection: "row",
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infos: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  fixedBottom: {
    backgroundColor: "#4285F4",
    borderRadius: 20,
    maxWidth: 200,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
