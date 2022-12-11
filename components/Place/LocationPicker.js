import { View,Text,Image,StyleSheet,PermissionsAndroid, Button } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { useEffect, useState } from "react";
import {Colors} from '../constants/Colors';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation,useRoute,useIsFocused } from "@react-navigation/native";

// Function to get permission for location
const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
function LocationPicker () {

  const [location, setLocation] = useState(false);
  const navigation =useNavigation()
  const route = useRoute();
  const isFocused =useIsFocused();
   
 
  console.log("maplocation",route.params)
  useEffect (()=>{
    if(isFocused && route.params){
      const mapPickedLocation = {
        lat:route.params.pickedLat,
        lng:route.params.pickedLng
      }
        setLocation(mapPickedLocation);
    console.log("-----------",mapPickedLocation)
      
    }
   
  },[route,isFocused])
    // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log("position",position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log("get location error",error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log("location",location);
  };


    function pickupMapHandler(){
        navigation.navigate("Map");
    }
    return(
        <View>
            {location?<View style={styles.mapPreview}>
                {/* <Image source={{uri:""}}/> */}
                <Text>Lat:{location?location.lat:'0'}</Text>
                <Text>Lng:{location?location.lng:'0'}</Text>
            </View>:null}
            <View style={styles.actions}>
                <OutlinedButton 
                    icon="location-arrow"
                    onPress={getLocation}
                    >locat User</OutlinedButton>
                
                <OutlinedButton 
                   icon="map"
                   onPress={pickupMapHandler}
                   >Pick up Map
                </OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles =StyleSheet.create({

    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})