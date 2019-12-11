import React, { Component } from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';

import firebase from '../../firebase';
import 'firebase/auth';
import Login from '../Login';

class Logout extends Component {
  state = {
    loggedIn: null
  };

  async componentDidMount() {
    try {
      await firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderComponent() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      );
    } else {
      return <Login />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton}>
          <Button
            color="f25979"
            title="Logout"
            onPress={() => {
              {
                this.renderComponent();
              }
              this.props.navigation.navigate('Login');
            }}
          />
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
  logoutButton: {
    width: '80%',
    paddingBottom: 10,
    marginTop: 30,
    borderRadius: 10
  }
});

export default Logout;
