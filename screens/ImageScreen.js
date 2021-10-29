import React from "react"
import { View, ScrollView, Dimensions, Image } from "react-native"
import { connect } from "react-redux"

let deviceHeight = Dimensions.get("window").height
let deviceWidth = Dimensions.get("window").width

export default function ImageScreen(props) {
  var listPictureItem = props.route.params.imagesData.map((picture, i) => {
    return (
      <Image
        key={i}
        source={{ uri: picture.url }}
        style={{
          width: deviceWidth,
          height: deviceHeight / 2.8,
          marginBottom: 10,
        }}
        resizeMethod="resize"
        resizeMode="center"
      ></Image>
    )
  })

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F7FF" }}>
      <ScrollView>{listPictureItem}</ScrollView>
    </View>
  )
}
