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

  // returns the whole pilots array
  const [search, setSearch] = useState("");

  // results are the pilots array (when mounted)
  const [results, setResults] = useState(pilots);

  // pilots is the searched list
  // "name" is the list of properties that will be searched
  const searcher = new FuzzySearch(pilots, ["name"]);

  // handler for  change
  function onSearch(search) {
    // fuzzy-search method for searching thru pilots with the search value
    const result = searcher.search(search);

    setSearch(search);
    setResults(result);
  }

  return (
    <View>
      {!pilots.length ? (
        <Text style={styles.loading}>Loading</Text>
      ) : (
        <View style={styles.container}>
          <TextInput
            editalble
            style={styles.searchInput}
            type="text"
            onChangeText={text => onSearch(text)}
            value={search}
          />
          <View style={styles.piloti}>
            <ScrollView>
              {(results.length ? results : pilots).map(pilot => (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  piloti: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 50
  },
  loading: {
    textAlign: "center",
    fontSize: 18
  },
  searchInput: {
    borderColor: "#5cc9f5",
    borderWidth: 1,
    height: 40,
    marginTop: 100
  }
});

export default Piloti;
