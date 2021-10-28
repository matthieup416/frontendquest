import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from "react-native";
import { Card, Text, Button, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { MY_IP } from "@env"; /* Variable environnement */

function MessagesScreen(props) {
  const [listQuest, setListQuest] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState("");
  const [listConversation, setListConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [msgIsVisible, setMsgIsVisible] = useState(false);
  const [listMessages, setListMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollviewref = useRef(ScrollView);

  //Au chargement du composant, on cherche toutes les quêtes de l'utilisateur pour faire le menu select
  useEffect(() => {
    async function listQuest() {
      const data = await fetch(`http://${MY_IP}:3000/inbox/?token=${props.dataUser.token}`);
      const body = await data.json();
      var list = body.listQuest.map((quest) => {
        return {
          value: quest._id,
          label: `${quest.cities[0].name} - ${quest.min_price}/${quest.max_price}€`,
        };
      });
      setListQuest(list);
      setSelectedQuest(body.listQuest[0]._id);
    }
    listQuest();
  }, []);

  //Quand on click sur une quête, on charge les conversations de celle ci.
  useEffect(() => {
    async function selectedConversation() {
      const data = await fetch(`http://${MY_IP}:3000/inbox/selectedQuest?id=${selectedQuest}&token=${props.dataUser.token}`);
      const body = await data.json();
      var list = body.conversations.conversation.map((conv) => {
        return {
          usersLastMessage: {
            prenom: conv.user.firstName,
            avatar: conv.user.avatar,
          },
          lastMessage: conv.lastMessage.text,
          offre: {
            type: body.conversations.quest[0].type,
            surface: body.conversations.quest[0].min_surface,
            price: body.conversations.quest[0].min_price,
          },
          conversation: 1,
          _id: conv._id,
        };
      });
      // console.log("list conversation", list);
      setListConversation(list);
    }
    selectedConversation();
  }, [selectedQuest]);

  //Quand on click sur une conversation, on cherche tous ses messages et on les affiche
  var listMsgConversation = async (id) => {
    setSelectedConversation(id);
    const data = await fetch(`http://${MY_IP}:3000/inbox/conversation?id=${id}&token=${props.dataUser.token}`);
    const body = await data.json();
    console.log("body", body);
    var list = body.messages.listMessages.map((msg) => {
      // console.log("msg", msg);
      return {
        firstName: msg.users[0].firstName,
        avatar: msg.users[0].avatar,
        text: msg.messages.text,
      };
    });
    // console.log("list message", list);

    setListMessages(list);
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
    console.log("log de body ", body);
    if (body.result) {
      listMsgConversation(body.messageSaved._id);
    }
    setInputMessage("");
    // setMsgIsVisible(false);
  };

  //On affiche les messages
  if (msgIsVisible) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#2D98DA"} style="light" />
        <Button icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />} title="Retour aux discussions" onPress={() => setMsgIsVisible(false)} />
        <ScrollView ref={(ref) => (scrollView = ref)} onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}>
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
        {/* Menu select */}
        <RNPickerSelect onValueChange={(value) => setSelectedQuest(value)} items={listQuest} placeholder={{ label: "Choisir une quête", value: null }} style={pickerSelectStyles} />
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
                  <ListItem.Subtitle>{d.offre.type + " - " + d.offre.price + "€ - " + d.offre.surface + "m²"}</ListItem.Subtitle>
                  <ListItem.Subtitle>{d.lastMessage}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: 45,
  },
});

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
});

function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps)(MessagesScreen);
