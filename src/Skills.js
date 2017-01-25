import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { API_URL } from './Env'

import { centerLayout } from './Styles'

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skills: []
    }
  }
  componentDidMount() {
    console.log(API_URL + "/skills/")
    fetch(API_URL + "/skills/")
      .then(res => res.json())
      .then(res => {
        this.setState({
          skills: res.slice()
        })
      })
      .catch(err => console.error(err));
  }
  render() {
    const skills = this.state.skills.map(skill => {return (
        <Text key={skill.id}>{skill.name}</Text>
      )
    });
    return (
      <View style={centerLayout}>
        {skills}
      </View>
    )
  }
}
