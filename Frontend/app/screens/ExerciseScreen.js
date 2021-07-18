import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function ExerciseScreen({ route, navigation }) {
  const { userID, userType, _id, chapterNo } = route.params;
  // console.log(userType);

  const [questions, setQuestions] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  // const[correctAnswer, setCorrectAnswer] = useState("");

  const handleNext = () => {
    // console.log("pressed next");
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    // console.log("pressed prev");
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion < questions.length && prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const param = { courseID: _id, chapterNo: chapterNo };

  const tempFetchaddr = fetchAddress + "question/chap-all";
  // console.log(tempFetchaddr);
  const addr = `${tempFetchaddr}?courseID=${encodeURIComponent(param.courseID)}&chapterNo=${encodeURIComponent(
    param.chapterNo
  )}`;

  fetch(addr)
    .then((res) => res.json())
    // .then((res) => res.text())
    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }
      setQuestions(data.quesArr);
    });

  // console.log(questions[currentQuestion+1].description + "here");

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>User ID: {userID}</Text> */}
        {/* <Text style={styles.headerText}>{userType}</Text> */}
        <Text style={styles.headerText}>Practice Problem</Text>
      </View>

      {/*form of add note*/}
      <View style={styles.addFrom}>
        {userType != "Teacher" ? null : (
          <View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddExercise", {
                    userID: userID,
                    userType: userType,
                    _id: _id,
                    chapterNo: chapterNo,
                  });
                }}
                style={styles.addButton}
              >
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Add Exercise</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/**content */}
      {userType == "Student" ? (
        <View>
          {questions.length === 0 ? null : (
            <View>
              <View>
                <Text style={styles.questionText}>{questions[currentQuestion].description}</Text>
                <FlatList
                  data={questions[currentQuestion].alternatives}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity style={styles.answerButton}>
                        <Text style={styles.answerText}>{item.text}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // console.log("hello! in button");
                    handleShowAnswer();
                  }}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Show Correct Answer</Text>
                </TouchableOpacity>
              </View>
              {showAnswer ? (
                <View>
                  <FlatList
                    data={questions[currentQuestion].alternatives}
                    renderItem={({ item }) => (
                      <View>
                        <TouchableOpacity style={styles.answerButton}>
                          {item.isCorrect ? (
                            <Text style={styles.questionText}>{"Correct answer: " + item.text}</Text>
                          ) : null}
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              ) : null}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.content}>
          {/* {console.log(questions[0].description)} */}
          {/* <Text>Teacher side</Text> */}
          {questions.length === 0 ? null : (
            <View>
              <View>
                <FlatList
                  data={questions}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.viewButton}>
                        <Text style={styles.questionText}>{item.description}</Text>
                        {item.alternatives.map((newItem) => {
                          return (
                            <View key={newItem.uniqueId}>
                              <TouchableOpacity style={styles.answerButton}>
                                <Text style={styles.buttonText}>{newItem.text}</Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                      <View style={styles.viewButton}>
                        {item.alternatives.map((newItem) => {
                          return (
                            <View>
                              {newItem.isCorrect ? (
                                <View>
                                <TouchableOpacity style={styles.answerButton}>
                                  <Text style={styles.buttonText}>{"Correct Answer: " + newItem.text}</Text>
                                </TouchableOpacity>
                              </View>
                              ) : null}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          )}
        </View>
      )}

      {userType == "Student" ? (
        <View style={styles.footer}>
          <View style={styles.buttonStyleContainer}>
            {currentQuestion === 0 ? null : (
              <View style={styles.buttonStyle}>
                <TouchableOpacity
                  onPress={() => {
                    handlePrev();
                  }}
                >
                  <Text style={styles.navigationText}>Prev</Text>
                </TouchableOpacity>
              </View>
            )}
            {currentQuestion === questions.length - 1 ? null : (
              <View style={styles.buttonStyle}>
                <TouchableOpacity
                  onPress={() => {
                    handleNext();
                  }}
                >
                  <Text style={styles.navigationText}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : null}
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
    padding: 20,
    marginBottom: 20,
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
