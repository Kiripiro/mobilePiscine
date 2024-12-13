import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuth } from "@/context/authContext";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      signInWithFirebase(id_token);
    }
  }, [response]);

  const signInWithFirebase = async (idToken: string) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);
      router.replace("/home");
    } catch (error) {
      console.error("Erreur lors de la connexion à Firebase :", error);
    }
  };

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Image
          source={require("@/assets/images/google-icon.png")}
          style={styles.image}
        />
        <ThemedText style={styles.button} disabled={!request}>
          Sign in using Google
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 4,
    margin: 4,
  },
  button: {
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#4285F4",
    borderRadius: 20,
    paddingRight: 4,
  },
});
