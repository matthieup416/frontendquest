import React from "react"
import { View, Text, Button } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen(props) {
  var handleSubmitRemove = async () => {
    console.log("Déconnecté!")
    AsyncStorage.removeItem("token")
    props.navigation.navigate("SignIn", { screen: "SignInScreen" })
  }
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text>Profile page de profil</Text>
      <Button
        title="deconnexion"
        buttonStyle={{ backgroundColor: "red" }}
        type="solid"
        onPress={() => handleSubmitRemove()}
      />
      <Button
        title="ListingScreen"
        buttonStyle={{ backgroundColor: "pink" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("Listing", { screen: "ListingScreen" });
        }}
      />
      <Button
        title="ResultsScreen"
        buttonStyle={{ backgroundColor: "pink" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("Results", { screen: "ResultsScreen" });
        }}
      />
    </View>
  )
}

export default ProfileScreen
