import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  image:{
    width:100,
    height:100,
    borderRadius:50,

  },
  subContainer1:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
  },   
  stayDetailsSubTitle:{
    fontSize: 14,
    paddingTop: 5,
    paddingLeft:15,
    fontWeight: "300",
    color:'black',

},
subContainer2:{
    borderBottomColor:'#cacccb',
    borderBottomWidth:0.7,
    paddingBottom:20,
    marginTop:20
},
image1:{
    width:'100%',
    height:200,
    marginTop:15
},
stayDetailsSubTitle1:{
    fontSize: 14,
    paddingTop: 5,
    paddingLeft:2,
    fontWeight: "300",
    color:'black',
},
stayDetailsSubTitleLink:{
    fontSize: 14,
    paddingTop: 5,
    paddingLeft:15,
    fontWeight: "300",
    color:'black',
    textDecorationLine:'underline'
},
name:{
    fontSize:24,
    color:'black',
    fontWeight:'bold',
    marginVertical:5
},
name1:{
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    marginVertical:5
},
image2:{
    width:40,
    height:40,
    borderRadius:15,

},
infoContainer:{
    flexDirection:'row',
    alignItems:'center'
},
personalInfoContainer:{
    marginLeft:15
},
reviewText:{
    marginVertical:5
},
singleReviewContainer:{
    marginVertical:10
},
listContainer1:{
    height:600
}
 
});

export default styles;