import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getColorByLetter } from "../utils/index";

export default function ContactCard({ contactInfo }) {
  const { name } = contactInfo;
  const color = getColorByLetter(name[0]);

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={{ ...styles.icon, backgroundColor: color }}>
          <Text style={styles.iconContent}>{name[0]}</Text>
        </View>
        <Text style={styles.primaryText}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  primaryText: {
    fontSize: 18,
  },
  iconContent: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 24,
    color: "white",
    marginHorizontal: 10,
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    padding: 1,
    backgroundColor: "green",
  },
});
