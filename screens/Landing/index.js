import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Flower Snap</Text>
        <Image
          style={styles.logo}
          source={{ uri: 'https://i.imgur.com/mlc46Hj.png' }}
        />

        <Text style={styles.about}>Lorem ipsum dolor sit amet.</Text>

        <TouchableOpacity style={styles.loginButton}>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
            color="#f25979"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={styles.signUp}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222'
  },
  heading: {
    fontSize: 32,
    color: '#f25979',
    paddingBottom: 20,
    fontFamily: 'Satisfy'
  },
  logo: {
    width: 200,
    height: 200
  },
  about: {
    margin: '8%',
    color: '#FFFFFF'
  },
  loginButton: {
    width: '70%',
    paddingBottom: 10
  },
  signUp: {
    color: '#FFFFFF'
  }
});

export default Landing;
