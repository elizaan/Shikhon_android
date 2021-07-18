import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import fetchAddress from "../IP_File";
import DropDownPicker from "react-native-dropdown-picker";

export default function CourseDetailScreen({ route, navigation }) {
  // const { userID, userType } = route.params;
  const { userID } = route.params;
  const { userType } = route.params;
  const { courseName } = route.params;
  const { _id } = route.params;
  const {trackID} = route.params;
  const {trackName} = route.params;

  // console.log(trackName);

  // console.log("in course details screen");
  // console.log(userType);
  // console.log(_id);

  const [chapterName, setChapterName] = useState("");
  const [chapterNo, setChapterNo] = useState("");

  const [chapters, setChapters] = useState("");

  const changeChapterNoHandler = (val) => {
    setChapterNo(val);
  };

  const changeChapterNameHandler = (val) => {
    setChapterName(val);
  };

  const pressHandler = (chapterNo) => {
    setChapters((chapters) => {
      return chapters.filter((chapter) => chapter.chapterNo != chapterNo);
    });
  };

  const param = { _id: _id };
  // const addr = fetchAddress + "/course/chapter/all?_id=" + ${param._id}; //?_id=60ad0cedb60e311790fef7c6
  const tempFetchaddr = fetchAddress + "course/chapter/all";
  // console.log(tempFetchaddr);
  const addr = `${tempFetchaddr}?_id=${encodeURIComponent(param._id)}`;
  fetch(addr)
    .then((res) => res.json())
    // .then((res) => res.text())
    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }
      // console.log("data:");
      // console.log(data);
      setChapters(data.chapterArr);
    });

  sendCred = async () => {
    console.log("in sendCred");
    const addr = fetchAddress + "course/chapter/add";
    fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        chapterNo: chapterNo,
        chapterName: chapterName,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.error) {
            console.log("The customized error is:" + data.error);
            // Alert.alert("Error", data.error, [
            //   {
            //     text: "OK",
            //     onPress: () => console.log("Ok pressed"),
            //   },
            // ]);
          }
          await AsyncStorage.setItem("token", data.token);
        } catch (e) {
          console.log("The error is: ", e);
        }
        console.log(data);
      });
      setChapterNo("");
      setChapterName("");
  };

  return (
    <View style={styles.fullhomescreen}>
      {/* header */}
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>User ID: {userID}</Text> */}
        {/* <Text style={styles.headerText}>{userType}</Text> */}
        <Text style={styles.headerText}>Chapters</Text>
      </View>

      {/*form of add chapter*/}
      <View style={styles.addFrom}>
        {userType != "Admin" ? null : (
          <View>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Chapter No"
              onChangeText={changeChapterNoHandler}
              value={chapterNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Chapter Name"
              onChangeText={changeChapterNameHandler}
              value={chapterName}
            />
            <View>
              <TouchableOpacity onPress={() => sendCred()} style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Add Chapter</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* content */}
      <View style={styles.content}>
        {/* <View>
          <Text>This is CourseDetailScreen</Text>
        </View> */}
        <View>
          <FlatList
            data={chapters}
            renderItem={({ item }) => (
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.opacityButton}
                  onPress={() => {
                    navigation.navigate("CourseContent", {
                      userID: userID,
                      userType: userType,
                      _id: _id,
                      chapterNo: item.chapterNo,
                      trackID: trackID, 
                      trackName: trackName
                    });
                  }}
                >
                  <Text style={styles.buttonText}>{item.chapterNo + ".   " + item.chapterName}</Text>
                </TouchableOpacity>
              </View>
            )}
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
    padding: 15,
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
