import React, { Component } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';

class AddFlower extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>Flower Snap</Text>
        </TouchableOpacity>
        <Text>Add Flower </Text>
        <Button
          title="Login"
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
  }
});

export default AddFlower;
