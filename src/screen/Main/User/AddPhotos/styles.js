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
          width: 150,
          height: 50,
          backgroundColor: '#ffb6b9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20
        },
        buttonText: {
          color: '#030f14',
          fontSize: 18,
          fontWeight: '400'
        },
        imageContainer: {
          marginTop: 30,
          marginBottom: 50,
          alignItems: 'center'
        },
        progressBarContainer: {
          marginTop: 20
        },
        imageBox: {
          width: 250,
          height: 250
        }
      
 
});

export default styles;