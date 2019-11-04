import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button
} from "react-native";

import Piloti from "./Piloti";
import Intro from "./Intro";

const PILOTS_URL = "https://freesky.ro/ro/partners/getpilots";

// fn for fetching data in general
const fetchData = url => {
  return fetch(`${url}`).then(response => response.json());
};

function normalizePilots(pilots) {
  return pilots.map(pilot => ({ ...pilot, flightHours: pilot.flight_hours }));
}

const pages = {
  intro: Intro,
  piloti: Piloti,
  zboruri: null
};

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

const App = () => {
  const { isLoading, pilots, error } = usePilotsData();
  const [page, setPage] = useState("intro");
  return (
    <View>
      <Intro />
    </View>
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
