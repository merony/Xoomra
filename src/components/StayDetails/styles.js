import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({


        container: {
            margin: 20,

        },
           textBTN: {
            textAlign : 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff',
            textTransform: 'uppercase'
        },

    Image: {

        width: '100%',
        //aspectRatio: 3/3,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,

    },hostImage:{

        width: 50,
        //aspectRatio: 3/3,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 50,
    },

    stayTtile :{

        fontSize: 14,
        paddingTop: 5,
        paddingLeft:10,
        fontWeight: "700",
        
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

    stayLocations :{
        fontSize: 14,
        paddingLeft:10,
        paddingTop: 5,

    },

    stayDescription :{
        fontSize: 10,
        paddingTop: 15,
        paddingBottom:15,




    },
    customBTN : {
        backgroundColor: '#0999f4',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 5,
        alignItems:'center',
        
    },

    reserveArea : {
        flexDirection:'row', 
        justifyContent:'center',   
    },

    totalPrice :{
        fontSize: 16,
        paddingTop: 5,
        fontWeight: "700",
        width:'50%',
        textAlign:'center',
        fontColor:'red',

    },

    total :{
        fontSize: 16,
        paddingTop: 5,
        fontWeight: "700",
        marginLeft:15,
        marginRight:15,
    },

    totalDate :{
        fontSize: 16,
        paddingTop: 5,
        fontWeight: "700",
        width:150,
        textAlign:'center',
    },

    totalNights :{
        fontSize: 16,
        paddingTop: 5,
        fontWeight: "700",
        width:'50%',
        textAlign:'center',
    },
    datePickerContainer :{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',


    },
    datePickerComponent:{
        backgroundColor:'red'

    },
    titleContainer:{
        flexDirection:'row'
    }

 
});

export default styles;
