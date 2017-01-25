import React from 'react'
import { Navigator, Text } from 'react-native'

//import Home from './Home';
import Skills from './Skills';
import Header from './Header';
//import Team from './Team';

import Navbar from './Navbar'

export const routes = [
  {title:'Welcome', index: 0},
  {title:'Skills', index: 1}
];
const scenes = [
  <Header />,
  <Skills />
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
