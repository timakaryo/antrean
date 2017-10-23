import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as appReducers from './modules'

const reducer = combineReducers({
  ...appReducers
})

export default createStore(reducer, applyMiddleware(thunk))
