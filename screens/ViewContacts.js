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

import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import ContactCard from "../components/ContactCard";

export default function ViewContacts({ navigation }) {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, [isFocused]);

  async function getAllContacts() {
    try {
      const url = BASE_URL + "/contacts";
      var response = await axios.get(url);
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name="add-circle"
        size={62}
        color="green"
        style={styles.addIcon}
        onPress={() => navigation.navigate("CreateContact")}
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
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
