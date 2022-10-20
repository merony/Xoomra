import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({


    searchButton: {
        backgroundColor: '#fff',
        height: 50,
        width: Dimensions.get('screen').width - 50,
        borderRadius: 25,
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        paddingLeft: 20,
        borderWidth:0.8,
        borderColor: 'lightgrey' ,
        top: 20,
        zIndex: 100,

     
       
      },

      searchButtonText: {
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: 10,
      },

 
});

export default styles;
