// In App.js in a new project

import * as React from "react";
import fetchAddress from "./app/IP_File";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AskScreen from "./app/screens/AskScreen";
import LeaderBoardScreen from "./app/screens/LeaderBoardScreen";
import AdmissionInfoScreen from "./app/screens/AdmissionInfoScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import CoursesScreen from "./app/screens/CoursesScreen";
import HomeScreen from "./app/screens/HomeScreen";
//import LoginScreen from "./app/screens/new_LoginScreen";
import FrontScreen from "./app/screens/FrontScreen";
import LoginScreen from "./app/screens/LoginScreen";
//import temp_RegisterScreen from "./app/screens/temp_RegisterScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import CourseDetailsScreen from "./app/screens/CourseDetailsScreen";
import TeacherDetailsScreen from "./app/screens/TeacherDetailsScreen";
import NoteScreen from "./app/screens/NoteScreen";
// import NoteScreen from "./app/screens/temp_NoteScreen";
import NoteDetailsScreen from "./app/screens/NoteDetailsScreen";
import VideoDetailsScreen from "./app/screens/VideoDetailsScreen";
import PdfScreen from "./app/screens/PdfScreen";
import PdfDetailsScreen from "./app/screens/PdfDetailsScreen";
import VideoScreen from "./app/screens/VideoScreen";
import TeacherNotificationScreen from "./app/screens/TeacherNotificationScreen";
import { Badge, Icon, withBadge } from "react-native-elements";
import ExerciseScreen from "./app/screens/ExerciseScreen";
import AddExerciseScreen from "./app/screens/AddExerciseScreen";
import EditExerciseScreen from "./app/screens/EditExerciseScreen";
import QuizScreen from "./app/screens/QuizScreen";
// import QuizScreen from "./app/screens/temp_QuizScreen";
import QuizDetailsScreen from "./app/screens/QuizDetailsScreen";
import AddQuizScreen from "./app/screens/AddQuizScreen";
import AddQuizDetailsScreen from "./app/screens/AddQuizDetailsScreen";
import QuizScoreScreen from "./app/screens/QuizScoreScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const TeacherStack = createStackNavigator();
const FrontStack = createStackNavigator();
const NoteStack = createStackNavigator();
const PdfStack = createStackNavigator();
const VideoStack = createStackNavigator();
const ExerciseStack = createStackNavigator();
const QuizStack = createStackNavigator();
const CourseStack = createStackNavigator();

// var firebaseConfig = {
//       apiKey: "AIzaSyA5j2M0POMGo95rgoQlBOr5Y0emiTaO2R8",
//       authDomain: "project-id.firebaseapp.com",
//       databaseURL: "https://project-id.firebaseio.com",
//       projectId: "project-id",
//       storageBucket: "project-id.appspot.com",
//       messagingSenderId: "sender-id",
//       appId: "app-id",
//       measurementId: "G-measurement-id",
//     };

const TopTab = createMaterialTopTabNavigator();
var noti, noti1, noti2;
var count = 0;
// var NotiBadge;
const addr = fetchAddress + "teacher/all";

  detectNotifications = async () => {
    fetch(addr)
      .then((res) => res.json())

      // .then((res) => res.text())
      .then(async (data) => {
        try {
          // setCount(data.teachers.length);
          count = data.teachers.length;
          console.log(count);
          
        } catch (e) {
          console.log("The error is: ", e);
        }
      });
  };
  detectNotifications();

  // useEffect(() => {
  //   detectNotifications();

  // });

// console.log("lol");

console.log(count);
var NotiBadge = withBadge(count)(Icon);

console.log("haha");
// with async



function ViewCourseContent({ route }) {
  const { userID, userType, _id, chapterNo, trackID, trackName, courseName} = route.params;
  console.log("_id printing in viewCourseContent", userID, userType, _id, chapterNo, trackID, trackName, courseName);
  return (
    //<NavigationContainer>
    <TopTab.Navigator 
      screenOptions={{ headerShown: false }}
      
    >
      <TopTab.Screen
        name="Note"
        component={NoteStackScreen}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID: trackID, trackName: trackName, courseName: courseName}}
      />
      <TopTab.Screen
        name="Pdf"
        component={PdfStackScreen}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <TopTab.Screen
        name="Video"
        component={VideoStackScreen}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <TopTab.Screen
        name="Exrcise"
        component={ExerciseStackScreen}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <TopTab.Screen
        name="Quiz"
        component={QuizStackScreen}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID: trackID, trackName: trackName, courseName: courseName}}
      />
    </TopTab.Navigator>
    //</NavigationContainer>
  );
}

function NoteStackScreen({ route }) {
  const { userID, userType, _id, chapterNo } = route.params;
  return (
    <NoteStack.Navigator>
      <NoteStack.Screen
        name="AllNotes"
        component={NoteScreen}
        options={{ title: "All Notes" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <NoteStack.Screen
        options={{ headerShown: false }}
        name="NoteDetails"
        component={NoteDetailsScreen}
        options={{ title: "Note Details" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
    </NoteStack.Navigator>
  );
}

function PdfStackScreen({ route }) {
  const { userID, userType, _id, chapterNo } = route.params;
  return (
    <PdfStack.Navigator>
      <PdfStack.Screen
        name="AllPdfs"
        component={PdfScreen}
        options={{ title: "All Pdfs" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <PdfStack.Screen
        options={{ headerShown: false }}
        name="PdfDetails"
        component={PdfDetailsScreen}
        options={{ title: "Pdf Details" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
    </PdfStack.Navigator>
  );
}


function VideoStackScreen({ route }) {
  const { userID, userType, _id, chapterNo } = route.params;
  return (
    <VideoStack.Navigator>
      <VideoStack.Screen
        name="Allvideos"
        component={VideoScreen}
        options={{ title: "All Video Lectures" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <VideoStack.Screen
        options={{ headerShown: false }}
        name="VideoDetails"
        component={VideoDetailsScreen}
        options={{ title: "Video Details" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
    </VideoStack.Navigator>
  );
}



function ExerciseStackScreen({ route }) {
  const { userID, userType, _id, chapterNo } = route.params;
  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen
        name="AllExercises"
        component={ExerciseScreen}
        options={{ title: "All Exercises" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
      <ExerciseStack.Screen
        options={{ headerShown: false }}
        name="AddExercise"
        component={AddExerciseScreen}
        options={{ title: "Add Exercise" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
            <ExerciseStack.Screen
        options={{ headerShown: false }}
        name="EditExercise"
        component={EditExerciseScreen}
        options={{ title: "Edit Exercise" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
      />
    </ExerciseStack.Navigator>
  );
}

function QuizStackScreen({ route }) {
  const { userID, userType, _id, chapterNo, trackID, trackName, courseName} = route.params;
  console.log("found in uizstack" + courseName)
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen
        name="AllQuizes"
        component={QuizScreen}
        options={{ title: "All Quizes" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID:trackID, trackName: trackName, courseName: courseName}}
      />
      <QuizStack.Screen
        name="QuizDetails"
        component={QuizDetailsScreen}
        options={{ title: "Quiz Details" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID: trackID, trackName: trackName, courseName: courseName}}
      />
      <QuizStack.Screen
        options={{ headerShown: false }}
        name="AddQuiz"
        component={AddQuizScreen}
        options={{ title: "Add Quiz" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID: trackID, trackName: trackName, courseName: courseName}}
      />
      <QuizStack.Screen
        options={{ headerShown: false }}
        name="AddQuizDetails"
        component={AddQuizDetailsScreen}
        options={{ title: "Add Quiz Details" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID: trackID, trackName: trackName, courseName: courseName}}
      />
      <QuizStack.Screen
        options={{ headerShown: false }}
        name="QuizScore"
        component={QuizScoreScreen}
        options={{ title: "Quiz Score" }}
        // initialParams={{ userID: 100, userType: "Teacher" }}
        initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo, trackID: trackID, trackName: trackName, courseName: courseName }}
      />
    </QuizStack.Navigator>
  );
}



function HomeStackScreen({ route }) {
  const { userID, userType} = route.params;
  // console.log("_id printing in HomeStackScreen", userID, userType, _id, chapterNo);
  // console.log(userType);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home Page" }}
        initialParams={{ userID: userID, userType: userType }}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Course"
        component={CoursesScreen}
        options={{ title: "Courses" }}
        initialParams={{ userID: userID, userType: userType}}
      />
      {/* <HomeStack.Screen
        options={{ headerShown: false }}
        name="CourseDetails"
        component={CourseStackScreen}
        // options={{ title: "Course Content" }}
        // initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
        initialParams={{ userID: userID, userType: userType}}

      /> */}
      <HomeStack.Screen

        options={{ headerShown: false }}
        name="CourseDetails"
        component={CourseDetailsScreen}
        options={{ title: "Course Details" }}
        initialParams={{ userID: userID, userType: userType}}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="CourseContent"
        component={ViewCourseContent}
        options={{ title: "Course Content" }}
        // initialParams={{ userID: userID, userType: userType, _id: _id, chapterNo: chapterNo }}
        initialParams={{ userID: userID, userType: userType}}
      />
      
    </HomeStack.Navigator>
  );
}

function NotificationStackScreen({ route }) {
  const { userID, userType } = route.params;
  // console.log("_id printing in NotificationStack", userID, userType);
  // console.log(userType);
  return (
    <TeacherStack.Navigator>
      <TeacherStack.Screen
        name="TeacherNotify"
        component={TeacherNotificationScreen}
        options={{ title: "Pending Teacher Reuests" }}
        initialParams={{ userID: userID, userType: userType }}
      />
      <TeacherStack.Screen
        options={{ headerShown: false }}
        name="TeacherDetails"
        component={TeacherDetailsScreen}
        options={{ title: "Teacher Details" }}
        initialParams={{ userID: userID, userType: userType }}
      />
    </TeacherStack.Navigator>
  );
}

//NaviationafterFront

function NaviationafterFront({ route }) {
  const { userID, userType } = route.params;
  console.log("##########From NavigationAfterFront,354   ");
  console.log(userID);
  console.log(userType);
  // console.log("_id printing in NaviationafterFront", userID, userType);
  return (
    //<NavigationContainer>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
        }}
        initialParams={{ userID: userID, userType: userType }}
      />
      {userType != "Admin" ? null : (
        <Tab.Screen
          name="Notifications"
          component={NotificationStackScreen}
          options={{
            tabBarIcon: ({ color, size, tintColor }) => (
              <MaterialCommunityIcons>
                <NotiBadge>
                  type="ionicon" name="alert-box" color={color}
                  size={size}
                  size={24}
                  color={tintColor}
                </NotiBadge>
              </MaterialCommunityIcons>
            ),
          }}
          initialParams={{ userID: userID, userType: userType }}
        />
      )}

      <Tab.Screen
        name="Ask"
        component={AskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-question-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chart-histogram" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Admission Info"
        component={AdmissionInfoScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="newspaper" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
        }}
        initialParams={{ userID: userID, userType: userType }}
      />
    </Tab.Navigator>
    //</NavigationContainer>
  );
}

function FrontStackScreen() {
  const [isSignedup, setSigned] = useState(null);
  const detectSignup = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSigned(true);
    } else {
      setSigned(false);
    }
  };
  useEffect(() => {
    detectSignup();
  }, []);
  return (
    <FrontStack.Navigator screenOptions={{ headerShown: false }}>
      <FrontStack.Screen name="Front" component={FrontScreen} options={{ title: "Front Page" }} />
      <FrontStack.Screen name="Login" component={LoginScreen} options={{ title: "Login Page" }} />
      <FrontStack.Screen
        name="Register"
        //component={temp_RegisterScreen}
        component={RegisterScreen}
        options={{ title: "Registration Page" }}
      />
      <FrontStack.Screen
        //screenOptions={{headerShown: false }}
        //options={{headerShown: false,}}
        name="Naviation_after_Front"
        component={NaviationafterFront}
        options={{ title: "Naviation after Front" }}
      />
    </FrontStack.Navigator>
  );
}

function App() {
  // const [count, setCount] = useState(0);
  

  // const addr = fetchAddress + "teacher/all";

  // detectNotifications = async () => {
  //   fetch(addr)
  //     .then((res) => res.json())

  //     // .then((res) => res.text())
  //     .then(async (data) => {
  //       try {
  //         // setCount(data.teachers.length);
  //         count = data.teachers.length;
  //         console.log(count);
          
  //       } catch (e) {
  //         console.log("The error is: ", e);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   detectNotifications();

  // });

  // console.log("lol");

  // console.log(count);
  // NotiBadge = withBadge(count)(Icon);

  return (
    
    <NavigationContainer>
      <FrontStack.Navigator screenOptions={{ headerShown: false }}>
        <FrontStack.Screen name="Shikhon" component={FrontStackScreen} />
      </FrontStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
