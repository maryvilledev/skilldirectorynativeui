import 'react-native'
import React from 'react'
import { Team, Detail } from './../src/Team.js'

import renderer from 'react-test-renderer'

const mockNavigator = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  state: {
    params: {
      member: {
        name: 'Donnie Darko',
        title: 'Destructor'
      },
      deleteCallback: jest.fn()
    }
  }
}

describe('<Team />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Team navigation={mockNavigator}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('<Detail />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Detail navigation={mockNavigator}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
