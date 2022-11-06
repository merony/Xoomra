import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:20,

        // backgroundColor:'red',
        height:120,
        borderBottomWidth:0.5,
        borderBottomColor:'grey',
        alignItems:'center'
        
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
        color:'grey',
    },   
    interestDot:{
        color:'grey',
        marginHorizontal:5,
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