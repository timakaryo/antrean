import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Form from '../components/Form'
import Triangle from 'react-native-triangle';

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6F96F0'
  },
  centerWrap: {
    width: '70%',
  },
  button: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  imageContainer:{
    alignItems: 'center',
    marginBottom: 30
  },
  footerBox:{
    height:50,
    backgroundColor: 'white',
    justifyContent:'flex-end',
    padding: 10,
  },
  triangle:{
    width: 600,
    height: 30,
    backgroundColor: '#6F96F0',
    borderBottomWidth: 20,
    borderBottomColor: 'white',
    borderLeftWidth: 400,
    borderLeftColor: 'transparent'
  },
  footerInnerBox:{
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  footerText:{
    color: '#999999'
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.centerWrap}>
            {/*
            <Text style={styles.heading}>Hello there ! Nice to meet you</Text>
            */}
            <View style={styles.imageContainer}>
              <Image source={require('../assets/images/antrean_logo.png')}/>
            </View>
            <Form onChange={this.handleChange} style={{ marginBottom: 20 }}>
              <TextInput name="email" placeholder="/email" value={email} />
              <TextInput name="password" placeholder="password" value={password} secureTextEntry />
            </Form>
            <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.triangle}>
        </View>

        <View style={styles.footerBox}>
          <View style={styles.footerInnerBox}>
            <Text style={styles.footerText}>/App By Timkaryo</Text>
            <Text style={styles.footerText}>2017</Text>
          </View>
        </View>
      </View>
    )
  }
}
