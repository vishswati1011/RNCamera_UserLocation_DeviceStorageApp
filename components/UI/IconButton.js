import { Pressable ,StyleSheet} from "react-native";
import  Iconicons  from "react-native-vector-icons/FontAwesome";
function IconButton ({icon,size,color,onPress}) {

    return ( 
    <Pressable 
         style={({pressed})=>[styles.button,pressed && styles.pressed]}
         onPress={onPress}>
        <Iconicons 
            name={icon} 
            size={size} 
            color={color}
        />
    </Pressable>
    )
}

export default IconButton;
const styles= StyleSheet.create({

    button:{
        padding:8,
        justifyContent:'center',
        alignItems:'center'
        },
      pressed:{
        opacity:0.7
      }

})