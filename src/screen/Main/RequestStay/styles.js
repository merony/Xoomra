import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

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
        paddingLeft:10,
        fontWeight: "700",
    },

    formInput :{
        backgroundColor: '#e3f3fd',
        paddingVertical:0,
        height:100
        
    },
    customBTN : {
        backgroundColor: '#0999f4',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 5,
        alignItems:'center',
        margin:20
        
    },
 
});

export default styles;