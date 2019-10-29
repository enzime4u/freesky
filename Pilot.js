import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Pilot = ({ id, name, profileImage, flightHours }) => (
  <View style={styles.pilot}>
    <Image
      source={{
        uri:
          "https://images.unsplash.com/photo-1572293894491-b319f8432d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      }}
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
    flexWrap: "nowrap",
    padding: 5
  },
  img: {
    borderColor: "blue",
    borderWidth: 2,
    height: 100,
    width: 100
  },
  details: {
    flexGrow: 1,
    marginLeft: 5
  },
  name: {
    fontSize: 18
  }
});

export default Pilot;
