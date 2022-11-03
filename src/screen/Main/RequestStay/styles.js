import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    Image: {

        width: '100%',
        //aspectRatio: 3/3,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,

    },
    hostImage:{

        width: 120,
        //aspectRatio: 3/3,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    stayTtile :{

        fontSize: 14,
        paddingTop: 5,
        paddingLeft:10,
        fontWeight: "700",
    },   
    title :{

        fontSize: 14,
        paddingTop: 1,
        paddingLeft:10,
        fontWeight: "700",
        height:40,
        width:'90%'
    },    
     stayDetailsTitle:{

        fontSize: 18,
        paddingTop: 5,
        paddingLeft:10,
        fontWeight: "700",
        color:'black',
    }, 
     stayDetailsSubTitle:{
        fontSize: 10,
        paddingTop: 5,
        paddingLeft:10,
        fontWeight: "300",
        color:'black',
    },

    formInput :{
        backgroundColor: '#e3f3fd',
        paddingVertical:0,
        height:100,
        width:'100%',
        
    },
    customBTN : {
        backgroundColor: '#0999f4',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 5,
        alignItems:'center',
        
    },requestSubtitle:{
        fontSize: 15,
        paddingTop: 5,
        paddingLeft:10,
        fontWeight: "500",
        color:'black',
    },  textBTN: {
        textAlign : 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase'
    },  empty: {
        height : 10,

    },
 
});

export default styles;