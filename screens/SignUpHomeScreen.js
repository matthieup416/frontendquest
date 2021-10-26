import React, { useState, useEffect } from "react"
import { View, Text, Button, Image, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"

import Acheteur from "../shared/Acheteur"

function SignUpHomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        Quest est une nouvelle application qui propose une façon révolutionaire
        de rechercher un bien immobilier et construire son réseau dans
        l’immobilier. Ne perdez plus votre temps à passer en revue tous les
        sites d’annonces, lancez une quête et recevez directement les biens
        correspondant à votre recherche, parfois même avant leur
        commercialisation !
      </Text>
      <Image
        source={require("../assets/logo.png")}
        resizeMode={"contain"}
        style={styles.Image}
      />
      {/* <Button
        style={styles.Buttons}
        title="Je suis Acheteur"
        buttonStyle={{ backgroundColor: "#009788" }}
        type="solid"
      /> */}
      {/* <Button
        title="Je suis Vendeur"
        buttonStyle={{ backgroundColor: "#009788" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("SignupForm")
        }}
      /> */}
      {/* <Acheteur
        text="Je suis un acheteur"
        onPress={() => {
          props.navigation.navigate("SignUpForm")
        }}
      /> */}
      <Button
        style={styles.Buttons}
        title="Je suis Acheteur"
        buttonStyle={{ backgroundColor: "#009788" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("SignUpForm")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#2D98DA",
  },
  Image: {
    position: "absolute",
    height: 60,
    width: 200,
    top: 100,
    left: 100,
    borderRadius: 99,
    alignSelf: "center",
  },
  Text: {
    position: "absolute",
    width: 302,
    height: 275,
    left: 29,
    top: 240,

    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
    /* or 133% */

    display: "flex",
    alignItems: "center",
    textAlign: "justify",
    letterSpacing: 0.01,

    color: "#F8F7FF",
  },
  Buttons: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: 143,
    height: 43,
    top: -10,
    left: 50,
    borderRadius: 99,
    alignSelf: "center",
  },
})

export default SignUpHomeScreen
