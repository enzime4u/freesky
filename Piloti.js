import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Pilot from "./Pilot";

const Piloti = ({ pilots }) => (
  <View style={styles.pilots}>
    {pilots.map(pilot => (
      <Pilot
        key={pilot.id}
        name={pilot.name}
        flightHours={pilot.flight_hours}
        profileImage={pilot.profile_image}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  pilots: {
    display: "flex",
    alignItems: "center"
  }
});

export default Piloti;
