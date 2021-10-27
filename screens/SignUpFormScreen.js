import React, { useState } from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import { Input } from "react-native-elements"

import { connect } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"

import SignUpButton from "../shared/SignUpButton"

function SignUpFormScreen(props) {
  const [signUpEmail, setSignUpEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignUp, setErrorsSignup] = useState([])

  var handleSubmitSignup = async () => {
    const data = await fetch("http://192.168.1.70:3000/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${signUpEmail}&phoneFromFront=${phoneNumber}&passwordFromFront=${signUpPassword}`,
    })
    const body = await data.json()

    if (body.result == true) {
      props.addUser(body.dataUser)
      props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" })
      setUserExists(true)
      AsyncStorage.setItem("token", body.dataUser.token)
    } else {
      setErrorsSignup(body.error)
    }
  }
  var tabErrorsSignUp = listErrorsSignUp.map((error, i) => {
    return <Text>{error}</Text>
  })

  return (
    <View style={styles.container}>
      <Text>Vous êtes acheteurs</Text>
      <Text>Informations personnelle</Text>
      <Input
        selectionColor="black"
        style={styles.inputStyle}
        onChangeText={(text) => setSignUpEmail(text)}
        value={signUpEmail}
        placeholder="email"
      />
      <Input
        selectionColor="black"
        style={styles.inputStyle}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        placeholder="prénom"
      />
      {tabErrorsSignUp}
      <Input
        selectionColor="black"
        style={styles.inputStyle}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        placeholder="nom"
      />
      <Input
        selectionColor="black"
        style={styles.inputStyle}
        onChangeText={(number) => setPhoneNumber(number)}
        value={phoneNumber}
        placeholder="number"
      />
      <Input
        selectionColor="black"
        style={styles.inputStyle}
        onChangeText={(number) => setSignUpPassword(number)}
        value={signUpPassword}
        placeholder="password"
      />

      <Button
        title="Valider"
        style={{ height: 60 }}
        onPress={() => handleSubmitSignup()}
      />
      {/* <SignUpButton text="Valider" onPress={() => handleSubmitSignup()} /> */}
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
  inputStyle: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
})

function mapDispatchToProps(dispatch) {
  return {
    addUser: function (dataUser) {
      dispatch({ type: "addUser", dataUser: dataUser })
    },
  }
}

export default connect(null, mapDispatchToProps)(SignUpFormScreen)
