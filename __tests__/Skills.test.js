import 'react-native'
import React from 'react'
import { Skills, Detail } from './../src/Skills.js'

import renderer from 'react-test-renderer'

const mockNavigator = {
  navigate: jest.fn(),
  goTo: jest.fn(),
  state: {
    params: {
      skill: {
        skill_type: 'mock'
      }
    }
  }
}

describe('<Skills />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Skills navigation={mockNavigator}/>
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
