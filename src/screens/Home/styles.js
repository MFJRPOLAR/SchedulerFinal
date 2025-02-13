import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    margin: 10,
  },
  description: {
    fontSize: 20,
    fontWeight: 'normal',
    position: 'absolute',
    top: 0,
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  bottom: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 200,
  },
  button: {
    backgroundColor: 'black',
    // margin: 0,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 100,
    width: Dimensions.get('screen').width - 20,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;