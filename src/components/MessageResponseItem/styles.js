import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        marginVertical:15,
        flexDirection:'row',

    },    
    content:{
        backgroundColor:'blue',
        margin:15,
    },    
 
    row:{
        flexDirection:'row',
        alignItems:'flex-end',

    },   
    name:{
        fontWeight:'bold',
        fontSize:14,
    },        
    image:{
        width:35,
        height:35,
        borderRadius:20,
        marginRight:15,
    },
    time:{
        color:'grey',
        fontSize:10,
        paddingLeft:5,
        paddingBottom:1.5
    },
    text:{
        // fontWeight:'bold',
        fontSize:14,
        paddingTop:3,
        

    }


 
});

export default styles;