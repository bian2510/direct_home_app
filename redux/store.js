import { createStore } from 'redux'
import allReducers from './reducers'

const store = createStore(
  allReducers,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store