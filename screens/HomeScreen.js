import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";

import Header from "../components/Account/header";
import CreatButton from "../shared/CreatButton";

import { MY_IP } from "@env" /* Variable environnement */



function HomeScreen(props) {

  const [data, setdata] = useState("");

  // Au chargement du composant, on obtient toutes les données de l'utilisateur

  useEffect(() => {
    const callData = async () => {
      try {
        let res = await fetch(`http://${MY_IP}:3000/userDetail?token=${props.dataUser.token}`)
        res = await res.json()
        console.log("user data ", res)
        if (res.success) {
          setdata(res.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
    callData()
  }, []);


  console.log("console home", props.dataUser);
  return (
    <SafeAreaView>
      <ScrollView>
        <Header title={data.firstName} image={data.avatar} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginVertical: 10,
            color: "#2C98DA",
            fontWeight: "bold",
          }}
        > Vous avez 2 quêtes en cours
        </Text>

        {data?.quests?.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                backgroundColor: "#F8F7FF",
                padding: 15,
                elevation: 5,
                marginVertical: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item?.cities[0]?.name}</Text>
                <Text>Rayon {item?.cities[0]?.rayon} </Text>
              </View>

              <View style={{ marginVertical: 20 }}>
                <Text>{item?.cities[0]?.min_price}€</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CreatButton>Détails</CreatButton>
                <CreatButton buttonStyle={{ backgroundColor: "orange" }}>
                  0 RESULTATS
                </CreatButton>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps)(HomeScreen);