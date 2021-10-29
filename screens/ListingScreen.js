import React, { useState, useEffect } from "react"
import { View, Text, Dimensions, ScrollView, Image } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { StatusBar } from "expo-status-bar"
import { Button, Badge } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { connect } from "react-redux"
import { MY_IP } from "@env" /* Variable environnement */

let deviceHeight = Dimensions.get("window").height
let deviceWidth = Dimensions.get("window").width

function ListingScreen(props) {
  if (!props.dataUser) {
    props.navigation.navigate("SignIn", { screen: "SignInScreen" })
  }

  // fonction pour mettre la première lettre d'une string en majuscule
  const CapitalizeFirstLetter = (str) => {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str
  }
  // fonction pour vérifier si l'annonce a plus de 24h
  //   const isRecent = (dateToCompare) => {
  //     const oneday = 60 * 60 * 24 * 1000

  //     var now = new Date().getTime()
  //     if (now - dateToCompare >= oneday) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }

  const [goodType, setGoodType] = useState("")
  const [offerData, setOfferData] = useState({})
  const [sellerData, setSellerData] = useState({})
  // avatar par défaut pendant le chargement
  const [avatarSource, setAvatarSource] = useState(
    "https://www.luxerecrutement.com/content/files/blank_user.jpg"
  )

  useEffect(() => {
    const displayOffer = async () => {
      const reqFind = await fetch(
        `http://${MY_IP}:3000/display-offer?offerId=61796c1aa457047cc68bf305&token=${props.dataUser.token}`
      )
      const resultFind = await reqFind.json()

      setOfferData(resultFind.offerData)
      setSellerData(resultFind.sellerData)
      setGoodType(CapitalizeFirstLetter(resultFind.offerData.type))
      setAvatarSource(resultFind.sellerData.avatar)
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
        {/* pour afficher le caractère mètre carré m2 en format UNICODE  >>> \u00b2    */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#585858",
          }}
        >
          {goodType} {offerData.nb_pieces} pièces {offerData.surface} m
          {"\u00b2"}
        </Text>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2D98DA" }}>
          {offerData.price} €
        </Text>
        <Text style={{ fontSize: 15, color: "#585858" }}>{offerData.city}</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 0 }}
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
              {sellerData.firstName}
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
            source={{ uri: avatarSource }}
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
            {offerData.social_text}
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
