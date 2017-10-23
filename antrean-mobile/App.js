import React from 'react'
import { Provider } from 'react-redux'
import store from './app/store'
import Router from './app/Router'

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)

export default App
