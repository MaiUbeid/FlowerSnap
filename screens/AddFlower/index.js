import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  Image
} from 'react-native';
import Ficon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
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
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = this.props.firebase.accessStorage().child(uuid.v4());
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  handleSubmit = () => {
    const { name, description, meaning, image } = this.state;
    const db = firebase.firestore();
    db.collection('Flower').add({
      name,
      description,
      meaning,
      image
    });
    this.uploadImageAsync();
    this.props.navigation.navigate('Home');
  };

  render() {
    const { name, description, meaning, image } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>Flower Snap</Text>
        </TouchableOpacity>
        <Text>Add Flower </Text>
        <TouchableOpacity
          style={styles.image__button}
          onPress={() => this.selectPicture()}
        >
          <Ficon name="upload" size={26} />
        </TouchableOpacity>

        <Image style={styles.image} source={{ uri: image }} />

        <TextInput
          placeholder="Enter flower name"
          style={styles.textInput}
          value={name}
          onChangeText={name => this.setState({ name })}
        />

        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.descInput}
          placeholder="Enter Description"
          value={description}
          onChangeText={description => this.setState({ description })}
        />

        <TextInput
          placeholder="Enter flower meaning"
          value={meaning}
          onChangeText={meaning => this.setState({ meaning })}
        />

        <Button
          title="Add Flower"
          onPress={() => {
            this.handleSubmit();
          }}
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
  descInput: {
    padding: 10
  },
  image: {
    width: '100%',
    height: '20%'
  }
});

export default AddFlower;
