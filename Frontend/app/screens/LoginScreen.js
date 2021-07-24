import React, { useState } from "react";
import { Image, View, Text, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Yup from "yup";
import fetchAddress from "../IP_File";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import jwt_decode from 'jwt-decode';

import FronScreen from "./FrontScreen";
import FrontScreen from "./FrontScreen";
import { set } from "react-native-reanimated";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ route, navigation }) {
  const { userID } = route.params;
  const { userType } = route.params;
  // console.log(userType);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [err, setError] = useState(null);
  const [user_id,setUser_id] = useState("");

  // if(userType != "Teacher") setCode("");

  sendCred = async () => {
    console.log("in sendCred")
    // console.log(name,password);
    // fetch("http://192.168.0.109:5000/login", {
      //use your ip by getting ip address by running ipconfig in the cmd
    const addr = fetchAddress + "login";
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        code: code,
        userType: userType

      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        
        try {
          // console.log(status);
          // await AsyncStorage.setItem("status", status);
          // console.log(await AsyncStorage.getItem("status"))
          console.log(data);
          console.log("------------------ ",data.token);
          var decoded = jwt_decode(data.token);
          console.log("found......",decoded,"-------");
          console.log("found......",decoded.userId,"-------");
          //setUser_id(decoded.userId);
          if(data.error){
            console.log("The customized error is:" + data.error);
            setError(data.error);
            Alert.alert(
              "Error",
              data.error,
              [
                {
                  text: "OK",
                  onPress: () => console.log("Ok pressed")
                },
                // {
                //   text: "Cancel",
                //   onPress: () => console.log("Cancel Pressed"),
                //   style: "cancel"
                // },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
          await AsyncStorage.setItem("token", data.token);
          // await AsyncStorage.setItem("userid", userID);
          // await AsyncStorage.setItem("usertype", JSON.stringify(userType));
          await AsyncStorage.setItem("usertype", userType);
          // await AsyncStorage.setItem("staus", data.status);
          console.log(await AsyncStorage.getItem("token"));
          // <Text>${await AsyncStorage.getItem("staus")};</Text>
          //console.log(".........",user_id);
            //console.log("login->register with opacity");
          navigation.navigate("Naviation_after_Front", { userID: decoded.userId, userType: userType });
          
          // props.navigation.replace("home")
        } catch (error) {
          console.log("The error is: ", error);

        }
        // console.log(data);
      });
  };

  return (
    <View>
      <View style={styles.container}>
        {/* <Screen style={styles.container}> */}
        <Image style={styles.logo} source={require("../assets/Shikhon.png")} />
        <Text style={styles.headerText}>শিখন</Text>
        <AppForm
          initialValues={{ email: "", password: "" ,code:""}}
          // onSubmit={() => sendCred()}
          // onSubmit={(values) => console.log(values)}
          // validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          {userType != "Teacher"? null : <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="code"
            placeholder="Code"
            secureTextEntry
            textContentType="oneTimeCode"
            value={code}
            onChangeText={(text) => {
              setCode(text);
            }}
          />}
          </AppForm>
        {/* </Screen> */}
      </View>
      <View>
        <TouchableOpacity
          onPress={() => sendCred()}
        >
          <View style={styles.viewButton}>
            <Text style={styles.buttonText}>login</Text>
          </View>
        </TouchableOpacity>
      </View>
      {userType == "Admin"? null : <View>
        <TouchableOpacity
          onPress={() => {
            //console.log("login->register with opacity");
            
            navigation.navigate("Register", { userID: userID, userType: userType });
          }}
        >
          <View style={styles.viewButton}>
            <Text style={styles.buttonText}>Not registered? Register here</Text>
          </View>
        </TouchableOpacity>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#add8e6",
    justifyContent: "center",
    margin: 15,
    padding: 20,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0000A0",
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "center",
    fontWeight: "bold",
  },
});
