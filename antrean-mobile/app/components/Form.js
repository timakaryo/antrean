import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  input: {
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    lineHeight: 18
  }
})

class Form extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      fields: {}
    }
  }

  createChangeHandler (name) {
    const { onChange } = this.props
    return (value) => {
      const { fields } = this.state
      this.setState(
        { fields: { ...fields, [name]: value } },
        () => {
          onChange(this.state.fields)
        }
      )
    }
  }

  manageChildren () {
    return React.Children.map(this.props.children, (child, index) => (
      React.cloneElement(child, {
        onChangeText: this.createChangeHandler(child.props.name),
        style: styles.input
      })
    ))
  }

  render () {
    const managedChildren = this.manageChildren()
    return (
      <View style={this.props.style}>
        {managedChildren}
      </View>
    )
  }
}

export default Form
