import { Dimensions, StyleSheet } from 'react-native';



    const styles = StyleSheet.create({
        mainTitle1:{
            fontSize:24,
            fontWeight:'bold',
            marginTop:15,
            paddingHorizontal:15,
        },
        title:{
            fontSize:24,
            height:90,
            textAlignVertical:'center',
            fontWeight:'bold',
            color:'black',
            width:'95%'
            
    
        },
        image:{
            width:100,
            height:80,
            borderRadius:10,
        },
        mainTitle2:{
            fontSize:24,
            fontWeight:'bold',
            paddingHorizontal:15,
        },
        tabMenu:{
            width:'100%',
            alignSelf:'center',
            paddingVertical:10,
            paddingHorizontal:15,
        },
        subTabMenu:{
            flexDirection:'row',
            marginTop:10,
            borderBottomColor:'grey',
            borderBottomWidth:0.5
        },
        tabMenuTitle:{
            width:'50%',
            fontSize:14,
            textAlign:'center'
    
        },
        tabMenuTitleFocused:{
            width:'50%',
            fontSize:14,
            textAlign:'center',
            backgroundColor:'#cccbc8',
        },
        subTitle:{
            fontSize:18,
            marginTop:20,
            color:'black'
    
    
        },
        getInTouch:{
            backgroundColor:'black',
    
        },
        customBTN : {
            backgroundColor: '#0999f4',
            padding: 15,
            borderRadius: 10,
            marginBottom: 30,
            marginTop: 25,
            width:'90%',
            marginLeft:'5%'
            
        },
        textBTN: {
            textAlign : 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff',
            textTransform: 'uppercase',
            
        },
        titleGetInTouch:{
            color:'white',
            fontSize:18,
            fontWeight:'bold',
            width:'80%',
            marginLeft:'10%',
            marginTop: 25,
            
        },
        textGetInTouch:{
            color:'white',
            fontSize:14,
            width:'80%',
            marginLeft:'10%',
        },
        cell:{
            flexDirection:'row',
            alignItems:'center',
            borderBottomWidth:0.5,
            borderBottomColor:'grey',
            marginTop:20,
            paddingBottom:20,
    
        },
        cellContainer:{
            marginTop:20,
            marginBottom:10
        },
        textInCell:{
            color:'black',
            flex:1,
            fontSize:14,
            marginLeft:5
        },
        segmentTitle:{
            fontSize:18,
            fontWeight:'bold',
            marginTop:20,
            marginBottom:10,

        },
        singleTripContainer:{
            flexDirection:'row'
        },
        datesContainer:{
            flexDirection:'row'
        },
        rowContainer:{
            marginLeft:10,
            justifyContent:'space-evenly'
        },
        subTitle2:{
            fontWeight:'bold',
            width:250
        },
        container1:{
            marginBottom:10,
        }
    
      
     
    });
    
    export default styles;
 
