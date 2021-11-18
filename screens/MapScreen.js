import React, { useState, useEffect } from "react"
import { View, Dimensions, Image } from "react-native"
import { connect } from "react-redux"
import MapView, { Marker, Callout } from "react-native-maps"
import { Text } from "react-native-elements"
import { WebView } from "react-native-webview"

let deviceHeight = Dimensions.get("window").height
let deviceWidth = Dimensions.get("window").width

function MapScreen(props) {
  const [mapDisplay, setMapDisplay] = useState(<View></View>)
  let listingInfo = (
    <View
      style={{
        height: deviceHeight / 7,
        width: deviceWidth,
        backgroundColor: "#2D98DA",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <Image
        source={{ uri: props.route.params.offerData.pictures[0].url }}
        style={{
          width: deviceWidth / 3,
          borderRadius: 10,
          marginLeft: 7,
          marginRight: 7,
        }}
        resizeMode="center"
        onPress={() => {
          props.navigation.navigate("Listing", {
            questId: props.route.params.questId,
            offerId: props.route.params.offerData._id,
          })
        }}
      ></Image>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            width: (deviceWidth * 2) / 3,
          }}
          onPress={() => {
            props.navigation.navigate("Listing", {
              questId: props.route.params.questId,
              offerId: props.route.params.offerData._id,
            })
          }}
        >
          {props.route.params.offerData.type}{" "}
          {props.route.params.offerData.surface} m{"\u00b2"}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            marginTop: 0,
            width: 180,
          }}
          onPress={() => {
            props.navigation.navigate("Listing", {
              questId: props.route.params.questId,
              offerId: props.route.params.offerData._id,
            })
          }}
        >
          {props.route.params.offerData.city}
        </Text>
        <Text style={{ fontSize: 16, color: "white" }}>
          {props.route.params.offerData.price} €
        </Text>
      </View>
    </View>
  )

  useEffect(() => {
    setMapDisplay(
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: props.route.params.offerData.latitude, // pour centrer la carte
          longitude: props.route.params.offerData.longitude,
          latitudeDelta: 0.0622, // le rayon à afficher à partir du centre
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
      >
        <Marker
          pinColor="#2D98DA"
          coordinate={{
            latitude: props.route.params.offerData.latitude,
            longitude: props.route.params.offerData.longitude,
          }}
          opacity={1} // Modifier l'opacité
        >
          <Callout
            onPress={() => {
              props.navigation.navigate("Listing", {
                questId: props.route.params.questId,
                offerId: props.route.params.offerData._id,
              })
            }}
          >
            <View style={{ flexDirection: "column", width: 250 }}>
              <WebView
                style={{ width: 250, height: 150 }}
                source={{
                  html: `<img src='${props.route.params.offerData.pictures[0].url}' width="100%"/>`,
                }}
              ></WebView>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#2D98DA",
                  marginTop: 0,
                  width: 180,
                }}
              >
                {props.route.params.offerData.type}{" "}
                {props.route.params.offerData.surface} m{"\u00b2"}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#2D98DA",
                  marginTop: 0,
                  width: 180,
                }}
              >
                {props.route.params.offerData.city}
              </Text>
              <Text style={{ fontSize: 18, color: "#585858" }}>
                {props.route.params.offerData.price} €
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    )
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      {listingInfo}
      {mapDisplay}
    </View>
  )
}

function mapStateToProps(state) {
  return { dataUser: state.dataUser }
}

export default connect(mapStateToProps)(MapScreen)
