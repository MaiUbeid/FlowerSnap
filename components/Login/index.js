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

class Login extends Component {
  state = { email: '', password: '', errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('AddFlower'))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>Flower Snap</Text>
        </TouchableOpacity>
        <Text>Login</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          style={styles.textInput}
          value={email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Dont have an account? SignUp"
          onPress={() => this.props.navigation.navigate('SignUp')}
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

export default Login;
