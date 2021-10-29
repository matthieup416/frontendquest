import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { Badge, Button, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { MY_IP } from "@env"; /* Variable environnement */

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

function ResultsScreen(props) {
  const [listOffer, setListOffer] = useState([]);
  const [quest, setQuest] = useState([]);

  //Au chargement du composant, on cherche toutes les offres de la quête choisie
  useEffect(() => {
    async function offers() {
      const data = await fetch(`http://${MY_IP}:3000/results?token=${props.dataUser.token}&quest_id=${"617905dba41305d7eec0d35b"}`);
      const body = await data.json();
      setListOffer(body.listOffers);
      console.log("body.listOffers", body.listOffers);

      setQuest(body.quest);
    }
    offers();
  }, []);

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <StatusBar backgroundColor={"#2D98DA"} style="light" />
      <ScrollView>
        {listOffer.map((offer, i) => {
          if (offer.is_pro) {
            var pro = <Badge status="primary" value="PRO" />;
          }
          if (new Date(offer.offers.created) > new Date(new Date().setDate(new Date().getDate() - 1))) {
            var meteor = <Icon name="meteor" size={20} color="#FBC531" style={{ marginRight: 5, marginBottom: 5 }} />;
          }
          return (
            <TouchableOpacity key={i}>
              <Image source={require("../assets/maison-1.jpg")} style={{ width: "100%", height: deviceHeight / 2.8 }} resizeMethod="resize" resizeMode="center"></Image>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ marginLeft: 20, marginRight: 10 }}>
                  <Text style={{ fontSize: 22, fontWeight: "bold", color: "#585858" }}>
                    {offer.offers.type} {offer.offers.nb_pieces} pièces {offer.offers.surface} m2
                  </Text>
                  <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2D98DA" }}>{offer.offers.price} €</Text>
                  <Text style={{ fontSize: 15, color: "#585858" }}>{offer.offers.city}</Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "flex-end", marginRight: 20, marginTop: 10 }}>
                  {meteor}
                  {pro}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps, null)(ResultsScreen);
