import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10,
        // backgroundColor:'red',
        height:100,
        borderBottomWidth:0.5,
        borderBottomColor:'grey',
        
    },    
    content:{
        flex:1,

        // backgroundColor:'red'
    },    
    row1:{
        flexDirection:'row',
    },   
    row2:{
        flexDirection:'row',
    },   
    name:{
        marginRight:20,
        fontWeight:'bold',
        marginBottom:2,
    },    
    interest:{
        marginRight:20,
        color:'grey',
    },    
    subTitle:{
        color:'gray'
    },      
    image:{
        width:60,
        height:60,
        borderRadius:50,
        marginRight:15,
    },


 
});

export default styles;