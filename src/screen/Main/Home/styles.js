import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    Image:{

        width: '100%',
        height: 220,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    title:{

        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        width: '70%',
        marginLeft: 25,
        marginTop: 60,
      },

      
      button: {
        backgroundColor: '#0999f4',
        width: 200,
        height: 40,
        borderRadius: 10,
        marginTop: 25,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "black",
        shadowOpacity: 1,
        
        
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },
      searchButton: {
        backgroundColor: '#fff',
        height: 50,
        width: Dimensions.get('screen').width - 50,
        borderRadius: 25,
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        zIndex: 100,
       
      },
      searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    



 
});

export default styles;