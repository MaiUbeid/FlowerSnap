import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

class Favourite extends Component {
  state = {
    favFlowers: null
  };

  async componentDidMount() {
    let flowerId = null;
    try {
      const userEmail = await firebase.auth().currentUser.email;
      const snapshot = await firebase
        .firestore()
        .collection('users')
        .where('email', '==', userEmail)
        .get();
      snapshot.forEach(doc => {
        flowerId = doc.data().favourite;
      });
      if (flowerId) {
        await firebase
          .firestore()
          .collection('Flower')
          .onSnapshot(docs => {
            docs.forEach(doc => {
              if (doc.id === flowerId)
                this.setState({
                  favFlowers: doc.data()
                });
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeFav = async () => {
    let userId = null;
    const db = firebase.firestore();
    const currentUserId = await firebase.auth().currentUser.uid;
    await db
      .collection('users')
      .where('userId', '==', currentUserId)
      .onSnapshot(async docs => {
        docs.forEach(doc => {
          userId = doc.id;
        });
        await db
          .collection('users')
          .doc(userId)
          .update({
            favourite: null
          });
        this.props.navigation.navigate('Home');
      });
  };

  render() {
    const { favFlowers } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <EvilIcons
              name="navicon"
              size={38}
              onPress={() => this.props.navigation.openDrawer()}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Flower Snap</Text>
        </View>
        <ScrollView vertical={true}>
          {favFlowers ? (
            <View style={styles.flowerItem} key={favFlowers.id}>
              <Image
                style={styles.imageItem}
                source={{ uri: favFlowers.image }}
              />
              <View style={styles.content}>
                <Text style={styles.contentTitle}>{favFlowers.name}</Text>
                {favFlowers.description ? (
                  <Text style={styles.description}>
                    {favFlowers.description}
                  </Text>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  {favFlowers.meaning ? (
                    <Text style={styles.meaning}>{favFlowers.meaning}</Text>
                  ) : (
                    <Text>None</Text>
                  )}
                  <Micon
                    name="delete"
                    size={24}
                    color="#222222"
                    onPress={() => this.removeFav()}
                  />
                </View>
              </View>
            </View>
          ) : (
            <Text
              style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}
            >
              You don't have any flower in favourite !!
            </Text>
          )}
        </ScrollView>
        <Micon
          name="home"
          color="#FFFFFF"
          style={{
            borderColor: '#f25979',
            borderRadius: 60,
            padding: 4,
            backgroundColor: '#f25979',
            marginBottom: 20
          }}
          size={40}
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
    marginBottom: 20,
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
    margin: 10
  },
  content: {
    marginLeft: 15
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333'
  },
  description: {
    width: 140,
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 5
  },
  meaning: {
    color: '#FFFFFF',
    backgroundColor: '#666666',
    borderColor: '#666666',
    borderWidth: 2,
    borderRadius: 3,
    padding: 3
  },
  flowerContent: {
    color: '#FFFFFF'
  },
  imageItem: {
    width: 120,
    height: '100%'
  }
});

export default Favourite;
