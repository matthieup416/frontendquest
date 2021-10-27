import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Input } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CoButton from "../shared/CoButton";

function SignInScreen(props) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);

  const [listErrorsSignIn, setErrorsSignIn] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("token", function (error, value) {
      console.log("console log de token " + value);
      if (value) {
        props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" });
        console.log(value);
      } else {
        console.log("error");
      }
    });
  }, []);

  var handleSubmitSignIn = async () => {
    const data = await fetch("http://192.168.1.43:3000/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });

    const body = await data.json();
    console.log("log de body ", body);

    if (body.result == true) {
      props.addUser(body.dataUser);
      props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" });
      setUserExists(true);
      AsyncStorage.setItem("token", body.dataUser.token);
      AsyncStorage.getItem("token", function (error, data) {
        console.log("console log de token ", data);
      });
    } else {
      setErrorsSignIn(body.error);
    }
  };

  var tabErrorsSignIn = listErrorsSignIn.map((error, i) => {
    return <Text key={i}>{error}</Text>;
  });

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} resizeMode={"contain"} style={styles.Image} />
      <SafeAreaView>
        <Text style={styles.Text}>Mon Email</Text>
        <Input selectionColor="black" style={styles.inputStyle} onChangeText={(text) => setSignInEmail(text)} value={signInEmail} />
        {tabErrorsSignIn}
        <Text style={styles.Text}>Password</Text>
        <Input selectionColor="black" style={styles.inputStyle} onChangeText={(text) => setSignInPassword(text)} value={signInPassword} />
      </SafeAreaView>
      <Button
        title="HomeScreen"
        buttonStyle={{ backgroundColor: "#009788" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Accueil" });
        }}
      />
      <Button
        title="Signup"
        buttonStyle={{ backgroundColor: "#009788" }}
        type="solid"
        onPress={() => {
          props.navigation.navigate("SignUpHome");
        }}
      />
      <Button
        title="Créer une quête"
        color="#009788"
        type="solid"
        onPress={() => {
          props.navigation.navigate("AddQuest");
        }}
      />

      <Button
        title="Connexion"
        color="#009788"
        type="solid"
        onPress={() => {
          handleSubmitSignIn();
          console.log("clic sur button CONNEXION");
        }}
      />

      {/*  <CoButton
        text="Connexion"
        onPress={() => {
          handleSubmitSignIn()
          console.log("clic sur bouton CONNEXION")
        }}
      /> */}
    </View>
  );
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
    width: "200%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
  Text: {
    color: "#FFFFFF",
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
});

function mapDispatchToProps(dispatch) {
  return {
    addUser: function (dataUser) {
      dispatch({ type: "addUser", dataUser: dataUser });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignInScreen);
