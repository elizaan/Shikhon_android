import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

export default function ExerciseScreen({ route, navigation }) {
  DropDownPicker.setListMode("SCROLLVIEW");
  const { userID, userType, _id, chapterNo } = route.params;
  // console.log(userType);

  const [questions, setQuestions] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSoln, setShowSoln] = useState(false);
  const [showNote, setShowNote] = useState(false);
  // const[correctAnswer, setCorrectAnswer] = useState("");

  

  const handleNext = () => {
    // console.log("pressed next");
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswer(false);
      setShowSoln(false);
      setShowNote(false);
    }
  };

  const handlePrev = () => {
    // console.log("pressed prev");
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion < questions.length && prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setShowAnswer(false);
      setShowSoln(false);
      setShowNote(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleShowSoln = () => {
    setShowSoln(true);
  };

  const handleShowNote = () => {
    setShowNote(true);
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

    const sendCred_exercise_dlt = async (item_id) => {
      // console.log("in exercise delete");
      // sendCred_note_dlt_inexercise(item_id);
      const tempFetchaddr2 = fetchAddress + "question/";
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

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Question:</Text>
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
        <ScrollView>
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
                              <Text style={styles.answerText}>{"Correct ans: " + item.text}</Text>
                            ) : null}
                          </TouchableOpacity>
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                ) : null}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log("hello! in button");
                      handleShowSoln();
                    }}
                    style={styles.addButton}
                  >
                    {questions[currentQuestion].shortSolution ? (
                      <Text style={styles.addButtonText}>Show Solution</Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
                {showSoln ? (
                  <View>
                    <TouchableOpacity style={styles.answerButton2}>
                      {questions[currentQuestion].shortSolution ? (
                        <Text style={styles.answerText2}>
                          {"Solution: " + questions[currentQuestion].shortSolution}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log("hello! in button");
                      handleShowNote();
                    }}
                    style={styles.addButton}
                  >
                    {questions[currentQuestion].noteID ? <Text style={styles.addButtonText}>Show Note</Text> : null}
                  </TouchableOpacity>
                </View>
                {showNote ? (
                  <View>
                    <TouchableOpacity style={styles.answerButton2}>
                      {questions[currentQuestion].noteID ? (
                        <Text style={styles.answerText2}>{"Note: " + questions[currentQuestion].noteID}</Text>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.content}>
          {questions.length === 0 ? null : (
            <View>
              <View>
                <FlatList
                  data={questions}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.viewButton}>
                        {/* <View style={styles.item}> */}
                        <View>
                          <Text style={styles.questionText}>{item.description}</Text>
                          <View style={styles.item}>
                            {userType == "Teacher" ? (
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    navigation.navigate("EditExercise", {
                                      userID: userID,
                                      userType: userType,
                                      _id: _id,
                                      chapterNo: chapterNo,
                                      edit_item_id: item._id,
                                      editTopicName: item.topicName,
                                      editDescription: item.description,
                                      editAlternatives: item.alternatives,
                                      editSoln: item.shortSolution,
                                      editNote: item.noteID,
                                      editMark: item.mark
                                    });
                                  }}
                                >
                                  <View style={styles.deleteicon}>
                                    <MaterialIcons name="update" size={20} color="#0000A0" />
                                  </View>
                                </TouchableOpacity>
                              </View>
                            ) : null}
                            {userType == "Teacher" ? (
                              <View>
                                <TouchableOpacity onPress={() => sendCred_exercise_dlt(item._id)}>
                                  <View style={styles.deleteicon}>
                                    <MaterialIcons name="delete" size={20} color="#0000A0" />
                                  </View>
                                </TouchableOpacity>
                              </View>
                            ) : null}
                          </View>
                        </View>
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
    //backgroundColor: "#add8e6",
    //marginBottom: 15,
    padding: 10,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: "#000000",
  },
  addFrom: {
    backgroundColor: "#E0FFFF",
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
    marginBottom: 5,
    marginTop: 5,
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
    paddingBottom: 20,
  },
  answerButton: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    paddingRight: 80,
    marginRight: 100,
    marginLeft: 50,
    marginBottom: 10,
  },
  answerButton2: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 5,
    // paddingRight: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  answerText2: {
    fontSize: 18,
    color: "black",
    textAlign: "left",
    // fontWeight: "bold",
    paddingLeft: 20,
    // marginBottom: 10,
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
    paddingBottom: 15,
    // marginBottom: 20,
  },
  item: {
    paddingLeft: 10,
    justifyContent: "flex-end",
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