import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import fetchAddress from "../IP_File";
import { MaterialIcons } from "@expo/vector-icons";



const PdfScreen = ({route, navigation }) => {

  const [pdfs, setPdfs] = useState("");
  const [pdf, setPdf] = useState("");
  const [topicName, setTopicName] = useState("");

  const [showSubmit, setShowSubmit] = useState(0);

 
  const changeNoteHandler = (val) => {
    setPdf(val);
  };

  const changeTopicNameHandler = (val) => {
    setTopicName(val);
  };

const checkTopicInput = async () => {
    //Check for the Name TextInput
    if (topicName === "") {
      Alert.alert('Please Enter Topic Name');
      
    }
  };

  const { userID, userType, _id, chapterNo, courseName } = route.params;
  // console.log("_id printing in NoteScreen",userID,userType,_id,chapterNo)
  const getPdfs = async () => {
    const param = { courseID: _id, chapterNo: chapterNo };

  const tempFetchaddr = fetchAddress + "pdf/all";

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
      setPdfs(data.pdfArr);
    });
  }

  useEffect(async() => {
    await getPdfs();

    
  }, [getPdfs]);


  const cloudinaryUpload = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'shikhon')
    data.append("cloud_name", "elixa")
    const response = await fetch("https://api.cloudinary.com/v1_1/elixa/raw/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log(data.secure_url);
        setPdf(data.secure_url);
        return data.secure_url;
        
        // console.log(photo);
        
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })


      return response;

    
  }

  const selectPdfTapped = async() => {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
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
      
      const pdfurl = await cloudinaryUpload(source);

      return pdfurl;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }

     
  }
    const sendPdf = async () => {
      // console.log("in sendCred");
      if (topicName === "") {
        Alert.alert('Please Enter Topic Name');
        
      }

      else{
        
        
      const addr = fetchAddress + "pdf/add";
      const pdfurl= await selectPdfTapped();
      console.log(pdfurl);
      await fetch(addr, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicName: topicName,
          courseID: _id,
          chapterNo: chapterNo,
          author: userID,
          content: pdfurl,
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

        setTopicName("");
        // setNote("");
      
      }
    };

    const sendPdf_pdf_dlt = async (item_id) => {
      console.log("here in dlt");
      const tempFetchaddr2 = fetchAddress + "pdf";
      const addr2 = `${tempFetchaddr2}?_id=${encodeURIComponent(item_id)}`;
  
      fetch(addr2, {
        method: "DELETE",
        
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
    const sendPdf_pdf_edit_set = async (item_id, item_topicName, item_content) => {
      // console.log(item_topicName);
      // console.log(item_content);
      setShowSubmit(1);
      setTopicName(item_topicName);
      setPdf(item_content);
  
      const tempFetchaddr3 = fetchAddress + "pdf";
      const addr3 = `${tempFetchaddr3}?_id=${encodeURIComponent(item_id)}`;
      setEditAddr(addr3);
    };
  
    const sendPdf_pdf_edit = async () => {
      // console.log("here in note edit: " + editAdrr);
      await selectPdfTapped();

      fetch(editAdrr, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content:  pdf,
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
      setPdf("");
    };



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
          {showSubmit === 0 ? (
            <View>
              <TouchableOpacity onPress={() => sendPdf()} style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Add Pdf</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => sendPdf_pdf_edit()} style={styles.addButton}>
                <View style={styles.addViewButton}>
                  <Text style={styles.addButtonText}>Edit Pdf</Text>
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
          data={pdfs}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.opacityButton}
                   onPress={() => {
                    navigation.navigate("PdfDetails", {
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
                    <TouchableOpacity onPress={() => sendPdf_pdf_edit_set(item._id, item.topicName, item.content)}>
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
                    <TouchableOpacity onPress={() => sendPdf_pdf_dlt(item._id)}>
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
   
    marginBottom: 10,
    paddingLeft: 2,
    paddingRight: 10,
  },
  opacityButton: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 20,
    padding: 8,
    margin: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
    color:  "rgb(100,100,100)",
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
  deleteicon: {
    paddingRight: 25,
    // paddingBottom: 10,
    // paddingRight: 10,
    // marginRight: 20,
    // paddingLeft: 10,
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
export default PdfScreen;













