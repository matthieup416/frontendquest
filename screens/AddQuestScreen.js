import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, TextInput, StyleSheet, SafeAreaView } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import StepIndicator from "react-native-step-indicator";
import { Input, SearchBar, CheckBox, Button } from "react-native-elements";
// import Slider from "@react-native-community/slider"
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import localization from "moment/locale/fr";

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#2D98DA",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#2D98DA",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#2D98DA",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#2D98DA",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#2D98DA",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

function AddQuestScreen(props) {
  const [maisonChecked, setMaisonChecked] = useState(true);
  const [appartementChecked, setAppartementChecked] = useState(false);
  const [immeubleChecked, setImmeubleChecked] = useState(false);
  const [businessChecked, setBusinessChecked] = useState(false);
  const [autreChecked, setAutreChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [balconyChecked, setBalconyChecked] = useState(false);
  const [oneRoomChecked, setOneRoomChecked] = useState(true);
  const [twoRoomChecked, setTwoRoomChecked] = useState(false);
  const [threeRoomChecked, setThreeRoomChecked] = useState(false);
  const [fourRoomChecked, setFourRoomChecked] = useState(false);
  const [fiveRoomChecked, setFiveRoomChecked] = useState(false);
  const [moreRoomChecked, setMoreRoomChecked] = useState(false);
  const [ancienChecked, setAncienChecked] = useState(true);
  const [neufChecked, setNeufChecked] = useState(false);
  const [groundFloorChecked, setGroundFloorChecked] = useState(false);
  const [floorChecked, setFloorChecked] = useState(false);
  const [topFloorChecked, setTopFloorChecked] = useState(false);
  const [nb_Pieces, setNb_Pieces] = useState(1);
  const [min_Price, setMin_Price] = useState(0);
  const [max_Price, setMax_Price] = useState(0);
  const [min_Surface, setMin_Surface] = useState(0);
  const [max_Surface, setMax_Surface] = useState(0);
  const [outdoor_surface, setOutdoor_surface] = useState(0);

  const [fiber_opticsChecked, setFiber_opticsChecked] = useState(false);
  const [poolChecked, setPoolChecked] = useState(false);
  const [elevatorChecked, setElevatorChecked] = useState(false);
  const [datePreferenceChecked, setDatePreferenceChecked] = useState(false);
  const [marketDateFromFront, setMarketDateFromFront] = useState(null);

  const [social_text, setSocial_text] = useState("");
  const [open_to_proChecked, setOpen_to_proChecked] = useState(true);
  const [terraceChecked, setTerraceChecked] = useState(false);

  const [type, setType] = useState("maison");
  const [nb_Floor, setNb_Floor] = useState(0);
  const [floor_Type, setFloor_Type] = useState("");

  const [formProgress, setFormProgress] = useState(0);
  const [dateDisplayFr, setDateDisplayFr] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    moment.locale("fr", localization);

    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDatePreferenceChecked(false);

    setDateDisplayFr(moment(currentDate).format("LL"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const [searchValue, setSearchValue] = useState("");
  const [goodType, setGoodType] = useState("maison");
  let changeGoodType = (value) => setGoodType(value);
  let nextStep = async () => {
    if (formProgress < 4) {
      processData();
      setFormProgress(formProgress + 1);
    } else {
      var data = {
        cities: [{ name: searchValue, rayon: sliderValue }],
        type: type,
        min_price: min_Price,
        max_price: max_Price,
        min_surface: min_Surface,
        max_surface: max_Surface,
        nb_pieces: nb_Pieces,
        floor_type: floor_Type,
        floor_max: 4,
        elevator: elevatorChecked,
        parking: parkingChecked,
        fiber_optics: fiber_opticsChecked,
        pool: poolChecked,
        balcony: balconyChecked,
        market_date: marketDateFromFront,
        creation_date: new Date(),
        outdoor_surface: outdoor_surface,
        open_to_pro: open_to_proChecked,
        terrace: terraceChecked,
        is_online: true,
        is_old: ancienChecked,
        is_new: neufChecked,
        social_text: social_text,
      };

      console.log("juste avant denvoyer data au back : " + JSON.stringify(data));
      let envoiBack = await fetch("http://192.168.1.43:3000/addquest", {
        method: "post",

        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await envoiBack.json();
      if (body.result == true) {
        console.log("tout est bon coté back la quest a été enregistree en BDD !");
      } else {
        console.log("erreur coté back!");
      }
    }
  };
  let previousStep = () => {
    setFormProgress(formProgress - 1);
    console.log(formProgress);
  };
  let dateDisplay = <Text>{date}</Text>;
  /* let slider = (
    <Slider
      maximumValue={30}
      minimumValue={0}
      minimumTrackTintColor="#585858"
      maximumTrackTintColor="#000000"
      thumbTintColor="#2D98DA"
      step={1}
      value={sliderValue}
      onValueChange={(sliderValue) => setSliderValue(sliderValue)}
      style={{ width: deviceWidth / 3 }}
    />
  ) */
  let sliderValueDisplay = <Text style={{ color: "#585858" }}>Rayon : {sliderValue} km</Text>;

  let outdoorSpace = (
    <View style={{ flexDirection: "row" }}>
      <Input placeholder="1000" inputContainerStyle={{ width: deviceWidth / 8 }} onChangeText={(value) => setOutdoor_surface(value)} />
      <Text
        style={{
          fontSize: 14,
          textAlign: "left",
          color: "#585858",
        }}>
        m2.
      </Text>
    </View>
  );
  let fiber = (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Fibre optique"
        checked={fiber_opticsChecked}
        checkedColor="#2D98DA"
        onPress={fiber_opticsChecked ? () => setFiber_opticsChecked(false) : () => setFiber_opticsChecked(true)}
      />
    </View>
  );

  let pool = (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Piscine"
        checked={poolChecked}
        checkedColor="#2D98DA"
        onPress={poolChecked ? () => setPoolChecked(false) : () => setPoolChecked(true)}
      />
    </View>
  );

  let elevator = (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Ascenseur"
        checked={elevatorChecked}
        checkedColor="#2D98DA"
        onPress={elevatorChecked ? () => setElevatorChecked(false) : () => setElevatorChecked(true)}
      />
    </View>
  );

  let checkBoxes = (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flexDirection: "column" }}>
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="1"
          checked={oneRoomChecked}
          checkedColor="#2D98DA"
          onPress={oneRoomChecked ? () => setOneRoomChecked(false) : () => setOneRoomChecked(true)}
        />
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="2"
          checked={twoRoomChecked}
          checkedColor="#2D98DA"
          onPress={twoRoomChecked ? () => setTwoRoomChecked(false) : () => setTwoRoomChecked(true)}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="3"
          checked={threeRoomChecked}
          checkedColor="#2D98DA"
          onPress={threeRoomChecked ? () => setThreeRoomChecked(false) : () => setThreeRoomChecked(true)}
        />
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="4"
          checked={fourRoomChecked}
          checkedColor="#2D98DA"
          onPress={fourRoomChecked ? () => setFourRoomChecked(false) : () => setFourRoomChecked(true)}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="5"
          checked={fiveRoomChecked}
          checkedColor="#2D98DA"
          onPress={fiveRoomChecked ? () => setFiveRoomChecked(false) : () => setFiveRoomChecked(true)}
        />
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="+"
          checked={moreRoomChecked}
          checkedColor="#2D98DA"
          onPress={moreRoomChecked ? () => setMoreRoomChecked(false) : () => setMoreRoomChecked(true)}
        />
      </View>
    </View>
  );

  let checkBoxesComplements = (
    <View style={{ flexDirection: "column" }}>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Stationnement / Box / Garage"
        checked={parkingChecked}
        checkedColor="#2D98DA"
        onPress={parkingChecked ? () => setParkingChecked(false) : () => setParkingChecked(true)}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Balcon"
        checked={balconyChecked}
        checkedColor="#2D98DA"
        onPress={balconyChecked ? () => setBalconyChecked(false) : () => setBalconyChecked(true)}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Terrasse"
        checked={terraceChecked}
        checkedColor="#2D98DA"
        onPress={terraceChecked ? () => setTerraceChecked(false) : () => setTerraceChecked(true)}
      />

      {fiber}
      {elevator}
    </View>
  );

  let checkBoxesFloors = (
    <View style={{ flexDirection: "column" }}>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Rez-de-chaussée"
        checked={groundFloorChecked}
        checkedColor="#2D98DA"
        onPress={groundFloorChecked ? () => setGroundFloorChecked(false) : () => [setGroundFloorChecked(true), setFloorChecked(false), setTopFloorChecked(false)]}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="En étage"
        checked={floorChecked}
        checkedColor="#2D98DA"
        onPress={floorChecked ? () => setFloorChecked(false) : () => [setFloorChecked(true), setGroundFloorChecked(false), setTopFloorChecked(false)]}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Dernier étage"
        checked={topFloorChecked}
        checkedColor="#2D98DA"
        onPress={topFloorChecked ? () => setTopFloorChecked(false) : () => [setTopFloorChecked(true), setGroundFloorChecked(false), setFloorChecked(false)]}
      />
    </View>
  );

  let checkBoxesDates = (
    <View style={{ flexDirection: "column" }}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "left",
              color: "#585858",
              fontWeight: "bold",
              marginLeft: 10,
            }}>
            {dateDisplayFr}
          </Text>
          <Button onPress={showDatepicker} buttonStyle={{ width: deviceWidth / 6, backgroundColor: "#FBC531" }} icon={<Icon name="calendar-alt" size={15} color="white" style={{ marginRight: 8 }} />} iconLeft />
        </View>

        {show && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />}
      </View>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Pas de préférence"
        checked={datePreferenceChecked}
        checkedColor="#2D98DA"
        onPress={datePreferenceChecked ? () => setDatePreferenceChecked(false) : () => [setDatePreferenceChecked(true), setDate(new Date()), setDateDisplayFr("")]}
      />
    </View>
  );

  let checkBoxesTypes = (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Ancien"
        checked={ancienChecked}
        checkedColor="#2D98DA"
        onPress={ancienChecked ? () => setAncienChecked(false) : () => setAncienChecked(true)}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
        }}
        center
        title="Neuf"
        checked={neufChecked}
        checkedColor="#2D98DA"
        onPress={neufChecked ? () => setNeufChecked(false) : () => setNeufChecked(true)}
      />
    </View>
  );
  let radioButtons = (
    <View style={{ width: (deviceWidth / 3) * 2, marginBottom: 10, marginTop: 20 }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: "left",
          color: "#585858",
          fontWeight: "bold",
          marginBottom: 5,
          marginLeft: 10,
        }}>
        Type de bien :
      </Text>
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
          width: (deviceWidth / 3) * 2,
        }}
        center
        title="Maison"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={maisonChecked}
        checkedColor="#2D98DA"
        onPress={maisonChecked ? () => setMaisonChecked(false) : () => [setMaisonChecked(true), setAppartementChecked(false), setImmeubleChecked(false), setBusinessChecked(false), setAutreChecked(false)]}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
          width: (deviceWidth / 3) * 2,
        }}
        center
        title="Appartement"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={appartementChecked}
        checkedColor="#2D98DA"
        onPress={appartementChecked ? () => setAppartementChecked(false) : () => [setAppartementChecked(true), setMaisonChecked(false), setImmeubleChecked(false), setBusinessChecked(false), setAutreChecked(false)]}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
          width: (deviceWidth / 3) * 2,
        }}
        center
        title="Immeuble"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={immeubleChecked}
        checkedColor="#2D98DA"
        onPress={immeubleChecked ? () => setImmeubleChecked(false) : () => [setImmeubleChecked(true), setAppartementChecked(false), setMaisonChecked(false), setBusinessChecked(false), setAutreChecked(false)]}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
          width: (deviceWidth / 3) * 2,
        }}
        center
        title="Local commercial"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={businessChecked}
        checkedColor="#2D98DA"
        onPress={businessChecked ? () => setBusinessChecked(false) : () => [setBusinessChecked(true), setAppartementChecked(false), setMaisonChecked(false), setImmeubleChecked(false), setAutreChecked(false)]}
      />
      <CheckBox
        containerStyle={{
          borderColor: "#FFFFFF",
          alignSelf: "flex-start",
          alignItems: "flex-start",
          width: (deviceWidth / 3) * 2,
        }}
        center
        title="Autre"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={autreChecked}
        checkedColor="#2D98DA"
        onPress={autreChecked ? () => setAutreChecked(false) : () => [setAutreChecked(true), setAppartementChecked(false), setMaisonChecked(false), setImmeubleChecked(false), setBusinessChecked(false)]}
      />
    </View>
  );
  const styles = StyleSheet.create({
    searchBox: {
      width: 340,
      height: 50,
      fontSize: 18,
      borderRadius: 8,
      borderColor: "#aaa",
      color: "#000",
      backgroundColor: "#fff",
      borderWidth: 1.5,
      paddingLeft: 15,
    },
    container: {
      flex: 1,
      backgroundColor: "lightblue",
      alignItems: "center",
    },
  });

  let formContent = (
    <View>
      <Text
        style={{
          fontSize: 18,
          textAlign: "left",
          color: "#585858",
          fontWeight: "bold",
          marginLeft: 10,
          marginTop: 30,
        }}>
        Localisation :
      </Text>

      {/* Recherche Ville classique */}
      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <SearchBar
          placeholder="Ville..."
          onChangeText={(searchValue) => setSearchValue(searchValue)}
          value={searchValue}
          lightTheme={true}
          inputContainerStyle={{
            backgroundColor: "#f2f2f2",
          }}
          containerStyle={{
            backgroundColor: "#FFFFFF",
            width: (deviceWidth / 3) * 2,
            borderTopColor: "#FFFFFF",
            borderBottomColor: "#FFFFFF",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {sliderValueDisplay}
          {/* {slider} */}
        </View>
      </View>
      {radioButtons}
    </View>
  );
  let steps = <View></View>;
  let buttonBottom = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 20,
        height: 75,
      }}>
      <Button
        title="Précédent"
        icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />}
        buttonStyle={{
          width: deviceWidth / 3,
          borderRadius: 50,
          marginRight: 75,
        }}
        color="#2D98DA"
        iconLeft
        onPress={previousStep}
      />
      <Button
        title="Continuer"
        icon={<Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 8 }} />}
        buttonStyle={{
          width: deviceWidth / 3,
          borderRadius: 50,
        }}
        color="#2D98DA"
        iconRight
        onPress={nextStep}
      />
    </View>
  );
  // header with stepIndicator 1-2-3
  if (formProgress == 0) {
    buttonBottom = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
          height: 75,
        }}>
        <Button
          title="Continuer"
          icon={<Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
          }}
          color="#2D98DA"
          iconRight
          onPress={nextStep}
        />
      </View>
    );
    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          Créer une quête
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={0} stepCount={5} />
      </View>
    );
  } else if (formProgress == 1) {
    formContent = (
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 30,
          }}>
          Votre budget :
        </Text>

        <Input placeholder="Prix Minimum" inputContainerStyle={{ width: deviceWidth / 2 }} onChangeText={(value) => setMin_Price(value)} />
        <Input placeholder="Prix Maximum" inputContainerStyle={{ width: deviceWidth / 2 }} onChangeText={(value) => setMax_Price(value)} />

        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 10,
          }}>
          Surface habitable :
        </Text>

        <View style={{ flexDirection: "column" }}>
          <Input placeholder="min" inputContainerStyle={{ width: deviceWidth / 8 }} onChangeText={(value) => setMin_Surface(value)} />
          <Input placeholder="max" inputContainerStyle={{ width: deviceWidth / 8 }} onChangeText={(value) => setMax_Surface(value)} />
        </View>
      </View>
    );

    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          Dîtes-nous en un peu plus sur votre recherche...
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={1} stepCount={5} />
      </View>
    );
  } else if (formProgress == 2 && appartementChecked == true) {
    formContent = (
      <ScrollView>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 30,
          }}>
          Nombre de pièces :
        </Text>

        {checkBoxes}
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 10,
          }}>
          Étage :
        </Text>
        {checkBoxesFloors}

        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 10,
          }}>
          Compléments :
        </Text>
        {checkBoxesComplements}
      </ScrollView>
    );
    buttonBottom = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
          height: 75,
        }}>
        <Button
          title="Précédent"
          icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
            marginRight: 75,
          }}
          color="#2D98DA"
          iconLeft
          onPress={previousStep}
        />
        <Button
          title="Suivant"
          icon={<Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
          }}
          color="#2D98DA"
          iconRight
          onPress={nextStep}
        />
      </View>
    );
    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          On y est presque !
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={2} stepCount={5} />
      </View>
    );
  } else if (formProgress == 2 && maisonChecked == true) {
    formContent = (
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 30,
          }}>
          Nombre de pièces :
        </Text>
        {checkBoxes}
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 10,
          }}>
          Surface extérieure et terrain :
        </Text>
        {outdoorSpace}
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 10,
          }}>
          Équipements:
        </Text>
        {fiber}
        {pool}
      </View>
    );
    buttonBottom = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
          height: 75,
        }}>
        <Button
          title="Précédent"
          icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
            marginRight: 75,
          }}
          color="#2D98DA"
          iconLeft
          onPress={previousStep}
        />
        <Button
          title="Suivant"
          icon={<Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
          }}
          color="#2D98DA"
          iconRight
          onPress={nextStep}
        />
      </View>
    );
    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          On y est presque !
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={2} stepCount={5} />
      </View>
    );
  } else if (formProgress == 2 && maisonChecked != true && appartementChecked != true) {
    formContent = (
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 30,
          }}>
          Nombre de pièces :
        </Text>

        {checkBoxes}
      </View>
    );
    buttonBottom = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
          height: 75,
        }}>
        <Button
          title="Précédent"
          icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
            marginRight: 75,
          }}
          color="#2D98DA"
          iconLeft
          onPress={previousStep}
        />
        <Button
          title="Suivant"
          icon={<Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
          }}
          color="#2D98DA"
          iconRight
          onPress={nextStep}
        />
      </View>
    );
    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          On y est presque !
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={2} stepCount={5} />
      </View>
    );
  } else if (formProgress == 3) {
    buttonBottom = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
          height: 75,
        }}>
        <Button
          title="Précédent"
          icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
            marginRight: 75,
          }}
          color="#2D98DA"
          iconLeft
          onPress={previousStep}
        />
        <Button
          title="Suivant"
          icon={<Icon name="arrow-right" size={15} color="white" style={{ marginLeft: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
          }}
          color="#2D98DA"
          iconRight
          onPress={nextStep}
        />
      </View>
    );

    formContent = (
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 30,
          }}>
          Vous souhaitez acheter un bien :
        </Text>

        {checkBoxesTypes}

        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 10,
          }}>
          Commercialisé depuis le :
        </Text>
        {checkBoxesDates}
      </View>
    );
    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          Quelques dernières informations
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={3} stepCount={5} />
      </View>
    );
  } else if (formProgress == 4) {
    buttonBottom = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
          height: 75,
        }}>
        <Button
          title="Précédent"
          icon={<Icon name="arrow-left" size={15} color="white" style={{ marginRight: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
            marginRight: 75,
          }}
          color="#2D98DA"
          iconLeft
          onPress={previousStep}
        />
        <Button
          title="Publier ma quête !"
          icon={<Icon name="paper-plane" size={15} color="white" style={{ marginLeft: 8 }} />}
          buttonStyle={{
            width: deviceWidth / 3,
            borderRadius: 50,
          }}
          color="#2D98DA"
          iconRight
          onPress={nextStep}
        />
      </View>
    );

    formContent = (
      <View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "left",
            color: "#585858",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 30,
          }}>
          Maximisez vos chances auprès des Vendeurs en écrivant quelques mots sur votre recherche :
        </Text>
        <TextInput
          placeholder="Décrivez votre recherche ou adressez-vous directement aux vendeurs potentiels ☺️"
          style={{
            backgroundColor: "#F8F7FF",
            height: deviceHeight / 4,
            margin: 30,
            padding: 20,
            borderRadius: 15,
          }}
          onChangeText={(value) => setSocial_text(value)}
          autoCapitalize={"words"}
        />
        <CheckBox
          containerStyle={{
            borderColor: "#FFFFFF",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}
          center
          title="Je souhaite voir également les annonces des professionnels de l'immobilier."
          checked={open_to_proChecked}
          checkedColor="#2D98DA"
          onPress={open_to_proChecked ? () => setOpen_to_proChecked(false) : () => setOpen_to_proChecked(true)}
        />
      </View>
    );
    steps = (
      <View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#2D98DA",
            fontWeight: "bold",
            marginBottom: 30,
            marginTop: 30,
          }}>
          Le mot de la fin
        </Text>
        <StepIndicator customStyles={customStyles} currentPosition={4} stepCount={5} />
      </View>
    );
  }

  let processData = () => {
    // type de logement
    setType("maison");
    if (appartementChecked == true) {
      setType("appartement");
    } else if (immeubleChecked == true) {
      setType("immeuble");
    } else if (businessChecked == true) {
      setType("local commercial");
    } else if (autreChecked == true) {
      setType("autre");
    }
    // nombre de pièces
    if (oneRoomChecked == true) {
      setNb_Pieces(1);
    }
    if (twoRoomChecked == true) {
      setNb_Pieces(2);
    }
    if (threeRoomChecked == true) {
      setNb_Pieces(3);
    }
    if (fourRoomChecked == true) {
      setNb_Pieces(4);
    }
    if (fiveRoomChecked == true) {
      setNb_Pieces(5);
    }
    if (moreRoomChecked == true) {
      setNb_Pieces(6);
    }

    // Etage, RDC ou dernier etage
    if (groundFloorChecked == true) {
      setFloor_Type("ground_floor");
    }
    if (floorChecked == true) {
      setFloor_Type("floor");
    }
    if (topFloorChecked == true) {
      setFloor_Type("top_floor");
    }

    // Date de commercialisation
    if (datePreferenceChecked == true) {
      setMarketDateFromFront(null);
    }
    if (datePreferenceChecked == false) {
      setMarketDateFromFront(date);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFFFFF" }}>
      {steps}
      {formContent}
      {buttonBottom}
    </View>
  );
}

export default AddQuestScreen;
