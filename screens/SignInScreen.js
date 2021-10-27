import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  StyleSheet, ImageBackground
} from "react-native"
import { connect } from "react-redux"
import { Input } from "react-native-elements"

import AsyncStorage from "@react-native-async-storage/async-storage"

import CoButton from "../shared/CoButton"

function SignInScreen(props) {
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignIn, setErrorsSignIn] = useState([])

  useEffect(() => {
    AsyncStorage.getItem("token", function (error, value) {
      if (value) {
        props.addUser([{ token: value }])
        props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" })
        console.log(value)
      } else {
        console.log("error")
      }
    })
  }, [])

  var handleSubmitSignIn = async () => {
    const data = await fetch("http://192.168.1.70:3000/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    })

    const body = await data.json()
    console.log("log de body ", body)

    if (body.result == true) {
      props.addUser(body.dataUser)
      props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" })
      setUserExists(true)
      AsyncStorage.setItem("token", body.dataUser.token)
      AsyncStorage.getItem("token", function (error, data) {
        console.log("console log de token ", data)
      })
    } else {
      setErrorsSignIn(body.error)
    }
  }

  var tabErrorsSignIn = listErrorsSignIn.map((error, i) => {
    return <Text>{error}</Text>
  })

  return (
    <ImageBackground source={require('../assets/SignInScreen.png')} style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode={"contain"}
        style={styles.Image}
      />
      <SafeAreaView>
        <Input
          selectionColor="black"
          style={styles.inputStyle}
          onChangeText={(text) => setSignInEmail(text)}
          value={signInEmail}
          placeholder="Mon Email"
        />
        {tabErrorsSignIn}
        <Input
          selectionColor="black"
          style={styles.inputStyle}
          onChangeText={(text) => setSignInPassword(text)}
          value={signInPassword}
          placeholder="Password"
        />
      </SafeAreaView>
      <Button
        title="HomeScreen"
        buttonStyle={{ backgroundColor: "#009788" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Accueil" })
        }}
      />
      <Button
        title="Créer une quête"
        color="#009788"
        type="solid"
        onPress={() => {
          props.navigation.navigate("AddQuest")
        }}
      />
      <View style={styles.connexion}>
        <Button
          title="Connexion"
          type="solid"
          onPress={() => {
            handleSubmitSignIn()
          }}
        />
      </View>
      <View style={styles.create}>
        <Button
          color="#FFFFFF"
          title="Créer un compte"
          type="solid"
          onPress={() => {
            props.navigation.navigate("SignUpHome")
          }}
        />
      </View>
      <Text>Ou</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 50,
  },
  inputStyle: {
    width: "200%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
  Text: {
    color: "#FFFFFF",
  },
  connexion: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    height: 43,
    width: 150,
    borderRadius: 30,
    bottom: 50,
    left: 150,
    top: 500,
  },
  create: {
    position: "absolute",
    backgroundColor: "#2D98DA",
    height: 43,
    width: 180,
    borderRadius: 30,
    bottom: 50,
    left: 125,
    top: 750,
  },
  Image: {
    position: "absolute",
    height: 60,
    width: 200,
    top: 135,
    left: 100,
    borderRadius: 99,
    alignSelf: "center",
  },
})

function mapDispatchToProps(dispatch) {
  return {
    addUser: function (dataUser) {
      dispatch({ type: "addUser", dataUser: dataUser })
    },
  }
}

export default connect(null, mapDispatchToProps)(SignInScreen)
