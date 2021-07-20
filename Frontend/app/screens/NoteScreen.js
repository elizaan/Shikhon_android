import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
import { MaterialIcons } from "@expo/vector-icons";

export default function NoteScreen({ route, navigation }) {
  // navigation.setOptions({ title: 'Updated!' })
  // const { userID } = route.params;
  // const { userType } = route.params;
  const [notes, setNotes] = useState("");

  const [note, setNote] = useState("");
  const [topicName, setTopicName] = useState("");

  const [showSubmit, setShowSubmit] = useState(0);

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

  const sendCred = async () => {
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

  const sendCred_note_dlt = async (item_id) => {
    console.log("here in sendCred_note_dlt");
    const tempFetchaddr2 = fetchAddress + "note";
    const addr2 = `${tempFetchaddr2}?_id=${encodeURIComponent(item_id)}`;

    fetch(addr2, {
      method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
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
        console.log(data);
      });
  };

  // const addr3 = "";
  const [editAdrr, setEditAddr] = useState("");
  const sendCred_note_edit_set = async (item_id, item_topicName, item_content) => {
    // console.log(item_topicName);
    // console.log(item_content);
    setShowSubmit(1);
    setTopicName(item_topicName);
    setNote(item_content);

    const tempFetchaddr3 = fetchAddress + "note";
    const addr3 = `${tempFetchaddr3}?_id=${encodeURIComponent(item_id)}`;
    setEditAddr(addr3);
  };

  const sendCred_note_edit = async () => {
    // console.log("here in note edit: " + editAdrr);
    fetch(editAdrr, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note,
        topicName: topicName,
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
        console.log(data);
      });
    setShowSubmit(0);
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
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              placeholder="Note"
              onChangeText={changeNoteHandler}
              value={note}
            />
            {showSubmit === 0 ? (
              <View>
                <TouchableOpacity onPress={() => sendCred()} style={styles.addButton}>
                  <View style={styles.addViewButton}>
                    <Text style={styles.addButtonText}>Add Note</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => sendCred_note_edit()} style={styles.addButton}>
                  <View style={styles.addViewButton}>
                    <Text style={styles.addButtonText}>Edit Note</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* content */}
      <View style={styles.content}>
        <View>
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <View style={styles.item}>
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
                <View>
                  {userType == "Teacher" ? (
                    <View>
                      <TouchableOpacity onPress={() => sendCred_note_edit_set(item._id, item.topicName, item.content)}>
                        <View style={styles.deleteicon}>
                          <MaterialIcons name="update" size={20} color="#0000A0" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <View>
                  {userType == "Teacher" ? (
                    <View>
                      <TouchableOpacity onPress={() => sendCred_note_dlt(item._id)}>
                        <View style={styles.deleteicon}>
                          <MaterialIcons name="delete" size={20} color="#0000A0" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
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
    paddingRight: 20,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    // padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  item: {
    paddingLeft: 10,
    justifyContent: "space-between",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteicon: {
    paddingRight: 25,
    // paddingBottom: 10,
    // paddingRight: 10,
    // marginRight: 20,
    // paddingLeft: 10,
  },
});
