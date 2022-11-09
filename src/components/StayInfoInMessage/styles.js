import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        // margin:20,
        paddingTop:20,
        paddingHorizontal:20,
        borderBottomWidth:0.5,
        borderBottomColor:'gray'

    },
    image:{
        width:40,
        height:40,
        borderRadius:10,

        
    },
    column:{
        flexDirection:'column',
        marginLeft:10,
    },
    title:{
        fontSize:14,
        fontWeight:'bold',
        textDecorationLine:'underline',
        color:'black'
    },
    listingContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0.2,
        marginVertical:10,
        width:90,
        borderRadius:5,
        paddingVertical:5,
        fontSize:14,




    }



 
});

export default styles;