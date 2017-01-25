import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { centerLayout } from './Styles'

export default class Home extends Component {
  render() {
    return (
      <View style={centerLayout}>
        <Text>Skill Directory</Text>
      </View>
    )
  }
}
