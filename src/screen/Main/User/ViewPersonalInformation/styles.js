import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    headerTitle :{

        fontSize: 24,
        fontWeight: '500',
        color: '#030f14',
        marginBottom: 20,
        marginLeft:5
        
    },

    formField:{

        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom : 25,
        
    },

    formInput :{
        backgroundColor: '#e3f3fd',
        flex: 1,
        paddingVertical:0
    },


    dropField:{

        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom : 25,
        zIndex:999
        // backgroundColor: '#fff',
   
    
    },

    dropInput :{
        backgroundColor: '#e3f3fd',
        flex: 1,
        paddingVertical:0,
        borderWidth:0,
        marginHorizontal:0,
        width: 350,
        
        
    
    },

    customBTN : {
        backgroundColor: '#0999f4',
        padding: 20,
        borderRadius: 10,
        marginBottom: 50,
        marginTop: 25
        
    },

    textBTN: {
        textAlign : 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase'
    },
    infoContainer:{
        flexDirection:"column",
        margin:10,
        borderBottomColor:'#d9d9d9',
        borderBottomWidth:1,
        marginVertical:8,
        paddingVertical:2
    },
    infoDesc:{
        color:'black',
        fontWeight:'470',
        fontSize:18,
        marginVertical:5
    },
    infoValue:{
        fontSize:16,
        fontWeight:'450',
        paddingBottom:8
    }

 
});

export default styles;