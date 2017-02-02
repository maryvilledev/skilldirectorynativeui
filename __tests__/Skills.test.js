import 'react-native'
import React from 'react'
import { Skills, Detail, WebViewer, Review, Link } from './../src/Skills.js'

import renderer from 'react-test-renderer'

const mockNavigator = {
  navigate: jest.fn(),
  goTo: jest.fn(),
  state: {
    params: {
      skill: {
        skill_type: 'mock'
      },
      url: 'https://example.com'
    }
  }
}

const mockReview = {
  positive: false,
  team_member_name: 'Donnie Darko',
  skill_name: 'Telekenisis',
  body: 'Sucked airplane through black hole. 10/10.'
}

const mockLink = {
  name: 'The googs',
  link_type: 'webpage',
  onPress: jest.fn(),
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

describe('<WebViewer />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <WebViewer navigation={mockNavigator}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('<Review />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Review review={mockReview} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('<Link />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Link link={mockLink} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
