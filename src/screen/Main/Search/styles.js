import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({


    formInput :{
        
        
        paddingVertical:0,
        borderBottomColor: '#e3f3fd',
        fontSize: 16,
        backgroundColor: '#e3f3fd',
        borderBottomWidth: 2,
        paddingBottom: 5,
        marginBottom: 20,
    },

    container :{
        margin: 20,

       
    },

    row:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        paddingBottom: 5,

       
    },


    searchRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginHorizontal: 20,
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        paddingBottom: 5,

       
    },

    iconContainer:{

    
    },

    locationText: {

        fontSize: 14,

    },

    customBTN : {
        backgroundColor: '#0999f4',
        padding: 15,
        borderRadius: 10,
        marginTop: '25%',
        marginBottom: 10,
        textTransform: 'uppercase'
    
        
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
