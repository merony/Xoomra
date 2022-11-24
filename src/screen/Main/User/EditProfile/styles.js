import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    headerTitle :{

        fontSize: 24,
        fontWeight: '500',
        color: '#030f14',
        marginBottom: 30
        
    },

    formField:{

        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom : 25,
        marginHorizontal:15
        
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
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 0,
        marginTop: 10,
   
       
        
    },




    textBTN: {
        textAlign : 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        marginHorizontal:20,
        textTransform: 'uppercase'
    }
 
});

export default styles;