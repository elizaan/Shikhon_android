import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ route, navigation }) {
  const { userID, userType } = route.params;
  // console.log(userType);

  const [type, setType] = useState("");
  const [retrieve, setRetrieve] = useState(false);

  useEffect(() => {
    // retrieveData();
    retrieveData().then(setType);
  }, []);

  const retrieveData = async () => {
    try {
      const valueString = await AsyncStorage.getItem("userType");
      const value = JSON.parse(valueString);

      // console.log("printing");
      // console.log(valueString);

      return value;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.fullhomescreen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Our Programs</Text>
        {/* <Text style={styles.headerText}>{type}</Text> */}
      </View>
      <View style={styles.winContainer}>
        <Text style={styles.winText}>We are here to help you win Admission Battle</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.opacityButton}
            onPress={() => {
              console.log("details page button tapped");
              navigation.navigate("Course", { userID: userID, userType: userType, trackID: 1, trackName: "Engineering" });
            }}
          >
            <Text style={styles.buttonText}>Engineering University Admission</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.opacityButton}>
            <Text style={styles.buttonText}>Medical College Admission</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.opacityButton}>
            <Text style={styles.buttonText}>University Admission for ka-unit</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.viewButton}>
          <Button
            color="#add8e6"
            title="Engineering University Admission"
            onPress={() => {
              console.log("details page button tapped");
              navigation.navigate("Course", { userID: 1, userType: "Student" }); //ekhane ki pass korlo bujhi nai
            }}
          />
        </View>
        <View style={styles.viewButton}>
          <Button style={styles.button} title="Medical College Admission" />
        </View>
        <View style={styles.viewButton}>
          <Button
            style={styles.button}
            title="University Admission for ka-unit"
          />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullhomescreen: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    backgroundColor: "#add8e6",
    //marginBottom: 15,
    padding: 30,
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0000A0",
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //margin: 15,
  },
  winContainer: {
    backgroundColor: "white",
  },
  winText: {
    //flex: 1,
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 15,
    padding: 30,
    fontWeight: "bold",
    color: "#0000A0",
  },
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    margin: 15,
    padding: 20,
  },
  opacityButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    //padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "center",
    fontWeight: "bold",
  },
});