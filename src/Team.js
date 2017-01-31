import React, { Component } from 'react'
import { Text, View, ScrollView, Button, RefreshControl } from 'react-native'
import axios from 'axios'
import { API_URL } from './Env'
import { StackNavigator } from 'react-navigation'
import AddForm, {FORM_TYPE} from './AddForm'

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
      modalVisible: false,
      refreshing: true,
      teamMembers: [],
    };

    this.addTeamMember = this.addTeamMember.bind(this)
    this.doRefresh = this.doRefresh.bind(this)
  }
  componentDidMount() {
    this.doRefresh();
  }

  doRefresh() {
    this.setState({refreshing: true});
    axios.get(`${api}/teammembers/`)
      .then((result) => {
        const teamMembers = result.data.slice();
        this.setState({
          teamMembers: teamMembers,
          refreshing: false,
        });
      })
      .catch((err) => {
        console.log(`Error fetching team members: ${err}`);
      });
  }
  addTeamMember(name, title) {
    axios.post(`${api}/teammembers/`, {name: name, title: title})
      .then(() => {
        this.doRefresh()
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    const { navigate } = this.props.navigation;
    const forms = [
      {type: FORM_TYPE.TEXT, label: "Name"},
      {type: FORM_TYPE.TEXT, label: "Title"},
    ];
    const members = this.state.teamMembers.map((member, index) => { return (
      <Button
        title={member.name}
        key={index}
        onPress={() => navigate('Detail', {member: member})}
      />
    )});
    return (
      <View>
        <ScrollView
          style={scrollLayout}
          refreshControl = {
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.doRefresh}
            />
          }
        >
          {members}
        </ScrollView>
        <Button
          title="Add"
          onPress={() => this.setState({modalVisible: true})}
        />
        <AddForm
          forms={forms}
          visible={this.state.modalVisible}
          onClose={() => this.setState({modalVisible: false})}
          onSubmit={vals => this.addTeamMember(...vals)}
        />
      </View>
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
