import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';

class Home extends Component {
  state = {
    recentFlowers: []
  };
  async componentDidMount() {
    try {
      const flowers = [];
      const db = firebase.firestore();
      await db.collection('Flower').onSnapshot(docs => {
        docs.forEach(doc => {
          const docId = doc.id;
          const flower = doc.data();
          flower.id = docId;
          flowers.push(flower);
        });
        this.setState({
          recentFlowers: flowers
        });
      });
    } catch (error) {}
  }

  render() {
    const { recentFlowers } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <EvilIcons name="navicon" size={38} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Flower Snap</Text>
        </View>
        <ScrollView vertical={true}>
          {recentFlowers.map(flower => (
            <View style={styles.flowerItem} key={flower.id}>
              <Image style={styles.imageItem} source={{ uri: flower.image }} />
              <View style={styles.content}>
                <Text style={styles.flowerContent}>Name: {flower.name}</Text>
                <Text style={styles.flowerContent}>
                  Description: {flower.description}
                </Text>
                <Text style={styles.flowerContent}>
                  Means: {flower.meaning}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddFlower')}
        >
          <Ionicons
            name="ios-add-circle"
            color="#f25979"
            size={60}
            style={styles.addIcon}
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#f25979',
    width: '100%',
    height: 50,
    marginTop: 30,
    padding: 10
  },
  headerTitle: {
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  flowerItem: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#888888',
    borderRadius: 10,
    borderColor: '#888888',
    borderWidth: 1,
    margin: 10,
    shadowColor: '#777777'
  },
  content: {
    marginLeft: 15
  },
  flowerContent: {
    color: '#FFFFFF'
  },
  imageItem: {
    width: 100,
    height: 100
  },
  addIcon: {
    textAlign: 'right'
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: { screen: Home }
});

export default AppDrawerNavigator;
