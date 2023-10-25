import { combineReducers } from 'redux'

import appState from './appStateSlice'
import session from './sessionSlice'

const rootReducer = combineReducers({
  appState,
  session
})

export default rootReducer