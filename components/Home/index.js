import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Flower Snap</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Add Flower"
          onPress={() => this.props.navigation.navigate('AddFlower')}
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
  }
});

export default Home;
