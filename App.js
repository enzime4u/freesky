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

// fn for fetching data in general

const pages = {
  intro: Intro,
  piloti: Piloti,
  zboruri: null
};

const App = () => {
  const [page, setPage] = useState("intro");
  const Page = pages[page];
  return (
    <View style={styles.container}>
      {Page !== Intro ? (
        <SafeAreaView>
          <Page setPage={setPage} />
          <Button
            style={styles.goBackBtn}
            title="Go back"
            onPress={() => setPage("intro")}
          />
        </SafeAreaView>
      ) : (
        <Page setPage={setPage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  goBackBtn: {
    backgroundColor: "#6638f0",
    color: "pink"
  }
});

export default App;
