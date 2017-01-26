import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { centerLayout } from './Styles'
import axios from 'axios'

import { API_URL } from './Env'

const api = API_URL;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTeamMembers: null,
      totalSkills: null,
      recentSkillReviews: null,
     };
  }

  componentDidMount() {
    getTotalTeamMembers(api, total => {
      this.setState({ totalTeamMembers: total })
    });
    getTotalSkills(api, total => {
      this.setState({ totalSkills: total })
    });
    getRecentSkillReviews(api, reviews => {
      this.setState({ recentSkillReviews: reviews });
    }, 5);
  }

  render() {
    return (
      <View style={centerLayout}>
        <Text>Skill Directory Home</Text>
        <Text>Team Members: {this.state.totalTeamMembers}</Text>
        <Text>Unique Skills: {this.state.totalSkills}</Text>
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
  if(aTime < bTime)
    return 1;
  else if(aTime > bTime)
    return -1;
  return 0;
}
