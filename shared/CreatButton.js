import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function CreatButton({
    children,
    onPress,
    buttonStyle,
    textStyle,
}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.signup, buttonStyle]}>
            <Text style={[textStyle, styles.signupText]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    signup: {
        backgroundColor: "#2C8BC6",
        paddingHorizontal: 50,
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
});