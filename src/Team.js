import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import axios from 'axios'
import { API_URL } from './Env'
import { StackNavigator } from 'react-navigation'

import { centerLayout, scrollLayout, textStyles } from './Styles'

const api = API_URL;

class Team extends Component {
  static navigationOptions = {
    title: "Team Members",
    tabBar: {
      label: "Team"
    }
  }
  constructor() {
    super();
    this.state = {
      teamMembers: []
    };
  }

  componentDidMount() {
    this.fetchTeamMembers();
  }

  fetchTeamMembers() {
    axios.get(`${api}/teammembers/`)
      .then((result) => {
        const teamMembers = result.data.slice();
        this.setState({
          teamMembers,
        });
      })
      .catch((err) => {
        console.log(`Error fetching team members: ${err}`);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const members = this.state.teamMembers.map((member, index) => { return (
      <Button
        title={member.name}
        key={index}
        onPress={() => navigate('Detail', {member: member})}
      />
    )});
    return (
      <ScrollView style={scrollLayout}>
        {members}
      </ScrollView>
    )
  }
}

class Detail extends Component {
  static navigationOptions = {
    title: ({state}) => state.params.member.name,
    tabBar: {
      label: "Team"
    }
  }
  render() {
    const member = this.props.navigation.state.params.member;
    return (
      <View style={centerLayout}>
        <Text style={textStyles.large}>{member.title}</Text>
      </View>
    )
  }
}

const TeamNavigator = StackNavigator({
  All: {screen: Team},
  Detail: {screen: Detail}
});

export default TeamNavigator;
