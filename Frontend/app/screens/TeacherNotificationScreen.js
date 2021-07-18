import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";

export default function TeacherNotificationScreen({ route, navigation }) {
    const { userID } = route.params;
    const { userType } = route.params;
    // var count = 0;
    
    // console.log("1st admin");
    // console.log(userType);

    const [teachers, setTeachers] = useState("");
    const [count, setCount] = useState(0);

    


    const addr = fetchAddress + "teacher/all";
    detectPending = async () =>{

      fetch(addr)
        .then((res) => res.json())
        
        // .then((res) => res.text())
        .then(async (data) => {
        try {
            setTeachers(data.teachers);
            // console.log(data.teachers.length);
            setCount(data.teachers.length);
            // await AsyncStorage.setItem("noti", JSON.stringify(data.teachers.length));
            
        } catch (e) {
            console.log("The error is: ", e);
        }
        
        });

    }

    useEffect(() => {
      detectPending();

    });

    
    


    return (
      <View style={styles.fullhomescreen}>

      

      {/* content */}
        <View style={styles.content}>
          <View>
            <Text style={styles.buttonText}> {count} pending teacher requests</Text>
        
            <FlatList
              data={teachers}
            
              renderItem={({ item, key }) => (
                
              
                <View style={styles.viewButton}>
                  {/* console.log(item); */}
                  <TouchableOpacity
                    style={styles.opacityButton}
                    onPress={async () => {
                      console.log("details page button tapped");
                      navigation.navigate("TeacherDetails", {
                        userID: userID,
                        userType: userType,
                        teacherName: item.name,
                        _id: item._id,

                        objectId: item.objectId,
                        email: item.email,
                        mobileno: item.mobileno,
                        education: item.education,
                        institute: item.institute,
                        department: item.department,
                        hscPassyear: item.hscPassyear,
                        subject1: item.subject1,
                        subject2: item.subject2,
                        subject3: item.subject3

                      });
                    }}
                  >
                    <Text style={styles.buttonText}>{item.name}</Text>
                  </TouchableOpacity>
                {/* <Text>{item.name}</Text>
                <Text>{item._id}</Text>
                <View>
                  <FlatList data={item.chapters} renderItem={({ item }) => <Text>{item.chapterName}</Text>} />
                </View> */}
                
                </View>
              )}
                
             keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.buttonText}> Click on the teachers' names to approve/ reject</Text>
          {/* <div>
              <NotificationBadge count={count} effect={Effect.SCALE}/>

          </div> */}
          
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
    winContainer: {
      backgroundColor: "white",
    },
    winText: {
      //flex: 1,
      fontSize: 20,
      textAlign: "center",
      justifyContent: "center",
      marginBottom: 15,
      padding: 30,
      fontWeight: "bold",
      color: "#0000A0",
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
      borderRadius: 20,
      //padding: 10,
    },
    buttonText: {
      fontSize: 18,
      color: "#0000A0",
      textAlign: "center",
      fontWeight: "bold",
    },
  });
  