import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";

export default function QuizScoreScreen({ route, navigation }) {
  const { userID, userType, _id, chapterNo, questions, chosenText, score, trackID, trackName } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    // console.log("pressed next");
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      // setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    // console.log("pressed prev");
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion < questions.length && prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      // setShowAnswer(false);
    }
  };

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>User ID: {userID}</Text> */}
        <Text style={styles.headerText}>
          You scored {score} out of {questions.length}
        </Text>
        {/* <Text>hello!</Text> */}
      </View>

      {/* content */}
      <View style={styles.content}>
        <View>
          {questions.length === 0 ? null : (
            <View>
              <View>
                <Text style={styles.questionText}>{questions[currentQuestion].description}</Text>
                <FlatList
                  data={questions[currentQuestion].alternatives}
                  renderItem={({ item }) => (
                    <View style={styles.answerButton}>
                      {item.isCorrect ? (
                        <View>
                          <Text style={styles.correctAnswerText}>{item.text}</Text>
                        </View>
                      ) : item.isCorrect === false && chosenText[currentQuestion] === item.text ? (
                        <View>
                          <Text style={styles.wrongAnswerText}>{item.text}</Text>
                        </View>
                      ) : (
                        <View>
                          <Text style={styles.answerText}>{item.text}</Text>
                        </View>
                      )}
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          )}
        </View>
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
    //color: "rgb(150,150,150)",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 10,
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
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 35,
    //marginBottom: 20,
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
  correctAnswerText: {
    fontSize: 18,
    color: "green",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    // marginBottom: 10,
  },
  wrongAnswerText: {
    fontSize: 18,
    color: "red",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    // marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "left",
    fontWeight: "bold",
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
