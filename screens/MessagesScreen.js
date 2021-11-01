import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Image, Dimensions } from "react-native";
import { Card, Text, Button, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Header from "../components/header";
import { useIsFocused } from "@react-navigation/native";

import { MY_IP } from "@env"; /* Variable environnement */
import { log } from "react-native-reanimated";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

function MessagesScreen(props) {
  const [listQuest, setListQuest] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState("");
  const [listConversation, setListConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [msgIsVisible, setMsgIsVisible] = useState(false);
  const [listMessages, setListMessages] = useState([]);
  const [offerMessages, setOfferMessages] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const scrollViewRef = useRef(ScrollView);

  const isFocused = useIsFocused();

  if (!isFocused && msgIsVisible) {
    setMsgIsVisible(false);
  }

  //Au chargement du composant, on cherche toutes les quêtes de l'utilisateur pour faire le menu select
  useEffect(() => {
    async function loadListQuest() {
      const data = await fetch(`http://${MY_IP}:3000/inbox/?token=${props.dataUser.token}`);
      const body = await data.json();

      var list = body.listQuest.map((quest) => {
        return {
          value: quest._id,
          label: `${quest.type} : ${quest.city} - ${quest.min_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}/${quest.max_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}€`,
        };
      });
      setListQuest(list);
      setSelectedQuest(body.listQuest[0]._id);
      if (props.route.params?.conversationId) {
        listMsgConversation(props.route.params.conversationId);
      }
    }

    loadListQuest();
  }, []);

  //Quand on click sur une quête, on charge les conversations de celle ci.
  useEffect(() => {
    async function selectedConversation() {
      const data = await fetch(`http://${MY_IP}:3000/inbox/selectedQuest?id=${selectedQuest}&token=${props.dataUser.token}`);
      const body = await data.json();
      var list = body.conversations.map((conv) => {
        return {
          usersLastMessage: {
            prenom: conv.seller.firstName,
            avatar: conv.seller.avatar,
          },
          lastMessage: conv.lastMessage.text,
          offre: {
            type: conv.offer[0].type,
            surface: conv.offer[0].surface,
            price: conv.offer[0].price,
            city: conv.offer[0].city,
          },
          conversation: 1,
          _id: conv._id,
        };
      });
      setListConversation(list);
    }
    selectedConversation();
  }, [selectedQuest]);

  //Quand on click sur une conversation, on cherche tous ses messages et on les affiche
  var listMsgConversation = async (id) => {
    setSelectedConversation(id);
    const data = await fetch(`http://${MY_IP}:3000/inbox/conversation?id=${id}&token=${props.dataUser.token}`);
    const body = await data.json();

    var list = body.messages.listMessages.map((msg) => {
      return {
        firstName: msg.users[0].firstName,
        avatar: msg.users[0].avatar,
        text: msg.messages.text,
      };
    });

    setListMessages(list);
    setOfferMessages(body.messages.offer);
    setMsgIsVisible(true);
  };

  //Au clic sur le bouton envoyer, on enregistre le nouveau message dans la conversation.
  var sendMessage = async (id, sender_token, message) => {
    const data = await fetch(`http://${MY_IP}:3000/inbox/addMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&sender_token=${sender_token}&message=${message}`,
    });

    const body = await data.json();
    if (body.result) {
      listMsgConversation(body.messageSaved._id);
    }
    setInputMessage("");
    // setMsgIsVisible(false);
  };

  //Pour raffraichir la page via le header
  async function loadListQuest() {
    const data = await fetch(`http://${MY_IP}:3000/inbox/?token=${props.dataUser.token}`);
    const body = await data.json();

    var list = body.listQuest.map((quest) => {
      return {
        value: quest._id,
        label: `${quest.type} : ${quest.city} - ${quest.min_price}/${quest.max_price}€`,
      };
    });
    setListQuest(list);
    setSelectedQuest(body.listQuest[0]._id);
    if (props.route.params?.conversationId) {
      listMsgConversation(props.route.params.conversationId);
    }
  }

  if (isFocused) {
    //On affiche les messages
    if (msgIsVisible) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={"#2D98DA"} style="light" />
          <View style={{ flex: 0, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#2C98DA", height: 100, paddingTop: 30 }}>
            <Image source={{ uri: offerMessages[0].pictures[0].url }} style={{ width: 100, height: 60, marginHorizontal: 20 }} resizeMethod="resize" resizeMode="center"></Image>
            <View style={{ flex: 1, flexDirection: "column", color: "#FFFFFF" }}>
              <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 16 }}>{offerMessages[0].type + " " + offerMessages[0].nb_pieces + " pièces " + offerMessages[0].surface + "m²"}</Text>
              <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 16 }}>{offerMessages[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</Text>
              <Text style={{ color: "#FFFFFF", fontWeight: "400", fontSize: 12 }}>{offerMessages[0].city}</Text>
            </View>
          </View>
          <Button icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />} title="Retour aux discussions" onPress={() => setMsgIsVisible(false)} />
          <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}>
            {listMessages.map((msg, i) => {
              if (!msg.avatar) {
                var avatar = <Avatar rounded icon={<FontAwesome name="user" size={24} color="black" />} title={msg.firstName[0]} containerStyle={{ backgroundColor: "#585858" }} />;
              } else {
                var avatar = <Avatar source={{ uri: msg.avatar }} rounded title={msg.firstName[0]} containerStyle={{ backgroundColor: "#585858" }} />;
              }
              return (
                <ListItem key={i} bottomDivider>
                  {avatar}
                  <ListItem.Content>
                    <ListItem.Subtitle>{msg.text}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </ScrollView>
          <KeyboardAvoidingView>
            <TextInput multiline numberOfLines={4} onChangeText={(text) => setInputMessage(text)} value={inputMessage} style={{ padding: 10, backgroundColor: "#F8F7FF" }} placeholder="Écrire un message" />
            <Button icon={<FontAwesome name="send-o" size={24} color="white" style={{ marginRight: 8 }} />} title="Envoyer" onPress={() => sendMessage(selectedConversation, props.dataUser.token, inputMessage)} />
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      //Sinon on affiche les conversations
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={"#2D98DA"} style="light" />
          <Header onRefresh={loadListQuest} title={props.dataUser.firstName} image={props.dataUser.avatar} />
          {/* Menu select */}
          <RNPickerSelect onValueChange={(value) => setSelectedQuest(value)} items={listQuest} placeholder={{ label: "Choisir une quête", value: null }} value={selectedQuest} style={pickerSelectStyles} />
          {/* Résultat du choix du select */}
          <Card containerStyle={{ padding: 0, flex: 0 }}>
            {listConversation.map((d, i) => {
              if (!d.usersLastMessage.avatar) {
                var avatar = <Avatar rounded icon={{ name: "user", type: "font-awesome" }} title={d.usersLastMessage.prenom[0]} containerStyle={{ backgroundColor: "#585858" }} />;
              } else {
                var avatar = <Avatar source={{ uri: d.usersLastMessage.avatar }} rounded title={d.usersLastMessage.prenom[0]} containerStyle={{ backgroundColor: "#585858" }} />;
              }
              return (
                <ListItem key={i} bottomDivider onPress={() => listMsgConversation(d._id)}>
                  {avatar}
                  <ListItem.Content>
                    <ListItem.Title>{d.usersLastMessage.prenom}</ListItem.Title>
                    <ListItem.Subtitle>{d.offre.type + " - " + d.offre.city + " - " + d.offre.price + "€ - " + d.offre.surface + "m²"}</ListItem.Subtitle>
                    <ListItem.Subtitle>{d.lastMessage}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </Card>
        </View>
      );
    }
  } else {
    return <View style={{ flex: 1 }}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#2C98DA",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "#ffffff",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 15,
  },
  inputAndroid: {
    backgroundColor: "#2C98DA",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "#ffffff",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 15,
  },
});

function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps)(MessagesScreen);
