import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/context/authContext";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = makeRedirectUri({
  native: "diary-app://",
});

export default function GithubSignInButton() {
  const { setUser } = useAuth();
  const router = useRouter();
  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
      scopes: ["identity", "user:email"],
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      signInWithFirebase(code);
    }
  }, [response]);

  const createTokenWithCode = async (code: string) => {
    const response = await fetch(discovery.tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });

    const { access_token, token_type, scope } = await response.json();
    return { access_token, token_type, scope };
  };

  const signInWithFirebase = async (code: string) => {
    try {
      const { access_token } = await createTokenWithCode(code);
      const credential = GithubAuthProvider.credential(access_token);
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          source={require("@/assets/images/github-icon.png")}
          style={styles.image}
        />
        <ThemedText style={styles.button}>Sign in using Github</ThemedText>
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
    paddingRight: 7,
  },
});
