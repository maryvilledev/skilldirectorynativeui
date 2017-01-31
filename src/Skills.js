import React, { Component } from 'react'
import { View, ScrollView, Text, Button, RefreshControl, TouchableOpacity, WebView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import axios from 'axios'
import { API_URL } from './Env'
import AddForm, { FORM_TYPE } from './AddForm'

import { textStyles, scrollLayout, centerLayout, skillSelector, linkLayout, positiveReview, negativeReview } from './Styles'

const api = API_URL;

const types = ['compiled', 'scripted', 'database', 'orchestration'];

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
      modalVisible: false,
      refreshing: true,
    };
    this.addSkill = this.addSkill.bind(this);
    this.doRefresh = this.doRefresh.bind(this);
  }
  doRefresh() {
    this.setState({refreshing: true})
    axios.get(`${API_URL}/skills/`)
      .then(res => {
        this.setState({
          skills: res.data.slice(),
          refreshing: false,
        });
      })
      .catch(err => console.error(err));
  }
  componentDidMount() {
    this.doRefresh()
  }
  addSkill(name, type) {
    axios.post(`${api}/skills`, {name: name, skill_type: type})
      .then(() => {
        this.doRefresh()
      })
      .catch(err => {
        console.error(err)
      });
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
    const forms = [
      {type: FORM_TYPE.TEXT, label: 'Name', placeholder: 'name'},
      {type: FORM_TYPE.PICKER, label: 'Type', items: types}
    ]
    return (
      <View>
        <AddForm
          visible={this.state.modalVisible}
          forms={forms}
          onSubmit={vals => this.addSkill(...vals)}
          onClose={() => this.setState({modalVisible: false})}
        />
        <ScrollView
          style={scrollLayout}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.doRefresh}
            />
          }
        >
            {skills}
        </ScrollView>
        <Button
          onPress={() => this.setState({modalVisible: true})}
          title="Add"
        />
      </View>
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
      reviews: [],
      links: [],
      teamMembers: [],
      modalVisible: false,
    }

    this.getReviews = this.getReviews.bind(this);
    this.getTeamMembers = this.getTeamMembers.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.addReview = this.addReview.bind(this);
  }
  componentDidMount() {
    this.getReviews();
    this.getLinks()
    this.getTeamMembers();
  }
  getReviews() {
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
  getLinks() {
    axios.get(`${api}/skills/${this.state.skill.id}`)
      .then(res => {
        const links = res.data.links.slice();
        this.setState({links: links});
      })
      .catch(err => {
        console.error(err)
      });
  }
  getTeamMembers() {
    axios.get(`${api}/teammembers/`)
      .then(res => {
        const teamMembers = res.data.slice()
        this.setState({
          teamMembers: teamMembers
        })
      })
      .catch(err => {
        console.error(err)
      });
  }
  addReview(teamMemberName, positive, body) {
    const postBody = {
      skill_id: this.state.skill.id,
      team_member_id: this.state.teamMembers.find(mem => mem.name === teamMemberName).id,
      body: body,
      positive: positive,
    }
    axios.post(`${api}/skillreviews/`, postBody)
      .then(() => {
        this.getReviews()
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    const {navigate} = this.props.navigation;
    const skill = this.state.skill;
    const links = this.state.links.map(link => <Link
      onPress={() => navigate('Web', {url: link.url})}
      link={link}
      key={link.id}
    />)
    const reviews = this.state.reviews.map(review => <Review review={review} key={review.id}/>)
    const memberNames = this.state.teamMembers.map(mem => mem.name)
    const forms = [
      {type: FORM_TYPE.PICKER, label: 'Team Member', items: memberNames},
      {type: FORM_TYPE.SWITCH, label: 'Positive'},
      {type: FORM_TYPE.TEXT, label: 'Body', multiline: true},
    ]
    return (
      <View>
        <ScrollView style={scrollLayout}>
          <View style={centerLayout}>
            <Text style={textStyles.large}>{skill.skill_type}</Text>
          </View>
          <Text style={centerLayout}>Links</Text>
          {links}
          <Text style={centerLayout}>Reviews</Text>
          {reviews}
        </ScrollView>
        <AddForm
          forms={forms}
          visible={this.state.modalVisible}
          onClose={() => this.setState({modalVisible: false})}
          onSubmit={vals => this.addReview(...vals)}
        />
        <Button
          onPress={() => this.setState({modalVisible: true})}
          title="Add Review"
        />
      </View>
    );
  }
}

class WebViewer extends Component {
  static navigationOptions = {
    title: ({state}) => state.params.url,
    tabBar: {
      label: "Skills"
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      url: props.navigation.state.params.url,
    }
  }
  render() {
    return <WebView source={{uri:this.state.url}}/>
  }
}

const SkillsNavigator = StackNavigator({
  All: { screen: Skills },
  Detail: { screen: Detail },
  Web: { screen: WebViewer}
})

export default SkillsNavigator

export const Review = (props) => {
  const style = (props.review.positive) ? positiveReview : negativeReview;
  return (
    <View style={style}>
      <Text>{`${props.review.team_member_name} reviewed the ${props.review.skill_name} Skill`}</Text>
      <Text style={textStyles.small}>{props.review.body}</Text>
    </View>
  )
}

export const Link = (props) => {
  const link = props.link
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={linkLayout}>
        <Text>{link.name}</Text>
        <Text style={textStyles.small}>{link.link_type}</Text>
      </View>
    </TouchableOpacity>
  )
}
