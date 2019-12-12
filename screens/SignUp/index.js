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
import 'firebase/firestore';

class SignUp extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    errorMessage: null
  };

  handleSignUp = async () => {
    const { email, username, password } = this.state;
    const db = firebase.firestore();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('users').add({
          email,
          username,
          favourite: null
        });
        this.props.navigation.navigate('Home');
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const {
      email,
      username,
      password,
      confirmPassword,
      errorMessage
    } = this.state;
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
        <Text style={styles.heading}>Create a new account </Text>

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
          placeholder="Enter username"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.textInput}
          value={username}
          onChangeText={username => this.setState({ username })}
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
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={confirmPassword}
        />
        <TouchableOpacity style={styles.signupButton}>
          <Button title="Sign up" onPress={this.handleSignUp} color="#f25979" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{ color: '#FFFFFF' }}>
            Already have an account?
            <Text style={{ fontWeight: 'bold', color: '#f25979' }}> Login</Text>
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
  signupButton: {
    width: '80%',
    paddingBottom: 10,
    marginTop: 30,
    borderRadius: 10
  }
});

export default SignUp;
