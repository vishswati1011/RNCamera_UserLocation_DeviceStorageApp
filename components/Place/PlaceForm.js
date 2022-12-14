import { useCallback, useState } from "react";
import { ScrollView, TextInput, View ,Text,StyleSheet} from "react-native";
import {Colors} from '../constants/Colors'
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../Model/place";

function PlaceForm ({onCreatePlace}) {

    const [enteredTitle,setEnteredTitle]=useState();
    const [selectedImage,setSelectedImage]=useState();
    const [pickedLocation,setPickedLocation]=useState();
    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText)
    }
    function takeImageHandler (imageUrl) {
        setSelectedImage(imageUrl);
    }
    const pickLocationHandler = useCallback((location) =>{
        setPickedLocation(location)
    },[])
    function savePalceHandler () {
        const placeData = new Place(enteredTitle,selectedImage,pickedLocation)
        onCreatePlace(placeData)
    }
    return (
        <ScrollView style={styles.form}>
            <View >
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler}/>
            </View>
            <ImagePicker 
                onTakeImage={takeImageHandler}
            />
            <LocationPicker   onPickLocation={pickLocationHandler}/>
            <Button onPress={savePalceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles=StyleSheet.create({
    form:{
        flex:1,
        padding:24,
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500,
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100,
    }
})
