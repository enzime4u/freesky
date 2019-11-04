import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Piloti from "./Piloti";
import Intro from "./Intro";

const PILOTS_URL = "https://freesky.ro/ro/partners/getpilots";

// fn for fetching in general
const fetchData = url => {
  return fetch(`${url}`).then(response => response.json());
};

function normalizePilots(pilots) {
  return pilots.map(pilot => ({ ...pilot, flightHours: pilot.flight_hours }));
}

const usePilotsData = () => {
  const [pilots, setPilots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(PILOTS_URL)
      .then(reply => {
        setIsLoading(false);
        setPilots(reply);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }, []);
  return {
    pilots: normalizePilots(pilots),
    isLoading,
    error
  };
};

const pages = {
  intro: Intro,
  piloti: Piloti
};

const App = () => {
  const { isLoading, pilots, error } = usePilotsData();
  return (
    <SafeAreaView style={styles.container}>
      <Intro />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
  }
});

export default App;
