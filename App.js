import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';
import AppDrawerNavigator from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddFlower from './components/AddFlower';

const AppSwitchNavigator = createSwitchNavigator(
  {
    Home: { screen: Home },
    Dashboard: { screen: AppDrawerNavigator },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    AddFlower: { screen: AddFlower }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
