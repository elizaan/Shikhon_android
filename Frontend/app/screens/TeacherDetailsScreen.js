import AsyncStorage from "@react-native-async-storage/async-storage";
import GenerateRandomCode from "react-random-code-generator";
import { v4 as uuidv4 } from 'uuid';


import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert} from "react-native";
import fetchAddress from "../IP_File";
import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';


export default function TeacherDetailsScreen({ route, navigation }) {
  // const { userID, userType } = route.params;
  const { userID } = route.params;
  const { userType } = route.params;
  const { teacherName } = route.params;
  const { _id } = route.params;
  const {objectId} = route.params;
  const {email} = route.params;
  const {mobileno} = route.params;
  const {education} = route.params;
  const {institute} = route.params;
  const {department} = route.params;
  const {hscPassyear} = route.params;
  const {subject1} = route.params;
  const {subject2} = route.params;
  const {subject3} = route.params;

  // const [code, setCode] = useState("");
  // var code = GenerateRandomCode.TextNumCode(1, 2);
  var code = uuidv4().slice(0, 8);
  var result2;



  const param = { _id: _id };

  const sendMessage = async() => {
    const isAvailable = await SMS.isAvailableAsync();
    if(isAvailable){

      const {result} = await SMS.sendSMSAsync(
        [mobileno],
        'Your login code is: ' + code + "\n" + 'Please log in to "SHIKHON" as follows - \n Email: ' + email + "\n " +
                'Pasword: <the password you have set>\n Code: '+ code,

      );

      // result2 = result;
      console.log(result);

    }
    else{
      console.log("No messsaging available");
    }
  }

  const sendMail = async() => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if(isAvailable){

      const {result} = await MailComposer.composeAsync(
        
        {
          body: 'Congratulations!\nYour login code is: ' + code + "\n" + 'Please log in to "SHIKHON" as follows - \n Email: ' + email + "\n " +
                'Pasword: <the password you have set>\n Code: '+ code,
          recipients:[email],
          subject:"SHIKHON | Confirmation mail"
        }

      );

      // result2 = result;
      console.log(result);

    }
    else{
      console.log("No mailing available");
    }
  }

  const sendRejectionMessage = async() => {
    const isAvailable = await SMS.isAvailableAsync();
    if(isAvailable){

      const {result} = await SMS.sendSMSAsync(
        [mobileno],
        'We are sorry to say that we could not select you as a teacher at SHIKHON, better luck next time!',
      );

    }
    else{
      console.log("No messsaging available");
    }
  }

  // const initiateSMS = () => {
  //   // Check for perfect 10 digit length
  //   if (mobileno.length != 11) {
  //     Alert.alert(
  //       "Error",
  //       "Please insert correct contact number",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => console.log("Ok pressed")
  //         },
  //       ]
  //     );
  //     return;
  //   }
  //   console.log("dhukse");
  //   SendSMS.send(
  //     {
  //       // Message body
  //       body: "Here is your login code: " + code,
  //       // Recipients Number
  //       recipients: ['+8801915980030'],
  //       // An array of types 
  //       // "completed" response when using android
  //       successTypes: ['sent', 'queued'],
  //     },
  //     (completed, cancelled, error) => {
  //       if (completed) {
  //         console.log('SMS Sent Completed');
  //       } else if (cancelled) {
  //         console.log('SMS Sent Cancelled');
  //       } else if (error) {
  //         console.log('Some error occured');
  //       }
  //     },
      
  //   );
  //   console.log("dhukse");

  // }

  // settingCode = async () => {
  //   setCode(GenerateRandomCode.TextNumCode(1, 2));

  // }

  sendApproval = async () => {
    // setCode(GenerateRandomCode.TextNumCode(1, 2));
    // await settingCode();
    // console.log(code);

    console.log("in sendApproval");
    const addr = fetchAddress + "teacher/approve";
    // initiateSMS();
    await sendMessage();
    sendMail();
    
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        objectId: objectId,
        code: code
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
            
          }
          // await AsyncStorage.setItem("token", data.token);

          navigation.navigate("TeacherNotify");
        } catch (e) {
          console.log("The error is: ", e);
        }
        console.log(data);
      });
  };

  sendRejection = async () => {
   
    console.log("in sendRejection");
    
   sendRejectionMessage();
    const addr = fetchAddress + "teacher/reject";
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
            
          }
          // await AsyncStorage.setItem("token", data.token);

          navigation.navigate("TeacherNotify");
        } catch (e) {
          console.log("The error is: ", e);
        }
        console.log(data);
      });
  };



  return (
      <View>
          <ScrollView>
              <View style={styles.container}>
                <View style={styles.fullhomescreen}>
                    {/* header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Hi, I am {teacherName}</Text>
                            {/* <Text style={styles.headerText}>{userType}</Text> */}
                            {/* <Text>hello!</Text> */}
                    </View>

                    
                    <View style={styles.content}>
                        <View>
                            <Text>This is about me</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>Educational Status</Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>HSC passing year:</Text> {hscPassyear} </Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Currently enrolled in:</Text> {education} </Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Educational institute:</Text> {institute} </Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Department:</Text> {department} </Text>
                            

                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>Preferred Subjects Want to Teach</Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Subject choice 1:</Text> {subject1} </Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Subject choice 2:</Text> {subject2} </Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Subject choice 3:</Text> {subject3} </Text>
                            

                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>Contact Information</Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Email address:</Text> {email} </Text>
                            <Text style={styles.rowContent}> <Text style={{fontWeight: "bold"}}>Personal phone number:</Text> {mobileno} </Text>
                            

                        </View>
                        
                        
                    </View>

                    <View>

                        <TouchableOpacity onPress={() => sendApproval()} style={styles.addButton}>
                       

                            <View style={styles.addViewButton}>
                                <Text style={styles.addButtonText}>Approve</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => sendRejection()} style={styles.addButton}>

       
                            <View style={styles.addViewButton}>
                                <Text style={styles.addButtonText}>Reject</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
          </ScrollView>
      </View>
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
  },
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
  content: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //margin: 15,
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
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
});
