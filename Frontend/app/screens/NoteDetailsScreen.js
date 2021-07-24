import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";


export default function NoteDetailsScreen({ route, navigation }) {

  const [topicName, setTopicName] = useState("");
  const [content, setContent] = useState("");

  const { userID, userType, _id, chapterNo } = route.params;
//   console.log("_id printing in NoteDetailsScreen",userID,userType,_id,chapterNo)
  const param = { _id: _id };

  const tempFetchaddr = fetchAddress + "note/";
  
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
      setTopicName(data.note.topicName)
      setContent(data.note.content)
    });

    return (
      <View style={styles.fullhomescreen}>
        <View style={styles.content}>
          <View>
            <ScrollView>    
                <Text style={styles.buttonText}>{content}</Text>
                {/* <Text>Hello!</Text> */}
            </ScrollView>    
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
      backgroundColor: "#add8e6",
      borderRadius: 8,
      padding: 15,
      margin: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 10,
    },
    buttonText: {
      fontSize: 15,
      color:  "rgb(0,0,0)",
      textAlign: "left",
    //   fontWeight: "bold",
      paddingLeft: 20,
      paddingRight: 15,
    },
  });
  