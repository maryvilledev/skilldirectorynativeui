import React from 'react'
import { Text } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Skills from './Skills';
import Home from './Home';
import Team from './Team';

const App = TabNavigator({
  Home: {screen: Home},
  Skills: {screen: Skills},
  Team: {screen: Team}
})

export default App
