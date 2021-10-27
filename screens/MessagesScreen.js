import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, LogBox } from "react-native";
import { Card, Text, Badge, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

function MessagesScreen(props) {
  const [listQuest, setListQuest] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState("");
  const [listConversation, setListConversation] = useState([]);

  useEffect(() => {
    console.log("dataUser", props.dataUser[0].token);

    async function listQuest() {
      const data = await fetch(`http://192.168.1.43:3000/inbox/?token=${props.dataUser[0].token}`);
      const body = await data.json();
      // console.log("log de body ", body);
      var list = body.listQuest.map((quest) => {
        return {
          value: quest._id,
          label: `${quest.cities[0].name} - ${quest.min_price}/${quest.max_price}€`,
        };
      });
      setListQuest(list);
    }
    listQuest();
  }, []);

  useEffect(() => {
    async function selectedConversation() {
      const data = await fetch(`http://192.168.1.43:3000/inbox/selectedQuest?id=${selectedQuest}&token=${props.dataUser[0].token}`);
      const body = await data.json();
      console.log("body", body);
      // var list = body.conversations.conversation.map((conv) => {
      //   return {
      //     usersLastMessage: {
      //       prenom: conv.user.firstName,
      //       avatar: conv.user.avatar,
      //     },
      //     lastMessage: conv.lastMessage.text,
      //     offre: {
      //       type: conversations.quest[0].type,
      //       surface: "100",
      //       price: "250 000",
      //     },
      //     conversation: 1,
      //   };
      // });
    }
    selectedConversation();
  }, [selectedQuest]);

  var discussions = [
    {
      usersLastMessage: { prenom: "Maria", avatar: null },
      lastMessage: "lorem",
      offre: { type: "maison", surface: "100", price: "250 000" },
      conversation: 1,
    },
    {
      usersLastMessage: { prenom: "John", avatar: "https://previews.123rf.com/images/igorrita/igorrita1507/igorrita150700040/42584424-flat-hipster-character-stylish-young-guy-with-glasses-avatar-icon-man-vector-illustration-eps10.jpg" },
      lastMessage: "lorem",
      offre: { type: "appartement", surface: "70", price: "120 000" },
      conversation: 2,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Menu select */}
      <RNPickerSelect onValueChange={(value) => setSelectedQuest(value)} items={listQuest} placeholder={{ label: "Choisir une quête", value: null }} style={pickerSelectStyles} />
      {/* Résultat du choix du select */}
      <Card containerStyle={{ padding: 0, flex: 1 }}>
        {discussions.map((d, i) => {
          if (!d.usersLastMessage.avatar) {
            {
              /* console.log("d", d); */
            }
            var avatar = <Avatar rounded icon={{ name: "user", type: "font-awesome" }} title={d.usersLastMessage.prenom[0]} />;
          } else {
            var avatar = <Avatar source={{ uri: d.usersLastMessage.avatar }} rounded title={d.usersLastMessage.prenom[0]} />;
          }
          return (
            <ListItem key={i} bottomDivider>
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
