import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Dimensions, } from "react-native";
import fetchAddress from "../IP_File";

// import Pdf from 'react-native-pdf';

import PDFView from 'react-native-view-pdf';



export default function PdfDetailsScreen({ route, navigation }) {

  const [topicName, setTopicName] = useState("");
  const [content, setContent] = useState("");
  const pdf = React.useRef(null);
 

  const { userID, userType, _id, chapterNo } = route.params;
//   console.log("_id printing in NoteDetailsScreen",userID,userType,_id,chapterNo)
  const param = { _id: _id };

  const tempFetchaddr = fetchAddress + "pdf/";
  
  const addr = `${tempFetchaddr}?_id=${encodeURIComponent(param._id)}`;
  // const addr = 'http://192.168.0.104:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2'
  fetch(addr)
    .then((res) => res.json())
    
    .then(async (data) => {
      try {
        // await AsyncStorage.getItem("token", data._id);
      } catch (e) {
        console.log("The error is: ", e);
      }
      setTopicName(data.pdf.topicName)
      setContent(data.pdf.content)
      console.log(data);
    });

    return (
      <View style={styles.fullhomescreen}>
          <PDFView
            style={{
              height: 360,
              width: Dimensions.get('window').width,
            }}
            onError={(error) => {
              console.log('onError', error);
            }}
            onLoad={() => {
              console.log('onLoad');
            }}
            resource="http://www.pdf995.com/samples/pdf.pdf"
          />
          

        
            {/* <ScrollView>    
              <View style={styles.imageContainer}>
   
                <Pdf style={{flex: 1}}
                   ref={pdf}
                   source={{uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true}}
                   onError={(error)=>{console.log(error);}} 

                 
 
                        // source={{uri: content}}
                        // onLoadComplete={(numberOfPages,filePath)=>{
                        //     console.log(`number of pages: ${numberOfPages}`);
                        // }}
                        // onPageChanged={(page,numberOfPages)=>{
                        //     console.log(`current page: ${page}`);
                        // }}
                        // onError={(error)=>{
                        //     console.log(error);
                        // }}
                        // onPressLink={(uri)=>{
                        //     console.log(`Link presse: ${uri}`)
                        // }}
                        
                    />
                
             </View>
            </ScrollView>     */}
         
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
      padding: 30,
    },
    headerText: {
      fontSize: 25,
      textAlign: "center",
      fontWeight: "bold",
      color: "#0000A0",
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
      // backgroundColor: "#add8e6",
      borderRadius: 20,
      //padding: 10,
    },
    buttonText: {
      fontSize: 18,
      color: "#0300A0",
      textAlign: "left",
    //   fontWeight: "bold",
      paddingLeft: 30,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
    },
    pdf: 
    {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom:0
    },

  });
  