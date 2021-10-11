import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import getContacts from "../redux/action";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import ContactCard from "../components/ContactCard";

function ViewContacts(props) {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    props.getContacts();
  }, [isFocused]);

  // async function getAllContacts() {
  //   try {
  //     const url = BASE_URL + "/contacts";
  //     var response = await axios.get(url);
  //     setContacts(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <View style={styles.container}>
      <Ionicons
        name="add-circle"
        size={62}
        color="green"
        style={styles.addIcon}
        onPress={() => props.navigation.navigate("CreateContact")}
      />
      <FlatList
        data={props.contacts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", {
                contact: item,
              })
            }
          >
            <ContactCard contactInfo={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getContacts: () => dispatch(getContacts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addIcon: {
    bottom: 20,
    right: 20,
    position: "absolute",
    zIndex: 1,
  },
});
