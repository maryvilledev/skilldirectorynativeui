import React, { Component } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios'
import { API_URL } from './Env'

import { centerLayout } from './Styles'

const api = API_URL;

export default class Team extends Component {
  constructor() {
    super();
    this.state = {
      teamMembers: [],
      selectedTeammember: {
        id: '',
        name: '',
        title: '',
      }
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
    return (
      <View style={centerLayout}>
        {this.state.teamMembers.map(member => <Text key={member.id}>{member.name}</Text>)}
      </View>
    )
  }
}
