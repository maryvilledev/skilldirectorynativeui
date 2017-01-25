import React, { Component } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
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
    axios.get(`${API_URL}/skills/`)
      .then(res => {
        this.setState({
          skills: res.data.slice()
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
