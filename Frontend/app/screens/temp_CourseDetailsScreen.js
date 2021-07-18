import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function CourseDetailScreen({ route, navigation }) {
  // const { userID, userType } = route.params;
  const { userID } = route.params;
  const { userType } = route.params;
  const { courseName } = route.params;
  const { _id } = route.params;
  
  // console.log(courseName);
  console.log(_id);

  /**
   * fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
   */

  // const [course, setCourse] = useState("");
  const [chapters, setChapters] = useState("");

  const addr = fetchAddress + "course/chapter/all";
  fetch(addr, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'_id': _id}),
  })
    .then((res) => {
      console.log(res.text());
      res.json()
    })
    // .then((res) => res.text())
    .then(async (data) => {
      console.log("data:");
      console.log(data);
      try {
        // await AsyncStorage.getItem(courseID);
      } catch (e) {
        console.log("The error is: ", e);
      }
      setChapters(data.chapters);
        console.log("data:");
        console.log(data);
    });

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>User ID: {userID}</Text>
        <Text style={styles.headerText}>{userType}</Text>
      </View>

      {/* content */}
      <View style={styles.content}>
        <View>
          <Text>This is CourseDetailScreen...---</Text>
        </View>
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
    marginTop: 25,
    paddingLeft: 100,
    paddingRight: 100,
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
