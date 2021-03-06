import React, { Component } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { scrollLayout, centerLayout, textStyles } from './Styles'
import axios from 'axios'

import { API_URL } from './Env'
import { Review } from './Skills'

const api = API_URL;

export default class Home extends Component {
  static navigationOptions = {
    tabBar: {
      label: "Home"
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      totalTeamMembers: null,
      totalSkills: null,
      recentSkillReviews: [],
      unloadedComponents: 3,
      refreshing: true,
     };

     this.doRefresh = this.doRefresh.bind(this);
  }

  componentDidMount() {
    this.doRefresh();
  }

  doRefresh() {
    this.setState({refreshing: true, unloadedComponents: 3})
    getTotalTeamMembers(api, total => {
      this.setState({ totalTeamMembers: total, unloadedComponents: this.state.unloadedComponents - 1, refreshing: (this.state.unloadedComponents - 1 > 1)})
    });
    getTotalSkills(api, total => {
      this.setState({ totalSkills: total, unloadedComponents: this.state.unloadedComponents - 1, refreshing: (this.state.unloadedComponents - 1 > 1) })
    });
    getRecentSkillReviews(api, reviews => {
      this.setState({ recentSkillReviews: reviews, unloadedComponents: this.state.unloadedComponents - 1, refreshing: (this.state.unloadedComponents - 1 > 1) });
    }, 20);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* Strut to keep the header in line */}
        <View style={{height: 20}}/>
        <ScrollView style={scrollLayout}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.doRefresh}
            />
          }
          >
          <View style={centerLayout}>
            <Text style={textStyles.large}>Skill Directory Home</Text>
            <Text>Team Members: {this.state.totalTeamMembers}</Text>
            <Text>Unique Skills: {this.state.totalSkills}</Text>
            <Text>Recent Skill Reviews</Text>
          </View>
          {this.state.recentSkillReviews.map(review => <Review review={review} key={review.timestamp}/>)}
        </ScrollView>
      </View>
    )
  }
}

// Invokes callback with total Team Member records in the api backend as param.
function getTotalTeamMembers(api, onResponse) {
  axios.get(api + '/teammembers/')
    .then(res => {
      onResponse(res.data.length);
    })
    .catch(err => {
      console.error(err)
    });
}

// Invokes callback with total Skill records in the api backend as param.
function getTotalSkills(api, onResponse) {
  axios.get(api + '/skills/')
    .then(res => {
      onResponse(res.data.length);
    })
    .catch(err => {
      console.error(err)
    });
}

// Invokes `callback` with array of SkillReviews of length `numReviews` as param.
// All SkillReviews from api response are sorted with `sortFunc`.
function getSkillReviewsSorted(api, callback, sortFunc) {
  axios.get(api + '/skillreviews/')
    .then(res => {
      callback(res.data.sort(sortFunc));
    })
    .catch(err => {
      console.error(err)
    });
}

// Invokes callback with array of most recently created SkillReviews.
// Size of array is bounded by `numReviews`. Lower elements hold more recent
// reviews, so [0] is most recent one.
function getRecentSkillReviews(api, callback, numReviews) {
  getSkillReviewsSorted(api,
  skillReviews => callback(skillReviews.slice(0, numReviews)), sortByTimestamp);
}

// Sorts arguments by their timestamp field.
function sortByTimestamp(a, b) {
  const aTime = new Date(a.timestamp).getTime();
  const bTime = new Date(b.timestamp).getTime();
  if(aTime > bTime)
    return 1;
  else if(aTime < bTime)
    return -1;
  return 0;
}
