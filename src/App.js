import React from 'react'
import { Text } from 'react-native'
import { TabNavigator } from 'react-navigation'

import SkillsNavigator from './Skills';
import Home from './Home';
import Team from './Team';

const App = TabNavigator({
  Home: {screen: Home},
  Skills: {screen: SkillsNavigator},
  Team: {screen: Team}
})

export default App
