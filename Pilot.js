import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Pilot = ({ id, name, profileImage, flightHours }) => (
  <View style={styles.pilot}>
    <Image
      source={
        profileImage
          ? { uri: `https://freesky.ro/ro/image/${profileImage}` }
          : { uri: `https://freesky.ro/img/pilot_icon.jpg` }
      }
      style={styles.img}
    />
    <View style={styles.details}>
      <Text style={styles.name}>Nume: {name}</Text>
      <Text style={styles.flightHours}>Ore de zbor: {flightHours}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  pilot: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
    backgroundColor: "#5cc9f5",
    borderRadius: 5,
    padding: 5
  },
  img: {
    borderColor: "blue",
    height: 70,
    width: 70
  },
  details: {
    flexGrow: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 18
  }
});

export default Pilot;
