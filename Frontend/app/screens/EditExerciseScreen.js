import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import fetchAddress from "../IP_File";

export default function EditExerciseScreen({ route, navigation }) {
  DropDownPicker.setListMode("SCROLLVIEW");

  const { userID, userType, _id, chapterNo, edit_item_id, editTopicName, editDescription, editAlternatives, editSoln, editNote, editMark } = route.params;

  const [description, setDescription] = useState(editDescription);
  const [shortSoln, setShortSoln] = useState(editSoln);
  const [note, setNote] = useState(editNote);

  var date = String(new Date()).split(" ")[3];
  date = Number(date);

  const [option1, setOption1] = useState(editAlternatives[0].text);
  const [option2, setOption2] = useState(editAlternatives[1].text);
  const [option3, setOption3] = useState(editAlternatives[2].text);
  const [option4, setOption4] = useState(editAlternatives[3].text);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(editAlternatives[0].isCorrect);
  const [isCorrect1, setIsCorrect1] = useState([
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(editAlternatives[1].isCorrect);
  const [isCorrect2, setIsCorrect2] = useState([
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(editAlternatives[2].isCorrect);
  const [isCorrect3, setIsCorrect3] = useState([
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(editAlternatives[3].isCorrect);
  const [isCorrect4, setIsCorrect4] = useState([
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ]);

  const [topicName, setTopicName] = useState(editTopicName);
  const [mark, setMark] = useState(editMark);

  const changeTopicNameHandler = (val) => {
    setTopicName(val);
  };

  const changeNoteHandler = (val) => {
    setNote(val);
  };

  const changeSolnHandler = (val) => {
    setShortSoln(val);
  };

  const changeDescriptionHandler = (val) => {
    setDescription(val);
  };

  const changeOptionHandler1 = (val) => {
    setOption1(val);
  };

  const changeOptionHandler2 = (val) => {
    setOption2(val);
  };

  const changeOptionHandler3 = (val) => {
    setOption3(val);
  };

  const changeOptionHandler4 = (val) => {
    setOption4(val);
  };

  const changeMarkHandler = (val) => {
    setMark(val);
  };

  const print_info = () => {
    console.log("in print info");
    console.log(editDescription);
    console.log(option1);
    console.log(value1);
    console.log(editAlternatives[0].isCorrect);
    // console.log(editAlternatives);
    // console.log(value1);
    // console.log(option2);
    // console.log(value2);
  };

  const sendCred_edit_exercise = async () => {
    // console.log("in sendCred for editing exercise");
    const tempFetchaddr3 = fetchAddress + "question";
    const addr3 = `${tempFetchaddr3}?_id=${encodeURIComponent(edit_item_id)}`;
    fetch(addr3, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: topicName,
        noteID: note, //etay note tai ache
        shortSolution: shortSoln,
        // chapterNo: chapterNo,
        description: description,
        //alternatives
        alternatives: [
          { isCorrect: value1, text: option1 },
          { isCorrect: value2, text: option2 },
          { isCorrect: value3, text: option3 },
          { isCorrect: value4, text: option4 },
        ],
        // mark: mark,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
          }
          //   await AsyncStorage.setItem("token", data.token);
        } catch (e) {
          console.log("The error is: ", e);
        }
        // console.log(data);
      });
  };

  return (
    <View style={styles.fullhomescreen}>
      {/* <Text>THis is Add Exercise Screen page!</Text> */}
      <ScrollView>
        <View style={styles.addFrom}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={changeDescriptionHandler}
            value={description}
          />
          <TextInput style={styles.input} placeholder="Option1" onChangeText={changeOptionHandler1} value={option1} />
          <DropDownPicker
            zIndex={3000}
            zIndexInverse={2900}
            maxHeight={100}
            style={styles.dropDown}
            open={open1}
            placeholder="Option1 Correct Answer"
            // defaultValue="item1"
            value={value1}
            items={isCorrect1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setIsCorrect1}
            onChange={(text) => setValue1(text)}
          />
          <TextInput style={styles.input} placeholder="Option2" onChangeText={changeOptionHandler2} value={option2} />
          <DropDownPicker
            zIndex={2800}
            zIndexInverse={2700}
            maxHeight={100}
            style={styles.dropDown}
            open={open2}
            placeholder="Option2 Correct Answer"
            value={value2}
            items={isCorrect2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setIsCorrect2}
            onChange={(text) => setValue2(text)}
          />
          <TextInput style={styles.input} placeholder="Option3" onChangeText={changeOptionHandler3} value={option3} />
          <DropDownPicker
            zIndex={2600}
            zIndexInverse={2500}
            maxHeight={100}
            style={styles.dropDown}
            open={open3}
            placeholder="Option3 Correct Answer"
            value={value3}
            items={isCorrect3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setIsCorrect3}
            onChange={(text) => setValue3(text)}
          />
          <TextInput style={styles.input} placeholder="Option4" onChangeText={changeOptionHandler4} value={option4} />
          <DropDownPicker
            zIndex={2400}
            zIndexInverse={2300}
            maxHeight={100}
            style={styles.dropDown}
            open={open4}
            placeholder="Option4 Correct Answer"
            value={value4}
            items={isCorrect4}
            setOpen={setOpen4}
            setValue={setValue4}
            setItems={setIsCorrect4}
            onChange={(text) => setValue4(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Mark"
            onChangeText={changeMarkHandler}
            value={mark}
          />
          <TextInput style={styles.input} placeholder="Solution" onChangeText={changeSolnHandler} value={shortSoln} />
          <TextInput
            style={styles.input}
            placeholder="Please enter a topic Name for the note"
            onChangeText={changeTopicNameHandler}
            value={topicName}
          />
          <TextInput style={styles.input} placeholder="Note" onChangeText={changeNoteHandler} value={note} />
          <View>
            <TouchableOpacity
              onPress={() => {
                // print_info();
                sendCred_edit_exercise();
                navigation.navigate("AllExercises", {
                  userID: userID,
                  userType: userType,
                  _id: _id,
                  chapterNo: chapterNo,
                });
              }}
              style={styles.addButton}
            >
              <View>
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullhomescreen: {
    flex: 1,
    backgroundColor: "white",
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
    // flex: 1,
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
    padding: 8,
  },
});
