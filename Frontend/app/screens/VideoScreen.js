import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  AppRegistry,
  FlatList,
  TextInput
} from 'react-native';
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';



import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

// import {showImagePicker} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import fetchAddress from "../IP_File";
import { MaterialIcons } from "@expo/vector-icons";


const VideoScreen = ({route, navigation }) => {


  const [photo, setPhoto] = useState('');
  const [showPhoto, setshowPhoto] = useState(false);
  const [videos, setVideos] = useState("");
  const [video, setVideo] = useState("");
  const [topicName, setTopicName] = useState("");

  const [showSubmit, setShowSubmit] = useState(0);
 
  const changeNoteHandler = (val) => {
    setVideo(val);
  };

  const changeTopicNameHandler = (val) => {
    setTopicName(val);
  };

  const { userID, userType, _id, chapterNo } = route.params;
  // console.log("_id printing in NoteScreen",userID,userType,_id,chapterNo)
  const param = { courseID: _id, chapterNo: chapterNo };

  const tempFetchaddr = fetchAddress + "video/all";

  const addr = `${tempFetchaddr}?courseID=${encodeURIComponent(param.courseID)}&chapterNo=${encodeURIComponent(
    param.chapterNo
  )}`;

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
      // console.log(data.noteArr);
      setVideos(data.videoArr);
    });


  const cloudinaryUpload = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'shikhon')
    data.append("cloud_name", "elixa")
    const response = await fetch("https://api.cloudinary.com/v1_1/elixa/video/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log(data.secure_url);
        setVideo(data.secure_url);
        setshowPhoto(true);
        return data.secure_url;
        // console.log(photo);
        
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })

      return response;

    
  }

  const selectPhotoTapped = async() => {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );

      const uri = res.uri;
      const type = res.type;
      const name = res.name;
      const source = {
          uri,
          type,
          name,
      }
      console.log(source);
      const videourl = await cloudinaryUpload(source);
      return videourl;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
    const sendVid = async () => {


      if (topicName === "") {
        Alert.alert('Please Enter Topic Name');
        
      }
      else{

        const videourl = await selectPhotoTapped();
      const addr = fetchAddress + "video/add";
      fetch(addr, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicName: topicName,
          courseID: _id,
          chapterNo: chapterNo,
          author: userID,
          content: videourl,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          try {
            if (data.error) {
              console.log("The customized error is:" + data.error);
            }
            
          } catch (e) {
            console.log("The error is: ", e);
          }
          // console.log(data);
        });
      setTopicName("");
      
      }
    };

    const sendVid_video_dlt = async (item_id) => {
      console.log("here in dlt");
      const tempFetchaddr2 = fetchAddress + "video";
      const addr2 = `${tempFetchaddr2}?_id=${encodeURIComponent(item_id)}`;
  
      fetch(addr2, {
        method: "DELETE",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
      })
        .then((res) => res.json())
        .then(async (data) => {
          try {
            if (data.error) {
              console.log("The customized error is:" + data.error);
            }
            
          } catch (e) {
            console.log("The error is: ", e);
          }
          console.log(data);
        });
    };


    const [editAdrr, setEditAddr] = useState("");
    const sendVid_video_edit_set = async (item_id, item_topicName, item_content) => {
      // console.log(item_topicName);
      // console.log(item_content);
      setShowSubmit(1);
      setTopicName(item_topicName);
      setVideo(item_content);
  
      const tempFetchaddr3 = fetchAddress + "video";
      const addr3 = `${tempFetchaddr3}?_id=${encodeURIComponent(item_id)}`;
      setEditAddr(addr3);
    };
  
    const sendCred_video_edit = async () => {
      // console.log("here in note edit: " + editAdrr);
      await selectPhotoTapped();

      fetch(editAdrr, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content:  video,
          topicName: topicName,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          try {
            if (data.error) {
              console.log("The customized error is:" + data.error);
            }
            
          } catch (e) {
            console.log("The error is: ", e);
          }
          console.log(data);
        });
      setShowSubmit(0);
      setTopicName("");
      setVideo("");
    };



    // const options = {
    //   title: 'Select file',
    //   mediaType: 'any',
    //   path:'any',
    //   quality: 1
    //   // storageOptions: {
    //   //   skipBackup: true,
    //   //   path: 'any',
    //   // },
    // };
    // ImagePicker.launchImageLibrary(options, (response) => {

    //   console.log('Response = ', response);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     var t, u;
    //     if(response.assets[0].fileName.split(":")[0] === "video"){
    //         t = "video/mp4";
    //         u = response.assets[0].uri+ ".mp4";

    //     }
    //     else{
    //       t = response.assets[0].type;
    //       u = response.assets[0].uri;
    //     }
    //     const uri = u;
    //     const type = t;
    //     const name = response.assets[0].fileName;
    //     const source = {
    //       uri,
    //       type,
    //       name,
    //     }
    //     console.log(source);
    //     cloudinaryUpload(source);
    //     // console.log(photo);
    //   }
    // });
  

    


  



  return (

    <View style={styles.fullhomescreen}>
    
    <View style={styles.addFrom}>
      {userType != "Teacher" ? null : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Topic Name"
            onChangeText={changeTopicNameHandler}
            value={topicName}
          />
          {/* <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            placeholder="Note"
            onChangeText={changeNoteHandler}
            value={note}
          /> */}
          {showSubmit === 0 ? (
            <View>
              <TouchableOpacity onPress={() => sendVid()} style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Add Lecture Video</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => sendCred_video_edit()} style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Edit Video</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>

    {/* content */}
    <View style={styles.content}>
      <View>
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.opacityButton}
                  onPress={() => {
                    navigation.navigate("VideoDetails", {
                      userID: userID,
                      userType: userType,
                      _id: item._id,
                      topicName: item.topicName,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>{item.topicName}</Text>
                </TouchableOpacity>
              </View>
              <View>
                {userType == "Teacher" ? (
                  <View>
                    <TouchableOpacity onPress={() => sendVid_video_edit_set(item._id, item.topicName, item.content)}>
                      <View style={styles.deleteicon}>
                        <MaterialIcons name="update" size={20} color="#0000A0" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View>
                {userType == "Teacher" ? (
                  <View>
                    <TouchableOpacity onPress={() => sendVid_video_dlt(item._id)}>
                      <View style={styles.deleteicon}>
                        <MaterialIcons name="delete" size={20} color="#0000A0" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  </View>



    
    
    
    
    
    
    
    
    //works fine for showing video just after uploading it
    // <View>
    //   {showPhoto? (

    //   <View style={styles.imageContainer}>
    //      {/* <Image 
    //       source={{ uri: photo }} 
    //       style={styles.backgroundImage}>
    //     </Image> */}
    //     <Video 
    //         ref={video} 
    //         style={styles.backgroundVideo}
    //         source={{uri: photo}}   // Can be a URL or a local file.
    //         useNativeControls
    //         resizeMode="contain"
    //         isLooping
    //         onPlaybackStatusUpdate={status => setStatus(() => status)}
            
    //     />
    //     <View style={styles.buttons}>
    //       <Button
    //         title={status.isPlaying ? 'Pause' : 'Play'}
    //         onPress={() =>
    //           status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
    //         }
    //       />
    //     </View>
    //   </View>

    //   ):
    //   (
    //   <View style={styles.imageContainer}>
    //     <Image 
    //       source={{ uri: 'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg'}} 
    //       style={styles.backgroundImage}>
    //     </Image>
        
    //   </View>) 
    //  }
      
      
    //   <View style={styles.uploadContainer}>
    //     <Text style={styles.uploadContainerTitle}>
    //       Upload lecture video
    //     </Text>
    //     <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
    //       <Text style={styles.uploadButtonText}>
    //         Upload
    //       </Text>
    //     </TouchableOpacity>
    //   </View>

    // </View >
    
  );
};

const styles = StyleSheet.create({
  fullhomescreen: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
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
    paddingRight: 20,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    // padding: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 20,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    // padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#0000A0",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  item: {
    paddingLeft: 10,
    justifyContent: "space-between",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    alignSelf: 'center',
    width: 405,
    height: 350,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:0
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //margin: 15,
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 170,
    width: Dimensions.get('window').width,
    height: 80,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 15,
    margin: 20,
    fontFamily: 'Roboto'
  },
  uploadButton: {
    position: 'relative',
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 10,
    elevation: 4,
    margin: 0,
    padding: 0,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
    bottom:9
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  deleteicon: {
    paddingRight: 25,
  },
});
export default VideoScreen;






// import * as React from "react";
// import { View, Text, Button, Alert } from "react-native";
// import * as ImagePicker from 'react-native-image-picker';
// import * as Permissions from "react-native-permissions";

// export default function VideoScreen({ route, navigation }) {
//     // const { userID } = route.params;
//     // const { userType } = route.params;
//     // console.log(userType);

//     const pickFromCamera = async() =>{

//       const {granted} = await Permissions.askAsync(Permissions.CAMERA)
//       console.log("hi ," + granted);
//       if (granted) {
//         let data = await ImagePicker.launchCameraAsync({

//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowEditing:true,
//           aspect:[1,1],
//           quality:0.5


//         })

//         if(!data.cancelled){
//           let newfile = { 
//             uri:data.uri,
//             type:`test/${data.uri.split(".")[1]}`,
//             name:`test.${data.uri.split(".")[1]}` 

//         }

//         handleupload(newfile);
//       }

//     }else{
//        Alert.alert("please give permission");
//     }

// }

//     const handleupload = (file) =>{
//       const  data = new FormData();
//       data.append('file', file);
//       data.append('upload_preset','shikhon');
//       data.append("cloud_name","elixa");

//       fetch("https://api.cloudinary.com/v1_1/elixa/image/upload",{
//          method: "post",
//          body:data
//       }).then(res=>res.json())

//       then(data => {
//         console.log(data);

//       })
      

//     }
//     return ( 
//       <View >
//         <Text > this is video screen </Text> 
//         <Button title = "upload image" onPress= {()=> pickFromCamera()}
//         />
        
//       </View>
//     );
// }

