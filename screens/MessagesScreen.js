import React from "react"
import { View, Text, Button } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"

function MessagesScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text>BOITE DE RECEPTION MESSAGES</Text>
    </View>
  )
}

export default MessagesScreen
