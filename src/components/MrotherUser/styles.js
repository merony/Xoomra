import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
container:{
    flexDirection:'column',
    // height:'70%',
    flex:1


},


mainContainer:{
    flexDirection:'row',
    // margin:20,
    paddingTop:20,
    paddingHorizontal:20,
    borderBottomWidth:0.5,
    borderBottomColor:'gray'

},
list:{
    paddingBottom:20,
    paddingHorizontal:20,
},
inputBox:{
},
listContainer:{
    // backgroundColor:'red'
    flex:1
},

listingContainer:{
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    borderWidth:0.2,
    marginVertical:10,
    width:90,
    borderRadius:5,
    paddingVertical:2,
    fontSize:14,

},

image:{
    width:40,
    height:40,
    borderRadius:10,

    
},
column:{
    flexDirection:'column',
    marginLeft:10,
},
title:{
    fontSize:14,
    fontWeight:'bold',
    textDecorationLine:'underline',
    color:'black'
},


customBTN : {
    backgroundColor: '#0999f4',
    padding: 20,
    borderRadius: 10,
    marginTop: 0,

},


    textBTN: {
        textAlign : 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase'
    },

});

export default styles;