import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput
} from "react-native";

import Pilot from "./Pilot";
import { ScrollView } from "react-native-gesture-handler";
import FuzzySearch from "fuzzy-search";

// make url as a var so can be easily accesible
const PILOTS_URL = "https://freesky.ro/ro/partners/getpilots";

// fn to normalize the pilots data and assign the flightHours the right type of data
function normalizePilots(pilots) {
  return pilots.map(pilot => ({ ...pilot, flightHours: pilot.flight_hours }));
}

// fn for fetching data from an url
const fetchData = url => {
  return fetch(`${url}`).then(response => response.json());
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

const Piloti = ({ setPage }) => {
  const { isLoading, pilots, error } = usePilotsData();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState(pilots);

  const searcher = new FuzzySearch(pilots, ["name"]);

  function onSearch(search) {
    const result = searcher.search(search);

    setSearch(search);
    setResults(result);
  }

  return (
    // here I get an error from the simulator
    // needed the <TextInput> form react-native
    <View style={styles.container}>
      <TextInput
        type="text"
        onChange={e => onSearch(e.target.value)}
        value={search}
      />
      <View style={styles.piloti}>
        <ScrollView>
          {pilots.map(pilot => (
            <Pilot
              key={pilot.id}
              name={pilot.name}
              flightHours={pilot.flight_hours}
              profileImage={pilot.profile_image}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  piloti: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 50
  }
});

export default Piloti;
