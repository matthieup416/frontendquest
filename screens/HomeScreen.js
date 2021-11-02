import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"

import { Overlay } from "react-native-elements"

import Header from "../components/header"
import CreatButton from "../shared/CreatButton"

import { MY_IP } from "@env" /* Variable environnement */
import { log } from "react-native-reanimated"
import { useIsFocused, useFocusEffect } from "@react-navigation/native"

function HomeScreen(props) {
  const [data, setData] = useState("")
  const [overlay, setOverlay] = useState(<></>) // Etat d'overlay
  const [exclusivity, setExclusivity] = useState(<></>) // Etat d'exclusivité
  const [quest, setQuest] = useState(0)
  const [offers, setOffers] = useState(0)
  const [results, setResults] = useState([])
  const isFocused = useIsFocused()

  // Au chargement du composant, on obtient toutes les données de l'utilisateur.
  useEffect(() => {
    async function userData() {
      const data = await fetch(
        `http://${MY_IP}:3000/home/userDetail?token=${props.dataUser.token}`
      )
      const body = await data.json()
      if (body.result) {
        // var countresult = [];
        // for (let i = 0; i < body.user.quests.length; i++) {
        //   const res = await fetch(`http://${MY_IP}:3000/countresults?token=${props.dataUser.token}&quest_id=${body.user.quests[i]._id}`);
        //   const count = await res.json();
        //   countresult.push(count.listOffers);
        // }
        // setResults(countresult);
        setData(body.user)
        setQuest(body.user.quests.length)
        props.addUser({
          token: body.user.token,
          firstName: body.user.firstName,
          avatar: body.user.avatar,
        })
      } else {
        console.log("error")
      }
    }
    userData()
  }, [])

  //Relance la fonction useData à chaque fois que l'écran est focus
  useFocusEffect(
    useCallback(() => {
      userData()
    }, [])
  )

  const viewexclusivity = () => {
    setExclusivity(
      <Overlay
        isVisible={true}
        overlayStyle={{ backgroundColor: "#F8F7FF" }}
        onBackdropPress={() => setExclusivity(<></>)}
      >
        <Text style={styles.title}>Super exclusivité</Text>
      </Overlay>
    )
  }

  // Fonction de l'overlay pour le rendre visible ou non.
  const toggleOverlay = (item) => {
    setOverlay(
      <Overlay
        isVisible={true}
        overlayStyle={{ backgroundColor: "#F8F7FF" }}
        onBackdropPress={() => setOverlay(<></>)}
      >
        <View style={{ padding: 15 }}>
          <Text style={styles.title}>Vos options de quêtes!</Text>
          <Text style={styles.overText}>
            Prix minimum:{" "}
            {item.min_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </Text>
          <Text style={styles.overText}>
            Prix maximum:{" "}
            {item.max_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </Text>
          <Text style={styles.overText}>
            Surface maximum: {item.max_surface}
          </Text>
          <Text style={styles.overText}>
            Surface minimum: {item.min_surface}
          </Text>
          <Text style={styles.overText}>
            Surface extérieur: {item.outdoor_surface}
          </Text>
          <Text style={styles.overText}>Pieces maximum: {item.pieces_max}</Text>
          <Text style={styles.overText}>Pieces minimum: {item.pieces_min}</Text>
          <Text style={styles.overText}>
            Ascenseur: {item.elevator ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Parking: {item.parking ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Ancien: {item.is_old ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Neuf: {item.is_new ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Fibre optique: {item.fiber_optics ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Piscine: {item.pool ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Balcon: {item.balcony ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Terrasse: {item.terrace ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Date de création:{" "}
            {item.created && item.created.split("T")[0].replace(/-/g, "/")}
          </Text>
          <Text style={styles.overText}>
            Date du marché: {item.market_date ? "oui" : "non"}
          </Text>
          <Text style={styles.overText}>
            Disponible aux pro: {item.open_to_pro ? "oui" : "non"}
          </Text>
        </View>
      </Overlay>
    )
  }

  // Réutilisation de la fonction pour le refresh de la page.
  async function userData() {
    const data = await fetch(
      `http://${MY_IP}:3000/home/userDetail?token=${props.dataUser.token}`
    )
    const body = await data.json()
    if (body.result) {
      var countresult = []
      for (let i = 0; i < body.user.quests.length; i++) {
        const res = await fetch(
          `http://${MY_IP}:3000/countresults?token=${props.dataUser.token}&quest_id=${body.user.quests[i]._id}`
        )
        const count = await res.json()
        console.log(count.listOffers)
        countresult.push(count.listOffers)
      }
      setResults(countresult)
      console.log("countresult", countresult)
      setData(body.user)
      setQuest(body.user.quests.length)
      setOffers(body.user.offers.length)
      props.addUser
    } else {
      console.log("error")
    }
  }

  // Fonction de navigation vers la page résultats en y ajoutant l'id de la quest, déclenché via le bouton résultat
  var handleResult = async (id) => {
    props.navigation.navigate("Results", {
      screen: "ResultsScreen",
      questId: id,
    })
  }

  if (isFocused) {
    return (
      <SafeAreaView>
        {overlay}
        {exclusivity}
        <ScrollView>
          <Header
            onRefresh={userData}
            title={data.firstName}
            image={data.avatar}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginVertical: 10,
              color: "#2C98DA",
              fontWeight: "bold",
            }}
            onPress={() => viewExclusivity()}
          >
            Vos {quest} quêtes en cours
          </Text>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              props.navigation.navigate("AddQuest", {
                screen: "AddQuestScreen",
              })
            }}
          >
            <Text style={styles.buttonText}>Lancez une quête</Text>
          </TouchableOpacity>
          {data.quests?.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  backgroundColor: "#F8F7FF",
                  padding: 15,
                  elevation: 5,
                  marginVertical: 5,
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>{item.type}</Text>
                  <Text style={styles.text}>{item.city}</Text>
                  <Text style={styles.text}>Rayon {item.rayon} </Text>
                </View>
                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>
                    prix min :{" "}
                    {item.min_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    €
                  </Text>
                  <Text style={styles.text}>
                    prix max :{" "}
                    {item.max_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    €
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CreatButton onPress={() => toggleOverlay(item)}>
                    Détails
                  </CreatButton>
                  <CreatButton
                    result={results[i]}
                    onPress={() => {
                      handleResult(item._id)
                    }}
                    buttonStyle={{ backgroundColor: "rgba(251, 197, 49, 1)" }}
                  >
                    <Text style={[styles.textButton, styles[results[i]]]}>
                      {results[i]} {results[i] > 1 ? "RÉSULTATS" : "RÉSULTAT"}
                    </Text>
                  </CreatButton>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    )
  } else {
    return <View style={{ flex: 1 }}></View>
  }
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#FBC531",
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: "center",
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: "#585858",
  },
  title: {
    fontSize: 20,
    color: "#2D98DA",
    marginBottom: 10,
  },
  overText: {
    fontSize: 15,
    color: "#585858",
  },
  textButton: {
    fontWeight: "700",
    color: "#585858",
  },
  0: {
    color: "rgba(0, 0, 0, 0.2)",
  },
})

function mapStateToProps(state) {
  return { dataUser: state.dataUser }
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: function (dataUser) {
      dispatch({ type: "addUser", dataUser: dataUser })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
