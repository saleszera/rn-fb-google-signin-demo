import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: Dimensions.get('window').width - 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    justifyContent: 'center',
    width: '100%',
    height: 36,
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: '#5f8afc',
  },
  signOutButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f8f8f8',
  },
  textContainer: {
    width: Dimensions.get('window').width - 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#30313c',
  },
  normalText: {
    fontSize: 18,
    color: '#717579',
  },
});
