import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

export default function StartComponent() {
  return (
    <View style={styles.container}>
      <Button title="Lista Piloti" solid style={styles.butonPiloti} />
      <Button title="Lista Zboruri" solid style={styles.butonZboruri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  butonPiloti: {
    width: 150,
    alignSelf: "center",
    padding: 20
  },
  butonZboruri: {
    width: 150
  }
});
