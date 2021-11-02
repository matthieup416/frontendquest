import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function CreatButton({ children, onPress, buttonStyle, textStyle, result }) {
  var disabled = result == 0 ? true : false;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.signup, buttonStyle, styles[disabled]]} disabled={disabled}>
      <Text style={[textStyle, styles.signupText]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signup: {
    backgroundColor: "#2C8BC6",
    paddingHorizontal: 25,
    paddingVertical: 17,
    elevation: 10,
    borderRadius: 25,
  },
  buttonWrapper: {
    alignItems: "flex-end",
    paddingRight: 50,
    paddingTop: 50,
  },
  signupText: {
    color: "#fff",
    alignSelf: "center",
  },
  true: {
    backgroundColor: "rgba(248, 233, 198, 1)",
  },
});
