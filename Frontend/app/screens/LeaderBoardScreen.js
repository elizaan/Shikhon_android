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
        <View style={styles.header} >
            <Text style={styles.headerText}>LeadarBoard</Text>
        </View>
        
          <View style={styles.content}>
          <Text style={styles.subheaderText}>Physics 1st Paper</Text>
            <View style={styles.container}>
              <View style={styles.box1}>
                <Text style={styles.textStyle}>Name</Text>
              </View>
              <View style={styles.box2}>
                <Text style={styles.textStyle}>Appeared Exams</Text>
              </View>
              <View style={styles.box3}>
                <Text style={styles.textStyle}>Mark ratio</Text>
              </View>
              <View style={styles.box4}>
                <Text style={styles.textStyle}>Percentage(%)</Text>
              </View>
            </View>
          
         
            <View>
                <FlatList
                data={scores}
                renderItem={({ item }) => (
                  <View >
                    <TouchableOpacity style={styles.opacityButton}>
                      <Text style={styles.buttonText}>{item._id.studentName + "    "+item.count+"     " + item.obtainedMark+ " out of " +item.totalMark+"       "+item.obtainedMark/item.totalMark*100+ "%"}</Text>
                      {/* <Text style={styles.rowText}>{item._id.studentName}</Text>
                      <Text style={styles.rowText}>{item.count}</Text>
                      <Text style={styles.rowText}>{item.obtainedMark}</Text>
                      <Text style={styles.rowText}>{item.totalMark}</Text>
                      <Text style={styles.rowText}>{item.obtainedMark/item.totalMark*100+ "%"}</Text> */}
                      </TouchableOpacity>
                  </View>
                )}
                numColumns={1}
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
        backgroundColor: "#bdc9e6",
        //marginBottom: 15,
        padding: 15,
      },
      headerText: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: "#0000A0",
      },
      subheaderText: {
        fontSize: 20,
        textAlign: "left",
        fontWeight: "bold",
        color: "#0560A0",
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
      // buttonText: {
      //   fontSize: 18,
      //   color: "#0300A0",
      //   textAlign: "left",
      // //   fontWeight: "bold",
      //   paddingLeft: 30,
      // },
      rowText:{
        width: 75,
        height: 75,
        backgroundColor: 'red',
        //flex:1,
        flexDirection: 'row',
        margin: 1
      },
      tableHeaderText: {
        width: 75,
        height: 75,
        backgroundColor: 'red',
        //flex:1,
        flexDirection: 'row',
        margin: 1
      },
      container: {
        paddingTop: 10,
        paddingBottom: 10,
        //flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',  
      },
      box1: {
        width: 90,
        height: 50,
        // Uncomment the following style to see flex effects
        //flex: 1,
        backgroundColor: 'steelblue'
      },
      box2: {
        width: 90,
        height: 50,
        // Uncomment the following style to see flex effects
        //flex: 2,
        backgroundColor: 'pink'
      },
      box3: {
        width: 90,
        height: 50, 
        // Uncomment the following style to see flex effects
        //flex: 3,
        backgroundColor: 'orange'
      },
      box4: {
        width: 90,
        height: 50, 
        // Uncomment the following style to see flex effects
        //flex: 3,
        backgroundColor: 'gray'
      },
      
      textStyle: {
        color: 'black',
        alignSelf: 'center',
        margin: 7,
      },
      viewButton: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        marginTop: 25,
        paddingLeft: 100,
        paddingRight: 100,
      },
      opacityButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#add8e6",
        borderRadius: 10,
        padding: 8,
        margin: 3,
        
      },
      buttonText: {
        fontSize: 18,
        color: "#0000A0",
        textAlign: "right",
        //alignSelf: 'flex-end',
        flex: 1
        //fontWeight: "bold",
      },
    });
    