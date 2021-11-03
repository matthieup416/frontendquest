import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ title, image, onRefresh }) => {
  if (!image) {
    var avatar = <Avatar rounded icon={{ name: "user", type: "font-awesome" }} size={64} activeOpacity={0.7} containerStyle={styles.avatar} />;
  } else {
    var avatar = <Avatar source={{ uri: image }} avatarStyle={{ borderRadius: 50, overflow: "hidden" }} size={"medium"} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {/* <Image source={{ uri: image }} style={styles.avatar} /> */}
        {avatar}
      </View>
      <View style={{ flex: 1, paddingLeft: 30, alignSelf: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>{title}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          onRefresh();
        }}
        style={{ alignSelf: "flex-end", paddingBottom: 10 }}>
        <FontAwesome5 name={"undo"} size={25} color={"orange"} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C98DA",
    height: 100,
    flexDirection: "row",
    paddingHorizontal: 30,
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
