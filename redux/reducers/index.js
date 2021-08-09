import { combineReducers } from 'redux'
import tokenReducer from './token'

const allReducers = combineReducers({
  user: tokenReducer,
})

export default allReducers