// import * as React from 'react';
// import { View, Text } from 'react-native'

// export default function AskScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Your Profile...........</Text>
//       </View>
//     );
//   }

import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function ProfileScreen({ route, navigation }) {
  const { userID } = route.params;
  const { userType } = route.params;
  const [topicName, setTopicName] = useState("");
  const [content, setContent] = useState("");
  const [scores, setScores] = useState("");
  const [data,setData] = useState("");

  const screenWidth = Dimensions.get("window").width;
  const param = { studentID: userID };
  const tempFetchaddr = fetchAddress + "score/history";
  const addr = `${tempFetchaddr}?studentID=${encodeURIComponent(param.studentID)}`;
  // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
  fetch(addr)
    .then((res) => res.json())
    
    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }
      //console.log(data)
     setScores(data.scores)
      console.log(scores);
      // setData({labels: scores.quizName, datsets:{
      //   data: scores.obtainedMark
      // }})
      // setData({labels:[1,2,3,4],datsets:[{data:[10,20,13,23]}]})
    });

    return (
      <View style={styles.fullhomescreen}>
      <View style={styles.header} >
          <Text style={styles.headerText}>Progress</Text>
      </View>
      
        <View style={styles.content}>
          <Text style={styles.subheaderText}>Test Scores</Text>
       
          <View>
              <FlatList
              data={scores}
              renderItem={({ item }) => (
                <View >
                <Text style={styles.dateheaderText}>{"Date: "+ item.updateDate.split('T')[0]}</Text>
                  <TouchableOpacity style={styles.opacityButton}>
                    {/* <Text style={styles.buttonText}>{item.studentName + "    "+item.count+"     " + item.obtainedMark+ " out of " +item.totalMark+"       "+item.obtainedMark/item.totalMark*100+ "%"}</Text> */}
                    
                    <Text>{item.courseName}</Text>
                    <Text>{"Chapter No: "+ item.chapterNo}</Text>
                    <Text>{item.quizName}</Text>
                    <Text>{item.obtainedMark+ " Out of " + item.totalMark}</Text>
                    
                    </TouchableOpacity>
                </View>
              )}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
            />   
          </View>
          {/* <View>
              
            <LineChart
              data={data}
              width={screenWidth}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
            />
          </View> */}
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
    dateheaderText: {
      fontSize: 18,
      textAlign: "left",
      //fontWeight: "bold",
      color: "#0560A0",
      //paddingBottom: 5,
    },
    subheaderText: {
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
      color: "#0560A0",
      paddingBottom: 5,
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