import React from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"

export default function CoButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: 143,
    height: 43,
    top: 5,
    left: 100,
    borderRadius: 99,
    alignSelf: "center",
  },
  buttonText: {
    color: "#2D98DA",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
})
