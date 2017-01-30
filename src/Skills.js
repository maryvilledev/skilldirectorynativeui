import React, { Component } from 'react'
import { View, ScrollView, Text, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Review } from './Home'
import axios from 'axios'
import { API_URL } from './Env'

import { textStyles, scrollLayout, centerLayout, skillSelector } from './Styles'

const api = API_URL;

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
  constructor(props) {
    super(props);
    this.state = {
      skill: props.navigation.state.params.skill,
      // Holy nested key-value pairs, Batman!
      reviews: []
    }
  }
  componentDidMount() {
    axios.get(`${api}/skillreviews?skill_id=${this.state.skill.id}`)
      .then(res => {
        const reviews = res.data.slice();
        this.setState({
          reviews: reviews
        });
      })
      .catch(err => {
        console.err(err);
      });
  }
  render() {
    const skill = this.state.skill;
    const reviews = this.state.reviews.map(review => <Review review={review} key={review.id}/>)
    return (
      <ScrollView style={scrollLayout}>
        <View style={centerLayout}>
          <Text style={textStyles.large}>{skill.skill_type}</Text>
        </View>
        {reviews}
      </ScrollView>
    );
  }
}

const SkillsNavigator = StackNavigator({
  All: { screen: Skills },
  Detail: { screen: Detail }
})

export default SkillsNavigator
