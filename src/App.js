import React from 'react'
import { Navigator, Text } from 'react-native'

import Skills from './Skills';
import Home from './Home';
import Team from './Team';

import Navbar from './Navbar'

export const routes = [
  {title:'Home', index: 0},
  {title:'Skills', index: 1},
  {title:'Team', index: 2},
];
const scenes = [
  <Home />,
  <Skills />,
  <Team />,
];

function App(props) {
  return (
    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) => {
        return scenes[route.index]
      }}
      navigationBar={<Navbar />}
    />
  );
}

export default App
