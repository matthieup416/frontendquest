import React from "react"
import { View, Text, Button } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"

function ProfileScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text>Profile page de profil</Text>
    </View>
  )
}

export default ProfileScreen
