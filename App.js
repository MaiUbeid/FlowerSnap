import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AddFlower from './components/AddFlower';

const App = createSwitchNavigator(
  {
    Home,
    AddFlower,
    SignUp,
    Login
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(App);
