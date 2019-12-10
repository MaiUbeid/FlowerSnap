import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import firebase from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';

class Dashboard extends Component {
  listFlowers = async () => {
    const db = firebase.firestore();
    const querySnapshot = await db.collection('Flower').get();
    querySnapshot.forEach(doc => {
      console.log(doc.data());
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Flower Snap</Text>
        <Button title="view flowers" onPress={() => this.listFlowers()} />

        <Button
          title="Add Flower"
          onPress={() => this.props.navigation.navigate('AddFlower')}
        />
      </View>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: Dashboard }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AppDrawerNavigator;
