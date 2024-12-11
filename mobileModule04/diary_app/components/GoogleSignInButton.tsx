// components/GoogleSignInButton.tsx
import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuth } from "@/context/authContext";
import { ThemedView } from "./ThemedView";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const { setUser } = useAuth();

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
      console.log("Utilisateur connecté à Firebase :", userCredential.user);
    } catch (error) {
      console.error("Erreur lors de la connexion à Firebase :", error);
    }
  };

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Authentification Google</Text>
      <Button
        title="Se connecter avec Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </ThemedView>
  );
}
