import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Linking,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import BASE_URL from "../services/api";
import { getColorByLetter } from "../utils";

export default function Profile({ navigation, route }) {
  const contactInfo = route.params.contact;
  const [contact, setcontact] = useState(contactInfo);

  useEffect(() => {
    setcontact({
      ...contact,
      color: getColorByLetter(contact.name[0]),
    });
  }, []);

  function makeCall(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  if (!contact) {
    return <ActivityIndicator size={32} />;
  }

  const deleteContact = async (contact) => {
    try {
      var url = BASE_URL + "/contacts/" + contact.id;
      var response = await axios.delete(url);
      navigation.navigate("ViewContacts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="pencil-outline"
        size={30}
        color="green"
        style={styles.editIcon}
        onPress={() =>
          navigation.navigate("EditContact", {
            contact: contact,
          })
        }
      />
      <ImageBackground
        source={{
          uri: contact.photo.length > 0 ? contact.photo : null,
        }}
        style={{
          ...styles.backgroundImage,
          backgroundColor: contact.color,
        }}
      >
        {!contact.photo ? (
          <FontAwesome5 name="user-alt" size={125} color="white" />
        ) : null}
        <AntDesign
          onPress={() => deleteContact(contact)}
          name="delete"
          size={28}
          color="white"
          style={{
            position: "absolute",
            top: StatusBar.currentHeight,
            right: 20,
          }}
        />
        <Text style={styles.mainText}>{contact.name}</Text>
      </ImageBackground>

      <View style={{ flex: 1, marginTop: 20 }}>
        {contact.mobile.length > 0 ? (
          <View style={styles.phonenNumberContainer}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {contact.mobile}
            </Text>
            <MaterialIcons
              name="call"
              size={28}
              color="green"
              onPress={() => makeCall(contact.mobile)}
            />
          </View>
        ) : null}
        {contact.landline.length > 0 ? (
          <View style={styles.phonenNumberContainer}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {contact.landline}
            </Text>
            <MaterialIcons
              name="call"
              size={28}
              color="green"
              onPress={() => makeCall(contact.landline)}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editIcon: {
    top: 70,
    right: 20,
    position: "absolute",
    zIndex: 1,
  },
  backgroundImage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  phonenNumberContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    elevation: 5,
    paddingVertical: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
