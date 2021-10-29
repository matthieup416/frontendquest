import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";

import { MY_IP } from "@env"; /* Importation de la variable d'environnement */

import AsyncStorage from "@react-native-async-storage/async-storage";

function SignInScreen(props) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [listErrorsSignIn, setErrorsSignIn] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("token", function (error, value) {
      if (value) {
        // requête backend user (avec le token)
        // modifier addUser pour stocker l'ensemble de l'utilisateur
        props.addUser({ token: value });
        props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" });
        // console.log(value)
      } else {
        console.log("error");
      }
    });
  }, []);

  console.log(`http://${MY_IP}:3000/users/sign-in`);

  var handleSubmitSignIn = async () => {
    const data = await fetch(`http://${MY_IP}:3000/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addUser(body.dataUser);
      props.navigation.navigate("BottomNavigator", { screen: "HomeScreen" });
      AsyncStorage.setItem("token", body.dataUser.token);
    } else {
      setErrorsSignIn(body.error);
    }
  };

  var tabErrorsSignIn = listErrorsSignIn.map((error, i) => {
    return <Text key={i}>{error}</Text>;
  });

  return (
    <ImageBackground source={require("../assets/SignInScreen.png")} style={styles.container}>
      <Image source={require("../assets/logo.png")} resizeMode={"contain"} style={styles.Image} />
      <View>
        <TextInput style={styles.inputStyle} onChangeText={(text) => setSignInEmail(text)} value={signInEmail} placeholderTextColor={"#fff"} placeholder="Mon Email" />
        {tabErrorsSignIn}
        <TextInput selectionColor="black" style={styles.inputStyle} placeholderTextColor={"#fff"} onChangeText={(text) => setSignInPassword(text)} value={signInPassword} placeholder="Password" />
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          handleSubmitSignIn();
        }}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <View style={styles.bottomBox}>
        <Text style={styles.Ou}>Ou</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignUpHome");
          }}
          style={styles.signup}>
          <Text style={styles.signupText}>Creer un compte</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  inputStyle: {
    paddingVertical: 5,
    fontSize: 17,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: 270,
    marginTop: 10,
  },
  Ou: {
    fontWeight: "bold",
    margin: 10,
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
  Button: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: "center",
    borderRadius: 25,
    marginTop: 30,
  },
  signup: {
    backgroundColor: "#2C8BC6",
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: "center",
    borderRadius: 25,
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
    bottom: 80,
    alignItems: "center",
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
