import React, {Component} from "react"
import { ScrollView, Modal, Picker, Text, View, TextInput, Button, Switch, NativeMethodsMixin } from 'react-native'
import { scrollLayout, centerLayout, textStyles, horizontalLayout, formElement} from './Styles'
const Item = Picker.Item

const FORM_TYPE = {
  TEXT: 1,
  PICKER: 2,
  SWITCH: 3,
}

export {FORM_TYPE};

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: getDefaultValues(props.forms),
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.clearForms = this.clearForms.bind(this);
    this.onClose = props.onClose.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = {
      values: getDefaultValues(props.forms)
    }
  }

  update(index, value) {
    const values = this.state.values.slice()
    values[index] = value
    this.setState({
      values: values
    })
  }

  clearForms() {
    this.setState({
      values: getDefaultValues(this.props.forms),
    })
  }

  onSubmit() {
    this.props.onSubmit(this.state.values.slice());
    this.clearForms();
    this.onClose();
  }

  onCancel() {
    this.clearForms();
    this.onClose();
  }

  render() {
    let _scrollView: ScrollView;
    const onFocus = (y) => {_scrollView.scrollTo({y: y})};
    const onBlur = () => {_scrollView.scrollTo({y: 0})};
    const values = this.state.values.slice()
    const forms = this.props.forms.map((form, index) => <Form
      form={form}
      key={index}
      update={val => this.update(index, val)}
      value={values[index]}
      onFocus={onFocus}
      onBlur={onBlur}
    />)
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          onRequestClose={this.onCancel}
        >
          <View style={{height: 20}} />
          {/* Strut to keep off top of screen */}
          <ScrollView
            ref={scrollView => {_scrollView = scrollView;}}
            style={scrollLayout}
          >
            {forms}
          </ScrollView>
          <View style={horizontalLayout}>
            <Button title="Submit" onPress={this.onSubmit} />
            <Button title="Cancel" onPress={this.onCancel} />
          </View>
        </Modal>
      </View>
    )
  }
}

const Form = (props) => {
  const form = props.form
  const update = props.update
  const value = props.value
  switch (form.type) {
    case FORM_TYPE.TEXT:
    const onFocus = props.onFocus;
    const onBlur = props.onBlur;
    let _y = 0;
      return (
      <View style={formElement} onLayout={ev => {_y = ev.nativeEvent.layout.y}}>
        <Text style={textStyles.large}>{`${form.label}: `}</Text>
        <TextInput
          style={{height: 40, borderColor: 'grey', borderWidth: 1}}
          onChangeText={update}
          value={value}
          multiline={form.multiline || false}
          onFocus={() => onFocus(_y)}
          onBlur={onBlur}
        />
      </View>
    );
    case FORM_TYPE.PICKER:
      return (
        <View style={formElement}>
          <Text style={textStyles.large}>{`${form.label}: `}</Text>
          <Picker
            onValueChange={update}
            selectedValue={value || form.items[0]}
          >
            {form.items.map((item, index) => <Item label={item} value={item} key={index}/>)}
          </Picker>
        </View>
      )
    case FORM_TYPE.SWITCH:
      return (
        <View style={formElement}>
          <Text style={textStyles.large}>{`${form.label}: `}</Text>
          <Switch
            onValueChange={update}
            value={value}
          />
        </View>
      )
  }
}

function getDefaultValues(forms) {
  let values = []
  for(form of forms){
    switch (form.type) {
      case FORM_TYPE.TEXT:
        values.push('')
        break;
      case FORM_TYPE.PICKER:
        values.push(form.items[0])
        break;
      case FORM_TYPE.SWITCH:
        values.push(false)
        break;
      default:
        values.push(null)
    }
  }
  return values
}
