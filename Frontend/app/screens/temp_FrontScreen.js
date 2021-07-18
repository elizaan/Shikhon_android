import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";

export default function NoteScreen({ navigation }) {
  const userID = "1";
  const userType = "Teacher";
  const courseName = "Physics 1";
  const _id = "60ad0cedb60e311790fef7c6";

  const [note, setNote] = useState("");
  const [topicName, setTopicName] = useState("");

  const changeNoteHandler = (val) => {
    setNote(val);
  };

  const changeTopicNameHandler = (val) => {
    setTopicName(val);
  };

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>User ID: {userID}</Text>
        <Text style={styles.headerText}>{userType}</Text>
        {/* <Text>hello!</Text> */}
      </View>

      {/*form of add note*/}
      <View style={styles.addFrom}>
        {userType != "Teacher" ? null : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Topic Name"
              onChangeText={changeTopicNameHandler}
              value={topicName}
            />
            <View>
              <TouchableOpacity style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Select File</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Add Note</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* content */}
      <View style={styles.content}>
        <View>
          <Text>This is Note Screen!</Text>
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
    // marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0000A0",
  },
  addFrom: {
    backgroundColor: "#E0FFFF",
  },
  addButton: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    marginRight: 110,
    marginLeft: 110,
    marginBottom: 20,
    marginTop: 20,
  },
  addViewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    margin: 10,
    padding: 10,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //margin: 15,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    //padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 30,
  },
});
