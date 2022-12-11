//this code from react native documentation

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { GeoCoordinates } from 'react-native-geolocation-service';
import RNMapView, { Circle, Marker } from 'react-native-maps';

// interface MapViewProps {
//   coords: GeoCoordinates | null;
// }

const MapView = ({ coords }) => {
  const mapRef = useRef(null);
// const mapRef = useRef();
    const [selectedLocation,setselectedLocation]=useState({
        lat:22.656096, 
        lng:75.641490
    });
  useEffect(() => {
    console.log("myREf**********","coords",coords)
    if (!!coords && mapRef.current) {
        console.log(coords,"coords")
      mapRef.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [coords]);

  function selectLocationHandler(event){
    console.log("OnClick",event.nativeEvent.coordinate.latitude)
    const lat =event.nativeEvent.coordinate.latitude;
    const lng=event.nativeEvent.coordinate.longitude;

    setselectedLocation({lat:lat,lng:lng}) 
 }
  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 23.7603,
            longitude: 90.4125,
          },
          heading: 0,
          pitch: 0,
          zoom: 11,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}
        onPress={(evt)=>selectLocationHandler(evt)}>
        {coords && (
          <>
            <Marker
              anchor={{ x: 0.5, y: 0.6 }}
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lat,
              }}
              flat
              style={{
                ...(coords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${coords.heading}deg`,
                    },
                  ],
                }),
              }}>
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              radius={coords.accuracy}
              strokeColor="rgba(0, 170, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
          </>
        )}
      </RNMapView>
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },
});