import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function NoteScreen({ route, navigation }) {
  // navigation.setOptions({ title: 'Updated!' })
  // const { userID } = route.params;
  // const { userType } = route.params;
  const [notes, setNotes] = useState("");

  const [note, setNote] = useState("");
  const [topicName, setTopicName] = useState("");

  const changeNoteHandler = (val) => {
    setNote(val);
  };

  const changeTopicNameHandler = (val) => {
    setTopicName(val);
  };

  const { userID, userType, _id, chapterNo } = route.params;
  // console.log("_id printing in NoteScreen",userID,userType,_id,chapterNo)
  const param = { courseID: _id, chapterNo: chapterNo };

  const tempFetchaddr = fetchAddress + "note/all";
  // console.log(tempFetchaddr);
  const addr = `${tempFetchaddr}?courseID=${encodeURIComponent(param.courseID)}&chapterNo=${encodeURIComponent(
    param.chapterNo
  )}`;
  // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
  fetch(addr)
    .then((res) => res.json())
    // .then((res) => res.text())
    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }
      // console.log("data:");
      // console.log(data);
      // console.log(data.noteArr);
      setNotes(data.noteArr);
    });

  sendCred = async () => {
    // console.log("in sendCred");
    const addr = fetchAddress + "note/add";
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: topicName,
        courseID: _id,
        chapterNo: chapterNo,
        author: userID,
        content: note,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
          }
          await AsyncStorage.setItem("token", data.token);
        } catch (e) {
          console.log("The error is: ", e);
        }
        // console.log(data);
      });
    setTopicName("");
    setNote("");
  };

  return (
    <View style={styles.fullhomescreen}>
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
            <TextInput style={styles.input} multiline={true} numberOfLines={4} placeholder="Note" onChangeText={changeNoteHandler} value={note} />
            <View>
              <TouchableOpacity onPress={() => sendCred()} style={styles.addButton}>
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
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.opacityButton}
                  onPress={() => {
                    navigation.navigate("NoteDetails", {
                      userID: userID,
                      userType: userType,
                      _id: item._id,
                      topicName: item.topicName,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>{item.topicName}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
    // backgroundColor: "#add8e6",
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
