import React, { useState, useEffect } from "react"
import { View, Text, Dimensions, ScrollView, Image } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { StatusBar } from "expo-status-bar"
import { Button, Badge } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { connect } from "react-redux"

let deviceHeight = Dimensions.get("window").height
let deviceWidth = Dimensions.get("window").width
let data = [
  {
    user: {
      status: "pro",
    },
    city: "Marseille",
    price: 389000,
    type: "maison",
    surface: 105,
    description:
      "Idéal investisseur, excellente rentabilité. Pas de vis-à-vis. Terrasse exposée plein sud.",
    social_text:
      "Je serai ravie de vous faire visiter cette maison. Cette maison était sous compromis mais le financement n'a pas abouti. A visiter d'urgence!",
    outdoor_surface: 2000,
    nb_pieces: 6,
    floor_type: null,
    floor_number: null,
    parking: false,
    garage: true,
    balcony: true,
    elevator: false,
    fiber_optics: true,
    exclusive: true,
    market_date: 1635321216724,
    creation_date: 1635321216724,
    pictures: [
      "maison-1.jpg",
      "maison-2.jpg",
      "maison-3.jpg",
      "maison-4.jpg",
      "maison-5.jpg",
      "maison-6.jpg",
    ],
    pool: true,
    open_to_pro: false,
    terrace: true,
    is_online: true,
    is_sold: false,
  },
]

function ListingScreen(props) {
  if (!props.dataUser) {
    props.navigation.navigate("SignIn", { screen: "SignInScreen" })
  }
  const [offerData, setOfferData] = useState({})

  useEffect(() => {
    const displayOffer = async () => {
      const reqFind = await fetch(
        `http://192.168.1.91:3000/display-offer?offerId=61796c1aa457047cc68bf305&token=${props.dataUser.token}`
      )
      const resultFind = await reqFind.json()
      console.log(resultFind)

      setOfferData(resultFind.offerData)
    }

    displayOffer()
  }, [])

  let listingContent = (
    <View>
      <Image
        source={require("../assets/maison-1.jpg")}
        style={{ width: deviceWidth, height: deviceHeight / 2.8 }}
        resizeMethod="resize"
        resizeMode="center"
      ></Image>
      <View
        style={{
          backgroundColor: "white",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#585858" }}>
          {data[0].type} {data[0].nb_pieces} pièces {data[0].surface} m2
        </Text>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2D98DA" }}>
          {data[0].price} €
        </Text>
        <Text style={{ fontSize: 15, color: "#585858" }}>{data[0].city}</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Icon
            name="meteor"
            size={15}
            color="#FBC531"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#585858",
            }}
          >
            EN VENTE DEPUIS MOINS DE 24H
          </Text>
        </View>
        <Button
          title="Détails"
          titleStyle={{ color: "#585858" }}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,

            backgroundColor: "#FBC531",
            marginTop: deviceHeight / 25,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              marginRight: 5,
              marginBottom: 10,
            }}
          >
            <Badge value="PRO" badgeStyle={{ backgroundColor: "#2D98DA" }} />
            <Text
              style={{ fontSize: 22, fontWeight: "bold", color: "#585858" }}
            >
              Juliette
            </Text>
          </View>

          <Image
            style={{
              width: deviceWidth / 4.5,
              height: deviceWidth / 4.5,
              borderRadius: 100,
              zIndex: 1, // mettre l'image au premier plan sur ios
              marginRight: 40,
            }}
            resizeMethod="resize"
            resizeMode="center"
            source={require("../assets/user-1.png")}
          ></Image>
        </View>
        <View
          style={{
            backgroundColor: "#F8F7FF",
            marginLeft: deviceWidth / 20,
            marginRight: deviceWidth / 20,
            padding: deviceWidth / 20,
            paddingBottom: deviceWidth / 20 + 5,
            marginTop: -20,
            fontStyle: "italic",
          }}
          borderRadius={18}
        >
          <Icon
            name="quote-left"
            size={50}
            color="rgba(0,0,0,0.05)"
            style={{ marginTop: -40, marginLeft: 0 }}
          />
          <Text
            style={{
              fontStyle: "italic",
              lineHeight: 20,
              textAlign: "justify",
              marginTop: 0,
              marginBottom: 5,
              color: "#585858",
            }}
          >
            {data[0].social_text}
          </Text>
        </View>
        <Icon
          name="quote-right"
          size={50}
          color="rgba(0,0,0,0.05)"
          style={{
            zIndex: 1, // mettre l'image au premier plan sur ios
            elevation: 1,
            marginTop: -30,
            marginLeft: "auto",
            marginRight: deviceWidth / 15 + deviceWidth / 20,
          }}
        />
      </View>
    </View>
  )

  // footer fixe avec les deux boutons pour accepter ou refuser une offre
  let footer = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 3,
          borderColor: "#585858",
          borderRadius: 20,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <MaterialCommunityIcons
          name="bell-cancel-outline"
          size={40}
          color="#585858"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#2D98DA",
          borderRadius: 20,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Icon
          name="handshake"
          size={50}
          color="white"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </View>
    </View>
  )

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <StatusBar backgroundColor={"#2D98DA"} style="light" />
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        {listingContent}
      </ScrollView>
      <View
        style={{
          height: deviceHeight / 10,
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        {footer}
      </View>
    </View>
  )
}
function mapStateToProps(state) {
  return { dataUser: state.dataUser }
}

export default connect(mapStateToProps)(ListingScreen)
