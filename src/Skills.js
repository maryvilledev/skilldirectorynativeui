import React, { Component } from 'react'
import { View, ScrollView, Text, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import axios from 'axios'
import { API_URL } from './Env'

import { textStyles, scrollLayout, centerLayout, skillSelector } from './Styles'

class Skills extends Component {
  static navigationOptions = {
    title: "Skills",
    tabBar: {
      label: "Skills"
    }
  }
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
    const { navigate } = this.props.navigation;
    const skills = this.state.skills.map((skill, index) => {return (
        <Button
          style={skillSelector}
          title={skill.name}
          key={skill.id}
          onPress={() => navigate('Detail', { skill: skill })}
        />
      )
    });
    return (
      <ScrollView style={scrollLayout}>
          {skills}
      </ScrollView>
    )
  }
}

class Detail extends Component {
  static navigationOptions = {
    title: ({state}) => state.params.skill.name,
    tabBar: {
      label: "Skills"
    }
  }
  render() {
    return null
  }
}

const SkillsNavigator = StackNavigator({
  All: { screen: Skills },
  Detail: { screen: Detail }
})

export default SkillsNavigator
