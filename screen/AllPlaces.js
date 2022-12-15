import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import PlaceList from  '../components/Place/PlacesList'
function AllPlaces({route}) {

    const  [loadedPlaces,setLoadedPlaces]=useState([]);
    const isFouced= useIsFocused();
    useEffect (()=> {
        if(isFouced && route.params){
            setLoadedPlaces(curPlaces => [...curPlaces,route.params.place]);
        }
    } ,[isFouced,route]);
  
    return (<PlaceList places={loadedPlaces}/>)
}
export default AllPlaces;
