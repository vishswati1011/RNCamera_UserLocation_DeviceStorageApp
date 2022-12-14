import { useRef, useState } from "react";
import { View,Image ,Alert,StyleSheet,Text} from "react-native";
// import {launchImageLibrary,useCameraPermissions,PermissionStatus} from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker";
import { Colors } from "../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";
function ImagePickerPopup({onTakeImage}) {

const [filePath,setfilePath]=useState()
const [fileData,setfileData]=useState([])
const [fileUri,setfileUri]=useState()

// const [cameraPermissionInformation,requestPermission]=useCameraPermissions(); 
// async function verifyPermission () {
//   if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
//     const permissionResponse = await requestPermission();
//     return permissionResponse.granted
//   }
//   if(cameraPermissionInformation.status==PermissionStatus.DENIED)
//   {
//    Alert.alert(
//     'Insufficient Permisssion',
//     'You need to grant camera permission to use this app.') 
//     return false;    
//   }
//   return true;
// } 
const launchCamera = async() => {
  // const hasPermission =await verifyPermission();
  // if(!hasPermission){
  //   return;
  // }
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, (response) => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker by pressing back button');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User selected custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = { uri: response.uri };
      console.log('response.assets====', response.assets[0].uri);
      if(response){
      setfilePath(response)
      setfileData(response.assets)
      setfileUri(response.assets[0].uri);
      onTakeImage(response.assets[0].uri)
      }
    }
  });

}
console.log("URLLLL",fileUri)
    return (
        <View>
            <View style={styles.imagePerview}>
            { !fileUri ?
            <Text>No image taken yet.</Text>:
            <Image style={styles.image} 
                  source={{ uri: fileUri }} />
            }</View>
            <OutlinedButton 
              onPress={launchCamera}
              icon="camera"
              >Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePickerPopup;

const styles = StyleSheet.create({

  imagePerview:{
    width:'100%',
    height:200,
    marginVertical:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primary100,
    borderRadius:4
  },
  image:{
    width:'100%',
    height:'100%'
  }
})
  // const selectFile = () => {

  //   var options = {
  //     title: 'Select Image',
  //     customButtons: [{ 
  //         name: 'customOptionKey', 
  //         title: 'Choose file from Custom Option' 
  //       }],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //     launchImageLibrary(options, (response) => {
  //       console.log(response);
  //     });
    
    
    

  // };