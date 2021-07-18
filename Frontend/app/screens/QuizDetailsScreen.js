import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function AddQuizScreen({ route, navigation }) {
  const { userID, userType, _id, chapterNo, trackID, trackName} = route.params;
  // console.log("in screen2" + trackName);

  const [questions, setQuestions] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [countSeconds, setCountSeconds] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  const [restime, setRestime] = useState(null);
  const [chosenText, setChosenText] = useState([]);
  const [totalMark, setTotalMark] = useState(0);

  const param = { _id: _id };

  const tempFetchaddr = fetchAddress + "quiz/";

  const addr = `${tempFetchaddr}?_id=${encodeURIComponent(param._id)}`;
  // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
  fetch(addr)
    .then((res) => res.json())

    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }
      //   console.log(data.quiz);
      // console.log("here");
      setQuestions(data.quiz.questions);
    });

  // console.log(questions);
  const showQuestions_console = () => {
    console.log(questions[0]);
  };

  // var totalMark = 0;
  const get_totalMark = () => {
    var countMark = 0;
    for(let i=0; i<questions.length; i++)
    {
      // console.log(questions[i].mark);
      countMark += parseInt(questions[i].mark);
    }
    setTotalMark(countMark);
    // totalMark = countMark;
    // console.log("total Mark: " + totalMark);
  };

  const handleAnswerOptionClick = (isCorrect, mark) => {
    // console.log(mark);
    if (isCorrect) {
      setScore(score + mark);
    }

    if(currentQuestion == 0)
    {
      get_totalMark();
      // console.log("total Mark: " + totalMark);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    if(questions.length != 0)
    {
      setCountSeconds(true);
    }
    if(countSeconds)
    {
      if (time > 0) {
        setTimeout(() => setTime(time - 1), 1000);
      } else {
        setShowScore(true);
        // setTime("BOOOOM!");
      }
      var date = new Date(null);
      date.setSeconds(time);
      var result = date.toISOString().substr(11, 8);
      setRestime(result);
    }
  });

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>User ID: {userID}</Text>
        {userType == "Student" && questions.length != 0 ? <Text style={styles.headerText}>{restime}</Text> : null }
        {/* <Text>hello!</Text> */}
      </View>
      {/* <Text>This is quiz details page</Text> */}
      {userType == "Teacher" ? (
        <View style={styles.content}>
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
                            <View>
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
      ) : (
        // working here
        <View style={styles.content}>
          <View>
            {showScore ? (
              <Text style={styles.headerText}>
                {/* You scored {score} out of {questions.length} */}
                You scored {score} out of {totalMark}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(chosenText);
                      navigation.navigate("QuizScore", {
                        userID: userID,
                        userType: userType,
                        _id: _id,
                        chapterNo: chapterNo,
                        questions: questions,
                        chosenText: chosenText,
                        score: score,
                        trackID: trackID,
                        trackName: trackName
                      });
                    }}
                    style={styles.addButton}
                  >
                    <View style={styles.seeAnswerButton}>
                      <Text style={styles.addButtonText}>See Answers</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Text>
            ) : (
              <View>
                {questions.length === 0 ? null : (
                  <View>
                    <View
                    // style={styles.viewButton}
                    >
                      <Text style={styles.questionText}>{questions[currentQuestion].description}</Text>
                      <FlatList
                        data={questions[currentQuestion].alternatives}
                        renderItem={({ item }) => (
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                // console.log(item);
                                setChosenText([...chosenText, item.text]);
                                handleAnswerOptionClick(item.isCorrect, questions[currentQuestion].mark);
                              }}
                              style={styles.answerButton}
                            >
                              <Text style={styles.answerText}>{item.text}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      )}
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
