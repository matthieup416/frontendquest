import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Button, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

function ResultsScreen(props) {
  return (
    <View style={{ flex: 0, justifyContent: "flex-start" }}>
      <StatusBar backgroundColor={"#2D98DA"} style="light" />
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: "https://d36vnx92dgl2c5.cloudfront.net/cache/prod/Danielfeau/1/media/72e66bf0a444ddd432d9782ecd89ddf9.jpg",
            }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>The idea with React Native Elements is more about component structure than actual design.</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Text>Résultats des offres pour une quête</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps, null)(ResultsScreen);
