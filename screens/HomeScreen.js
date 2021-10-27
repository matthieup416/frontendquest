import React from "react"
import { View, Text, Button } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"

function HomeScreen(props) {
  var handleSubmitRemove = async () => {
    console.log("click!")
    AsyncStorage.removeItem("token")
    props.navigation.navigate("SignIn", { screen: "SignInScreen" })
  }
  console.log("console home", props.dataUser)
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text>DASHBOARD QUetes</Text>
      <Button
        title="deconnexion"
        buttonStyle={{ backgroundColor: "red" }}
        type="solid"
        onPress={() => handleSubmitRemove()}
      />
      <Button
        title="ajouter une quête"
        buttonStyle={{ backgroundColor: "red" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("AddQuest", { screen: "AddQuestScreen" })
        }}
      />
    </View>
  )
}
function mapStateToProps(state) {
  return { dataUser: state.dataUser }
}

export default connect(mapStateToProps)(HomeScreen)
