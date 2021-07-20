// import * as React from 'react';
// import { View, Text } from 'react-native'
// export default function AskScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Watch LeadrBoard</Text>
//       </View>
//     );
//   }

import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
  
  
export default function LeaderBoardScreen({ route, navigation }) {
  
    const [topicName, setTopicName] = useState("");
    const [content, setContent] = useState("");
    const [scores, setScores] = useState("");
  
    //const { userID, userType, _id, chapterNo } = route.params;
  //   console.log("_id printing in NoteDetailsScreen",userID,userType,_id,chapterNo)
    const param = { courseName: 'Physcis 1st Paper' };
  
    const tempFetchaddr = fetchAddress + "score/leaderboard";
    
    const addr = `${tempFetchaddr}?courseName=${encodeURIComponent(param.courseName)}`;
    // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
    fetch(addr)
      .then((res) => res.json())
      
      .then(async (data) => {
        try {
          // await AsyncStorage.getItem("token", data._id);
        } catch (e) {
          console.log("The error is: ", e);
        }
        //setTopicName(data.note.topicName)
        //setContent(data.note.content)
        setScores(data.scores)
        console.log(scores)
      });
  
      return (
        <View style={styles.fullhomescreen}>
          <View style={styles.content}>
          <Text style={styles.buttonText}>Physcis 1st Paper</Text>
          <Text style={styles.buttonText}>Name  Appeared Exams Obtained Marks Total Marks Percentage(%)</Text>
            <View>
                <FlatList
                data={scores}
                renderItem={({ item }) => (
                  <View style={{
                    width: 75,
                    height: 75,
                    backgroundColor: yellow
                    //flex:1,
                    //flexDirection: 'row',
                    //margin: 1
                  }}>
                    
                      <Text style={styles.buttonText}>{item._id.studentName + "   "+item.count+"  " + item.obtainedMark+ "    " +item.totalMark+"   "+item.obtainedMark/item.totalMark*100+ "%"}</Text>
                    
                  </View>
                )}
                numColumns={5}
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
        color: "#0300A0",
        textAlign: "left",
      //   fontWeight: "bold",
        paddingLeft: 30,
      },
    });
    