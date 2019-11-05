import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

export default function Intro({ setPage }) {
  return (
    <View style={styles.wraper}>
      <Text style={styles.heading}>FreeSky</Text>
      <View style={styles.container}>
        <Button style={styles.butonZboruri} title="Lista Zboruri" disabled />
        <Button
          style={styles.butonPiloti}
          title="Lista Piloti"
          onPress={() => setPage("piloti")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    flex: 1
  },
  heading: {
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
    padding: 20
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  butonPiloti: {
    width: "auto",
    padding: 5
  },
  butonZboruri: {
    width: "auto",
    padding: 5
  }
});
