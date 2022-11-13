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
        
    },

    formInput :{
        backgroundColor: '#e3f3fd',
        flex: 1,
        paddingVertical:0
    },

    customBTN : {
        backgroundColor: '#009900',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 25
        
    },

    customSaveBTN : {
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
        textTransform: 'uppercase'
    }
 
});

export default styles;