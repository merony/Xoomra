import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    title:{
        fontSize:24,
        marginVertical:20,
        color:'black',
        fontWeight:'bold',
        textAlign:'center'

    },
    listContainer:{
        height:580
    },
    topButton:{
        position:'absolute',
        right:0,
        bottom:70,
        width:25,
        height:25,
        backgroundColor:'#0999f4',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,

    },
    btnText:{
        color:'white',
        fontSize:10,
        fontWeight:'bold'
    }
 
});

export default styles;