import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import DiaryEntriesList from "@/components/DiaryEntriesList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

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
      <DiaryEntriesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
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
});
