import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
// import DropDownPicker from "react-native-dropdown-picker";

export default function AddQuizScreen({ route, navigation }) {
  // DropDownPicker.setListMode("SCROLLVIEW");

  const { userID, userType, _id, chapterNo, trackID, trackName, quizName, questions, courseName } = route.params;

  var quiz_id = 1;
  var quiz_name = "quiz ID " + quiz_id;

  // const [totalMark, setTotalMark] = useState(0);
  var totalMark = 0;

  const get_totalMark = () => {
    var countMark = 0;
    for(let i=0; i<questions.length; i++)
    {
      // console.log(questions[i].mark);
      countMark += parseInt(questions[i].mark);
    }
    // setTotalMark(countMark);
    totalMark = countMark;
    // console.log("total Mark: " + totalMark);
  };

  // const [questions, setQuestions] = useState([]);

  const showQuestion = () => {
    // console.log("here");
    console.log(questions);
  };

  const sendCred_quiz = async () => {
    // console.log("here in add quiz in frontend");
    get_totalMark();
    console.log("total Mark: " + totalMark);
    console.log("in sendCred_quiz");
    const addr = fetchAddress + "quiz/add";
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizName: quizName,
        questions: questions,
        topicName: quiz_name,
        courseID: _id,
        chapterNo: chapterNo,
        author: userID,
        totalMark: totalMark,
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
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{quizName}</Text>
        {/* <Text>hello!</Text> */}
      </View>

      {/**content */}
      <View style={styles.addFrom}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddQuizDetails", {
                userID: userID,
                userType: userType,
                _id: _id,
                chapterNo: chapterNo,
                trackID: trackID,
                trackName: trackName,
                questions: questions,
                courseName: courseName,

              });
            }}
            style={styles.addButton}
          >
            <View style={styles.addViewButton}>
              <Text style={styles.addButtonText}>Add Question</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              // showQuestion();
              // get_totalMark();
              sendCred_quiz();
              navigation.navigate("AllQuizes", {
                userID: userID,
                userType: userType,
                _id: _id,
                chapterNo: chapterNo,
                trackID: trackID,
                trackName: trackName,
                courseName: courseName,
              });

            }}
            style={styles.addButton}
          >
            <View style={styles.addViewButton}>
              <Text style={styles.addButtonText}>Finish</Text>
            </View>
          </TouchableOpacity>
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
      flex: 1,
      backgroundColor: "white", //#E0FFFF
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
    seeAnswerButton: {
      flex: 1,
      backgroundColor: "#add8e6",
      justifyContent: "center",
      borderRadius: 20,
      // marginTop: 20,
      // marginBottom: 20,
      // paddingLeft: 10,
      // paddingRight: 10,
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
    addButton: {
      // flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#add8e6",
      borderRadius: 20,
      marginRight: 80,
      marginLeft: 80,
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
    viewButton: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      marginTop: 35,
      marginBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
    },
    addQuizButton: {
      flex: 1,
      backgroundColor: "#0000A0",
      justifyContent: "center",
      marginTop: 20,
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
    questionText: {
      fontSize: 18,
      color: "black",
      textAlign: "left",
      fontWeight: "bold",
      paddingLeft: 30,
    },
    answerButton: {
      // flex: 1,
      alignItems: "flex-start",
      justifyContent: "center",
      backgroundColor: "#add8e6",
      borderRadius: 20,
      paddingRight: 80,
      marginRight: 140,
      marginLeft: 50,
      marginBottom: 10,
    },
    answerText: {
      fontSize: 18,
      color: "black",
      textAlign: "left",
      // fontWeight: "bold",
      paddingLeft: 20,
      // marginBottom: 10,
    },
    buttonStyleContainer: {
      flexDirection: "row",
    },
    buttonStyle: {
      marginHorizontal: 60,
      marginTop: 40,
      justifyContent: "center",
      backgroundColor: "#add8e6",
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    navigationText: {
      fontSize: 18,
      color: "black",
      textAlign: "center",
      fontWeight: "bold",
      // paddingLeft: 20,
    },
    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 20,
    },
  });