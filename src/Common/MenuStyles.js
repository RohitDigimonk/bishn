import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  btnIcon: {
    height: 25,
    width: 25,
    resizeMode:'contain',
    left:40,
    marginRight:20,
    
  },
  btnText: {
    // fontFamily: 'Poppins',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
    color: 'white',
    fontWeight: "bold",
    justifyContent:'flex-start',
    left:30
  }
});

export default styles;
