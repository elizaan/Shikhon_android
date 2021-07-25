import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function QuizDetailsScreen({ route, navigation }) {
  const { userID, userType, _id, chapterNo, trackID, trackName, quizName, courseName} = route.params;
 
  // console.log("in screen2" + trackName);

  const [questions, setQuestions] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showButton, setButton] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploadMark, setUploadMark] = useState(false);
  const [countSeconds, setCountSeconds] = useState(false);
  const [score, setScore] = useState(0);
  const [hscore, setHscore] = useState(0);
  const [time, setTime] = useState(10);
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

  const getHighScore = async() => {

    const tempFetchaddr2 = fetchAddress + "score/highest";

    const addr2 = `${tempFetchaddr2}?quizID=${encodeURIComponent(param._id)}`;
    // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
    await fetch(addr2)
      .then((res) => res.json())
  
      .then(async (data) => {
        try {
          setHscore(data.highest);
          // await AsyncStorage.getItem("token", data._id);
        } catch (e) {
          console.log("The error is: ", e);
        }
        //   console.log(data.quiz);
        // console.log("here..........");
        // console.log(data);
        
      });



  };

  // var totalMark = 0;
  const get_totalMark = async() => {
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

  const sendScore = async () => {
    // console.log("in sendCred");
    const addr = fetchAddress + "score/add";
    await fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentID: userID,
        quizName: quizName,
        quizID: _id,
        courseName: courseName,
        chapterNo: chapterNo,
        obtainedMark: score,
        totalMark: totalMark,
        section: trackName,
        
        
        
        
        
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
          }
          
        } catch (e) {
          console.log("The error is: ", e);
        }
        // console.log(data);
      });
    setTopicName("");
    setNote("");
  };

  const handleAnswerOptionClick = async(isCorrect, mark) => {
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

  const showResult = async(isCorrect, mark) => {
    await handleAnswerOptionClick(isCorrect, mark);
    

  }

  

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

  // if(uploadMark) {
  //   sendScore();
  //   getHighScore();
  //   setUploadMark(false);
  // }

  const sendCred_quiz_ques_add = async () => {
    // console.log("in sendCred for adding exercise");
    const addr = fetchAddress + "question/add";
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
        description: description,
        //alternatives
        alternatives: [
          { isCorrect: value1, text: option1 },
          { isCorrect: value2, text: option2 },
          { isCorrect: value3, text: option3 },
          { isCorrect: value4, text: option4 },
        ],
        mark: mark,
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

  const sendCred_quiz_ques_dlt = async (item_id) => {
    console.log("here in sendCred_note_dlt");
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
        {/* <Text style={styles.headerText}>User ID: {userID}</Text> */}
        {userType == "Student" && questions.length != 0 ? <Text style={styles.headerText}>{restime}</Text> : null }
        {/* <Text>hello!</Text> */}
      </View>
      
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
             <View>
               {!uploadMark? (
                 <View>
                   <TouchableOpacity
                      onPress={async() => {
                                // console.log(item);
                                sendScore();
                                await getHighScore();
                                setUploadMark(true);
                                setButton(true);
                                setLoaded(true);
                      }}
                      style={styles.addButton}
                    >
                    <Text style={styles.addButtonText}>View Score</Text>
                  </TouchableOpacity>
                 </View>
               ): (
                 <View>
                   {loaded? (
                     <View>
                     <Text style={styles.headerText}>
                         You scored {score} out of {totalMark} {'\n'}
                         Highscore: {hscore}
             
                     </Text>
                   </View>
                   ):(
                     <View>
                     <Text>
                      Loading....
                     </Text>
                     </View>
                   )
                   }
                 </View>
                 
                
               )}

                  
                

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
                    {/* <View style={styles.seeAnswerButton}> */}
                      <Text style={styles.addButtonText}>See Answers</Text>
                    {/* </View> */}
                  </TouchableOpacity>
                </View>
             </View>
              
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
                                showResult(item.isCorrect, questions[currentQuestion].mark);
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
    //marginBottom: 20,
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
  viewScoreButton: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    padding:20,
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft:80,
    marginRight:80,
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
