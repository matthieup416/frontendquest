import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView } from "react-native";
import { Avatar, Accessory, Button } from "react-native-elements";
import { connect } from "react-redux";
import CreatButton from "../shared/CreatButton";
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import { MY_IP } from "@env"; /* Variable environnement */

let screenWidth = Dimensions.get("window").width;

function ProfileScreen(props) {
  var handleSubmitRemove = async () => {
    console.log("Déconnecté!");
    AsyncStorage.removeItem("token");
    props.navigation.navigate("SignIn", { screen: "SignInScreen" });
  };
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusJob, setFocusJob] = useState(false);
  const [focusDescription, setFocusDescription] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function userData() {
      const data = await fetch(`http://${MY_IP}:3000/home/userDetail?token=${props.dataUser.token}`);
      const body = await data.json();
      if (body.result) {
        setData(body.user);
      } else {
        console.log("error");
      }
    }
    userData();
  }, []);

  const onChange = async () => {
    // setLoading(true)
    const res = await fetch(`http://${MY_IP}:3000/home/updateUser?token=${props.dataUser.token}&description=${data.description}&job=${data.job}`);
    if (res) {
      setEdit(false);
      showMessage({
        message: "Modification enregistrée",
        type: "success",
        animationDuration: 500,
        duration: 3000,
      });
    } else {
      console.log("quelque chose a mal tourné !");
    }
  };
  if (!data) {
    return null;
  }
  if (!data.avatar) {
    var avatar = (
      <Avatar rounded icon={{ name: "user", type: "font-awesome" }} size={"xlarge"} onPress={() => props.navigation.navigate("Camera")} activeOpacity={0.7} containerStyle={{ margin: 20, backgroundColor: "#2C8BC6" }}>
        <Accessory style={{ width: 50, height: 50, borderRadius: 50 }} size="36" />
      </Avatar>
    );
  } else {
    var avatar = <Avatar source={{ uri: data.avatar }} avatarStyle={{ borderRadius: 50, overflow: "hidden" }} size={"xlarge"} title={data.firstName[0]} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.upperContainer}>
          {avatar}
          <Text style={styles.heading}>
            {data.firstName} {data.lastName}
          </Text>
        </View>
        <View
          style={focusEmail ? styles.focusInput : styles.detailWrappper}
          onFocus={() => {
            setFocusEmail(true);
          }}
          onBlur={() => setFocusEmail(false)}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={data.email}
            onChangeText={(value) => {
              // setEdit(true);
              setData({ ...data, email: value });
            }}
            style={styles.detail}
          />
        </View>
        <View
          style={focusPhone ? styles.focusInput : styles.detailWrappper}
          onFocus={() => {
            setFocusPhone(true);
          }}
          onBlur={() => setFocusPhone(false)}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={data.phone}
            onChangeText={(value) => {
              // setEdit(true);
              setData({ ...data, phone: value });
            }}
            style={styles.detail}
          />
        </View>
        <View
          style={focusJob ? styles.focusInput : styles.detailWrappper}
          onFocus={() => {
            setFocusJob(true);
          }}
          onBlur={() => setFocusJob(false)}>
          <Text style={styles.label}>Job</Text>
          <TextInput
            value={data.job}
            onChangeText={(value) => {
              // setEdit(true);
              setData({ ...data, job: value });
            }}
            style={styles.detail}
          />
        </View>
        <View
          style={focusDescription ? styles.focusInput : styles.detailWrappper}
          onFocus={() => {
            setFocusDescription(true);
          }}
          onBlur={() => setFocusDescription(false)}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={data.description}
            multiline={true}
            numberOfLines={3}
            onChangeText={(value) => {
              // setEdit(true);
              setData({ ...data, description: value });
            }}
            style={styles.detail}
          />
        </View>
        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <CreatButton onPress={onChange}>Modifier</CreatButton>
          <View style={{ margin: 5 }}></View>
          <CreatButton buttonStyle={{ backgroundColor: "#eb4d4b" }} textStyle={{ fontWeight: "bold" }} onPress={() => handleSubmitRemove()}>
            Déconnexion
          </CreatButton>
        </View>
      </ScrollView>
    </View>
  );
}

// {edit && }

const styles = StyleSheet.create({
  upperContainer: {
    height: 300,
    backgroundColor: "#FBC531",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bottomBox: {
    position: "absolute",
    bottom: 1,
    flex: 1,
    width: screenWidth,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  detailWrappper: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  detail: {
    fontSize: 17,
    marginTop: 5,
    textAlignVertical: "top",
  },
  focusInput: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomColor: "#2C98DA",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
});

function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps)(ProfileScreen);
