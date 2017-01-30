import React, { Component } from 'react'
import { View, ScrollView, Text, Button } from 'react-native'
import axios from 'axios'
import { API_URL } from './Env'

import { textStyles, scrollLayout, centerLayout, skillSelector } from './Styles'

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skills: [],
    }
  }
  componentDidMount() {
    axios.get(`${API_URL}/skills/`)
      .then(res => {
        this.setState({
          skills: res.data.slice()
        });
      })
      .catch(err => console.error(err));
  }
  render() {
    const skills = this.state.skills.map((skill, index) => {return (
        <Button
          style={skillSelector}
          title={skill.name}
          key={skill.id}
          onPress={() => {}}
        />
      )
    });
    const initialScene = (
      <ScrollView style={scrollLayout}>
        <View style={centerLayout}>
          <Text style = {textStyles.large}>Skills:</Text>
        </View>
          {skills}
      </ScrollView>
    )
    return initialScene;
  }
}
