import React, { useState, useCallback } from "react";
import {
  CheckBox,
  Image,
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Picker,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import fetchAddress from "../IP_File";
import DropDownPicker from "react-native-dropdown-picker";
import MonthPicker from "react-native-month-year-picker";

import Screen from "../components/Screen";
import { AppForm as Form, AppFormField as FormField, SubmitButton } from "../components/forms";

export default function RegisterScreen({ route, navigation }) {
  // state={
  //   selectedLang1:false,
  //   selectedLang2:false,
  //   selectedLang3:false,
  //   selectedLang4:false,

  // }
  // const {selectedLang1,selectedLang2,selectedLang3,selectedLang4} = this.state;

  DropDownPicker.setListMode("SCROLLVIEW");

  const { userID } = route.params;
  const { userType } = route.params;
  //console.log(userType);
  const [fullname, setFullname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileno] = useState("");
  // const [registration, setRegistration] = useState(0);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "BSC", value: "BSC" },
    { label: "MSC", value: "MSC" },
  ]);
  // const [physics, setPhysics] = useState(false);
  // const [chemistry, setChemistry] = useState(false);
  // const [biology, setBiology] = useState(false);
  // const [math, setMath] = useState(false);
  // const [english, setEnglish] = useState(false);
  // const [subject, setSubject] = useState("");
  var date = String(new Date()).split(" ")[3];
  date = Number(date);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState("");
  const [items2, setItems2] = useState([
    { label: date - 2, value: date - 2 },
    { label: date - 3, value: date - 3 },
    { label: date - 4, value: date - 4 },
    { label: date - 5, value: date - 5 },
    { label: date - 6, value: date - 6 },
    { label: date - 7, value: date - 7 },
  ]);

  const [institute, setInstitute] = useState("");
  const [department, setDepartment] = useState("");

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState("");
  const [items3, setItems3] = useState([
    { label: "Physics 1", value: "Physics 1" },
    { label: "Physics 2", value: "Physics 2" },
    { label: "Chemistry 1", value: "Chemistry 1" },
    { label: "Chemistry 2", value: "Chemistry 2" },
    { label: "Mathematics 1", value: "Mathematics 1" },
    { label: "Mathematics 2", value: "Mathematics 2" },
    { label: "Biology 1", value: "Biology 1" },
    { label: "Biology 2", value: "Biology 2" },
    { label: "English", value: "English" },
  ]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState("");
  const [items4, setItems4] = useState([
    { label: "Physics 1", value: "Physics 1" },
    { label: "Physics 2", value: "Physics 2" },
    { label: "Chemistry 1", value: "Chemistry 1" },
    { label: "Chemistry 2", value: "Chemistry 2" },
    { label: "Mathematics 1", value: "Mathematics 1" },
    { label: "Mathematics 2", value: "Mathematics 2" },
    { label: "Biology 1", value: "Biology 1" },
    { label: "Biology 2", value: "Biology 2" },
    { label: "English", value: "English" },
  ]);

  const [open5, setOpen5] = useState(false);
  const [value5, setValue5] = useState("");
  const [items5, setItems5] = useState([
    { label: "Physics 1", value: "Physics 1" },
    { label: "Physics 2", value: "Physics 2" },
    { label: "Chemistry 1", value: "Chemistry 1" },
    { label: "Chemistry 2", value: "Chemistry 2" },
    { label: "Mathematics 1", value: "Mathematics 1" },
    { label: "Mathematics 2", value: "Mathematics 2" },
    { label: "Biology 1", value: "Biology 1" },
    { label: "Biology 2", value: "Biology 2" },
    { label: "English", value: "English" },
  ]);

  // const [date, setDate] = useState(new Date());

  // const [show, setShow] = useState(false);
  // const showPicker = useCallback((value) => setShow(value), []);
  // const onValueChange = useCallback(
  //   (event, newDate) => {
  //     const selectedDate = newDate || date;

  //     showPicker(false);
  //     setDate(selectedDate);
  //   },
  //   [date, showPicker],
  // );

  sendCred = async () => {
    console.log("in sendCred");
    // console.log(name,password);
    //fetch("http://192.168.0.106:5000/signup",{ //use your ip by getting ip address by running ipconfig in the cmd
    const addr = fetchAddress + "signup";
    console.log(addr);
    console.log(name);
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        name: name,
        userType: userType,
        email: email,
        mobileno: mobileno,
        password: password,
        userDetails:
          userType != "Teacher"
            ? []
            : {
                // code: code,
                education: value,
                institute: institute,
                department: department,
                hscPassyear: value2,
                subject1: value3,
                subject2: value4,
                subject3: value5,
                // cv: cv
              },
        // userDetails: {
        //   subject: sub,

        // }
        // code: code,
        // education: value,
        // passyear: value2,
        // registration: Number(registration),
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {

          if(data.error){
            console.log("The customized error is:" + data.error);
            // setError(data.error);
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

          //console.log("register->login with opacity");
          navigation.navigate("Login");
          // props.navigation.replace("home")
        } catch (e) {
          console.log("The error is: ", e);
        }
        // console.log(data);
      });
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../assets/Shikhon.png")} />
          <Text style={styles.headerText}>শিখন</Text>
          <Form
            initialValues={{ name: "", email: "", password: "" }}
            // onSubmit={(values) => console.log(values)}
            // onSubmit={() => sendCred()}

            // validationSchema={validationSchema}
          >
            <FormField
              autoCorrect={false}
              icon="account"
              name="fullname"
              placeholder="Full Name"
              textContentType="name"
              value={fullname}
              onChangeText={(text) => {
                setFullname(text);
              }}
            />
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="User Name"
              textContentType="username"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <FormField
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

            <FormField
              autoCorrect={false}
              icon="phone"
              name="mobile"
              placeholder="Mobile No."
              textContentType="telephoneNumber"
              value={mobileno}
              onChangeText={(text) => {
                setMobileno(text);
              }}
            />
            <FormField
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

            {userType != "Teacher" ? null : (
              <FormField
                autoCorrect={false}
                required={true}
                icon="office-building"
                name="institute"
                placeholder="Current Institute Name"
                textContentType="organizationName"
                value= {institute}
                onChangeText={(text) => {
                  setInstitute(text);

                  
                }}
              />
            )}

            {userType != "Teacher" ? null : (
              <FormField
                autoCorrect={false}
                required={true}
                icon="briefcase"
                name="department"
                placeholder="Department Name"
                textContentType="none"
                value={department}
                onChangeText={(text) => {
                  setDepartment(text);
                }}
              />
            )}
          </Form>
        </View>
        <View>
          {userType != "Teacher" ? null : (
            <View>
              <DropDownPicker
                zIndex={3000}
                zIndexInverse={2900}
                maxHeight={100}
                style={styles.dropDown}
                open={open}
                placeholder="Current Educational Status"
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChange={(text) => setValue(text)}
              />
            </View>
          )}

          {userType != "Teacher" ? null : (
            <View>
              <DropDownPicker
                zIndex={2800}
                zIndexInverse={2700}
                maxHeight={100}
                style={styles.dropDown}
                open={open2}
                placeholder="HSC Passing Year"
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                onChange={(text) => setValue2(text)}
              />
            </View>
          )}

          {userType != "Teacher" ? null : (
            <View>
              <DropDownPicker
                zIndex={2600}
                zIndexInverse={2500}
                maxHeight={100}
                style={styles.dropDown}
                open={open3}
                placeholder="Preferred Subject 1"
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
                onChange={(text) => setValue3(text)}
              />
            </View>
          )}

          {userType != "Teacher" ? null : (
            <View>
              <DropDownPicker
                zIndex={2400}
                zIndexInverse={2300}
                maxHeight={100}
                style={styles.dropDown}
                open={open4}
                placeholder="Preferred Subject 2"
                value={value4}
                items={items4}
                setOpen={setOpen4}
                setValue={setValue4}
                setItems={setItems4}
                onChange={(text) => setValue4(text)}
              />
            </View>
          )}

          {userType != "Teacher" ? null : (
            <View>
              <DropDownPicker
                zIndex={2200}
                zIndexInverse={2100}
                maxHeight={100}
                style={styles.dropDown}
                open={open5}
                placeholder="Preferred Subject 3"
                value={value5}
                items={items5}
                setOpen={setOpen5}
                setValue={setValue5}
                setItems={setItems5}
                onChange={(text) => setValue5(text)}
              />
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity onPress={() => sendCred()}>
            <View style={styles.viewButton}>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0000A0",
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#add8e6",
    justifyContent: "center",
    margin: 15,
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "center",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "column",
    // marginBottom: 20,
  },
  checkBoxTxt: {
    fontSize: 18,
    textAlign: "left",
    // fontWeight: "bold",
  },
  dropDown: {
    marginBottom: 10,
    height: 60,
    width: "90%",
    //flexDirection: 'row-reverse',
    margin: 20,
  },
});
