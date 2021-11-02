import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function CreatButton({ children, onPress, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.signup, buttonStyle]}>
      <Text style={[textStyle, styles.signupText]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signup: {
    backgroundColor: "#2C8BC6",
    paddingHorizontal: 25,
    paddingVertical: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    borderRadius: 25,
  },
  signupText: {
    color: "#fff",
    alignSelf: "center",
  },
});
