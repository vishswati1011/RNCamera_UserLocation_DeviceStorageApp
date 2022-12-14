//mapView from udemy course
import MapView ,{Marker} from 'react-native-maps'
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton'
function Map ({navigation}){

    const [selectedLocation,setSelectedLocation]=useState({
        latitude: 22.642121,
        longitude:  75.610972,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    
    const selectLocationHandler =(event)=>{
        setSelectedLocation({
            latitude:event.latitude,
            longitude:event.longitude,
            latitudeDelta: event.latitudeDelta,
            longitudeDelta: event.longitudeDelta,
        },console.log("selectedLocation",selectedLocation))
    }
    
    // const savePickedLocationHandler = useCallback(() =>{
    const savePickedLocationHandler = useCallback(() =>{

        if(!selectedLocation){
            Alert.alert(
                'No Location picked',
                'you have to pick a location (by tapping on the map) first!'
            );
            return;
        }else{
        navigation.navigate('AddPlace',{
            pickedLat:selectedLocation.latitude,
            pickedLng:selectedLocation.longitude
        });
    }
    },[navigation,selectedLocation]);
    useLayoutEffect( () => {
        navigation.setOptions({
            headerRight : ({tintColor}) => 
            (<IconButton icon="save" size={24} 
                color={tintColor} 
                onPress={savePickedLocationHandler}
            />
            )
        });
    },[navigation,savePickedLocationHandler])
    return (
    <MapView  style={styles.map} initialRegion={selectedLocation} 
    onRegionChangeComplete={(region)=>selectLocationHandler(region)}
    >
         {selectedLocation &&
         <Marker coordinate={selectedLocation}
            draggable
            title={'Your Location'}
         />}
    </MapView>)
}

export default Map;

const styles=StyleSheet.create({
        map:{
            flex:1
        }
})


//below react code using documentation also working
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Button,
//   Linking,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   ToastAndroid,
//   View,
// } from 'react-native';
// import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

// import MapView from './MapView';
// // import appConfig from '../app.json';

// export default function App() {
//   const [forceLocation, setForceLocation] = useState(true);
//   const [highAccuracy, setHighAccuracy] = useState(true);
//   const [locationDialog, setLocationDialog] = useState(true);
//   const [significantChanges, setSignificantChanges] = useState(false);
//   const [observing, setObserving] = useState(false);
//   const [foregroundService, setForegroundService] = useState(false);
//   const [useLocationManager, setUseLocationManager] = useState(false);
// //   const [location, setLocation] = useState<GeoPosition | null>(null);
//   const [location, setLocation] = useState(null);


//   const hasPermissionIOS = async () => {
//     const openSetting = () => {
//       Linking.openSettings().catch(() => {
//         Alert.alert('Unable to open settings');
//       });
//     };
//     const status = await Geolocation.requestAuthorization('whenInUse');

//     if (status === 'granted') {
//       return true;
//     }

//     if (status === 'denied') {
//       Alert.alert('Location permission denied');
//     }

//     if (status === 'disabled') {
//       Alert.alert(
//         `Turn on Location Services to allow  to determine your location.`,
//         '',
//         [
//           { text: 'Go to Settings', onPress: openSetting },
//           { text: "Don't Use Location", onPress: () => {} },
//         ],
//       );
//     }

//     return false;
//   };

//   const hasLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       const hasPermission = await hasPermissionIOS();
//       return hasPermission;
//     }

//     if (Platform.OS === 'android' && Platform.Version < 23) {
//       return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (hasPermission) {
//       return true;
//     }

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) {
//       return true;
//     }

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//       ToastAndroid.show(
//         'Location permission denied by user.',
//         ToastAndroid.LONG,
//       );
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//       ToastAndroid.show(
//         'Location permission revoked by user.',
//         ToastAndroid.LONG,
//       );
//     }

//     return false;
//   };

//   const getLocation = async () => {
//     const hasPermission = await hasLocationPermission();

//     if (!hasPermission) {
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       position => {
//         console.log("getCurrentPosition",position)
//         setLocation(position);
//         console.log(position);
//       },
//       error => {
//         Alert.alert(`Code ${error.code}`, error.message);
//         setLocation(null);
//         console.log(error);
//       },
//       {
//         accuracy: {
//           android: 'high',
//           ios: 'best',
//         },
//         enableHighAccuracy: highAccuracy,
//         timeout: 15000,
//         maximumAge: 10000,
//         distanceFilter: 0,
//         forceRequestLocation: forceLocation,
//         forceLocationManager: useLocationManager,
//         showLocationDialog: locationDialog,
//       },
//     );
//   };

// console.log("MAP ________",location?.coords)
//   return (
//     <View style={styles.mainContainer}>
//     {  location?.coords ?<MapView coords={location?.coords || null} />:null}

//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.contentContainer}>
//         <View>
//           <View style={styles.option}>
//             <Text>Enable High Accuracy</Text>
//             <Switch onValueChange={setHighAccuracy} value={highAccuracy} />
//           </View>

//           {Platform.OS === 'ios' && (
//             <View style={styles.option}>
//               <Text>Use Significant Changes</Text>
//               <Switch
//                 onValueChange={setSignificantChanges}
//                 value={significantChanges}
//               />
//             </View>
//           )}

//           {Platform.OS === 'android' && (
//             <>
//               <View style={styles.option}>
//                 <Text>Show Location Dialog</Text>
//                 <Switch
//                   onValueChange={setLocationDialog}
//                   value={locationDialog}
//                 />
//               </View>
//               <View style={styles.option}>
//                 <Text>Force Location Request</Text>
//                 <Switch
//                   onValueChange={setForceLocation}
//                   value={forceLocation}
//                 />
//               </View>
//               <View style={styles.option}>
//                 <Text>Use Location Manager</Text>
//                 <Switch
//                   onValueChange={setUseLocationManager}
//                   value={useLocationManager}
//                 />
//               </View>
//               <View style={styles.option}>
//                 <Text>Enable Foreground Service</Text>
//                 <Switch
//                   onValueChange={setForegroundService}
//                   value={foregroundService}
//                 />
//               </View>
//             </>
//           )}
//         </View>
//         <View style={styles.buttonContainer}>
//           <Button title="Get Location" onPress={getLocation} />
//           <View style={styles.buttons}>
//             {/* <Button
//               title="Start Observing"
//               onPress={getLocationUpdates}
//               disabled={observing}
//             /> */}
//             {/* <Button
//               title="Stop Observing"
//               onPress={stopLocationUpdates}
//               disabled={!observing}
//             /> */}
//           </View>
//         </View>
//         <View style={styles.result}>
//           <Text>Latitude: {location?.coords?.latitude || ''}</Text>
//           <Text>Longitude: {location?.coords?.longitude || ''}</Text>
//           <Text>Heading: {location?.coords?.heading}</Text>
//           <Text>Accuracy: {location?.coords?.accuracy}</Text>
//           <Text>Altitude: {location?.coords?.altitude}</Text>
//           <Text>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
//           <Text>Speed: {location?.coords?.speed}</Text>
//           <Text>Provider: {location?.provider || ''}</Text>
//           <Text>
//             Timestamp:{' '}
//             {location?.timestamp
//               ? new Date(location.timestamp).toLocaleString()
//               : ''}
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   contentContainer: {
//     padding: 12,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingBottom: 12,
//   },
//   result: {
//     borderWidth: 1,
//     borderColor: '#666',
//     width: '100%',
//     padding: 10,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginVertical: 12,
//     width: '100%',
//   },
// });
