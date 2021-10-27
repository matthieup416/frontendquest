import React from "react"
import { View, Text, Button } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"

function HomeScreen(props) {
  var handleSubmitRemove = async () => {
    AsyncStorage.removeItem("token")
    props.clearUser()
    props.navigation.navigate("SignIn", { screen: "SignInScreen" })
  }
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

function mapDispatchToProps(dispatch) {
  return {
    clearUser: function () {
      dispatch({ type: "clearUser" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
