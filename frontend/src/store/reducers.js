import { combineReducers } from 'redux'
import authReducer from './auth'
import eventsReducer from './events'

const allReducers = combineReducers({
  auth: authReducer,
  events: eventsReducer,
})

export default allReducers