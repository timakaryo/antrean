import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Home, Login } from './screens'

export const AppNavigator = StackNavigator({
  home: { screen: Home },
  login: {
    screen: Login
  }
},
{
  initialRouteName: 'login',
  headerMode: 'none'
})

const Router = ({ dispatch, navigation }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
)

export default connect((state) => ({ navigation: state.navigation }))(Router)
