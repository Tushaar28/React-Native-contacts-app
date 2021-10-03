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

export default function CreateContact({ navigation }) {
  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [photo, setPhoto] = useState("");
  const [favourite, setFavourite] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const url = BASE_URL + "/recordId";
  //         var response = await axios.get(url);
  //         console.log(response.data.value);
  //         setId(response.data.value);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }, []);

  const addContact = async () => {
    try {
      var url = BASE_URL + "/contacts";
      var body = {
        id: name,
        name,
        mobile,
        landline,
        photo,
        favourite,
      };
      var response = await axios.post(url, body);
      //   url = BASE_URL + "/recordId";
      //   var body = {
      //     value: id + 1,
      //   };
      //   response = await axios.put(url, body);
      navigation.navigate("ViewContacts");
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button title="Save" onPress={() => addContact()} />
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
