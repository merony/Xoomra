import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    image:{
        width:100,
        height:60,
        borderRadius:10
    },
    cellContainer:{
        flexDirection:'row'
    },
    infoContainer:{
        marginLeft:5,
        justifyContent:'space-between'
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',

    },
    edit:{
        flex:0.6,
        backgroundColor:'#0999f4',
        borderRadius:7,
        marginHorizontal:5,
        height:20,
        marginTop:12
    },
    subContainer:{
        flex:2
    },
    published:{
        flex:1.3,
        textAlign:'left',
        color:'green',
        fontWeight:'bold',
        marginTop:12
    },
    unPublished:{
        textAlign:'left',
        color:'grey',
        fontWeight:'bold',
        marginTop:12

    },
    pickerContainer:{
       
    },
    title:{
        fontWeight:'bold',
        width:250
    },
    editText:{
        textAlign:'center',
        color:'white',
        fontWeight:'bold'
    },
    boxStyles:{
        borderWidth:0
        
    },
    inputStyles:{
        

    },
    dropdownStyles:{
        fontSize:10,
    }
 
});

export default styles;