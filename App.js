import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';

import Landing from './screens/Landing';
import AppDrawerNavigator from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AddFlower from './screens/AddFlower';
import Logout from './screens/Logout';
import Favourite from './screens/Favourite';

const AppSwitchNavigator = createSwitchNavigator(
  {
    Landing: { screen: Landing },
    Home: { screen: AppDrawerNavigator },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    AddFlower: { screen: AddFlower },
    Logout: { screen: Logout },
    Favourite: { screen: Favourite }
  },
  {
    initialRouteName: 'Landing'
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    });
  }
  render() {
    return <AppContainer />;
  }
}

export default App;
