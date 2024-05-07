import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  color: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default styles;