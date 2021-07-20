import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

// import {showImagePicker} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';


const VideoScreen = () => {

  const [photo, setPhoto] = useState('');
  const [showPhoto, setshowPhoto] = useState(false);


  const cloudinaryUpload = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'shikhon')
    data.append("cloud_name", "elixa")
    fetch("https://api.cloudinary.com/v1_1/elixa/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setPhoto(data.secure_url);
        setshowPhoto(true);
        // console.log(photo);
        // console.log(data);
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })

    
  }

  const selectPhotoTapped = async() => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {

      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name,
        }
        console.log(source);
       cloudinaryUpload(source);
        console.log(photo);
      }
    });
  }


  



  return (
    <View>
      {showPhoto? (

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: photo }} 
          style={styles.backgroundImage}>
        </Image>
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
          ImagePicker to Cloudinary
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
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 250,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto'
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
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

