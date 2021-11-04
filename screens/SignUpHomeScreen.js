import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";

function SignUpHomeScreen(props) {
  return (
    <ImageBackground source={require("../assets/SignInScreen.png")} style={styles.container}>
      <Image source={require("../assets/logo.png")} resizeMode={"contain"} style={styles.Image} />
      <Text style={styles.Text}>
        Quest est une nouvelle application qui propose une façon révolutionnaire de rechercher un bien immobilier et construire son réseau dans l’immobilier. Ne perdez plus votre temps à passer en revue tous les sites d’annonces, lancez une quête et
        recevez directement les biens correspondant à votre recherche, parfois même avant leur commercialisation !
      </Text>
      <View style={styles.bottomBox}>
        <Text style={styles.commencer}>Commencer :</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignUpForm");
          }}
          style={styles.signup}>
          <Text style={styles.signupText}>je suis acheteur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignUpForm");
          }}
          style={styles.signup}>
          <Text style={styles.signupText}>je suis vendeur</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 35,
    backgroundColor: "#2D98DA",
  },
  Image: {
    height: 60,
    width: 200,
    marginTop: 50,
    marginBottom: 5,
    alignSelf: "center",
  },
  Text: {
    marginTop: 10,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
    display: "flex",
    alignItems: "center",
    textAlign: "justify",
    color: "#F8F7FF",
    lineHeight: 25,
  },
  signup: {
    backgroundColor: "#2C8BC6",
    paddingHorizontal: 30,
    paddingVertical: 18,
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  buttonText: {
    color: "#2C8BC6",
    fontWeight: "bold",
    alignSelf: "center",
  },
  bottomBox: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  commencer: {
    color: "#2C8BC6",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default SignUpHomeScreen;
