import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import firebase from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';

class Dashboard extends Component {
  state = {
    recentFlowers: []
  };
  async componentDidMount() {
    try {
      const flowers = [];
      const db = firebase.firestore();
      const querySnapshot = await db.collection('Flower').get();
      querySnapshot.forEach(doc => {
        flowers.push({ id: doc.id, ...doc.data() });
      });
      this.setState({
        recentFlowers: flowers
      });
    } catch (error) {}
  }

  render() {
    const { recentFlowers } = this.state;
    return (
      <ScrollView vertical={true}>
        <View style={styles.container}>
          <Text>Flower Snap</Text>
          <View>
            {recentFlowers.map(flower => (
              <View style={styles.flowerItem}>
                <Text>Name: {flower.name}</Text>
                <Text>Description: {flower.description}</Text>
                <Text>Means: {flower.meaning}</Text>
                <Image source={{ uri: flower.image }} />
              </View>
            ))}
          </View>

          <Button
            title="Add Flower"
            onPress={() => this.props.navigation.navigate('AddFlower')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flowerItem: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: Dashboard }
});

export default AppDrawerNavigator;
