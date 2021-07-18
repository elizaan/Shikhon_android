import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function FrontScreen({ navigation }) {
    const [user, setUser] = useState("");
  return (
    <View style={styles.fullhomescreen}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/Shikhon.png")} />
        <Text style={styles.headerText}>শিখন</Text>
        <Text style={styles.subHeaderText}>Admission helper</Text>
      </View>
      <View style={styles.winContainer}>
        <Text style={styles.winText}>Login As</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.opacityButton}
            onPress={() => {
              navigation.navigate("Login", { userID: "1", userType: "Admin" });
            }}
          >
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.opacityButton}
            onPress={() => {
                //setUser("Student");
              navigation.navigate("Login", { userID: "2", userType: "Student" });
            }}
          >
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.opacityButton}
            onPress={() => {
              navigation.navigate("Login", { userID: "3", userType: "Teacher" });
            }}
          >
            <Text style={styles.buttonText}>Teacher</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullhomescreen: {
    flex: 1,
    // alignItems: 'center',
    //justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
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
  subHeaderText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0030A0",
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent:'space-between',
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
    marginTop: 20,
    padding: 3,
    fontWeight: "bold",
    color: "#3030A0",
  },
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    margin: 1,
    padding: 60,
    
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
    color: "#0030A0",
    textAlign: "center",
    fontWeight: "bold",
  },
});
