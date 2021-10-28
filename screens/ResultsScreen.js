import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { Badge, Button, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

import AsyncStorage from "@react-native-async-storage/async-storage";

function ResultsScreen(props) {
  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <StatusBar backgroundColor={"#2D98DA"} style="light" />
      <ScrollView>
        <Image source={require("../assets/maison-1.jpg")} style={{ width: "100%", height: deviceHeight / 2.8 }} resizeMethod="resize" resizeMode="center"></Image>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginLeft: 20, marginRight: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#585858" }}>Maison 4 pièces 75 m2</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2D98DA" }}>165 000 €</Text>
            <Text style={{ fontSize: 15, color: "#585858" }}>Caen</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
            <Icon name="meteor" size={20} color="#FBC531" style={{ marginRight: 5 }} />
            <Badge status="primary" value="PRO" />
          </View>
        </View>

        <Image source={require("../assets/maison-1.jpg")} style={{ width: "100%", height: deviceHeight / 2.8 }} resizeMethod="resize" resizeMode="center"></Image>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginLeft: 20, marginRight: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#585858" }}>Maison 4 pièces 75 m2</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2D98DA" }}>165 000 €</Text>
            <Text style={{ fontSize: 15, color: "#585858" }}>Caen</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
            <Icon name="meteor" size={20} color="#FBC531" style={{ marginRight: 5 }} />
            <Badge status="primary" value="PRO" containerStyle={{}} />
          </View>
        </View>

        <Image source={require("../assets/maison-1.jpg")} style={{ width: "100%", height: deviceHeight / 2.8 }} resizeMethod="resize" resizeMode="center"></Image>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginLeft: 20, marginRight: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#585858" }}>Maison 4 pièces 75 m2</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2D98DA" }}>165 000 €</Text>
            <Text style={{ fontSize: 15, color: "#585858" }}>Caen</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
            <Icon name="meteor" size={20} color="#FBC531" style={{ marginRight: 5 }} />
            <Badge status="primary" value="PRO" containerStyle={{}} />
          </View>
        </View>
      </ScrollView>

      <Text>Résultats des offres pour une quête</Text>
    </View>
  );
}

function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps, null)(ResultsScreen);
