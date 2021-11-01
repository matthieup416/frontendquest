import React from "react";
import { Image, StyleSheet, Text, View, Button } from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ title, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={{ uri: image }} style={styles.avatar} />
      </View>
      <View style={{ flex: 1, paddingLeft: 10, alignSelf: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{title}</Text>
      </View>
      <View style={{ alignSelf: "flex-end", paddingBottom: 10 }}>
        <FontAwesome5 name={"undo"} size={25} color={"orange"} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C98DA",
    height: 100,
    flexDirection: "row",
    paddingHorizontal: 15,
    elevation: 5,
    paddingTop: 20,
  },
  avatar: {
    backgroundColor: "#ccc",
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  item: { justifyContent: "center" },
});
