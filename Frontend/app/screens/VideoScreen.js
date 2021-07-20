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
  AppRegistry
} from 'react-native';
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';



import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

// import {showImagePicker} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';


const VideoScreen = () => {


  const [photo, setPhoto] = useState('');
  const [showPhoto, setshowPhoto] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  // console.log(status);


  const cloudinaryUpload = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'shikhon')
    data.append("cloud_name", "elixa")
    fetch("https://api.cloudinary.com/v1_1/elixa/video/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log(data.secure_url);
        setPhoto(data.secure_url);
        setshowPhoto(true);
        // console.log(photo);
        
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })

    
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
      cloudinaryUpload(source);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
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
  }

    


  



  return (
    <View>
      {showPhoto? (

      <View style={styles.imageContainer}>
         {/* <Image 
          source={{ uri: photo }} 
          style={styles.backgroundImage}>
        </Image> */}
        <Video 
            ref={video} 
            style={styles.backgroundVideo}
            source={{uri: photo}}   // Can be a URL or a local file.
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
      </View>

      ):
      (
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg'}} 
          style={styles.backgroundImage}>
        </Image>
        
      </View>) 
     }
      
      
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>
          Upload lecture video
        </Text>
        <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>

    </View >
    // <View>
    //   <View>
    //     {showPhoto ? (
    //     <View>
    //       <Text>
    //         the url is : {photo}
    //       </Text>
    //       <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}/>
         

    //     </View>
         
    //     ): (<Text> photo not available </Text>)}
        
    //   </View>
    //   <View >
    //      <Button title = "upload image" onPress= {()=> selectPhotoTapped()}
    //      />
    //   </View>

    // </View >
  );
};

const styles = StyleSheet.create({
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
  }
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

