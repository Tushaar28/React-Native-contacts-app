import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  ImageBackground,
  CheckBox,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ImagePicker from "react-native-image-crop-picker";

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

      props.navigation.navigate("ViewContacts");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setPhoto(image.path);
    });
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
      <Button
        title="Uplaod photo"
        onPress={uploadPhoto}
        style={styles.checkbox}
      />
      <ImageBackground
        source={{
          uri: photo.length > 0 ? photo : null,
        }}
        style={{
          ...styles.backgroundImage,
        }}
      >
        {!photo ? (
          <FontAwesome5 name="user-alt" size={125} color="white" />
        ) : null}
      </ImageBackground>

      <Button title="Save" onPress={() => editContact()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  uploadButton: {
    marginTop: "50px",
    marginBottom: "60px",
    width: "100px",
    padding: "50px",
    margin: "50px",
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
  backgroundImage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
