import React from 'react'
import { View, Text, Button } from 'react-native'
import { routes } from './App'

import { horizontalLayout } from './Styles'

const Navbar = ({navigator, navState}) => {
  const buttons = routes.map((route) => {
    return <Button
      title={route.title}
      key={route.index}
      onPress={() => navigateTo(navigator, route.index)}
    />;
  });
  return (
    <View style={horizontalLayout}>
      {buttons}
    </View>
  )
}

function navigateTo(navigator, index) {
  const nextRoute = routes[index]
  if (nextRoute) {
    navigator.jumpTo(nextRoute)
  }
}

export default Navbar;
