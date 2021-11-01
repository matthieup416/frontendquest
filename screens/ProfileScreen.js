import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";
import CreatButton from "../shared/CreatButton";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MY_IP } from "@env"; /* Variable environnement */

let screenWidth = Dimensions.get("window").width;


function ProfileScreen(props) {
  var handleSubmitRemove = async () => {
    console.log("Déconnecté!");
    AsyncStorage.removeItem("token");
    props.navigation.navigate("SignIn", { screen: "SignInScreen" });
  };
  const [data, setData] = useState('')
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false)

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
    const res = await fetch(`http://${MY_IP}:3000/home/updateUser?token=${props.dataUser.token}&description=${data.description}&job=${data.job}`)
    if (res) {
      setEdit(false)
    } else {
      console.log('quelque chose a mal tourné !')
    }
  };
  if (!data) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.upperContainer}>
          <Avatar source={{ uri: data.avatar }} avatarStyle={{ borderRadius: 50, overflow: 'hidden' }} size={"xlarge"} />
          <Text style={styles.heading}>{data.firstName} {data.lastName}</Text>
        </View>
        <View style={styles.detailWrappper}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.detail}>{data.email}</Text>
        </View>
        <View style={styles.detailWrappper}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.detail}>{data.phone}</Text>
        </View>
        <View style={styles.detailWrappper}>
          <Text style={styles.label}>Job</Text>
          <TextInput
            value={data.job}
            onChangeText={(value) => {
              // setEdit(true);
              setData({ ...data, job: value })
            }}
            style={styles.detail}
          />
        </View>
        <View style={styles.detailWrappper}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={data.description}
            multiline={true}
            numberOfLines={5}
            onChangeText={(value) => {
              // setEdit(true);
              setData({ ...data, description: value })
            }}
            style={styles.detail}
          />
        </View>
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <CreatButton onPress={onChange}>Modifier</CreatButton>
          <View style={{ margin: 5 }}></View>
          <CreatButton
            buttonStyle={{ backgroundColor: "#eb4d4b" }}
            textStyle={{ fontWeight: "bold" }}
            onPress={() => handleSubmitRemove()}
          >
            Déconnexion</CreatButton>
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
  },
});


function mapStateToProps(state) {
  return { dataUser: state.dataUser };
}

export default connect(mapStateToProps)(ProfileScreen);

