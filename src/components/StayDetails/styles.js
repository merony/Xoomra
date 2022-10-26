import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({


        container: {
            margin: 20,

        },

    Image: {

        width: '100%',
        //aspectRatio: 3/3,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,

    },

    stayTtile :{

        fontSize: 14,
        paddingTop: 5,
        fontWeight: "700",
    },

    stayLocations :{
        fontSize: 14,
        paddingTop: 5,

    },

    stayDescription :{
        fontSize: 10,
        paddingTop: 5,

    },
    customBTN : {
        backgroundColor: '#0999f4',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 25,
        alignItems:'center',
        width:'50%'
        
    },

    reserveArea : {
        flexDirection:'column',
       
    },
 
});

export default styles;
