import { AppNavigator } from '../Router'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('login'))

export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  return nextState || state
}
