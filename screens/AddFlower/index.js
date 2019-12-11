import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Ficon from 'react-native-vector-icons/Feather';
import Micon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

import firebase from '../../firebase';
import 'firebase/firestore';
import 'firebase/storage';

class AddFlower extends Component {
  state = {
    name: null,
    image: null,
    description: null,
    meaning: null
  };

  selectPicture = async () => {
    let { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!cancelled) {
      this.setState({ image: uri });
    }
  };

  uploadImageAsync = async () => {
    const { image } = this.state;
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });

      let storageRef = firebase.storage().ref(`images/${uuid.v4()}`);
      const snapshot = await storageRef.put(blob);
      blob.close();

      return await snapshot.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async () => {
    const { name, description, meaning, image } = this.state;
    const db = firebase.firestore();
    const postedImage = await this.uploadImageAsync();
    await db.collection('Flower').add({
      name,
      description,
      meaning,
      image: postedImage
    });
    this.props.navigation.navigate('Home');
  };

  render() {
    const { name, description, meaning, image } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Micon name="arrow-back" size={24} style={{ color: '#FFFFFF' }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Image
            style={styles.logo}
            source={{ uri: 'https://i.imgur.com/mlc46Hj.png' }}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Add Flower </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#FFFFFF' }}>upload image</Text>
          <TouchableOpacity
            style={styles.image__button}
            onPress={() => this.selectPicture()}
          >
            <Ficon name="upload" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {image ? <Image style={styles.image} source={{ uri: image }} /> : null}

        <TextInput
          placeholder="Enter flower name"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={name}
          onChangeText={name => this.setState({ name })}
        />

        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.descInput}
          placeholder="Enter Description"
          placeholderTextColor="gray"
          value={description}
          onChangeText={description => this.setState({ description })}
        />

        <TextInput
          placeholder="Enter flower meaning"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={meaning}
          onChangeText={meaning => this.setState({ meaning })}
        />

        <TouchableOpacity style={styles.addButton}>
          <Button
            color="#f25979"
            title="Add Flower"
            onPress={() => {
              this.handleSubmit();
            }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  descInput: {
    height: 100,
    width: '80%',
    borderColor: 'gray',
    color: '#FFFFFF',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10
  },
  addButton: {
    width: '80%',
    paddingBottom: 10,
    marginTop: 30,
    borderRadius: 10
  },
  image: {
    width: '80%',
    height: '20%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    margin: 20
  }
});

export default AddFlower;
