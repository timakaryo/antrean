import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Form from '../components/Form'

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerWrap: {
    width: '70%',
  },
  button: {
    borderWidth: 1,
    borderColor: '#B26BF4',
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B26BF4'
  }
})

export default class Login extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        email: '',
        password: ''
      }
    }
  }

  get handleChange () {
    return (fields) => {
      this.setState({ fields })
    }
  }

  get handleLogin () {
    return () => {
      const { email, password } = this.state.fields
      console.debug('LOGIN CLICKED', `email: ${email} password: ${password}`)
      this.props.navigation.navigate('home')
    }
  }

  render () {
    const { email, password } = this.state.fields

    return (
      <View style={styles.container}>
        <View style={styles.centerWrap}>
          <Text style={styles.heading}>Hello there ! Nice to meet you</Text>
          <Form onChange={this.handleChange} style={{ marginBottom: 20 }}>
            <TextInput name="email" placeholder="email" value={email} />
            <TextInput name="password" placeholder="password" value={password} secureTextEntry />
          </Form>
          <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
