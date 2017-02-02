import 'react-native'
import React from 'react'
import AddForm, { FORM_TYPE } from './../src/AddForm.js'

import renderer from 'react-test-renderer'

const mockForms = [
  {type: FORM_TYPE.TEXT, label: 'Name', multiline: true},
  {type: FORM_TYPE.PICKER, label: 'Title', items: ['Destructor', 'Cheerleader', 'Rabbit']},
  {type: FORM_TYPE.SWITCH, label: 'PK Sensitive'}
]

describe('<AddForm />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AddForm
        forms={mockForms}
        visible={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
