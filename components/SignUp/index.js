import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
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

  handleSignUp = () => {
    const { email, password } = this.state;
    const db = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('users').add({
          email: text,
          username: text,
          password: text,
          favourite: array
        });
        this.props.navigation.navigate('AddFlower');
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
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>Flower Snap</Text>
        </TouchableOpacity>
        <Text>Sign up</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          style={styles.textInput}
          value={email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="Enter username"
          autoCapitalize="none"
          style={styles.textInput}
          value={username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={confirmPassword}
        />
        <Button title="Sign up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});

export default SignUp;
