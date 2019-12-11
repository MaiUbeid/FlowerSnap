import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import firebase from '../../firebase';
import 'firebase/auth';

class Login extends Component {
  state = { email: '', password: '', errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Landing')}
        >
          <Image
            style={styles.logo}
            source={{ uri: 'https://i.imgur.com/mlc46Hj.png' }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Welcome Back!!</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.textInput}
          value={email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton}>
          <Button title="Login" onPress={this.handleLogin} color="#f25979" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={{ color: '#FFFFFF' }}>
            Don't have an account?
            <Text style={{ fontWeight: 'bold', color: '#f25979' }}>
              {' '}
              SignUp
            </Text>
          </Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  heading: {
    fontSize: 28,
    color: '#f25979',
    fontWeight: '700',
    paddingBottom: 20
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    color: '#FFFFFF',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10
  },
  loginButton: {
    width: '80%',
    paddingBottom: 10,
    marginTop: 30,
    borderRadius: 10
  }
});

export default Login;
