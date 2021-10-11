import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  CheckBox,
} from "react-native";

export default function EditContact(props) {
  const contactInfo = props.route.params.contact;
  const [name, setName] = useState(contactInfo.name);
  const [mobile, setMobile] = useState(contactInfo.mobile);
  const [landline, setLandline] = useState(contactInfo.landline);
  const [favourite, setFavourite] = useState(contactInfo.favourite);
  const [photo, setPhoto] = useState(contactInfo.photo);

  const editContact = async () => {
    try {
      var url = BASE_URL + "/contacts/" + contactInfo.id;
      var body = {
        id: name,
        name,
        mobile,
        landline,
        photo,
        favourite,
      };
      var response = await axios.put(url, body);
      //   url = BASE_URL + "/recordId";
      //   var body = {
      //     value: id + 1,
      //   };
      //   response = await axios.put(url, body);
      props.navigation.navigate("ViewContacts");
    } catch (error) {
      console.log(error);
    }
  };

  if (!contactInfo) {
    return <ActivityIndicator size={32} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ ...styles.inputContainer, marginVertical: 0 }}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={(text) => setMobile(text)}
        />
      </View>

      <View style={{ ...styles.inputContainer, marginVertical: 0 }}>
        <TextInput
          style={styles.input}
          placeholder="Landline"
          keyboardType="number-pad"
          value={landline}
          onChangeText={(text) => setLandline(text)}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={favourite}
          onValueChange={setFavourite}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Mark as favourite</Text>
      </View>
      <Button title="Save" onPress={() => editContact()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    padding: 10,
    margin: 10,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
