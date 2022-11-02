import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container:{

        flexDirection: "column",
        padding: 20,
    
    },


    bodyText: {

        fontSize: 14,
        width : Dimensions.get('screen').width - 76,
        paddingLeft : 10,

    },

   

    profileText: {

        fontSize: 14,
        width : Dimensions.get('screen').width - 105,
        paddingLeft : 10,
        fontWeight: 'bold',

    },

    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        borderBottomWidth: 0.6,
        borderColor: '#bec2c5',
        paddingBottom: 10,
        marginLeft: 0
       
       

    },

 
});

export default styles;