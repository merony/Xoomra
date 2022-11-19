import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({


        container: {
          flex: 1,
          alignItems: 'center',
         
        },

        headerTitle :{

          fontSize: 24,
          fontWeight: '500',
          color: '#030f14',
          marginBottom: 0
          
      },
        selectButton: {
          borderRadius: 5,
          width: 150,
          height: 50,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#030f14',
        },
        uploadButton: {
          borderRadius: 5,
          width: 100,
          height: 30,
          backgroundColor: '#ffb6b9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20
        },
        buttonText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: '400'
        },
        imageContainer: {
          marginTop: 20,
          marginBottom: 20,
          alignItems: 'center'
        },
        progressBarContainer: {
          marginTop: 20
        },
        imageBox: {
          width: 200,
          height: 200
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