
import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from   '@react-navigation/native-stack'
import AllPlaces from './screen/AllPlaces'
import AddPlace from './screen/AddPlace'
import { StyleSheet } from 'react-native';
import IconButton from './components/UI/IconButton';
import { Colors } from './components/constants/Colors';
import Map from './screen/Map';
const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700},
        }}>
             <Stack.Screen 
             name="AllPlaces" 
             component={AllPlaces} 
             options={({navigation})=>
              ({
                title:'Your Favorite Places',
                headerRight: ({tintColor})=> (
                <IconButton icon="plus-square-o"
                      color={tintColor}
                      size={24}
                      onPress={()=> navigation.navigate('AddPlace')} 
              
                 /> 
                ),
              })}
              />
        <Stack.Screen name="AddPlace" component={AddPlace}
          options={{
            title:"Add a new place"
          }}
        />
        <Stack.Screen name="Map"  component={Map}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;

const styles = StyleSheet.create({
  
 
});
