import React from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"

export default function CreatButton({ text, onPress }) {
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
    backgroundColor: "#2D98DA",
    width: 185,
    height: 43,
    top: 270,
    left: 100,
    borderRadius: 99,
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
})
