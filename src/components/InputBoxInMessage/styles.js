import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input:{
    borderColor:'grey',
    borderWidth:1,
    paddingHorizontal:10,
    marginHorizontal:20,
    borderRadius:30,
    height:40,
    marginTop:20,
    fontSize:14,

},
inputContainer:{
    borderColor:'grey',
    borderWidth:1,
    paddingHorizontal:10,
    marginHorizontal:20,
    borderRadius:30,
    height:40,
    marginTop:20,
    fontSize:14,
    flexDirection:'row',
    alignItems:'center'
},
inputContainerBeneathOption:{
    borderColor:'grey',
    borderWidth:1,
    paddingHorizontal:10,
    marginHorizontal:5,
    borderRadius:30,
    height:40,
    marginTop:5,
    fontSize:14,
    flexDirection:'row',
    alignItems:'center'
},
inputFocus:{
    fontSize:14,
},
datePickerContainer :{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    margin:10,
    marginLeft:30,
    width:100


},
 
});

export default styles;