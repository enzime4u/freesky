import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Pilots from "./Pilots";

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

const App = () => {
  const { isLoading, pilots, error } = usePilotsData();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View>
          <Text>Loading pilots....</Text>
        </View>
      ) : (
        <ScrollView>
          <Pilots pilots={pilots} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff"
  }
});

export default App;
