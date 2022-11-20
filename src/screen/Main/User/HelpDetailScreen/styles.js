import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image:{
        width:350,
        height:200,

    },
    title:{
        fontSize:24,
        color:'black',
        fontWeight:'bold',
        paddingVertical:10,

    },
    subTitle:{
        fontSize:14,
        color:'black',
        fontWeight:'bold',
        paddingTop:10,
    },
    text:{
        fontSize:14,
        paddingTop:5,
    },
    scrollViewContainer:{
        height:'88%'
    },
    scrollView:{
        flexDirection: "column",
        marginHorizontal:20
    },
    customBTN : {
        backgroundColor: '#0999f4',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,
        width:'92%',
        marginLeft:'4%'
        
    },
    textBTN: {
        textAlign : 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase',
        
    },



 
});

export default styles;