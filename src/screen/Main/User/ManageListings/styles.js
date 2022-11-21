import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formField:{

        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: 8,
        marginVertical : 3,
        alignItems:'center',
        borderRadius:10,
        backgroundColor: '#e3f3fd'
        

        
    },
    formFieldDetails:{

        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: 8,
        marginVertical : 3,
        borderRadius:10,
        backgroundColor: '#e3f3fd',

        
    },
    scrollViewContainer:{
        // flex:1,
        height:550,
        marginHorizontal:20,
        

    },
    HeadTitle:{

        fontSize:24,
        alignSelf:'center',
        fontWeight:'bold',
        color:'black',
        marginTop:20,
        
    },

    title:{
        marginBottom:2
        // backgroundColor:'red'
    },

    subContainer:{
        marginTop:25
    },
    formInput :{
        // flex: 1,
        paddingVertical:0
    },
    formInputDetails :{
        paddingVertical:0,
    },
    customBTN : {
        backgroundColor: '#0999f4',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 25,
        width:'90%',
        marginHorizontal:20,
        // height:60,
        
    },
    textBTN: {
        textAlign : 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase',
        
    },
    icon:{
        marginLeft:5
    },
    pickerContainer:{
        width:"100%",
        paddingLeft:1,
        alignSelf:'center',
        backgroundColor:'#e3f3fd',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:10,

    },
    picker:{
        height:50,
        fontSize:10
    },
    howItWorks:{
        marginTop:20,
    }

  
 
});

export default styles;