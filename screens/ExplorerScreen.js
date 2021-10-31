import React, { useState, useEffect } from "react"
import { View, Dimensions, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { connect } from "react-redux"
import MapView from "react-native-maps"
import { Card, Text, Button, ListItem, Avatar } from "react-native-elements"
import { MY_IP } from "@env" /* Variable environnement */

import RNPickerSelect from "react-native-picker-select"

let deviceHeight = Dimensions.get("window").height
let deviceWidth = Dimensions.get("window").width

function ExplorerScreen(props) {
  const [listQuest, setListQuest] = useState([])
  const [listOffer, setListOffer] = useState([])
  const [selectedQuest, setSelectedQuest] = useState("")
  const [listConversation, setListConversation] = useState([])

  //Au chargement du composant, on cherche toutes les quêtes de l'utilisateur pour faire le menu select
  useEffect(() => {
    async function listQuest() {
      const data = await fetch(
        `http://${MY_IP}:3000/inbox/?token=${props.dataUser.token}`
      )
      const body = await data.json()
      var list = body.listQuest.map((quest) => {
        return {
          value: quest._id,
          label: `${quest.city} - ${quest.min_price}/${quest.max_price}€`,
        }
      })
      setListQuest(list)
      setSelectedQuest(body.listQuest[0]._id)
    }
    async function listOffer() {
      const data = await fetch(
        `http://${MY_IP}:3000/inbox/?token=${props.dataUser.token}`
      )
      const body = await data.json()
      var list = body.listQuest.map((quest) => {
        return {
          value: quest._id,
          label: `${quest.city} - ${quest.min_price}/${quest.max_price}€`,
        }
      })
      setListOffer(list)
    }

    listQuest()
    listOffer()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: deviceHeight / 6,
          backgroundColor: "#2D98DA",
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => setSelectedQuest(value)}
          items={listQuest}
          placeholder={{ label: "Choisir une quête", value: null }}
          style={pickerSelectStyles}
        />
        <Card containerStyle={{ padding: 0, flex: 0 }}>
          {listConversation.map((d, i) => {
            if (!d.usersLastMessage.avatar) {
              var avatar = (
                <Avatar
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  title={d.usersLastMessage.prenom[0]}
                  containerStyle={{ backgroundColor: "#585858" }}
                />
              )
            } else {
              var avatar = (
                <Avatar
                  source={{ uri: d.usersLastMessage.avatar }}
                  rounded
                  title={d.usersLastMessage.prenom[0]}
                  containerStyle={{ backgroundColor: "#585858" }}
                />
              )
            }
            return (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => listMsgConversation(d._id)}
              >
                {avatar}
                <ListItem.Content>
                  <ListItem.Title>{d.usersLastMessage.prenom}</ListItem.Title>
                  <ListItem.Subtitle>
                    {d.offre.type +
                      " - " +
                      d.offre.price +
                      "€ - " +
                      d.offre.surface +
                      "m²"}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>{d.lastMessage}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          })}
        </Card>
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.529742, // pour centrer la carte
          longitude: 5.447427,
          latitudeDelta: 0.0622, // le rayon à afficher à partir du centre
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
      />
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})

function mapStateToProps(state) {
  return { dataUser: state.dataUser }
}

export default connect(mapStateToProps)(ExplorerScreen)
