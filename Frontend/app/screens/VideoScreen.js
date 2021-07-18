import * as React from "react";
import { View, Text } from "react-native";
export default function VideoScreen({ route, navigation }) {
  // const { userID } = route.params;
  // const { userType } = route.params;
  // console.log(userType);

  return (
    <View>
      <Text>this is video screen</Text>
    </View>
  );
}

// //     return (
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //         <Text>THis is Video Screen page!</Text>
// //       </View>
// //     );
// //   }

// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, ScrollView, StyleSheet, FlatList, Text, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Video, AVPlaybackStatus } from 'expo-av';
// import VideoPlayer from 'expo-video-player'
// import fetchAddress from "../IP_File";
// import { WebView } from 'react-native-webview';

// export default function VideoScreen({ route, navigation }) {
//   const [image, setImage] = useState(null);
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   const [videos, setVideos] = useState("");
//   const [picture, setPicture] = useState("");

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

//   //const tempFetchaddr = fetchAddress + "file/all";
//   const tempFetchaddr = fetchAddress + "file/8df61a8962877eacd443730a4cba3bd4.png";

//   // console.log(tempFetchaddr);
//   const addr = `${tempFetchaddr}`;

//   fetch(addr)
//     .then((res) => res.json())
//     //.then((res) => res.data)
//     //.then((res,err) => console.log("hi",res,"dhur",err))
//     .then(async (data) => {
//       try {
//         // await AsyncStorage.getItem("token", data._id);
//       } catch (e) {
//         console.log("The error is: ", e);
//       }
//       //console.log("helloo",data);
//       // setVideos(data);
//       // let picture=new Buffer('binary').toString('base64');
//       setPicture(data)
//     });

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log("File details here-------",result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };
//   const uploadImage = async () => {
//     // console.log("in sendCred");
//     const addr = fetchAddress + "file/add";
//     fetch(addr, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         topicName: topicName,
//         courseID: _id,
//         chapterNo: chapterNo,
//         author: userID,
//         content: note,
//       }),
//     })
//       .then((res) => res.json())
//       .then(async (data) => {
//         try {
//           if (data.error) {
//             console.log("The customized error is:" + data.error);
//           }
//           await AsyncStorage.setItem("token", data.token);
//         } catch (e) {
//           console.log("The error is: ", e);
//         }
//         // console.log(data);
//       });
//     setTopicName("");
//     setNote("");
//   };
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//         }}
//         useNativeControls
//         resizeMode="contain"
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//       </View>
//   )

// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFF',
//     flex: 1,
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   // container: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   backgroundColor: '#ecf0f1',
//   // },
//   video: {
//     alignSelf: 'center',
//     width: 320,
//     height: 200,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
