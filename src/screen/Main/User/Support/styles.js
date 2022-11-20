import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formField:{

        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: 8,
        marginVertical : 3,
        width:'90%',
        marginLeft:'5%',
        alignItems:'center',
        borderRadius:10,
        backgroundColor: '#e3f3fd'
        

        
    },
    formFieldDetails:{

        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: 8,
        marginVertical : 3,
        width:'90%',
        marginLeft:'5%',
        borderRadius:10,
        backgroundColor: '#e3f3fd',

        
    },
    scrollViewContainer:{
        // flex:1,
        height:550,
        width:'100%'
    },
    HeadTitle:{

        fontSize:24,
        alignSelf:'center',
        fontWeight:'bold',
        color:'black',
        marginTop:20,
    },

    title:{
        marginLeft:'10%',
        width:'80%',
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
        width:'80%',
        marginLeft:'10%',
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
        width:"90%",
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
        width:'80%',
        marginLeft:'10%',
        marginTop:20
    }

  
 
});

export default styles;