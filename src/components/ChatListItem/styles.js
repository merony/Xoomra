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
        fontSize:14,
    },    
    interest:{
        color:'grey',
        fontSize:14,
    },   
    interestDot:{
        color:'grey',
        marginHorizontal:5,
        fontSize:14,
    },  
    subTitle:{
        color:'gray',
        fontSize:14,
    },      
    image:{
        width:60,
        height:60,
        borderRadius:50,
        marginRight:15,
    },


 
});

export default styles;